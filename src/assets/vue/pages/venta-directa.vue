<template>
  <f7-page class="sec-gray">
    <!--ingresa tu html aqui -->
    <f7-navbar>
      <topmenu></topmenu>
    </f7-navbar>

    <f7-block>
      <div class="d-title-cuenta">
        <p class="title-cuenta">Ventas directas.</p>
      </div>

      <f7-row class="row">
        <f7-col width="100%">
          <div class="floating-label-group">
            <label>Nombre de cliente..</label>
            <input type="text" class="form-control input-form-underline" v-model="cliente" />
          </div>
        </f7-col>

        <f7-col width="100%">
          <div class="floating-label-group">
            <label>Descripcion de venta,.</label>
            <input type="text" class="form-control input-form-underline" v-model="descripcion" />
          </div>
        </f7-col>

        <f7-col width="100%">
          <div class="floating-label-group">
            <label>Total.</label>
            <input type="text" class="form-control input-form-underline" v-model="total" />
          </div>
        </f7-col>

        <f7-col width="100%">
          <div class="form-group">
            <label class="mb-10" style="font-size: 12px;color: rgba(0, 0, 0, .5);">Cobrado?</label>
            <br>
            <input type="checkbox" id="cobrado" value="second_checkbox">
          </div>
        </f7-col>

        <f7-col class="floating-label-group">
          <div class="d-btn-carrito">
            <f7-row>
              <f7-col width="100%">
                <f7-button
                  large
                  style="background-color: #49B7F3;color:#fff;"
                  @click="confirmar()"
                >Continuar</f7-button>
              </f7-col>
            </f7-row>
          </div>
        </f7-col>
      </f7-row>
    </f7-block>

    <toolbar seleccion="1"></toolbar>
  </f7-page>
</template>
<script>
import topmenu from "./menu-bar";
import toolbar from "./toolbar";
import seccionbusqueda from "./seccion-busqueda";
import seccionlineas from "./seccion-lineas";
import Dom7 from "dom7/dist/dom7.js";
var $$ = Dom7;
export default {
  components: {
    topmenu,
    toolbar,
    seccionbusqueda,
    seccionlineas
  },
  data() {
    return {
      cliente: "",
      descripcion: "",
      total: 0,
      cobrado: 0
    };
  },
  created() {
    const self = this;
    const app = self.$f7;
  },
  methods: {
    confirmar() {
      const self = this;
      const app = self.$f7;

      self.cobrado = 0;
      if($$("#cobrado").is(':checked')){
        self.cobrado = 1;
      }
      
      console.log($$("#cobrado").is(':checked'));
      
      console.log(self.cliente);
      console.log(self.descripcion);
      console.log(self.total);
      console.log(self.cobrado);

      app.preloader.show();
      var url = localStorage.getItem("url_server");
      var datos = {
        user_id:localStorage.getItem("user_id"),
        nombre: self.cliente,
        descripcion: self.descripcion,
        total: self.total,
        cobrado: self.cobrado
      };
      console.log(datos);
      app.request.post(
        url + "nueva-venta-oficina.php",
        datos,
        function result(data) {
          app.preloader.hide();
          var json_mensaje = JSON.parse(data);
          console.log(json_mensaje);
          if (json_mensaje.error != undefined) {
            app.dialog.alert(json_mensaje.mensaje, "Error");
          } else {
            app.views.main.router.navigate("/reporteOficina/");
          }
          console.log(data);
        },
        function error(xhr, status) {}
      );
    }
  }
};
</script>
