<template>
  <f7-page class="sec-gray">
    <!--ingresa tu html aqui -->
    <f7-navbar>
      <topmenu></topmenu>
    </f7-navbar>

    <f7-block>
      <div class="d-title-cuenta">
        <p class="title-cuenta">Folletos electronicos.</p>
        <br />
      </div>

      <div class="d-item-pro h-100" style="padding: 16px; margin-bottom: 20px;" v-bind:key="(item, index)" v-for="(item, index) in resultado">
        <f7-row style="margin-bottom: 20px">
          <f7-col width="100">
            <div class="d-img-carrito">
              <img style="width: 60%;" :src="$store.state.url_server+'images/folletos/'+item.imagen" alt="">
            </div>
          </f7-col>

          <f7-col width="100">
            <div class="d-info-carrito" style="text-align: left;">
              <p class="t1 one-line">{{item.nombre}}</p>
              <p style="margin-top: 10px;" class="t2 one-line" >{{item.descripcion}}</p>
            </div>
            <div style="text-align: right; ">
                <a class="btn-blue " @click="verFolleto(item.id)" role="button">Ver producto</a>
            </div>
          </f7-col>

        </f7-row>
      </div>
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
    seccionlineas
  },
  data() {
    return {
        resultado: [],
    };
  },
  created() {
    const self = this;
    const app = self.$f7;

    self.folletos();
  },
  methods: {
    folletos() {
      const self = this;
      const app = self.$f7;

      var url = localStorage.getItem("url_server");
      app.request.get(
        url + "folletos-movil.php",
        function result(data) {
          var json_mensaje = JSON.parse(data);
          self.resultado = json_mensaje;
          console.log(json_mensaje);
        },
        function error(xhr, status) {}
      );
    },
      verFolleto(id){
        const self = this;
        const app = self.$f7;
        console.log(id);
        self.$store.state.folleto_id = id;
        app.views.main.router.navigate('/folletoIndividual/');
      },
  }
};
</script>