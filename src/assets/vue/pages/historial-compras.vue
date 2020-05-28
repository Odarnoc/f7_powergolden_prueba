<template>
  <f7-page class="sec-gray">
    <!--ingresa tu html aqui -->
    <f7-navbar>
      <topmenu></topmenu>
    </f7-navbar>

    <f7-block>
      <div class="d-title-cuenta">
        <p class="title-cuenta">Mis compras</p>
        <br />
      </div>

      <div v-bind:key="(item, index)" v-for="(item, index) in resultado">
        <f7-row style="margin-bottom: 20px">
          <f7-col width="30">
            <div class="d-img-carrito">
              <img style="width: 100%" :src="$store.state.url_server+'productos_img/'+item.imagen" />
            </div>
          </f7-col>
          <f7-col width="70">
            <div class="d-info-carrito" style="text-align: left;">
              <p class="t1 one-line">{{item.nombre}}</p>
              <p class="t2 one-line">Fecha de compra: {{item.fecha.slice(0, 10)}}</p>
              <p class="t2 one-line">Cantidad: {{item.cantidad}}</p>
              <p class="t3">${{item.precio}}.00</p>
            </div>
          </f7-col>
        </f7-row>
      </div>

      <br />
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
      resultado: []
    };
  },
  created() {
    const self = this;
    const app = self.$f7;
  
    self.datosVentas();
  },
  methods: {
    datosVentas() {
      const self = this;
      const app = self.$f7;

      var url = localStorage.getItem("url_server");
      app.request.post(
        url + "historial-movil.php",
        {user_id:localStorage.getItem('user_id')},
        function result(data) {
          var json_data = JSON.parse(data);
          self.resultado = json_data;
          
        },
      );
    }
  }
};
</script>