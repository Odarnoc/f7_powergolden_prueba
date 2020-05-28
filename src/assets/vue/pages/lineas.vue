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
        </div>

        <div :style="'background-image: url('+$store.state.url_server+$store.state.info_linea.imagenlinea+');margin-top:20px;'" class="d-banner-linea valign" data-overlay-dark="3">
            <span class="t1">LÍNEA</span>
            <span class="t2">{{$store.state.info_linea.nombre}}</span>
        </div>

        <div class="row">
            <div class="row row-items-pro lista-productos-movil">
                
                <div class="d-all-item-pro" v-bind:key="(item, index)" v-for="(item, index) in $store.state.prods">
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
      };
    },
    created() {
      const self = this;
      const app = self.$f7;
    },
    methods: {
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