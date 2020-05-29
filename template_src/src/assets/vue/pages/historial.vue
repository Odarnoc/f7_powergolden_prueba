<template>
  <f7-page>
    <!--ingresa tu html aqui -->
    <f7-navbar>
      <topmenu title="Historial"></topmenu>
    </f7-navbar>

    <!-- Botones para ver realizadas y no realizadas aun no funcionales-->
    <div style="border-top: solid 2px #f7f7f7;">
      <div>
        <f7-row>
          <f7-col>
            <center>
              <f7-link
                class="historial-tabs"
                id="realizada"
                v-on:click="verRealizadas()"
              >Realizadas</f7-link>
            </center>
          </f7-col>
          <f7-col>
            <center>
              <f7-link
                class="historial-tabs"
                id="cancelada"
                v-on:click="verCanceladas()"
              >Canceladas</f7-link>
            </center>
          </f7-col>
        </f7-row>

        <!-- Parte donde se cambian los nombres de los servicios solo funcional las flechas, falta poner los nombres y hacer que se acomoden los demas -->
        <center v-if="arrayCitas.length === 0">
          <br>
          <br>
          <br>
          <span style="color: #b4b7bf; ">No tiene citas {{tipoShow}}s</span>
        </center>
        <f7-row v-if="arrayCitas.length > 0" style="background-color: #f7f7f7;padding-top: .7rem;padding-bottom: .7rem;">
          <f7-col width="20">
            <center>
              <a @click="prevService()">
                <i class="fas fa-chevron-left" style="padding-top: 1rem;"></i>
              </a>
            </center>
          </f7-col>
          <f7-col>
            <center>
              <span style="color: #b4b7bf; ">Servicio</span>
              <br>
              {{serviciosNames[servicioSelect]}}
            </center>
          </f7-col>
          <f7-col width="20">
            <center>
              <a @click="nextService()">
                <i class="fas fa-chevron-right" style="padding-top: 1rem;"></i>
              </a>
            </center>
          </f7-col>
        </f7-row>
        <!-- Imagen aun estatica-->
        <img v-if="arrayCitas.length > 0" src="../../images/servicio.jpg" width="100%">

        <!--  Parte donde se lista las citas ya funcionando solo falta acomodar fecha que est estatica-->

        <f7-block v-if="arrayCitas.length > 0">
          <center>Total de citas {{tipoShow}}s: {{arrayCitas.length}}</center>

          <br>
          <br>
          <f7-row style="margin-bottom: 1rem;">
            <f7-col width="50" style="text-align: left;">Junio 2019</f7-col>
            <f7-col width="50" style="text-align: right;">Realizadas: {{arrayCitas.length}}</f7-col>
          </f7-row>
          <f7-row v-if="servicios[servicioSelect] ===info.service_id" v-for="info in arrayCitas" style="margin-bottom: 1rem;">
            <f7-col width="20" style="padding-top: .5rem;">{{info.hora}}:00</f7-col>
            <f7-col width="20">
              <div
                v-if="info.fotoProveedor != ''"
                class="img-menu-profile-mini"
                v-bind:style="{ backgroundImage: 'url(' + info.fotoProveedor + ')' }"
              ></div>
              <div v-if="info.foto == ''" class="img-menu-profile-mini">
                <i class="far fa-user-circle" style="color:#56565a;font-size: 60px;"></i>
              </div>
            </f7-col>
            <f7-col style="padding-left: .4rem;padding-top: .3rem;">{{info.nombreProveedor}}</f7-col>
            <f7-col width="20">
              <center>
                <f7-button
                  raised
                  popup-open=".detail-agenda"
                  style="background-color: transparent;box-shadow: none;"
                  @click="verDetalles(info)"
                >
                  <i
                    class="fas fa-chevron-right"
                    style="                                                 "
                  ></i>
                </f7-button>
              </center>
            </f7-col>
          </f7-row>
        </f7-block>
      </div>
    </div>

    <!-- Ventana emergente al presionar flechita para ver detalles-->
    
    <f7-popup class="detail-agenda" :opened="popupOpened" @popup:closed="popupOpened = false">
      <f7-page>
        <f7-navbar>
          <f7-nav-left>
            <f7-link popup-close>
              <i
                style="background-color: transparent;font-size: 25px;padding-left: 10px;"
                class="fas fa-chevron-left"
              ></i>
            </f7-link>
          </f7-nav-left>
          <span style="padding-left: 17%;">Detalle de cita</span>
        </f7-navbar>

        <f7-block-title
          style="border-bottom: solid 2px #f7f7f7;padding-bottom: 5px;color: #b4b7bf;"
        >Solicitante</f7-block-title>

        <f7-block-title>
          <f7-row style="margin-bottom: 1rem;">
            <f7-col width="10">
              <div
                v-if="fotoPerfil != ''"
                class="img-menu-profile-mini"
                v-bind:style="{ backgroundImage: 'url(' + fotoPerfil + ')' }"
              ></div>
              <div v-if="fotoPerfil == ''" class="img-menu-profile-mini">
                <i class="far fa-user-circle" style="color:#56565a;font-size: 60px;"></i>
              </div>
            </f7-col>
            <f7-col style>
              <span style="font-family: roboto-bold;font-size: 1rem;">{{itemDetalle.nombreProveedor}}</span>
              <br>
              <span style="font-family: roboto-medium;font-size: .8rem;">Cita para:</span>
              <br>
              <span
                style="font-family: roboto-bold;color: black;font-size: .8rem;"
              >{{fechaSeleccionada+' a las '+("0" + itemDetalle.hora).slice(-2)+':00 hrs'}}</span>
            </f7-col>
            <f7-col width="20">
              <center>
                <f7-button raised style="background-color: transparent;box-shadow: none;" @click>
                  <i style="color: red;font-size: 1.2rem;" class="fas fa-times"></i>
                </f7-button>
              </center>
            </f7-col>
          </f7-row>
        </f7-block-title>

        <f7-block>
          <img src="../../images/example.jpg" style="width: 100%;">

          <f7-block>
            <f7-block>
              <f7-block>
                <font color="gray">Categoria</font>
                <br>
                <i
                  v-for="cat in servicio.categorias"
                  :class="iconosCat[cat].icono"
                  style="font-size: 2rem;padding-right: 1rem;"
                ></i>
                <br>
                <br>
                <font color="gray">Servicio</font>
                <br>
                <font color="black" size="3">{{servicio.servicio}}</font>
              </f7-block>
              <f7-block>
                <font color="gray">Prestador del Servicio</font>
                <br>
                <font color="black" size="3">{{servicio.prestador}}</font>
              </f7-block>
              <f7-block>
                <font color="gray">Disponibilidad</font>
                <br>
                <f7-row v-if="servicio.lu != undefined || servicio.lu != null">
                  <f7-col width="33">
                    <font color="black" size="3">Lunes</font>
                  </f7-col>
                  <f7-col width="66">
                    <font color="black" size="3">{{servicio.lu}}</font>
                  </f7-col>
                </f7-row>

                <f7-row v-if="servicio.ma != undefined || servicio.ma != null">
                  <f7-col width="33">
                    <font color="black" size="3">Martes</font>
                  </f7-col>
                  <f7-col width="66">
                    <font color="black" size="3">{{servicio.ma}}</font>
                  </f7-col>
                </f7-row>

                <f7-row v-if="servicio.mi != undefined || servicio.mi != null">
                  <f7-col width="33">
                    <font color="black" size="3">Miercoles</font>
                  </f7-col>
                  <f7-col width="66">
                    <font color="black" size="3">{{servicio.mi}}</font>
                  </f7-col>
                </f7-row>

                <f7-row v-if="servicio.ju != undefined || servicio.ju != null">
                  <f7-col width="33">
                    <font color="black" size="3">Jueves</font>
                  </f7-col>
                  <f7-col width="66">
                    <font color="black" size="3">{{servicio.ju}}</font>
                  </f7-col>
                </f7-row>

                <f7-row v-if="servicio.vi != undefined || servicio.vi != null">
                  <f7-col width="33">
                    <font color="black" size="3">Viernes</font>
                  </f7-col>
                  <f7-col width="66">
                    <font color="black" size="3">{{servicio.vi}}</font>
                  </f7-col>
                </f7-row>

                <f7-row v-if="servicio.sa != undefined || servicio.sa != null">
                  <f7-col width="33">
                    <font color="black" size="3">Sabado</font>
                  </f7-col>
                  <f7-col width="66">
                    <font color="black" size="3">{{servicio.sa}}</font>
                  </f7-col>
                </f7-row>

                <f7-row v-if="servicio.dom != undefined || servicio.dom != null">
                  <f7-col width="33">
                    <font color="black" size="3">Domingo</font>
                  </f7-col>
                  <f7-col width="66">
                    <font color="black" size="3">{{servicio.dom}}</font>
                  </f7-col>
                </f7-row>
              </f7-block>
              <f7-block>
                <f7-row>
                  <f7-col>
                    <font color="gray">Costo</font>
                    <br>
                    <font color="black" size="3">${{servicio.costo}}</font>
                  </f7-col>
                  <f7-col>
                    <font color="gray">Tipo de Pago</font>
                    <br>
                    <font color="black" size="3">
                      <i
                        v-for="pago in servicio.tipoPago"
                        :class="iconosPago[pago]"
                        style="font-size: 1.5rem;padding-right: 1rem;"
                      ></i>
                    </font>
                  </f7-col>
                </f7-row>
              </f7-block>
            </f7-block>
          </f7-block>
        </f7-block>
      </f7-page>
    </f7-popup>
  </f7-page>
</template>
<script>
import topmenu from "./menu-bar";
import Dom7 from "dom7/dist/dom7.js";
const $$ = Dom7;
export default {
  components: {
    topmenu
  },
  data() {
    return {
      servicioSelect: 0,
      serviciosNames: [],
      servicio:{},
      servicios:[],
      arrayCitasCanceladas: [],
      arrayCitasRealizadas: [],
      itemDetalle:{},
      fotoPerfil:
        "https://www.mundodeportivo.com/r/GODO/MD/p5/MasQueDeporte/Imagenes/2018/10/24/Recortada/img_femartinez_20181010-125104_imagenes_md_otras_fuentes_captura-kcOG-U452531892714hYG-980x554@MundoDeportivo-Web.JPG",
      eventos: "0",
      popupOpened: false,
      iconosCat: [
        { icono: "concita-arquitectura", nombre: "Arquitectura" },
        { icono: "concita-arte", nombre: "Arte" },
        { icono: "concita-cine", nombre: "Cine" },
        { icono: "concita-deportes", nombre: "Deportes" },
        { icono: "concita-diseño", nombre: "Diseño" },
        { icono: "concita-juridico", nombre: "Jurídico" },
        { icono: "concita-mecanica", nombre: "Mecánica" },
        { icono: "concita-medicina", nombre: "Medicina" },
        { icono: "concita-tecnología", nombre: "Tecnología" },
        { icono: "concita-video", nombre: "Video" }
      ],
      iconosPago: [
        "far fa-money-bill-alt",
        "far fa-credit-card"
      ],
      arrayCitas: [],
      fechaSeleccionada: "",
      tipoShow:"realizada",
    };
  },
  mounted() {
    const self = this;
    const app = self.$f7;

    self.verRealizadas();
  },
  methods: {
    verDetalles(item) {
      const self = this;
      const app = self.$f7;
      var monthNames = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Deciembre"
      ];
      var fechaTemp = new Date(item.fecha);
      self.servicio = item.servicioDetalles;
      self.fechaSeleccionada = fechaTemp.getDate() + " de " + monthNames[fechaTemp.getMonth()] + " " + fechaTemp.getFullYear();
      self.itemDetalle = item;
    },
    ajustarHorario(item) {
      const self = this;
      const app = self.$f7;
      var forEach = Array.prototype.forEach;
      var horario = "";
      forEach.call(item, function(item2, index) {
        if (index === 0) {
          horario += ("0" + item2).slice(-2) + ":00 a ";
        } else {
          if (item.length - 1 === index) {
            horario += ("0" + item2).slice(-2) + ":00";
          } else {
            if (item2 + 1 === item[index + 1]) {
            } else {
              horario +=
                ("0" + item2).slice(-2) +
                ":00 " +
                ("0" + item[index + 1]).slice(-2) +
                ":00 a ";
            }
          }
        }
      });
      return horario;
    },
    obtenerCitas() {
      const self = this;
      const app = self.$f7;

      var lunes = "";
      var martes = "";
      var miercoles = "";
      var jueves = "";
      var viernes = "";
      var sabado = "";
      var domingo = "";

      let keyUsuario = localStorage.getItem("uid");
      firebase
        .database()
        .ref("citas")
        .orderByChild("user_id")
        .equalTo(keyUsuario)
        .once("value", function(snapshot) {
          self.servicios = [];
          self.serviciosNames = [];
          self.citasCanceladas = [];
          self.citasRealizadas = [];
          self.arrayCitas = [];

          snapshot.forEach(function(childSnapshot) {
            var datoCitas = childSnapshot.val();
            if(datoCitas.status === self.tipoShow){
              self.servicios.push(datoCitas.service_id);
              firebase
                .database()
                .ref("proveedores/" + datoCitas.proovedor_id + "/perfil")
                .once("value", function(snapshot2) {
                  var proveedorFirebase = snapshot2.val();
                  datoCitas.nombreProveedor = proveedorFirebase.nombre;
                  datoCitas.fotoProveedor = "";

                  firebase
                    .database()
                    .ref("servicios/" + datoCitas.service_id)
                    .once("value", function(snapshot3) {
                      var servicio = snapshot3.val();
                      if (servicio.lunes != null || servicio.lunes != undefined) {
                        lunes = self.ajustarHorario(
                          servicio.lunes.sort(function(a, b) {
                            return a - b;
                          })
                        );
                        servicio.lu = lunes;
                      }
                      if (servicio.martes != null || servicio.martes != undefined) {
                        martes = self.ajustarHorario(
                          servicio.martes.sort(function(a, b) {
                            return a - b;
                          })
                        );
                        servicio.ma = martes;
                      }
                      if (servicio.miercoles != null || servicio.miercoles != undefined) {
                        miercoles = self.ajustarHorario(
                          servicio.miercoles.sort(function(a, b) {
                            return a - b;
                          })
                        );
                        servicio.mi = miercoles;
                      }
                      if (servicio.jueves != null || servicio.jueves != undefined) {
                        jueves = self.ajustarHorario(
                          servicio.jueves.sort(function(a, b) {
                            return a - b;
                          })
                        );
                        servicio.ju = jueves;
                      }
                      if (servicio.viernes != null || servicio.viernes != undefined) {
                        viernes = self.ajustarHorario(
                          servicio.viernes.sort(function(a, b) {
                            return a - b;
                          })
                        );
                        servicio.vi = viernes;
                      }
                      if (servicio.sabado != null || servicio.sabado != undefined) {
                        sabado = self.ajustarHorario(
                          servicio.sabado.sort(function(a, b) {
                            return a - b;
                          })
                        );
                        servicio.sa = sabado;
                      }
                      if (servicio.domingo != null || servicio.domingo != undefined) {
                        domingo = self.ajustarHorario(
                          servicio.domingo.sort(function(a, b) {
                            return a - b;
                          })
                        );
                        servicio.dom = domingo;
                      }
                      datoCitas.servicioDetalles = servicio;
                      self.arrayCitas.push(datoCitas);
                      console.log(datoCitas);
                    });

                });
                
            }
          });
          var tempo = self.servicios.filter(function(valor,indiceActual,arreglo) {
                let indiceAlBuscar = arreglo.indexOf(valor);
                if (indiceActual === indiceAlBuscar) {
                  return true;
                } else {
                  return false;
                }
          });
          self.servicios = tempo;
          console.log(self.servicios);
          self.servicios.forEach(function(valor, index) {
            firebase.database().ref("servicios/" + valor).once("value", function(snapshotservice) {
              var dato = snapshotservice.val();
              self.serviciosNames.push(dato.servicio);
            });
          });
          console.log(self.serviciosNames);
        });
        

        
    },
    verRealizadas() {
      const self = this;
      const app = self.$f7;
      self.tipoShow='realizada';
      $$('#realizada').addClass('historial-tabs-active');
      $$('#cancelada').removeClass('historial-tabs-active');
      self.obtenerCitas();
    },
    verCanceladas() {
      const self = this;
      const app = self.$f7;
      self.tipoShow='cancelada';
      $$('#realizada').removeClass('historial-tabs-active');
      $$('#cancelada').addClass('historial-tabs-active');
      self.obtenerCitas();
    },
    nextService() {
      const self = this;
      const app = self.$f7;
      console.log(self.servicioSelect);
      if (self.servicioSelect < self.servicios.length - 1) {
        self.servicioSelect++;
      } else {
        self.servicioSelect = 0;
      }
    },
    prevService() {
      const self = this;
      const app = self.$f7;
      console.log(self.servicioSelect);
      if (self.servicioSelect > 0) {
        self.servicioSelect--;
      } else {
        self.servicioSelect = self.servicios.length - 1;
      }
    },
    back() {
      const self = this;
      const app = self.$f7;
      app.popup.close();
    }
  }
};
</script>