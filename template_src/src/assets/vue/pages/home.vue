<template>
  <f7-page class="page-gray">
    <!--ingresa tu html aqui -->
    <f7-navbar>
      <topmenu></topmenu>
    </f7-navbar>
    <f7-block>
      <f7-row>
        <f7-col v-bind:key="item" v-for="item in iconosCatLg" @click="navegar(item.nombre)" :class="'d-menu-lg '+item.class" >
          <p class="t1">{{item.appname}}</p>
        </f7-col>
      </f7-row>

    </f7-block>
    <f7-block>
      <f7-row>
        <f7-col v-bind:key="item" v-for="item in iconosCat" width="33" @click="navegar(item.nombre)">
          <div class="d-menu">
            <div class="item d-2" :style="'background-color:'+item.color">
               <i v-if="item.nombre != 'Nissan Guadalajara'" :class="item.icono"></i>
               <img v-if="item.nombre == 'Nissan Guadalajara'" src="static/logo-nissan.png" style="width:50%">
            </div>
              <p class="t1">{{item.appname}}</p>
          </div>
        </f7-col>
        <f7-col width="33"></f7-col>
        <f7-col width="33"></f7-col>
      </f7-row>
    </f7-block>

    <toolbar></toolbar>
    
  </f7-page>
</template>
<script>
  import topmenu from "./menu-bar";
  import toolbar from "./toolbar";
  export default {
    components: {
      topmenu,
      toolbar,
    },
    data() {
      return {
        popupOpened: false,
        iconosCatLg: [
          { icono: "fas fa-car", appname: "Automotriz", nombre:"Servicio de mantenimiento automotriz", class:'auto'},
          { icono: "fas fa-notes-medical", appname: "Citas Médicas", nombre:"Citas Médicas", class:'citas-medicas' }
        ],
        iconosCat: [],
        colores:[
          "#B8B8B8",
          "#2B2A2A",
          "#C01533",
          "#FCBABE",
          "#FA757E",
          "#F8313E",
        ]
      };
    },
    created() {
      const self = this;
      const app = self.$f7;
      var url = localStorage.getItem("url_server");
      app.request.json(url+'category/', 
        function (data) {
          console.log(data);
          var contadorColor = 0;
          data.data.forEach(function(JsonCategoria) {
            if(JsonCategoria.name != "Servicio de mantenimiento automotriz" && JsonCategoria.name != "Citas Médicas"){
              self.iconosCat.push({ icono:'fas '+JsonCategoria.icon, appname: JsonCategoria.name, nombre:JsonCategoria.name, color: self.colores[contadorColor]});
              if(contadorColor < 5){
                contadorColor++;
              }else{
                contadorColor=0;
              }
            }
          });
        },
        function error(xhr, status) {
          var response = JSON.parse(xhr.response);
          console.log(response);
        }
      );
    },
    methods: {
      navegar(categoria){
        const self = this;
        const app = self.$f7;
        self.$store.state.catInicial = categoria;
        app.views.main.router.navigate('/buscar_filtrar'); 
      },
    },
  };
</script>