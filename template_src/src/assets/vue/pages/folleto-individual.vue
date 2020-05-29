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

        <f7-row style="margin-bottom: 20px">
          <f7-col width="100">
            <div class="d-img-carrito">
              <img style="width: 60%;" :src="$store.state.url_server+'images/folletos/'+imagen" alt="">
            </div>
          </f7-col>

          <f7-col width="100">
            <div class="d-info-carrito" style="text-align: left;">
              <p class="t1 one-line">{{nombre}}</p>
              <p style="margin-top: 10px;" class="t2 one-line" >{{descripcion}}</p>
            </div>
          </f7-col>
          <a class="btn btn-blue" download :href="$store.state.url_server+'images/folletos/'+imagen" role="button"><i style="margin-right:2px" class="fas fa-arrow-circle-down"></i>Descargar imagen de folleto.</a>
          <a class="btn btn-blue" download :href="$store.state.url_server+'images/folletos/documentos/'+imagen" role="button"><i style="margin-right:2px" class="fas fa-arrow-circle-down"></i>Descargar PDF de folleto.</a>
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
export default {
  components: {
    topmenu,
    toolbar,
    seccionbusqueda,
    seccionlineas
  },
  data() {
    return {
      nombre: "",
      descripcion: "",
      imagen: "",
      pdf: "",
    };
  },
  created() {
    const self = this;
    const app = self.$f7;

    self.verFolleto();
  },
  methods: {
      verFolleto(){
        const self = this;
        const app = self.$f7;

        var url = localStorage.getItem("url_server");
        app.request.post(
          url + "folleto-individual-movil.php",
          {
            folleto_id:self.$store.state.folleto_id
          },
          function result(data) {
            var json_data = JSON.parse(data);
              self.nombre = json_data[0]['nombre'];
              self.descripcion = json_data[0]['descripcion'];
              self.imagen = json_data[0]['imagen'];
              self.pdf = json_data[0]['pdf'];
          },
          function error(xhr, status) {
          }
        );
      },
  }
};
</script>