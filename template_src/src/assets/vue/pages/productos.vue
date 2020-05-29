<template>
  <f7-page>
    <!--ingresa tu html aqui -->
    <f7-navbar>
      <topmenu></topmenu>
    </f7-navbar>

    <seccionbusqueda></seccionbusqueda>

    <f7-block class="sec-gray">
    <div class="container">
      <div class="row">
        
            
        <seccionlineas></seccionlineas>

          <div class="row row-items-pro lista-productos-movil">

            <div>
              <p class="title-busqueda">Búsqueda: <b>"{{$store.state.busqueda}}"</b></p>
              <br>
            </div>

            
            <div class="d-all-item-pro" v-bind:key="(item, index)" v-for="(item, index) in resultado
            ">
              <div class="d-item-pro h-100" style="padding-bottom: 1rem;">
                <div class="row">
                  <f7-col width="40">
                    <div class="d-img-pro">
                      <img :src="$store.state.url_server+'productos_img/'+item.imagen" alt="">
                    </div>
                  </f7-col>
                  <f7-col width="60">
                    <div class="d-info-pro">
                      <p class="t1" :style="'color:'+item.color">Línea {{item.linea}}</p>
                      <p class="t2">{{item.nombre}}</p>
                      <p class="t4 two-lines">{{item.ingredientes}}</p>
                      <br>
                      <a class="btn-blue mt-3" @click="verProd(item.id)" role="button">Ver producto</a>
                    </div>
                  </f7-col>
                </div>
              </div>
            </div>


          </div>

      </div>
    </div>

  </f7-block>

    <toolbar></toolbar>
    
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
        resultado:[]
      };
    },
    created() {
      const self = this;
      const app = self.$f7;
      var url = localStorage.getItem("url_server");
      app.request.get(
        url + "lista-productos.php",
        {
          busqueda:self.$store.state.busqueda
        },
        function result(data) {
          var json_data = JSON.parse(data);
          console.log(json_data);
          self.resultado = json_data;
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