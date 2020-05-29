<template>
  <f7-page>
    <f7-navbar>
      <topmenu title="Mis Servicios"></topmenu>
    </f7-navbar>
    
    <f7-block>
      <f7-button href="/nuevoservicio/" class="col button button-outline color-gray" style="text-transform: none;">Crear nuevo servicio</f7-button><br>
      <center><font color=gray>Total en mi listado: {{contSer}}</font></center>
      
    </f7-block>
    <div v-for="item in data">
      <img src="../../images/example.jpg" style="width: 100%;">
      
      <f7-block>
        <f7-block>
          <f7-block>
            <font color=gray >Categoria</font>
            <br>
              <i v-for="cat in item.categorias" :class="iconosCat[cat].icono" style="font-size: 2rem;padding-right: 1rem;"></i>
            <br>
            <br>
            <font color=gray>Servicio</font>
            <br>
            <font color=black size=3>{{item.servicio}}</font>
          </f7-block>
          <f7-block>
            <font color=gray>Prestador del Servicio</font>
            <br>
            <font color=black size=3>{{item.prestador}}</font>
          </f7-block>
          <f7-block>
            <font color=gray>Disponibilidad</font>
            <br>
            <f7-row v-if="item.lu != undefined || item.lu != null">
              <f7-col width="33">
                <font color=black size=3>Lunes</font>
              </f7-col>
              <f7-col width="66">
                <font color=black size=3>{{item.lu}}</font>
              </f7-col>
            </f7-row>

            <f7-row v-if="item.ma != undefined || item.ma != null">
              <f7-col width="33">
                <font color=black size=3>Martes</font>
              </f7-col>
              <f7-col width="66">
                <font color=black size=3>{{item.ma}}</font>
              </f7-col>
            </f7-row>

            <f7-row v-if="item.mi != undefined || item.mi != null">
              <f7-col width="33">
                <font color=black size=3>Miercoles</font>
              </f7-col>
              <f7-col width="66">
                <font color=black size=3>{{item.mi}}</font>
              </f7-col>
            </f7-row>

            <f7-row v-if="item.ju != undefined || item.ju != null">
              <f7-col width="33">
                <font color=black size=3>Jueves</font>
              </f7-col>
              <f7-col width="66">
                <font color=black size=3>{{item.ju}}</font>
              </f7-col>
            </f7-row>

            <f7-row v-if="item.vi != undefined || item.vi != null">
              <f7-col width="33">
                <font color=black size=3>Viernes</font>
              </f7-col>
              <f7-col width="66">
                <font color=black size=3>{{item.vi}}</font>
              </f7-col>
            </f7-row>

            <f7-row v-if="item.sa != undefined || item.sa != null">
              <f7-col width="33">
                <font color=black size=3>Sabado</font>
              </f7-col>
              <f7-col width="66">
                <font color=black size=3>{{item.sa}}</font>
              </f7-col>
            </f7-row>

            <f7-row v-if="item.dom != undefined || item.dom != null">
              <f7-col width="33">
                <font color=black size=3>Domingo</font>
              </f7-col>
              <f7-col width="66">
                <font color=black size=3>{{item.dom}}</font>
              </f7-col>
            </f7-row>
            
          </f7-block>
          <f7-block>
            <f7-row>
              <f7-col>
                <font color=gray>Costo</font>
                <br>
                <font color=black size=3>${{item.costo}}</font>
              </f7-col>
              <f7-col>
                <font color=gray>Tipo de Pago</font>
                <br>
                <font color=black size=3>
                  <i v-for="pago in item.tipoPago" :class="iconosPago[pago]" style="font-size: 1.5rem;padding-right: 1rem;"></i>
                </font>
              </f7-col>
            </f7-row>
            <br>
            <f7-button large raised @click="detalles(item)" class="col button button-outline color-gray">Detalles</f7-button>
        
          </f7-block>
          <hr>
        </f7-block>
      </f7-block>
    </div>

   <toolbar></toolbar>
  </f7-page>
</template>
<script>
  import { f7Page, f7Navbar, f7BlockTitle, f7Block } from 'framework7-vue';
  import toolbar from "./toolbar";
  import topmenu from "./menu-bar";
  export default {
    components: {
      toolbar,
      f7Page,
      f7Navbar,
      f7BlockTitle,
      f7Block,
      topmenu,
    },
    data() {
      return {
        data: [],
        contSer:0,
        iconosCat:[{icono:'concita-arquitectura',nombre:'Arquitectura'},{icono:'concita-arte',nombre:'Arte'},{icono:'concita-cine',nombre:'Cine'},{icono:'concita-deportes',nombre:'Deportes'},{icono:'concita-diseño',nombre:'Diseño'},{icono:'concita-juridico',nombre:'Jurídico'},{icono:'concita-mecanica',nombre:'Mecánica'},{icono:'concita-medicina',nombre:'Medicina'},{icono:'concita-tecnología',nombre:'Tecnología'},{icono:'concita-video',nombre:'Video'},],
        iconosPago:['far fa-money-bill-alt','far fa-credit-card'],
      };
    },
    created() {
      const self = this;
      const app = self.$f7;
      var lunes='';
      var martes='';
      var miercoles='';
      var jueves='';
      var viernes='';
      var sabado='';
      var domingo='';
      var texto='';
      firebase.database().ref('/servicios/').on('value',function(snapshot){
        self.data= [];
          snapshot.forEach(function(childSnapshot){
            var dato=childSnapshot.val();
            if(dato.user_id === localStorage.getItem("uid") && dato.status === 1){
              dato.service_id = childSnapshot.key;
              if(dato.lunes != null || dato.lunes != undefined){
                lunes = self.ajustarHorario(dato.lunes.sort(function(a, b){return a - b}));
                dato.lu = lunes;
              }
              if(dato.martes != null || dato.martes != undefined){
                martes = self.ajustarHorario(dato.martes.sort(function(a, b){return a - b}));
                dato.ma = martes;
              }
              if(dato.miercoles != null || dato.miercoles != undefined){
                miercoles = self.ajustarHorario(dato.miercoles.sort(function(a, b){return a - b}));
                dato.mi = miercoles;
              }
              if(dato.jueves != null || dato.jueves != undefined){
                jueves = self.ajustarHorario(dato.jueves.sort(function(a, b){return a - b}));
                dato.ju = jueves;
              }
              if(dato.viernes != null || dato.viernes != undefined){
                viernes = self.ajustarHorario(dato.viernes.sort(function(a, b){return a - b}));
                dato.vi = viernes;
              }
              if(dato.sabado != null || dato.sabado != undefined){
                sabado = self.ajustarHorario(dato.sabado.sort(function(a, b){return a - b}));
                dato.sa = sabado;
              }
              if(dato.domingo != null || dato.domingo != undefined){
                domingo = self.ajustarHorario(dato.domingo.sort(function(a, b){return a - b}));
                dato.dom = domingo;
              }
              
              self.data.push(dato);
            }
        });
          self.contSer = self.data.length
      });
    },
    methods: {
      ajustarHorario(item){
        const self = this;
        const app = self.$f7;
        var forEach = Array.prototype.forEach;
        var horario = '';
        forEach.call(item, function(item2,index){
          if (index === 0) {
            horario += ("0" + item2).slice(-2)+':00 a ';
          }else{
            if((item.length-1) === index ){
              horario += ("0" + item2).slice(-2)+':00';
            }else{
              if((item2+1) === item[index+1]){
              }else{
                horario += ("0" + item2).slice(-2)+':00 '+("0" + item[index+1]).slice(-2)+':00 a ';
              }
            }
          }
        });
        return horario;
      },
      MostrarHorario(lu,ma,mi,ju,vi,sa,dom){
        const self = this;
        const app = self.$f7;
        var forEach = Array.prototype.forEach;
        var horario = '';
      },
      detalles(servicio){
        const self = this;
        const app = self.$f7;
        self.$store.state.servicioAEditar=servicio;
        app.views.main.router.navigate('/visualizarservicio');
      },
      back(){
        const self = this;
        const app = self.$f7;
        app.views.main.router.back();
      },
    },
  };
</script>