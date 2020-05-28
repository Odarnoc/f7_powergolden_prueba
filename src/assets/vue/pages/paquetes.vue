<template>
  <f7-page class="sec-gray">
    <!--ingresa tu html aqui -->
    <f7-navbar>
      <topmenu></topmenu>
    </f7-navbar>

    <f7-block style="margin-top: 0;">
                                        
        <div class="row">
            <div class="col-lg-12 col-md-12">
                <p class="title-sec mb-20">Paquetes</p>
            </div>
        </div>

        <!--<div class="row">
            <div class="col-lg-6 col-md-6 offset-lg-3 offset-md-3">
                <div class="d-listo">
                    <img src="images/icon-search-blue.svg" alt="">
                    <p class="t1">¡Sin resultados!</p>
                    <p class="t2">No se encontraron paquetes disponibles</p>
                </div>
            </div> -->


                <f7-row v-bind:key="(item, index)" v-for="(item, index) in resultado">
                    <f7-col>
                        <div class="d-item-pro h-100" style="padding-bottom: 1rem;">
                            <div class="row">
                                <f7-col class="col-lg-5 col-md-5 col-5">
                                    <div class="d-img-pro">
                                        <img :src="$store.state.url_server+'images/paquetes/'+item.imagen" alt="">
                                    </div>
                                </f7-col>
                                <f7-col class="col-lg-7 col-md-7 col-7">
                                    <div class="d-info-pro">
                                        <p class="t2">{{item.nombre}}</p>
                                        <p class="t4 two-lines">Total de productos: <b>{{item.productos}}</b></p>
                                    </div>
                                    <div style="margin-top: 10px">
                                        <f7-button class="btn-blue" @click="comprarPaquete(item.id)" role="button">Comprar</f7-button>
                                    </div>
                                </f7-col>
                            </div>
                        </div>
                    </f7-col>
                </f7-row>

    </f7-block>

    <toolbar seleccion="2"></toolbar>
    
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
            resultado: []
        };
    },
    created() {
        const self = this;
        const app = self.$f7;

        self.paquetes();

    },
    methods: {
    paquetes() {
      const self = this;
      const app = self.$f7;

      var url = localStorage.getItem("url_server");
      app.request.get(
        url + "paquetes-movil.php",
        function result(data) {
          var json_mensaje = JSON.parse(data);
          self.resultado = json_mensaje;
          console.log(json_mensaje);
        },
      );
    },
    comprarPaquete(id){
        const self = this;
        const app = self.$f7;
        console.log(id);
        self.$store.state.paquete_id = id;
        app.views.main.router.navigate('/paqueteIndividual/');
    }
    },
  };
</script>