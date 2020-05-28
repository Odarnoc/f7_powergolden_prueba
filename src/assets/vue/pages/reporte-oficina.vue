<template>
  <f7-page class="sec-gray">
    <!--ingresa tu html aqui -->
    <f7-navbar>
      <topmenu></topmenu>
    </f7-navbar>

    <f7-block>
      <div class="d-title-cuenta">
        <p class="title-cuenta">Ventas directas</p>
      </div>
      <f7-row>
        <f7-col width="80" style="text-align: center;">
          <f7-list-input
            style="list-style: none; text-align: center;"
            type="datepicker"
            placeholder="Seleccionar rango"
            @calendar:change="infoCalendario"
            readonly
            :calendar-params="{ dateFormat: 'dd-mm-yyyy ', rangePicker: true }"
          ></f7-list-input>
        </f7-col>
        <f7-col width="20" class="form-group text-center">
          <f7-button class="btn-search" @click="buscar()" style="margin-top:1rem" role="button">
            <img src="static/icon-search-white.svg" alt />
          </f7-button>
        </f7-col>
      </f7-row>

      <div class="card data-table">
        <table>
          <thead>
            <tr>
              <th class="label-cell">Fecha de venta</th>
              <th class="numeric-cell">Nombre de cliente</th>
              <th class="numeric-cell">Estatus</th>
              <th class="numeric-cell">Total</th>
            </tr>
          </thead>

          <tbody>
            <tr v-bind:key="(item, index)" v-for="(item, index) in resultado">
              <td class="label-cell">{{item.fecha.slice(0, 10)}}</td>
              <td style="text-align: center">{{item.nombre}}</td>
              <td style="text-align:center" v-if="item.cobrado == 1">
                <i style="color: green;" class="far fa-check-circle"></i>
              </td>
              <td style="text-align:center" v-else>
                <i style="color: red;" class="far fa-times-circle"></i>
              </td>
              <td class="numeric-cell">${{item.total}}.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </f7-block>

    <toolbar seleccion="1"></toolbar>

    <f7-fab
    @click="reportes()"
      style="margin-bottom: 70px; font-family: Poppins;"
      position="center-bottom"
      slot="fixed"
      text="Reporte PDF"
    >
    </f7-fab>

    <f7-fab href="/ventaDirecta/" position="right-bottom" slot="fixed" style="margin-bottom: 65px; font-family: Poppins;">
      <f7-icon ios="f7:plus" aurora="f7:plus" md="material:add"></f7-icon>
      <f7-icon ios="f7:xmark" aurora="f7:xmark" md="material:close"></f7-icon>
    </f7-fab>

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
      fechaInicio: "",
      fechaFin: "",
      nombre: "",
      status: 0,
      total: 0,
      resultado: [],
    };
  },
  created() {
    const self = this;
    const app = self.$f7;

    var calendarRange = app.calendar.create({
      inputEl: '#buscadorFecha',
      rangePicker: true
    });

    self.infReportes();
  },
  methods: {
    infReportes() {
      const self = this;
      const app = self.$f7;

      var url = localStorage.getItem("url_server");
      let datos = { user_id: localStorage.getItem("user_id") };
      console.log(datos);
      app.request.post(
        url + "reporte-venta-oficina-movil.php",
        datos,
        function result(respuesta) {
          var json_mensaje = JSON.parse(respuesta);
          self.resultado = json_mensaje;
          console.log(json_mensaje[0]["nombre"]);
        },
        function error(xhr, status) {
          app.preloader.hide();
        }
      );
    },
    buscar() {
      const self = this;
      const app = self.$f7;

      var url = localStorage.getItem("url_server");
      let datos = { user_id: localStorage.getItem("user_id"), fechauno: self.fechaInicio, fechados:self.fechaFin };
      console.log(datos);
      app.request.post(
        url + "reporte-venta-oficina-movil.php",
        datos,
        function result(respuesta) {
          var json_mensaje = JSON.parse(respuesta);
          self.resultado = json_mensaje;
        },
        function error(xhr, status) {
          app.preloader.hide();
        }
      );

      console.log(self.fechaInicio);
      console.log(self.fechaFin);
            
      
    },
    reportes(){
      const self = this;
      const app = self.$f7;

      var url = localStorage.getItem("url_server");
      var urlreporte = url+"pdf-ventas-oficina-movil.php?user_id="+localStorage.getItem("user_id");
      if(self.fechaInicio != "" && self.fechaFin != ""){
        urlreporte+="&inicio="+self.fechaInicio+"&fin="+self.fechaFin;
      }
      window.open(encodeURI(urlreporte), '_blank', 'location=yes');
    },
    infoCalendario(e){
      const self = this;
      const app = self.$f7;

            if(e.length == 1){
              self.fechaInicio = new Date(e[0]).toISOString().slice(0, 10);
              self.fechaFin = "";
            }else{
              self.fechaInicio = new Date(e[0]).toISOString().slice(0, 10);
              self.fechaFin = new Date(e[1]).toISOString().slice(0, 10);
            }  
            
        }
  }
};

</script>