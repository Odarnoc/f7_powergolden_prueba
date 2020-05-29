<template>
  <f7-page class="sec-gray">
    <!--ingresa tu html aqui -->
    <f7-navbar>
      <topmenu></topmenu>
    </f7-navbar>

    <f7-block >
      <div class="d-title-cuenta">
          <p class="title-cuenta">Nuevo cliente</p>
      </div>

          <form class="form-white">
              <div class="floating-label-group">
                  <input type="text" class="form-control input-form" v-model="nombre" required="">
                  <label class="floating-label">Nombre</label>
              </div>
              <div class="floating-label-group">
                  <input type="text" class="form-control input-form" v-model="apellido" required="">
                  <label class="floating-label">Apellido</label>
              </div>
              <div class="floating-label-group">
                  <input type="number" class="form-control input-form" v-model="phone" required="">
                  <label class="floating-label">Teléfono</label>
              </div>
              <div class="floating-label-group">
                  <input type="email" class="form-control input-form" v-model="email" required="">
                  <label class="floating-label">Correo electrónico</label>
              </div>
              <f7-button fill large class="mt-30" style="background-color: #49B7F3;" @click="registrarse()">Aceptar</f7-button>
          </form>
    </f7-block>

    <toolbar seleccion="1"></toolbar>
    
  </f7-page>
</template>
<script>
  import topmenu from "./menu-bar";
  import toolbar from "./toolbar";
  import seccionbusqueda from "./seccion-busqueda";
  import seccionlineas from "./seccion-lineas";
  export default {
    components: {
      topmenu,
      toolbar,
      seccionbusqueda,
      seccionlineas,
    },
    data() {
      return {
        populares:[]
      };
    },
    created() {
      const self = this;
      const app = self.$f7;
      var url = localStorage.getItem("url_server");
      app.request.get(
        url + "productos-populares.php",
        {},
        function result(data) {
          var json_data = JSON.parse(data);
          console.log(json_data);
          self.populares = json_data;
        },
        function error(xhr, status) {
          
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
      verProds(){
        const self = this;
        const app = self.$f7;
        app.views.main.router.navigate('/productos/'); 
      },
      verProd(id){
        const self = this;
        const app = self.$f7;
        console.log(id);
        self.$store.state.prod_id = id;
        app.views.main.router.navigate('/productoIndividual/');
      },
    },
  };
</script>