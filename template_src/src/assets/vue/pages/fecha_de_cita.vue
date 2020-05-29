<template>
  <f7-page class="page-gray">
    <!--ingresa tu html aqui -->
    <f7-navbar>
      <topmenu title="Generar cita"></topmenu>
    </f7-navbar>

    <center> <!-- titulo -->
      <label>Seleccione la fecha de su cita</label>
    </center>

    <div id="demo-calendar-inline-container"></div> <!-- Calendario para elegir,
    todo lo que esta parte genera esta hasta el final en la parte de script -->
    <br>
    <div v-if="(fechaSeleccionada+'') === (fechaHoy+'')">
      <center v-if="horario.length === 0 || horaActual>horario[horario.length-1].tiempo"> <!-- Otro simple letrero del horario -->
        <label>Horario no disponible</label>
      </center>
      <center v-else> <!-- Otro simple letrero del horario -->
        <label>Horario disponible</label>
      </center>
    </div>
    <div v-if="(fechaSeleccionada+'') !== (fechaHoy+'')">
      <center v-if="horario.length === 0"> <!-- Otro simple letrero del horario -->
        <label>Horario no disponible</label>
      </center>
      <center v-else> <!-- Otro simple letrero del horario -->
        <label>Horario disponible</label>
      </center>
    </div>
    
  <div v-if="horario.length > 0">

    <f7-block>
      <form id="horario">
        <f7-row v-if="(fechaSeleccionada+'') === (fechaHoy+'')">
          <f7-col v-if="item.tiempo>tiempoActual" width="33" v-for="(item,index) in horario" style="margin-bottom: 1rem;">
              <input type="radio" name="hora" :id="'button'+index" :value="JSON.stringify(item)" class="visible">
              <label :id="'label'+index" :for="'button'+index">{{("0" + item.horas).slice(-2)}}:{{("0" + item.mins).slice(-2)}}</label>
          </f7-col>
          <f7-col width="33">
          </f7-col>
        </f7-row>
        <f7-row v-if="(fechaSeleccionada+'') !== (fechaHoy+'')">
          <f7-col width="33" v-for="(item,index) in horario" style="margin-bottom: 1rem;">
              <input type="radio" name="hora" :id="'button'+index" :value="JSON.stringify(item)" class="visible">
              <label :id="'label'+index" :for="'button'+index">{{("0" + item.horas).slice(-2)}}:{{("0" + item.mins).slice(-2)}}</label>
          </f7-col>
          <f7-col width="33">
          </f7-col>
        </f7-row>
      </form>
    </f7-block>

    <f7-block v-if="cat_auto">
      <form id="form_auto">
        <label>Motivo de la cita</label>
        <input type="text" id="reason" name="reason" />

        <label>Placas</label>
        <input type="text" id="plate" name="plate" />
        
        <label>Kilometraje actual</label>
        <input type="number" id="mileage" name="mileage" />

        <label>Modelo</label>
        <input type="text" id="model" name="model" />
        
        <label>Año</label>
        <input type="number" id="year" name="year" />

        <label v-if="!cat_otra">Número de celular</label>
        <input v-if="!cat_otra" type="text" id="clientNumber" name="clientNumber" />
      </form>
    </f7-block>

    <f7-block v-if="cat_otra">
      <form id="form_otra">
        <label>Calle</label>
        <input type="text" id="calle" name="calle" />

        <label>Colonia</label>
        <input type="text" id="colonia" name="colonia" />

        <label>Municipio</label>
        <input type="text" id="municipio" name="municipio" />

        <label>Número de celular</label>
        <input type="text" id="clientNumber" name="clientNumber" />
      </form>
    </f7-block>
    


    <!--  seleccionar tipo de pago
    <center>
      <label>Tipo de pago</label>
    </center>
    <f7-block>
      <form id="pago">
        <f7-row>
          <f7-col v-for="tipo in servicioAReservar.tipoPago" width="33">
            <input type="radio" name="pago" :id="'pago'+tipo" :value="tipo" class="visible">
            <label id="" :for="'pago'+tipo">
              <i :class="iconosPago[tipo]"></i>
              <br>
              <span style="font-size: .9rem;" v-if="tipo==='0'">EFECTIVO</span>
              <span style="font-size: .9rem;" v-if="tipo==='1'">TARJETA</span>
            </label>
          </f7-col>
          <f7-col width="33">
          </f7-col>
        </f7-row>
      </form>
    </f7-block>
    -->



    <f7-block>
      <f7-button large type="button" class="btn-realizar-cita" @click="reservar()">Reservar</f7-button>
    </f7-block>

  </div>

    <f7-popup class="popup-confirmar" :opened="popupOpened" @popup:closed="popupOpened = false" style="height: auto !important;margin-top: 50%;">

        <f7-block>
          <center>
            <i class="far fa-check-circle" style="font-size: 4rem;color: #19ba88;"></i>
          </center>
        </f7-block>

        <f7-block>
          <center style="font-size: 1.2rem;">
            Cita creada
          </center>
        </f7-block>
    </f7-popup>

    <toolbar></toolbar>

  </f7-page>
</template>

<script>
  import { f7Page, f7Navbar, f7BlockTitle, f7Block } from 'framework7-vue';
  import topmenu from "./menu-bar";
  import toolbar from "./toolbar";
  import Dom7 from 'dom7/dist/dom7.js';
  const $$ = Dom7;
  export default {
    components: {
      f7Page,
      f7Navbar,
      f7BlockTitle,
      f7Block,
      topmenu,
      toolbar
    },
    data(){
      return{
        fotoPerfil:'https://www.mundodeportivo.com/r/GODO/MD/p5/MasQueDeporte/Imagenes/2018/10/24/Recortada/img_femartinez_20181010-125104_imagenes_md_otras_fuentes_captura-kcOG-U452531892714hYG-980x554@MundoDeportivo-Web.JPG',
        eventos: '0',
        popupOpened:false,
        listEvents: [],
        itemDetalle:{}, 
        fechaSeleccionada:new Date(),
        servicioAReservar:this.$store.state.servicioAReservar,
        horario:[],
        diaSem:['Su','Mo','Tu','We','Th','Fr','Sa'],
        iconosPago:['far fa-money-bill-alt','far fa-credit-card'],
        cat_auto:false,
        cat_otra:false,
        fechaHoy:new Date(),
        horaActual:0,
        minutoActual:0,
        tiempoActual:0
      };
    },
    mounted(){
      const self = this;
      const app = self.$f7;
      var forEach = Array.prototype.forEach;

      self.fechaHoy = new Date();
      self.horaActual = new Date().getHours();
      self.minutoActual = new Date().getMinutes()/60;
      self.fechaHoy.setHours(0,0,0);
      self.fechaSeleccionada.setHours(0,0,0);
      self.tiempoActual = self.horaActual+self.minutoActual;

      console.log(self.fechaHoy);
      console.log(self.horaActual);
      console.log(self.minutoActual);
      
      self.ajustarHorarioXDia();
      console.log(self.servicioAReservar);
      self.verDisponibilidad(self.fechaSeleccionada,self.servicioAReservar._id,self.fechaSeleccionada.getDay());


      forEach.call(self.servicioAReservar.categories, function(categories){
        if(categories.nombre === 'Servicio de mantenimiento automotriz'){
          self.cat_auto = true;
        } 
        if(categories.nombre === 'Nissan Guadalajara'){
          self.cat_otra = true;
        } 
      });

      

      var anios = ['2018','2019','2020','2021','2022'];
      var monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto' , 'Septiembre' , 'Octubre', 'Noviembre', 'Deciembre'];
      var dayNames=["Do", "Lu", "Ma", "Mi","Ju","Vi","Sa"];
      var calendarInline = app.calendar.create({
        containerEl: '#demo-calendar-inline-container',
        value: [new Date()],
        disabled: {
          from: new Date().setFullYear(2018),
          to: new Date().setDate(new Date().getDate()-1)
        },
        weekHeader: false,
        dateFormat:'d MM yyyy',
        firstDay:1,
        dayNames:dayNames,
        monthNames:monthNames,
        renderToolbar: function () {
          return '<div class="toolbar calendar-custom-toolbar no-shadow">' +
            '<div class="toolbar-inner">' +
              '<div class="left">' +
                '<a href="#" class="link icon-only"><i id="calendario-left" class="fas fa-caret-left"></i>' +
              '</div>' +
              '<div class="center"></div>' +
              '<div class="right">' +
                '<a href="#" class="link icon-only"><i id="calendario-right" class="fas fa-caret-right"></i></a>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="calendar-week-header">' +
            '<div class="calendar-week-day">Lu</div>'+
            '<div class="calendar-week-day">Ma</div>'+
            '<div class="calendar-week-day">Mi</div>'+
            '<div class="calendar-week-day">Ju</div>'+
            '<div class="calendar-week-day">Vi</div>'+
            '<div class="calendar-week-day">Sa</div>'+
            '<div class="calendar-week-day">Do</div>'+
          '</div>';
        },
        on: {
          init: function (c) {
            $$('.calendar-custom-toolbar .center').text(monthNames[c.currentMonth] +' ' + c.currentYear);
            $$('.calendar-custom-toolbar .left .link').on('click', function () {
              if(c.currentMonth <= new Date().getMonth()){
                
              }else{
                calendarInline.prevMonth();
              }
            });
            $$('.calendar-custom-toolbar .right .link').on('click', function () {
              calendarInline.nextMonth();
            });
          },
          monthYearChangeStart: function (c) {
            $$('.calendar-custom-toolbar .center').text(monthNames[c.currentMonth] +' ' + c.currentYear);
          },
          dayClick: function(calendar, dayEl, year, month, day){
            console.log(calendar);
            var diaSemana = new Date(year,month,day).getDay();
            console.log(dayNames[diaSemana]);
            if($$(dayEl).hasClass('calendar-day-has-events')){
              self.eventos='1' //tiene eventos
            }else{
              self.eventos='0' //no tiene eventos
            }
            self.fechaSeleccionada = new Date(year,month,day);
            console.log(self.fechaSeleccionada);
            console.log(self.fechaHoy);
            console.log(year);
            console.log(month);
            self.verDisponibilidad(self.fechaSeleccionada,self.servicioAReservar._id,self.fechaSeleccionada.getDay());
            self.habilitarBotones(dayNames[diaSemana]);
          }
        }
      });
      var diaSemanaInicial = new Date().getDay();
      self.habilitarBotones(dayNames[diaSemanaInicial]);
      $$('.calendar-day-events').parent().addClass('text-rosa');
    },
    methods: {
      getDateFormatt(date){
        var dd = date.getDate();

        var mm = date.getMonth()+1; 
        var yyyy = date.getFullYear();

        if(dd<10) 
        {
            dd='0'+dd;
        } 

        if(mm<10) 
        {
            mm='0'+mm;
        }

        return yyyy+'-'+mm+'-'+dd;
      },
      sendRequest(jsonUnir){
        const self = this;
        const app = self.$f7;

        var tipoPago = app.form.convertToData('#pago');
        /*if(tipoPago.pago === '1'){
          app.views.main.router.navigate('/pago_targeta/');
        }*/
        console.log(tipoPago);
        if(self.horario.length > 0){
          console.log('guardar');
          console.log(self.servicioAReservar);
          var horario = app.form.convertToData('#horario');
          if (horario.hora !== undefined) {
            var horarioSelected = JSON.parse(horario.hora);
            console.log(horarioSelected);
            var url = localStorage.getItem("url_server");
            var uid = localStorage.getItem("uid");
            var fechaInicio = new Date(self.fechaSeleccionada.setHours(parseInt(horarioSelected.horas),parseInt(horarioSelected.mins),0));
            var fechaFin = new Date(self.fechaSeleccionada.setHours(parseInt(horarioSelected.horas),(parseInt(horarioSelected.mins)+self.servicioAReservar.duration),0));
            let jsonData = {
              client:uid,
              service:self.servicioAReservar._id,
              provider:self.servicioAReservar.provider,
              from_date:fechaInicio+'',
              due_date:fechaFin+'',
              hour:horarioSelected.horas,
              minutes:horarioSelected.mins
            }

            let obj_unidos = Object.assign(jsonData, jsonUnir);
            
            
            app.request.postJSON(url+'appointment', 
              obj_unidos, 
              function result(data) {
                console.log(data);
                self.textExito='Cambios guardados';
                app.popup.open('.popup-confirmar',true);
                setTimeout(() => {
                  app.popup.close();
                }, 3000);
                setTimeout(() => {
                  app.views.main.router.back();
                }, 4000);
                
              },
              function error(xhr, status) {
                var response = JSON.parse(xhr.response);
                console.log(response);
                if(response.message === 'space.full'){
                  app.dialog.alert('El servicio no cuenta con disponibilidad de horario. Te recomendamos seleccionar otro horario o día.','Error');
                }else{
                  app.dialog.alert(response.message,'Error');  
                }
                
              });




  /*          firebase.database().ref().child('/citas').push(jsonData).then(function(data) {
                if(data === null || data === undefined){
                  console.log('error cita');
                }else{
                  firebase.database().ref().child('/notifications').push(jsonNot).then(function(data2) {
                      if(data2 === null || data2 === undefined){
                        console.log('error not');
                      }else{
                        app.popup.open('.popup-confirmar',true);
                        setTimeout(() => {
                          app.popup.close();
                        }, 3000);
                        setTimeout(() => {
                          app.views.main.router.back();
                        }, 4000);
                        
                      }
                  });
                }
            });*/

            console.log(obj_unidos);
          }else{
            app.dialog.alert('Favor de seleccionar un horario','Error');
          }
        }else{
          app.dialog.alert('El dia seleccionado no tiene disponibilidad','Error');
        }
      }, 
      reservar(){
        const self = this;
        const app = self.$f7;

        if(self.cat_auto && self.cat_otra){
          var form_car = app.form.convertToData('#form_auto');
          var form_otra = app.form.convertToData('#form_otra');
          let form_unidos = Object.assign(form_car, form_otra);

          console.log(form_unidos);
          if(form_unidos.clientNumber === '' || form_unidos.mileage === '' || form_unidos.model === '' || form_unidos.plate === '' || form_unidos.reason === '' || form_unidos.series === '' || form_unidos.year === '' || form_unidos.calle === '' || form_unidos.colonia === '' || form_unidos.municipio === '' || form_unidos.clientNumber === ''){
            app.dialog.alert('Para continuar complete la información solicitada','Error');
          }else{
            self.sendRequest(form_car);
          }
          //self.sendRequest(form_car);
          //let obj_unidos = Object.assign(obj_1, obj_2);
        }else{
          if(self.cat_auto){
            var form_car = app.form.convertToData('#form_auto');
            console.log(form_car);
            if(form_car.clientNumber === '' || form_car.mileage === '' || form_car.model === '' || form_car.plate === '' || form_car.reason === '' || form_car.series === '' || form_car.year === ''){
              app.dialog.alert('Para continuar complete la información solicitada','Error');
            }else{
              self.sendRequest(form_car);
            }
          }else{
            if(self.cat_otra){
              var form_otra = app.form.convertToData('#form_otra');
              console.log(form_otra);
              if(form_otra.calle === '' || form_otra.colonia === '' || form_otra.municipio === '' || form_otra.clientNumber === ''){
                app.dialog.alert('Para continuar complete la información solicitada','Error');
              }else{
                self.sendRequest(form_otra);
              }
            }else{
              self.sendRequest({});
            }
          }
        }
      },
      ajustarHorarioXDia(){
        const self = this;
        const app = self.$f7;
        var forEach = Array.prototype.forEach;
        self.servicioAReservar.Lunes = [];
        self.servicioAReservar.Martes = [];
        self.servicioAReservar.Miercoles = [];
        self.servicioAReservar.Jueves = [];
        self.servicioAReservar.Viernes = [];
        self.servicioAReservar.Sabado = [];
        self.servicioAReservar.Domingo = [];

        forEach.call(self.servicioAReservar.available, function(dispo){
          console.log(dispo);
          var i;
          for (i = dispo.start; i <= dispo.end; i++) {
            var x;
            var minutos = 0;
            var diviciones = 60/(self.servicioAReservar.duration);
            if(i===dispo.end){
              
            }else{
              for (x = 0; x <= (diviciones-1); x++) {
                console.log('el ajuste es   '+i+':'+minutos);
                forEach.call(dispo.days, function(day){
                  var minsPrecent= minutos/60
                  var tempo = i+minsPrecent;
                  console.log('asignar horario');
                  if(day === 'Mo'){
                    self.servicioAReservar.Lunes.push({horas:i,mins:minutos,tiempo:tempo});
                  }
                  if(day === 'Tu'){
                    self.servicioAReservar.Martes.push({horas:i,mins:minutos,tiempo:tempo});
                  }
                  if(day === 'We'){
                    self.servicioAReservar.Miercoles.push({horas:i,mins:minutos,tiempo:tempo});
                  }
                  if(day === 'Th'){
                    self.servicioAReservar.Jueves.push({horas:i,mins:minutos,tiempo:tempo});
                  }
                  if(day === 'Fr'){
                    self.servicioAReservar.Viernes.push({horas:i,mins:minutos,tiempo:tempo});
                  }
                  if(day === 'Sa'){
                    self.servicioAReservar.Sabado.push({horas:i,mins:minutos,tiempo:tempo});
                  }
                  if(day === 'Su'){
                    self.servicioAReservar.Domingo.push({horas:i,mins:minutos,tiempo:tempo});
                  }
                });
                minutos+= self.servicioAReservar.duration;
              }
            }
          }
          
        });
        console.log(self.servicioAReservar);
      },
      verDetalles(item){
        const self = this;
        const app = self.$f7;
        self.itemDetalle = item;
      },
      habilitarBotones(opcion){
        const self = this;
        const app = self.$f7;
        var forEach = Array.prototype.forEach;

        //self.disbleButon();
        self.horario=[];
        console.log(opcion)
        switch (opcion) {
          case 'Lu':
            if(self.servicioAReservar.Lunes ){
              self.horario=self.servicioAReservar.Lunes;
            }
            break;
          case 'Ma':
            if (self.servicioAReservar.Martes) {
              self.horario=self.servicioAReservar.Martes;
            }
            break;
          case 'Mi':
            if (self.servicioAReservar.Miercoles) {
              self.horario=self.servicioAReservar.Miercoles;
            }
            break;
          case 'Ju':
            if (self.servicioAReservar.Jueves) {  
              self.horario=self.servicioAReservar.Jueves;
            }
            break;
          case 'Vi':
            if (self.servicioAReservar.Viernes) {
              self.horario=self.servicioAReservar.Viernes;
            }
            break;
          case 'Sa':
            if (self.servicioAReservar.Sabado) {
              self.horario=self.servicioAReservar.Sabado;
            }
            break;
          case 'Do':
            if (self.servicioAReservar.Domingo) {
              self.horario=self.servicioAReservar.Domingo;
            }
            break;
        }

        console.log('horario select');
        console.log(self.horario);

        /*
        forEach.call(self.horario, function(number){
          console.log('#button'+number);
          $$('#button'+number).removeAttr("disabled");
          $$('#label'+number).css("opacity", "1");
        });
        if(self.horario.length > 0){
          $$("#label"+self.horario[0]).click();
        }*/
      },
      disbleButon(){
        for (var i = 0; i < 24; i++) {
          $$('#button'+i).attr("disabled", true);
          $$('#label'+i).css("opacity", "0.5");
        }
      },
      back(){
        const self = this;
        const app = self.$f7;
        app.popup.close();
      },
      verDisponibilidad(fecha,servicio_id,dia){
        const self = this;
        const app = self.$f7;
        var url = localStorage.getItem("url_server");
        var forEach = Array.prototype.forEach;

        app.request.postJSON(url+'events3', 
        {
          idService:servicio_id,
          day:self.diaSem[dia],
          dt:fecha
        }, 
        function result(data) {
          console.log(data);
          if(data.data.length !== 0){
            self.horario = [];
            forEach.call(data.data, function(time){
              var tiempo = String(time);
              var arr = tiempo.split(".");  // declaro el array  
              var hours= arr[0];
              var minutes = 0;
              if(arr[1] !== undefined){
                minutes = String(arr[1]*60).substr(0,2);
              }
              let result = {
                horas:parseInt(hours),
                mins:parseInt(minutes),
                tiempo:time
              };
              self.horario.push(result);
            });
          }
        },
        function error(xhr, status) {
          var response = JSON.parse(xhr.response);
          console.log(response);
          if(response.message === 'space.full'){
            app.dialog.alert('El servicio no cuenta con disponibilidad de horario. Te recomendamos seleccionar otro horario o día.','Error');
          }else{
            app.dialog.alert(response.message,'Error');  
          }
        });
        
      },
      actAndDisa(boton){
      var hijo= $$(boton).children('i')[0];
      var padre= $$(boton).parent();
      console.log(boton);

      if($$(boton).is( "i" )){
        if($$(boton).hasClass('boton-active')){
          $$(boton).removeClass('boton-active');
          $$(padre).removeClass('boton-active');
        }else{
          $$(boton).addClass('boton-active');
          $$(padre).addClass('boton-active');
        }
      }else{
        if($$(boton).hasClass('boton-active')){
          $$(boton).removeClass('boton-active');
          $$(hijo).removeClass('boton-active');
        }else{
          $$(boton).addClass('boton-active');
          $$(hijo).addClass('boton-active');
        }
      }
    },
    },
  };
</script>