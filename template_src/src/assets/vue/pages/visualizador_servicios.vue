<template>
  <f7-page>
    <f7-navbar>
      <topmenu :title="item.servicio"></topmenu>
    </f7-navbar>
    
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
        
          </f7-block>
          <hr>
          <br>
          <f7-button large raised @click="eliminar(item.service_id)" class="col button button-outline color-gray">Eliminar</f7-button>
          <br>
          <f7-button href="/editarservicio" large raised class="col button button-outline color-gray">Editar</f7-button>
        </f7-block>
      </f7-block>
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
        iconosCat:[{icono:'concita-arquitectura',nombre:'Arquitectura'},{icono:'concita-arte',nombre:'Arte'},{icono:'concita-cine',nombre:'Cine'},{icono:'concita-deportes',nombre:'Deportes'},{icono:'concita-diseño',nombre:'Diseño'},{icono:'concita-juridico',nombre:'Jurídico'},{icono:'concita-mecanica',nombre:'Mecánica'},{icono:'concita-medicina',nombre:'Medicina'},{icono:'concita-tecnología',nombre:'Tecnología'},{icono:'concita-video',nombre:'Video'},],
        iconosPago:['far fa-money-bill-alt','far fa-credit-card'],
        item:this.$store.state.servicioAEditar,
      };
    },
    created() {
    },
    methods: {
      eliminar(id){
        const self = this;
        const app = self.$f7;
        firebase.database().ref().child('/servicios/'+id).update({status:0}).then(function(data) {
            app.views.main.router.back();
        });
      },
      back(){
        const self = this;
        const app = self.$f7;
        app.views.main.router.back();
      },
    },
  };
</script>