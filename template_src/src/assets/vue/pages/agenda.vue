<template>
  <f7-page class="page-gray">
    <!--ingresa tu html aqui -->
    <f7-navbar>
      <topmenu title="Agenda"></topmenu>
    </f7-navbar>
    <div id="demo-calendar-inline-container"></div>

    <div style="border-top: solid 2px #f7f7f7;">
      <center v-if="eventos === '0'">
        <br />
        <br />
        <br />
        <span style="color: #b4b7bf; ">Día sin citas</span>
      </center>
      <div v-if="eventos === '1'">
        <!--
        <f7-row style="background-color: #f7f7f7;padding-top: .7rem;padding-bottom: .7rem;">
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
        <img src="../../images/servicio.jpg" width="100%">
        -->

        <f7-block>
          <f7-row
            v-if="(info.fecha === fechaSeleccionadaMostrar) "
            v-for="info in data"
            style="margin-bottom: 1rem;"
          >
            <f7-col width="20" style="padding-top: .5rem;">{{("0" + info.hora).slice(-2)}}:00</f7-col>
            <f7-col width="20">
              <!--<div
                v-if="fotoPerfil != ''"
                class="img-menu-profile-mini"
                v-bind:style="{ backgroundImage: 'url(' + fotoPerfil + ')' }"
              ></div>-->
              <div class="img-menu-profile-mini">
                <i class="far fa-user-circle" style="color:#56565a;font-size: 40px;"></i>
              </div>
            </f7-col>
            <f7-col style="padding-left: .4rem;padding-top: .3rem;">{{info.provider.data.name}}</f7-col>
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
              <!--
              <div
                v-if="fotoPerfil != ''"
                class="img-menu-profile-mini"
                v-bind:style="{ backgroundImage: 'url(' + fotoPerfil + ')' }"
              ></div>-->
              <div class="img-menu-profile-mini">
                <i class="far fa-user-circle" style="color:#56565a;font-size: 40px;"></i>
              </div>
            </f7-col>
            <f7-col style>
              <span style="font-family: roboto-bold;font-size: 1rem;">{{itemDetalle.cliente}}</span>
              <br />
              <span style="font-family: roboto-medium;font-size: .8rem;">Cita para:</span>
              <br />
              <span
                style="font-family: roboto-bold;color: black;font-size: .8rem;"
              >{{fechaSeleccionada+' a las '+("0" + itemDetalle.hora).slice(-2)+':00 hrs'}}</span>
            </f7-col>
            <f7-col width="20"></f7-col>
          </f7-row>
        </f7-block-title>

        <f7-block>
          <img
            :src="'https://www.concita.com.mx:3000/api/v1/image?id='+servicio.image"
            style="width: 100%;"
          />

          <f7-block>
            <f7-block>
              <f7-block>
                <font color="gray">Categoria</font>
                <br />
                <i
                  v-for="cat in servicio.categories"
                  :class="cat.icono"
                  style="font-size:1.5rem;padding-right: 1rem;"
                ></i>
                <br />
                <br />
                <font color="gray">Servicio</font>
                <br />
                <font color="black" size="3">{{servicio.name}}</font>
              </f7-block>
              <f7-block>
                <font color="gray">Prestador del Servicio</font>
                <br />
                <font color="black" size="3">{{itemDetalle.proveedor}}</font>
              </f7-block>

              <f7-block>
                <font color="gray">Descripcion del servicio</font>
                <br />
                <font color="black" size="3">{{itemDetalle.servicioDescripcion}}</font>
              </f7-block>

              <f7-block>
                <font color="gray">Duracion</font>
                <br />
                <font v-if="itemDetalle.servicioDuracion === 60 " color="black" size="3">1 hora</font>
                <font v-if="itemDetalle.servicioDuracion === 120 " color="black" size="3">2 horas</font>
                <font
                  v-if="itemDetalle.servicioDuracion !== 60 && itemDetalle.servicioDuracion !== 120"
                  color="black"
                  size="3"
                >{{itemDetalle.servicioDuracion}} minutos</font>
              </f7-block>

              <f7-block>
                <font color="gray">Telefono</font>
                <br />
                <font color="black" size="3">{{itemDetalle.proveedorTelefono}}</font>
              </f7-block>

              <f7-block>
                <font color="gray">Domicilio</font>
                <br />
                <font color="black" size="3">{{itemDetalle.proveedorDireccion}}</font>
              </f7-block>

              <f7-block>
                <font color="gray">Disponibilidad</font>
                <br />
                <f7-row v-for="horario in servicio.available">
                  <f7-col width="100">
                    <font v-for="(dia,pos) in horario.days" color="black" size="3">
                      <span v-if="dia === 'Mo'">Lu</span>
                      <span v-if="dia === 'Tu'">Ma</span>
                      <span v-if="dia === 'We'">Mi</span>
                      <span v-if="dia === 'Th'">Ju</span>
                      <span v-if="dia === 'Fr'">Vi</span>
                      <span v-if="dia === 'Sa'">Sa</span>
                      <span v-if="dia === 'Su'">Do</span>
                      <span v-if="pos !== (horario.days.length-1)">-</span>
                    </font>
                  </f7-col>
                  <f7-col width="100">
                    <font color="black" size="3">de {{horario.start}} a {{horario.end}}</font>
                  </f7-col>
                </f7-row>
              </f7-block>
              <!--<f7-block>
                  <font color=gray>Disponibilidad</font>
                  <br>
                  <f7-row v-if="item.lu != undefined || item.lu != null">
                    <f7-col width="33">
                      <font color=black size=3>Lunes</font>
                    </f7-col>
                    <f7-col width="66">
                      <font color=black size=3>{{item.lu}}</font>
                    </f7-col>
                  </f7-row>
                  <f7-row v-if="item.ma != undefined || item.ma != null">
                    <f7-col width="33">
                      <font color=black size=3>Martes</font>
                    </f7-col>
                    <f7-col width="66">
                      <font color=black size=3>{{item.ma}}</font>
                    </f7-col>
                  </f7-row>
                  <f7-row v-if="item.mi != undefined || item.mi != null">
                    <f7-col width="33">
                      <font color=black size=3>Miercoles</font>
                    </f7-col>
                    <f7-col width="66">
                      <font color=black size=3>{{item.mi}}</font>
                    </f7-col>
                  </f7-row>
                  <f7-row v-if="item.ju != undefined || item.ju != null">
                    <f7-col width="33">
                      <font color=black size=3>Jueves</font>
                    </f7-col>
                    <f7-col width="66">
                      <font color=black size=3>{{item.ju}}</font>
                    </f7-col>
                  </f7-row>
                  <f7-row v-if="item.vi != undefined || item.vi != null">
                    <f7-col width="33">
                      <font color=black size=3>Viernes</font>
                    </f7-col>
                    <f7-col width="66">
                      <font color=black size=3>{{item.vi}}</font>
                    </f7-col>
                  </f7-row>
                  <f7-row v-if="item.sa != undefined || item.sa != null">
                    <f7-col width="33">
                      <font color=black size=3>Sabado</font>
                    </f7-col>
                    <f7-col width="66">
                      <font color=black size=3>{{item.sa}}</font>
                    </f7-col>
                  </f7-row>
                  <f7-row v-if="item.dom != undefined || item.dom != null">
                    <f7-col width="33">
                      <font color=black size=3>Domingo</font>
                    </f7-col>
                    <f7-col width="66">
                      <font color=black size=3>{{item.dom}}</font>
                    </f7-col>
                  </f7-row>
              </f7-block>-->
              <f7-block>
                <f7-row v-if="servicio.priceType === 'quotation'">
                  <f7-col>
                    <font color="gray">Costo</font>
                    <br />
                    <font color="black" size="3">Sujeto a cotización</font>
                  </f7-col>
                </f7-row>
                <f7-row v-if="servicio.priceType === 'free'">
                  <f7-col>
                    <font color="gray">Costo</font>
                    <br />
                    <font color="black" size="3">Gratuito</font>
                  </f7-col>
                </f7-row>
                <f7-row v-if="servicio.priceType === 'price'">
                  <f7-col>
                    <font color="gray">Costo</font>
                    <br />
                    <font color="black" size="3">${{servicio.cost}}</font>
                  </f7-col>
                  <f7-col>
                    <font color="gray">Tipo de Pago</font>
                    <br />
                    <font color="black" size="3">
                      <i
                        v-for="pago in servicio.payment_methods"
                        :class="pago"
                        style="font-size: 1.2rem;padding-right: 1rem;"
                      ></i>
                    </font>
                  </f7-col>
                </f7-row>
              </f7-block>
              <hr />
            </f7-block>
          </f7-block>
        </f7-block>
      </f7-page>
    </f7-popup>

    <toolbar></toolbar>
    
  </f7-page>
</template>
<script>
import { f7Page, f7Navbar, f7BlockTitle, f7Block } from "framework7-vue";
import topmenu from "./menu-bar";
import toolbar from "./toolbar";
import Dom7 from "dom7/dist/dom7.js";
const $$ = Dom7;
export default {
  components: {
    f7Page,
    f7Navbar,
    f7BlockTitle,
    f7Block,
    topmenu,
    toolbar
  },
  data() {
    return {
      servicioSelect: 0,
      fotoPerfil:
        "https://www.mundodeportivo.com/r/GODO/MD/p5/MasQueDeporte/Imagenes/2018/10/24/Recortada/img_femartinez_20181010-125104_imagenes_md_otras_fuentes_captura-kcOG-U452531892714hYG-980x554@MundoDeportivo-Web.JPG",
      eventos: "0",
      data: [],
      servicios: [],
      serviciosNames: [],
      popupOpened: false,
      listEvents: [],
      diasConEventos: [],
      itemDetalle: {},
      servicio: {},
      fechaSeleccionada: "",
      fechaSeleccionadaMostrar: new Date() + "",
      iconosCat: [
        { icono: "fas fa-paint-brush", nombre: "Arquitectura y arte" },
        { icono: "fas fa-stethoscope", nombre: "Cuidado de enfermería" },
        { icono: "fas fa-car", nombre: "Servicio de mantenimiento automotriz" },
        { icono: "fas fa-star", nombre: "Otra" },
        { icono: "fas fa-video", nombre: "Cine y video" },
        { icono: "fas fa-heart", nombre: "Estilista y cultura de belleza" },
        { icono: "fas fa-wrench", nombre: "Taller Mecánico" },
        { icono: "fas fa-briefcase-medical", nombre: "Citas Médicas" },
        { icono: "fas fa-syringe", nombre: "Laboratorio de análisis clínico" },
        { icono: "fas fa-mobile-alt", nombre: "Tecnología" },
        { icono: "fas fa-child", nombre: "Cuidado Infantil" },
        { icono: "fas fa-magic", nombre: "Mercadotecnia y diseño" },
        { icono: "fas fa-paw", nombre: "Veterinario" },
        { icono: "fas fa-gavel", nombre: "Asesoría legal" },
        { icono: "fas fa-futbol", nombre: "Deportes" },
        { icono: "fas fa-couch", nombre: "Servicios domésticos" }
      ],
      iconosPago: ["far fa-money-bill-alt", "far fa-credit-card"]
    };
  },
  mounted() {
    console.log("creando vista");
    const self = this;
    const app = self.$f7;
    Array.prototype.unique = (function(a) {
      return function() {
        return this.filter(a);
      };
    })(function(a, b, c) {
      return c.indexOf(a, b + 1) < 0;
    });
    self.getAgenda();
  },
  methods: {
    getAgenda() {
      const self = this;
      const app = self.$f7;
      var id = localStorage.getItem("uid");
      var url = localStorage.getItem("url_server");
      app.request.json(
        url + "appointment/" + id,
        {},
        function result(data) {
          data.data.forEach(function(cita) {
            var fecha = new Date(cita.from_date);
            cita.fecha =
              new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate()) +
              "";
            cita.hora = fecha.getHours();
            let ev = {
              date: new Date(
                fecha.getFullYear(),
                fecha.getMonth(),
                fecha.getDate()
              ),
              color: "#f2264f"
            };
            self.data = data.data;
            self.servicios.push(cita.service);
            self.diasConEventos.push(ev);
          });
          console.log(self.data);
          self.iniciarCalendario();
        },
        function error(xhr, status) {
          var response = JSON.parse(xhr.response);
          console.log(response);
          app.dialog.alert(response.mensaje, "Error");
        }
      );
      /*
      firebase.database().ref("citas").orderByChild("user_id").equalTo(id).once("value", function(snapshot) {
          self.data = [];
          self.diasConEventos = [];
          self.servicios = [];
          self.serviciosNames = [];
          snapshot.forEach(function(childSnapshot) {
            var dato = childSnapshot.val();
            let ev = {
              date: new Date(dato.fecha),
              color: "#f2264f"
            };
            self.servicios.push(dato.service_id);
            self.diasConEventos.push(ev);
            firebase.database().ref("proveedores/" + dato.proovedor_id + "/perfil").once("value", function(snapshot2) {
                var usuario = snapshot2.val();
                dato.name = usuario.nombre;
                dato.foto = "";
                ///////////////////////////////
                if(usuario.image === null || usuario.image === undefined || usuario.image === ''){
                   self.fotoPerfil='';
                }else{
                  self.obtenerUrlImagen(usuario.image);
                }
                /////////////////////////////////
                self.data.push(dato);
              });
          });
          var tempo = self.servicios.filter(function(
            valor,
            indiceActual,
            arreglo
          ) {
            let indiceAlBuscar = arreglo.indexOf(valor);
            if (indiceActual === indiceAlBuscar) {
              return true;
            } else {
              return false;
            }
          });
          self.servicios = tempo;
          self.servicios.forEach(function(valor, index) {
            firebase.database().ref("servicios/" + valor).once("value", function(snapshotservice) {
                var dato = snapshotservice.val();
                self.serviciosNames.push(dato.servicio);
              });
          });
          console.log(self.servicios);
          console.log(self.serviciosNames);
          setTimeout(() => {
            console.log("termino espera");
            self.iniciarCalendario();
          }, 500);
        });*/
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
    verDetalles(item) {
      const self = this;
      const app = self.$f7;

      self.servicio = item.service;
      self.itemDetalle = item;
      self.itemDetalle.proveedor = item.provider.data.name;
      self.itemDetalle.cliente = item.client.data.full_name;
      self.itemDetalle.proveedorTelefono = item.provider.data.phone;
      self.itemDetalle.proveedorDireccion = item.provider.data.address;
      self.itemDetalle.servicioDescripcion = item.service.description;
      self.itemDetalle.servicioDuracion = item.service.duration;

      console.log(item);

      var catTemp = [];
      self.servicio.categories.forEach(function(categoria) {
        self.iconosCat.forEach(function(JsonCategoria) {
          if (categoria === JsonCategoria.nombre) {
            catTemp.push(JsonCategoria);
          }
        });
      });
      var pagoTemp = [];
      self.servicio.payment_methods.forEach(function(tipo) {
        if (tipo === "cash") {
          pagoTemp.push(self.iconosPago[0]);
        } else {
          pagoTemp.push(self.iconosPago[1]);
        }
      });
      self.servicio.payment_methods = pagoTemp;
      self.servicio.categories = catTemp;
      /*
      var lunes = "";
      var martes = "";
      var miercoles = "";
      var jueves = "";
      var viernes = "";
      var sabado = "";
      var domingo = "";
      var texto = "";
      firebase.database().ref("servicios/" + item.service_id).once("value", function(snapshot) {
          var dato = snapshot.val();
          if (dato.status === 1) {
            if (dato.lunes != null || dato.lunes != undefined) {
              lunes = self.ajustarHorario(
                dato.lunes.sort(function(a, b) {
                  return a - b;
                })
              );
              dato.lu = lunes;
            }
            if (dato.martes != null || dato.martes != undefined) {
              martes = self.ajustarHorario(
                dato.martes.sort(function(a, b) {
                  return a - b;
                })
              );
              dato.ma = martes;
            }
            if (dato.miercoles != null || dato.miercoles != undefined) {
              miercoles = self.ajustarHorario(
                dato.miercoles.sort(function(a, b) {
                  return a - b;
                })
              );
              dato.mi = miercoles;
            }
            if (dato.jueves != null || dato.jueves != undefined) {
              jueves = self.ajustarHorario(
                dato.jueves.sort(function(a, b) {
                  return a - b;
                })
              );
              dato.ju = jueves;
            }
            if (dato.viernes != null || dato.viernes != undefined) {
              viernes = self.ajustarHorario(
                dato.viernes.sort(function(a, b) {
                  return a - b;
                })
              );
              dato.vi = viernes;
            }
            if (dato.sabado != null || dato.sabado != undefined) {
              sabado = self.ajustarHorario(
                dato.sabado.sort(function(a, b) {
                  return a - b;
                })
              );
              dato.sa = sabado;
            }
            if (dato.domingo != null || dato.domingo != undefined) {
              domingo = self.ajustarHorario(
                dato.domingo.sort(function(a, b) {
                  return a - b;
                })
              );
              dato.dom = domingo;
            }
            self.servicio = dato;
          }
        });
      self.itemDetalle = item;*/
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
    iniciarCalendario() {
      const self = this;
      const app = self.$f7;
      console.log("creando calendario");
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
      console.log(self.diasConEventos);
      var calendarInline = app.calendar.create({
        containerEl: "#demo-calendar-inline-container",
        value: [new Date()],
        events: self.diasConEventos,
        weekHeader: false,
        dateFormat: "dd-mm-yyyy",
        dayNames: [
          "Domingo",
          "Lunes",
          "Martes",
          "Miercoles",
          "Jueves",
          "Viernes",
          "Sabado"
        ],
        dayNames: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
        monthNames: monthNames,
        renderToolbar: function() {
          return (
            '<div class="toolbar calendar-custom-toolbar no-shadow">' +
            '<div class="toolbar-inner">' +
            '<div class="left">' +
            '<a href="#" class="link icon-only"><i id="calendario-left" class="fas fa-caret-left"></i>' +
            "</div>" +
            '<div class="center"></div>' +
            '<div class="right">' +
            '<a href="#" class="link icon-only"><i id="calendario-right" class="fas fa-caret-right"></i></a>' +
            "</div>" +
            "</div>" +
            "</div>" +
            '<div class="calendar-week-header">' +
            '<div class="calendar-week-day">Lu</div>' +
            '<div class="calendar-week-day">Ma</div>' +
            '<div class="calendar-week-day">Mi</div>' +
            '<div class="calendar-week-day">Ju</div>' +
            '<div class="calendar-week-day">Vi</div>' +
            '<div class="calendar-week-day">Sa</div>' +
            '<div class="calendar-week-day">Do</div>' +
            "</div>"
          );
        },
        on: {
          init: function(c) {
            $$(".calendar-custom-toolbar .center").text(
              monthNames[c.currentMonth] + " " + c.currentYear
            );
            $$(".calendar-custom-toolbar .left .link").on("click", function() {
              calendarInline.prevMonth();
            });
            $$(".calendar-custom-toolbar .right .link").on("click", function() {
              calendarInline.nextMonth();
            });
          },
          monthYearChangeStart: function(c) {
            $$(".calendar-custom-toolbar .center").text(
              monthNames[c.currentMonth] + " " + c.currentYear
            );
            $$(".calendar-day-events")
              .parent()
              .addClass("text-rosa");
          },
          dayClick: function(calendar, dayEl, year, month, day) {
            if ($$(dayEl).hasClass("calendar-day-has-events")) {
              self.eventos = "1"; //tiene eventos
            } else {
              self.eventos = "0"; //no tiene eventos
            }
            self.fechaSeleccionada =
              day + " de " + monthNames[month] + " " + year;
            self.fechaSeleccionadaMostrar = new Date(year, month, day) + "";
          }
        }
      });
      $$(".calendar-day-events")
        .parent()
        .addClass("text-rosa");
      console.log("terminando calendario");
    },
    obtenerUrlImagen(nombreImagen) {
      const self = this;
      const app = self.$f7;
      firebase
        .storage()
        .ref()
        .child("ImagenesPerfil/" + nombreImagen)
        .getDownloadURL()
        .then(function(url) {
          console.log(url);
          self.fotoPerfil = url;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    back() {
      const self = this;
      const app = self.$f7;
      app.popup.close();
    }
  }
};
</script>