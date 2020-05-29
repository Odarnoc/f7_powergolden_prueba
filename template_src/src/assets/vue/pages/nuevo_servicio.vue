<template>
  <f7-page>
    <f7-navbar>
      <topmenu title="Nuevo Servicio"></topmenu>
    </f7-navbar>

    <input type="file" name="imgbtn" id="imgbtn" hidden accept="image/*" @change="putImg()">

    <div class="container">
      <a @click="seleccionarImagen()" >
        <img id="previewimg" :src="imagen" class="editar-fotografia">
        <h4 class="centered">Cambiar Fotografia</h4>
      </a>
    </div>

    <f7-block>
      <font color=gray>Elige la Categoria de tu Servicio</font>
      <br>
      <br>
      <div id="categorias">
      </div>
      <br>
      <br>
      <f7-swiper :params="{slidesPerView: 3,spaceBetween: 3}" >
       <f7-swiper-slide v-for="(item, index) in iconosCat">
        <f7-button for="categoria1" @click="actAndDisa($event.target);categorias(index);" type="button" class="categoria-seleccion">
          <i :class="item.icono"></i>
        </f7-button>
      </f7-swiper-slide>
      </f7-swiper>
      <br>
    </f7-block>
    <form id="mas-datos">
      <f7-block>
        <font color=gray>Información</font>
        <input style="background-color: transparent;" type="text" name="servicio" placeholder="Nombre del servicio">
        <input style="background-color: transparent;" type="text" name="prestador" placeholder="Nombre del prestador del servicio">
      </f7-block>

      <f7-block>
         <font color=gray>El Servicio es a Domicilio?</font><br><br>
         <f7-toggle color="green" name="servicioDomicilio" value="1"></f7-toggle>
         <br>
         <br>
      </f7-block>

      <f7-block>
        <font color=gray>Direccion</font>
        <input style="background-color: transparent;" type="text" name="direccion" placeholder="Dirrección del establecimiento">
      </f7-block>

      <f7-block>
          <font color=gray>Cupo Limitado por Cita</font><br><br>
        <f7-row>
          <f7-col width="33">
            <input type="radio" name="cupo" id="public1" value="1" class="visible" checked>
            <label for="public1">1</label>
          </f7-col>
          <f7-col width="33">
            <input type="radio" name="cupo" id="public2" value="2" class="visible">
            <label for="public2">2</label>
          </f7-col>
          <f7-col width="33">
            <input type="radio" name="cupo" id="public4" value="4" class="visible">
            <label for="public4">4</label>
          </f7-col>
        </f7-row>

        <br>

        <f7-row>
          <f7-col width="33">
            <input type="radio" name="cupo" id="public8" value="8" class="visible">
            <label for="public8">8</label>
          </f7-col>
          <f7-col width="33">
            <input type="radio" name="cupo" id="public10" value="10" class="visible">
            <label for="public10">10</label>
          </f7-col>
          <f7-col width="33">
            <input type="radio" name="cupo" id="public25" value="25" class="visible">
            <label for="public25">25</label>
          </f7-col>
        </f7-row>

        <br>

        <f7-row>
          <f7-col width="33">
            <input type="radio" name="cupo" id="public50" value="50" class="visible">
            <label for="public50">50</label>
          </f7-col>
          <f7-col width="33">
            <input type="radio" name="cupo" id="public100" value="100" class="visible">
            <label for="public100">100</label>
          </f7-col>
          <f7-col width="33">
            <input type="radio" name="cupo" id="public100+" value="100+" class="visible">
            <label for="public100+">100+</label>
          </f7-col>
        </f7-row>
      </f7-block>

      <f7-block>
        <font color=gray>Horario de Atencion</font>
        <br>
        <br>
        <f7-segmented raised tag="p">
          <f7-button tab-link="#tab-lu" tab-link-active>lu</f7-button>
          <f7-button tab-link="#tab-ma">ma</f7-button>
          <f7-button tab-link="#tab-mi">mi</f7-button>
          <f7-button tab-link="#tab-ju">ju</f7-button>
          <f7-button tab-link="#tab-vi">vi</f7-button>
          <f7-button tab-link="#tab-sa">sa</f7-button>
          <f7-button tab-link="#tab-do">do</f7-button>
        </f7-segmented>
        <br>
        <f7-tabs animated>

          <f7-tab id="tab-lu" tab-active>
            <f7-row>
              <f7-col width="33" v-for="(n, index) in 24" style="margin-bottom: 1rem;">
                <f7-button @click="actAndDisa($event.target);setHorario(index,'lu');" type="button" class="horario-horas-btn">
                  {{("0" + index).slice(-2)}}:00
                </f7-button>
              </f7-col>
            </f7-row>
          </f7-tab>

          <f7-tab id="tab-ma" >
            <f7-row>
              <f7-col width="33" v-for="(n, index) in 24" style="margin-bottom: 1rem;">
                <f7-button @click="actAndDisa($event.target);setHorario(index,'ma');" type="button" class="horario-horas-btn">
                  {{("0" + index).slice(-2)}}:00
                </f7-button>
              </f7-col>
            </f7-row>
          </f7-tab>

          <f7-tab id="tab-mi" >
            <f7-row>
              <f7-col width="33" v-for="(n, index) in 24" style="margin-bottom: 1rem;">
                <f7-button @click="actAndDisa($event.target);setHorario(index,'mi');" type="button" class="horario-horas-btn">
                  {{("0" + index).slice(-2)}}:00
                </f7-button>
              </f7-col>
            </f7-row>
          </f7-tab>

          <f7-tab id="tab-ju" >
            <f7-row>
              <f7-col width="33" v-for="(n, index) in 24" style="margin-bottom: 1rem;">
                <f7-button @click="actAndDisa($event.target);setHorario(index,'ju');" type="button" class="horario-horas-btn">
                  {{("0" + index).slice(-2)}}:00
                </f7-button>
              </f7-col>
            </f7-row>
          </f7-tab>

          <f7-tab id="tab-vi" >
            <f7-row>
              <f7-col width="33" v-for="(n, index) in 24" style="margin-bottom: 1rem;">
                <f7-button @click="actAndDisa($event.target);setHorario(index,'vi');" type="button" class="horario-horas-btn">
                  {{("0" + index).slice(-2)}}:00
                </f7-button>
              </f7-col>
            </f7-row>
          </f7-tab>

          <f7-tab id="tab-sa" >
            <f7-row>
              <f7-col width="33" v-for="(n, index) in 24" style="margin-bottom: 1rem;">
                <f7-button @click="actAndDisa($event.target);setHorario(index,'sa');" type="button" class="horario-horas-btn">
                  {{("0" + index).slice(-2)}}:00
                </f7-button>
              </f7-col>
            </f7-row>
          </f7-tab>

          <f7-tab id="tab-do" >
            <f7-row>
              <f7-col width="33" v-for="(n, index) in 24" style="margin-bottom: 1rem;">
                <f7-button @click="actAndDisa($event.target);setHorario(index,'do');" type="button" class="horario-horas-btn">
                  {{("0" + (index)).slice(-2)}}:00
                </f7-button>
              </f7-col>
            </f7-row>
          </f7-tab>

        </f7-tabs>
        
      </f7-block>

      <f7-block>
        <font color=gray>Costo del Servicio</font> 
          <f7-segmented>
          <input style="margin-top: 16px;background-color: transparent;height: 2.6rem;width: 70%;border-right: none;border-radius: 4px 0px 0px 4px;" type="number" name="costo" placeholder="Cantidad">
          <select style="margin-top: 16px;background-color: transparent;height: 2.6rem;width: 30%;border-left: none;border-radius: 0px 4px 4px 0px;" name="moneda" form="carform">
            <option value="MXN">MXN</option>
            <option value="DLS">DLS</option>
          </select>
          </f7-segmented>
      </f7-block>
    </form>

    <f7-block>
      <font color=gray>Tipo de Pago</font>
      <br>
      <br>
      <f7-row>
      <f7-col width="30">
        <f7-button @click="actAndDisa($event.target);selTipoPago('0');" type="button" class="tipo-pago-btn"><i class="far fa-money-bill-alt"></i><br>Efectivo</f7-button>
      </f7-col>
      <f7-col width="30">
        <f7-button @click="actAndDisa($event.target);selTipoPago('1');" type="button" class="tipo-pago-btn"><i style="" class="far fa-credit-card"></i><br>Tarjeta</f7-button>
      </f7-col>
      <f7-col width="30">
      </f7-col>
      </f7-row>
    </f7-block>
  
    <f7-button type="submit" class="guardar-cambios-btn" @click="guardarServicio()">Crear Servicio</f7-button>
 
    <f7-popup class="popup-confirmar" :opened="popupOpened" @popup:closed="popupOpened = false" style="height: auto !important;margin-top: 50%;">
        <f7-block>
          <center>
            <i class="far fa-check-circle" style="font-size: 4rem;color: #19ba88;"></i>
          </center>
        </f7-block>

        <f7-block>
          <center style="font-size: 1.2rem;">
            Servicio Creado
          </center>
        </f7-block>
    </f7-popup>

    <toolbar></toolbar>
  </f7-page>
</template>
<script> 
  import topmenu from "./menu-bar";
  import toolbar from "./toolbar";
  import Framework7 from 'framework7';
  import Dom7 from 'dom7/dist/dom7.js';
  var $$ = Dom7;
  export default {
    components: {
      topmenu,
      toolbar,
  },
  data() {
      return {
        imagen:'https://www.mundodeportivo.com/r/GODO/MD/p5/MasQueDeporte/Imagenes/2018/10/24/Recortada/img_femartinez_20181010-125104_imagenes_md_otras_fuentes_captura-kcOG-U452531892714hYG-980x554@MundoDeportivo-Web.JPG',
        popupOpened:false,
        listaCategorias:[],
        lunes:[],
        martes:[],
        miercoles:[],
        jueves:[],
        viernes:[],
        sabado:[],
        domingo:[],
        listaPago:[],
        error: '',
        ext:'',
        file:'',
        iconosCat:[{icono:'concita-arquitectura',nombre:'Arquitectura'},{icono:'concita-arte',nombre:'Arte'},{icono:'concita-cine',nombre:'Cine'},{icono:'concita-deportes',nombre:'Deportes'},{icono:'concita-diseño',nombre:'Diseño'},{icono:'concita-juridico',nombre:'Jurídico'},{icono:'concita-mecanica',nombre:'Mecánica'},{icono:'concita-medicina',nombre:'Medicina'},{icono:'concita-tecnología',nombre:'Tecnología'},{icono:'concita-video',nombre:'Video'},],
      };
    },
   methods:{
    setHorario(value,dia){
      const self = this;
      const app = self.$f7;
      var forEach = Array.prototype.forEach;
      var eliminar=-1;
      switch (dia) {
        case 'lu':
          if(self.lunes.length === 0){
            self.lunes.push(value);
          }else{
            forEach.call(self.lunes, function(cat, indice){
              if (cat === value) {
                eliminar=indice;
              }
            });
            if(eliminar>=0){
              self.lunes.splice(eliminar, 1);
            }else{
              self.lunes.push(value);
            }
          }
          break;
        case 'ma':
          if(self.martes.length === 0){
            self.martes.push(value);
          }else{
            forEach.call(self.martes, function(cat, indice){
              if (cat === value) {
                eliminar=indice;
              }
            });
            if(eliminar>=0){
              self.martes.splice(eliminar, 1);
            }else{
              self.martes.push(value);
            }
          }
          break;
          case 'mi':
          if(self.miercoles.length === 0){
            self.miercoles.push(value);
          }else{
            forEach.call(self.miercoles, function(cat, indice){
              if (cat === value) {
                eliminar=indice;
              }
            });
            if(eliminar>=0){
              self.miercoles.splice(eliminar, 1);
            }else{
              self.miercoles.push(value);
            }
          }
          break;
          case 'ju':
          if(self.jueves.length === 0){
            self.jueves.push(value);
          }else{
            forEach.call(self.jueves, function(cat, indice){
              if (cat === value) {
                eliminar=indice;
              }
            });
            if(eliminar>=0){
              self.jueves.splice(eliminar, 1);
            }else{
              self.jueves.push(value);
            }
          }
          break;
          case 'vi':
          if(self.viernes.length === 0){
            self.viernes.push(value);
          }else{
            forEach.call(self.viernes, function(cat, indice){
              if (cat === value) {
                eliminar=indice;
              }
            });
            if(eliminar>=0){
              self.viernes.splice(eliminar, 1);
            }else{
              self.viernes.push(value);
            }
          }
          break;
          case 'sa':
          if(self.sabado.length === 0){
            self.sabado.push(value);
          }else{
            forEach.call(self.sabado, function(cat, indice){
              if (cat === value) {
                eliminar=indice;
              }
            });
            if(eliminar>=0){
              self.sabado.splice(eliminar, 1);
            }else{
              self.sabado.push(value);
            }
          }
          break;
          case 'do':
          if(self.domingo.length === 0){
            self.domingo.push(value);
          }else{
            forEach.call(self.domingo, function(cat, indice){
              if (cat === value) {
                eliminar=indice;
              }
            });
            if(eliminar>=0){
              self.domingo.splice(eliminar, 1);
            }else{
              self.domingo.push(value);
            }
          }
          break;
        default:
          console.log('Lo lamentamos, por el momento no disponemos de ' + expr + '.');
      }
      
    },
    selTipoPago(value){
      const self = this;
      const app = self.$f7;
      var forEach = Array.prototype.forEach;
      var eliminar=-1;
      if(self.listaPago.length === 0){
        self.listaPago.push(value);
      }else{
        forEach.call(self.listaPago, function(cat, indice){
          if (cat === value) {
            eliminar=indice;
          }
        });
        if(eliminar>=0){
          self.listaPago.splice(eliminar, 1);
        }else{
          self.listaPago.push(value);
        }
      }
    },
    categorias(value){
      const self = this;
      const app = self.$f7;
      var forEach = Array.prototype.forEach;
      var eliminar=-1;
      if(self.listaCategorias.length === 0){
        self.listaCategorias.push(value);
      }else{
        forEach.call(self.listaCategorias, function(cat, indice){
          if (cat === value) {
            eliminar=indice;
          }
        });
        if(eliminar>=0){
          self.listaCategorias.splice(eliminar, 1);
        }else{
          self.listaCategorias.push(value);
        }
      }
      self.mostrarCategorias();
    },
    mostrarCategorias(){
      const self = this;
      const app = self.$f7;
      var forEach = Array.prototype.forEach;
      var html='';
      $$("#categorias").empty();
      forEach.call(self.listaCategorias, function(cat){
        html+='<i class="'+self.iconosCat[cat].icono+'" style="font-size: 2rem;padding-left: .5rem;"></i>'
      });
      $$("#categorias").append(html);
    },
    actAndDisa(boton){
      var hijo= $$(boton).children('i')[0];
      var padre= $$(boton).parent();
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
    guardarServicio() {
     const self = this;
     const app = self.$f7;
     var formData = app.form.convertToData('#mas-datos');
     formData.categorias = self.listaCategorias.sort();
     formData.tipoPago = self.listaPago.sort();
     formData.lunes = self.lunes.sort();
     formData.martes = self.martes.sort();
     formData.miercoles = self.miercoles.sort();
     formData.jueves = self.jueves.sort();
     formData.viernes = self.viernes.sort();
     formData.sabado = self.sabado.sort();
     formData.domingo = self.domingo.sort();
     formData.user_id = localStorage.getItem("uid");
     formData.status = 1;
     if(self.validarServicio(formData)){      
     self.$f7.preloader.show();
     firebase.database().ref().child('/servicios').push(formData).then(function(data) {
            console.log(data.key);
            firebase.storage().ref().child('ImagenServicios/'+data.key+'.'+self.ext).put(self.file).then(function(snapshot) {
              formData.image = data.key+'.'+self.ext;
              firebase.database().ref().child('/servicios/'+data.key).update(formData).then(function(data) {
                self.$f7.preloader.hide();
                app.popup.open('.popup-confirmar',true);
                setTimeout(() => {
                  app.popup.close();
                }, 3000);
                setTimeout(() => {
                  app.views.main.router.back();
                }, 4000);
              });
            });
      });
     }else{
        app.dialog.alert(self.error,'Error');
    }
     
    },
    
    validarServicio(form){
        const self = this;
        const app = self.$f7;
        self.error = '';
        if(!form.servicio){
          self.error = 'El nombre del servicio es requerido';
          return false;
        }
        if(!form.prestador){
          self.error = 'El nombre del prestador del servicio es requerido';
          return false;
        }
        if(!form.direccion){
          self.error = 'La direccion del establecimiento es requerida';
          return false;
        }
        
        return true;
      },
    seleccionarImagen(){
     const self = this;
     const app = self.$f7;
     $$("#imgbtn").click();
     var img = $$("#imgbtn").val();
     this.imagen = img;
     //console.log("seleccionando imagen");
    },
    readURL(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();
            
        reader.onload = function (e) {
          $$('#previewimg').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
      }
    },
    getExtension(filename){
      var parts = filename.split('.');
      return parts[parts.length-1].toLowerCase();
    },
    putImg(){
      const self = this;
      const app = self.$f7;
      var imgfile = document.getElementById("imgbtn");
      self.readURL(imgfile);
      self.file = document.getElementById("imgbtn").files[0];
      self.ext = self.getExtension(self.file.name);
      
    },
    obtenerUrlImagen(nombreImagen){
      firebase.storage().ref().child('ImagenServicios/'+nombreImagen).getDownloadURL().then(function(url) {
        console.log(url)
      }).catch(function(error) {
        console.log(error);
      });
    },
   },
  };
</script>