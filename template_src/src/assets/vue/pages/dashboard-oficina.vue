<template>
  <f7-page class="sec-gray">
    <!--ingresa tu html aqui -->
    <f7-navbar>
      <topmenu></topmenu>
    </f7-navbar>

    <f7-block>
      <f7-row>
        <f7-col>
          <div class="clearfix d-item-num-oficina">
              <p class="t1">357</p>
              <p class="t2">Rango obtenido</p>
          </div>
        </f7-col>
        <f7-col>
          <div class="clearfix d-item-num-oficina">
              <p class="t1">{{estadisticaPersonas}}</p>
              <p class="t2">Personas en tu red</p>
          </div>
        </f7-col>
      </f7-row>
      <f7-row>
        <f7-col>
          <div class="clearfix d-item-num-oficina">
              <p class="t1">{{puntosPersonales}}</p>
              <p class="t2">Puntos personales</p>
          </div>
        </f7-col>
        <f7-col>
          <div class="clearfix d-item-num-oficina">
              <p class="t1">{{puntosGrupales}}</p>
              <p class="t2">Puntos grupales</p>
          </div>
        </f7-col>
      </f7-row>
      <f7-row>
        <f7-col>
          <div class="clearfix d-item-num-oficina">
              <p class="t1">{{compras}}</p>
              <p class="t2">Compras de {{mes}}</p>
          </div>
        </f7-col>
        <f7-col>
          <div class="clearfix d-item-num-oficina">
              <p class="t1">{{rollOver}}</p>
              <p class="t2">Roll over</p>
          </div>
        </f7-col>
      </f7-row>
      <f7-row>
      <f7-col>
          <div class="clearfix d-item-num-oficina">
              <p class="t1">{{activas}}</p>
              <p class="t2">Personas activas</p>
          </div>
        </f7-col>
      </f7-row>



      <f7-row style="margin-bottom: 20px;">
        <f7-col>
          <div class="d-grafica-oficina">
              <p class="title-chart-oficina">Ventas</p>
              <p class="sub-title-chart-oficina mb-4">Estadística de compra</p>
              <canvas height="300" id="chart-importe"></canvas>
          </div>
        </f7-col>
      </f7-row>
      <f7-row style="margin-bottom: 20px;">
        <f7-col>
          <div class="d-grafica-oficina">
              <p class="title-chart-oficina">Puntos</p>
              <p class="sub-title-chart-oficina mb-4">Estadística de compra</p>
              <canvas height="300" id="chart-puntos"></canvas>
          </div>
        </f7-col>
      </f7-row>
      <f7-row style="margin-bottom: 20px;">
        <f7-col>
          <div class="d-grafica-oficina">
              <p class="title-chart-oficina">Mis afiliados</p>
              <p class="sub-title-chart-oficina mb-4">Estadística</p>
              <canvas height="300" id="chart-bonificaciones"></canvas>
          </div>
        </f7-col>
      </f7-row>
      <f7-row style="margin-bottom: 20px;">
        <f7-col>
          <div class="d-grafica-oficina">
              <p class="title-chart-oficina">Compras</p>
              <p class="sub-title-chart-oficina mb-4">Estadística</p>
              <canvas height="300" id="chart-febrero"></canvas>
          </div>
        </f7-col>
      </f7-row>
      <f7-row style="margin-bottom: 60px;">
        <f7-col>
          <div class="d-grafica-oficina">
              <p class="t2">Tu página personal</p>
              <f7-button fill @click="urlLanding()" style="color:white; margin-top: 15px" >Copiar URL pagin personal.</f7-button>
          </div>
        </f7-col>
      </f7-row>
    </f7-block>

    
    <toolbar></toolbar>
    
  </f7-page>
</template>
<script>
  import topmenu from "./menu-bar";
  import toolbar from "./toolbar";
  import Dom7 from "dom7/dist/dom7.js";
  import Chart from 'chart.js/dist/Chart.js';
  import EasyPieChart from "easy-pie-chart/dist/easypiechart.js";
  var $$ = Dom7;
  export default {
    components: {
      topmenu,
      toolbar
    },
    data() {
      return {
        planetChartData: {
          type: 'line',
          options: {

              legend: {
                  display: false
              },
              scales: {
                  yAxes: [{
                      ticks: {
                          suggestedMin: 50,
                          suggestedMax: 100
                      }
                  }]
              }
          }
        },
        estadisticaPersonas:"",
        puntosPersonales:"",
        puntosGrupales:"",
        compras:"",
        rollOver:"",
        mes:"",
        activas:0,
        pageId:0
      };
    },
    mounted () {
      const self = this;
      const app = self.$f7;

      self.graficaVentas();
      self.graficaPuntos();
      self.graficaMisafiliados();
      self.graficaCompras();
      self.datosInicio();

    },
    created() {
      const self = this;
      const app = self.$f7;

      self.pageId = localStorage.getItem("user_id");

    },
    methods: {
      createChart(chartId, chartData, labels, values) {
        var dataGrafica = {
              datasets: [{
                  label: 'Importe',
                  data: values,
                  fill: false,
                  borderColor: 'rgba(54, 162, 235, 0.2)',
                  backgroundColor: [
                  'rgba(54, 162, 235, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(54, 162, 235, 1)'
                  ]
                  
              }],
              labels: labels
          };
        const ctx = document.getElementById(chartId);
        const myChart = new Chart(ctx, {
          type: chartData.type,
          data: dataGrafica,
          options: chartData.options,
        });
      },
      graficaVentas(){
        const self = this;
        const app = self.$f7;

        var url = localStorage.getItem("url_server");
        app.request.json(
          url + "grafica-oficina.php",
          {user_id:localStorage.getItem("user_id")},
          function result(data) {
            var json_data = data;
            self.createChart('chart-importe', self.planetChartData,json_data.labels,json_data.cants);
          },
          function error(xhr, status) {
          }
        );
      },
        graficaPuntos(){
        const self = this;
        const app = self.$f7;

        var url = localStorage.getItem("url_server");
        app.request.json(
          url + "grafica-oficina-puntos.php",
          {user_id:localStorage.getItem("user_id")},
          function result(data) {
            var json_data = data;
            self.createChart('chart-puntos', self.planetChartData,json_data.labels,json_data.cants);
          },
          function error(xhr, status) {
          }
        );
      },
        graficaMisafiliados(){
        const self = this;
        const app = self.$f7;

        var url = localStorage.getItem("url_server");
        app.request.json(
          url + "grafica-oficina-afiliados.php",
          {user_id:localStorage.getItem("user_id")},
          function result(data) {
            var json_data = data;
            self.createChart('chart-bonificaciones', self.planetChartData,json_data.labels,json_data.cants);
          },
          function error(xhr, status) {
          }
        );
      },
        graficaCompras(){
        const self = this;
        const app = self.$f7;

        var url = localStorage.getItem("url_server");
        app.request.json(
          url + "grafica-oficina-ventas.php",
          {user_id:localStorage.getItem("user_id")},
          function result(data) {
            var json_data = data;
            self.createChart('chart-febrero', self.planetChartData,json_data.labels,json_data.cants);
          },
          function error(xhr, status) {
          }
        );
      },
        datosInicio(){
        const self = this;
        const app = self.$f7;

        var url = localStorage.getItem("url_server");
        app.request.post(
          url + "datos-oficina-movil.php",
          {user_id:localStorage.getItem("user_id")},
          function result(data) {
            var json_data = JSON.parse(data);

            self.estadisticaPersonas=json_data['clientestotales'];
            self.puntosPersonales=json_data['puntospersonales'];
            self.puntosGrupales=json_data['puntosgrupales5nivel'];
            self.mes=json_data['mes'];
            self.compras=json_data['ventasmatriz'];

            if(json_data['rollover'] == '1'){
              self.rollOver = "SI";
            }else{
              self.rollOver = "NO"
            }

            var porcientoActivos = json_data['clientestotales'] * json_data['clientesactivos'];

            if(porcientoActivos == 0){
              self.activas = 0;
            }else{
              self.activas = 100 / porcientoActivos + "%";
            }


            /*self.rollOver=json_data['clientestotales'];*/

            console.log(self.estadisticasOficina);
            
          },
          function error(xhr, status) {
          }
        );
      },
      urlLanding(){
        var text = "Hello World!";
        cordova.plugins.clipboard.copy(text);
      }
    },
  };
</script>