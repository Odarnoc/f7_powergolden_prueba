<template>
  <f7-page class="page-gray">
    <!--ingresa tu html aqui -->
    <f7-navbar>
      <topmenu title="Concita"></topmenu>
    </f7-navbar>

    <div class="block">
      <hr class="hr-form">
      <p class="title-form">Servicios</p>

      <f7-row>
            <f7-col width="80">
              <input
                class="input-search-servicios"
                v-model="choice"
                type="text"
                name="buscar"
                id="busqueda"
                placeholder="Buscar"
                style="border-radius: 100px;background-color: #f9f9f9;"
              />
            </f7-col>
            <f7-col width="20">
              <a @click="aplicar()">
                <i class="fas fa-search btn-search"></i>
              </a>
            </f7-col>
      </f7-row>

      <div class="row">
        <div class="col">
          <p class="sub-title-form">Servicios disponibles ({{dataSearch.length}})</p>
        </div>
      </div>

      <div class="row">
        <div class="col" style="text-align: end;">
          <f7-link @click="verCatsBtn()">Ver categorias</f7-link>
        </div>
      </div>
    </div>

    <center v-if="dataSearch.length === 0">
      <br />
      <br />
      <br />
      <span style="color: #b4b7bf; ">No se encontraron resultados</span>
    </center>

    <f7-card v-else style="border-radius:15px;margin-bottom:30px;box-shadow: 0px 30px 70px 0px rgba(12, 0, 46, 0.1);" v-for="item in dataSearch">
      <f7-card-header
        class="no-border"
        valign="bottom"
        :style="'background-repeat: no-repeat;background-size: contain;height: 180px;background-image:url(https://www.concita.com.mx:3000/api/v1/image?id='+item.image+');border-top-right-radius: 15px;border-top-left-radius: 15px;'"
      ></f7-card-header>
      <f7-card-content>
        <div class="d-info-servicio-usuario">
            <p class="t1">{{item.provider.data.name}}</p>
            <div class="d2">
                <p class="t1">Categoria</p>
                <p v-for="cat in item.categories" class="t2">{{cat.appname}}</p>
            </div>
            <div class="d2">
                <p class="t1">Servicio</p>
                <p class="t2">{{item.name}}</p>
            </div>
            <div class="d2">
                  <f7-row v-if="item.priceType === 'quotation'">
                    <f7-col>
                      <p class="t1">Precio</p>
                      <p class="t2">Sujeto a cotización</p>
                    </f7-col>
                  </f7-row>
                  <f7-row v-if="item.priceType === 'free'">
                    <f7-col>
                      <p class="t1">Precio</p>
                      <p class="t2">Gratuito</p>
                    </f7-col>
                  </f7-row>
                  <f7-row v-if="item.priceType === 'price'">
                    <f7-col>
                      <p class="t1">Precio</p>
                      <p class="t2">${{item.cost}}</p>
                    </f7-col>
                    <f7-col>
                      <p class="t1">Tipo de Pago</p>
                      <p class="t2">
                        <font size="3">
                        <i
                          v-for="pago in item.payment_methods"
                          :class="pago"
                          style="font-size: 1.2rem;padding-right: 1rem;"
                        ></i>
                      </font>
                      </p>
                    </f7-col>
                  </f7-row>
            </div>
            <div class="d3">
                <f7-button large type="button" class="btn-realizar-cita" @click="reservar(item)">Realizar cita</f7-button>
            </div>
        </div>
      </f7-card-content>
    </f7-card>

    <!-- <div class="block">

      <div class="row">
        <div class="col">
          <label style="color: #000000;font-size: 14px;font-weight: 500;">
            <b>Busqueda especifica</b>
          </label>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <input
            v-model="choice"
            type="text"
            name="buscar"
            id="busqueda"
            placeholder="Buscar"
            style="border-radius: 100px;background-color: #f9f9f9;"
          />
        </div>
      </div>

      <div class="row">
        <div class="col">
          <label style="color: #000000;font-size: 14px;font-weight: 500;">
            <b>Filtrar por</b>
          </label>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <label
            style="color: #b4b7bf;font-size: 12px;font-weight: 300;"
          >Puedes seleccionar de 1 a 3 opciones para filtrar</label>
        </div>
      </div>
    </div>

    <f7-block>
      <f7-row>
        <f7-col v-for="(cat, index) in iconosCat" width="33">
          <f7-button
            @click="actAndDisa($event.target);categorias(index);"
            type="button"
            class="categoria-filtrar-boton"
            style="white-space: unset;box-shadow: 0px 2px 4px rgba(0,0,0,0.15);margin-bottom: .7rem;line-height : .85rem;height: 70px;"
          >
            <i :class="cat.icono" style="font-size: 1.4rem;"></i>
            <br />
            {{cat.nombre}}
          </f7-button>
        </f7-col>
      </f7-row>
    </f7-block>

    <f7-toolbar tabbar position="bottom">
      <button
        class="col button button-large"
        @click="limpiarFiltros()"
        style="color: #fb2750;;background-color: white;"
      >Cancelar</button>
      <button
        class="col button button-large"
        style="color: #19BA88;background-color: white;"
        @click="aplicar()"
      >Aplicar</button>
    </f7-toolbar> -->



    <f7-popup
      class="popup-categorias"
      :opened="popupOpened"
      @popup:closed="popupOpened = false"
      style=""
    >
      <f7-page>
        <f7-block>
          <div class="btn-cerrar-cat-sel">
            <f7-link popup-close>
              <i class="fas fa-times"></i>
            </f7-link>
          </div>
          <p class="p-modal"></p>
          <p class="p-modal">Filtrar por:</p>
          <f7-row>
            <f7-col v-bind:key="index" v-for="(cat, index) in iconosCat" width="50">
              <a @click="actAndDisa(index);categorias(index);">
                <div class="d-item-modal-filtrar d-item-modal-filtrar-2">
                    <i v-if="cat.appname != 'Nissan Guadalajara'" :class="cat.icono"></i>
                    <img v-if="cat.appname == 'Nissan Guadalajara'" src="static/logo-nissan.png" style="width:30%">
                    <p class="t1">{{cat.appname}}</p>
                </div>
              </a>
            </f7-col>
          </f7-row>
          <div class="d-btn-aplicar-filtros">
              <a class="btn btn-primary-modal" @click="aplicar()" role="button">Aplicar filtros</a>
          </div>
        </f7-block>
      </f7-page>
    </f7-popup>



    <f7-popup class="results-popup" :opened="popupOpened" @popup:closed="popupOpened = false">
      <f7-page>
        <f7-navbar title="Resultados de búsqueda">
          <f7-nav-right>
            ( {{dataSearch.length}} )
            <f7-link popup-close>
              <i class="fas fa-times"></i>
            </f7-link>
          </f7-nav-right>
        </f7-navbar>
        <f7-block>
          <center v-if="dataSearch.length === 0">
            <br />
            <br />
            <br />
            <span style="color: #b4b7bf; ">No se encontraron resultados</span>
          </center>
          <div v-for="item in dataSearch">
            <img
              :src="'https://www.concita.com.mx:3000/api/v1/image?id='+item.image"
              style="width: 100%;"
            />

            <f7-block>
              <f7-block>
                <f7-block>
                  <font color="gray">Categoria</font>
                  <br />
                  <i
                    v-for="cat in item.categories"
                    :class="cat.icono"
                    style="font-size:1.5rem;padding-right: 1rem;"
                  ></i>
                  <br />
                  <br />
                  <font color="gray">Servicio</font>
                  <br />
                  <font color="black" size="3">{{item.name}}</font>
                </f7-block>
                <f7-block>
                  <font color="gray">Prestador del Servicio</font>
                  <br />
                  <font color="black" size="3">{{item.provider.data.name}}</font>
                </f7-block>

                <f7-block>
                  <font color="gray">Descripcion del servicio</font>
                  <br />
                  <font color="black" size="3">{{item.description}}</font>
                </f7-block>

                <f7-block>
                  <font color="gray">Duracion</font>
                  <br />
                  <font v-if="item.duration === 60 " color="black" size="3">1 hora</font>
                  <font v-if="item.duration === 120 " color="black" size="3">2 horas</font>
                  <font
                    v-if="item.duration !== 60 && item.duration !== 120"
                    color="black"
                    size="3"
                  >{{item.duration}} minutos</font>
                </f7-block>

                <f7-block>
                  <font color="gray">Telefono</font>
                  <br />
                  <font color="black" size="3">{{item.provider.data.phone}}</font>
                </f7-block>

                <f7-block>
                  <font color="gray">Domicilio</font>
                  <br />
                  <font color="black" size="3">{{item.provider.data.address}}</font>
                </f7-block>

                <f7-block>
                  <font color="gray">Disponibilidad</font>
                  <br />
                  <f7-row v-for="horario in item.available">
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
                <f7-block>
                  <f7-row v-if="item.priceType === 'quotation'">
                    <f7-col>
                      <font color="gray">Costo</font>
                      <br />
                      <font color="black" size="3">Sujeto a cotización</font>
                    </f7-col>
                  </f7-row>
                  <f7-row v-if="item.priceType === 'free'">
                    <f7-col>
                      <font color="gray">Costo</font>
                      <br />
                      <font color="black" size="3">Gratuito</font>
                    </f7-col>
                  </f7-row>
                  <f7-row v-if="item.priceType === 'price'">
                    <f7-col>
                      <font color="gray">Costo</font>
                      <br />
                      <font color="black" size="3">${{item.cost}}</font>
                    </f7-col>
                    <f7-col>
                      <font color="gray">Tipo de Pago</font>
                      <br />
                      <font color="black" size="3">
                        <i
                          v-for="pago in item.payment_methods"
                          :class="pago"
                          style="font-size: 1.2rem;padding-right: 1rem;"
                        ></i>
                      </font>
                    </f7-col>
                  </f7-row>
                  <br />
                  <f7-button
                    large
                    raised
                    @click="reservar(item)"
                    class="col button button-outline color-gray"
                    style="background: #02c59b; color: #fff; border-style: none;"
                  >Reservar</f7-button>
                </f7-block>
                <br />
                <br />
                <hr
                  style="height: 1px;
  color: #79808a;
  background-color: #79808a;
  border: none;"
                />
                <br />
                <br />
              </f7-block>
            </f7-block>
          </div>
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
var $$ = Dom7;
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
      choice: "",
      data: [],
      dataSearch: [],
      popupOpened: false,
      listaCategorias: [],
      iconosCat: [],
      iconosPago: ["far fa-money-bill-alt", "far fa-credit-card"]
    };
  },
  created() {
    const self = this;
    const app = self.$f7;
    var lunes = "";
    var martes = "";
    var miercoles = "";
    var jueves = "";
    var viernes = "";
    var sabado = "";
    var domingo = "";
    var texto = "";
    var url = localStorage.getItem("url_server");
    app.request.json(url+'category/', 
      function (data) {
        console.log(data);
        data.data.forEach(function(JsonCategoria) {
          self.iconosCat.push({icono: 'fas '+JsonCategoria.icon, appname: JsonCategoria.name, nombre:JsonCategoria.name});
        });
        app.request.json(
          url + "service",
          {},
          function result(data) {
            data.data.forEach(function(servicio) {
              var catTemp = [];
              servicio.categories.forEach(function(categoria) {
                self.iconosCat.forEach(function(JsonCategoria) {
                  if (categoria === JsonCategoria.nombre) {
                    catTemp.push(JsonCategoria);
                  }
                });
              });
              var pagoTemp = [];
              servicio.payment_methods.forEach(function(tipo) {
                if (tipo === "cash") {
                  pagoTemp.push(self.iconosPago[0]);
                } else {
                  pagoTemp.push(self.iconosPago[1]);
                }
              });
              servicio.payment_methods = pagoTemp;
              servicio.categories = catTemp;
            });
            self.data = data.data;
            console.log(self.data);
            self.aplicarInicial();
            /*
            self.data= [];
            data.servicios.forEach(function(dato) {
              if(dato.Lunes != null || dato.Lunes != undefined){
                lunes = self.ajustarHorario(dato.Lunes.sort(function(a, b){return a - b}));
                dato.lu = lunes;
              }
              if(dato.Martes != null || dato.Martes != undefined){
                martes = self.ajustarHorario(dato.Martes.sort(function(a, b){return a - b}));
                dato.ma = martes;
              }
              if(dato.Miercoles != null || dato.Miercoles != undefined){
                miercoles = self.ajustarHorario(dato.Miercoles.sort(function(a, b){return a - b}));
                dato.mi = miercoles;
              }
              if(dato.Jueves != null || dato.Jueves != undefined){
                jueves = self.ajustarHorario(dato.Jueves.sort(function(a, b){return a - b}));
                dato.ju = jueves;
              }
              if(dato.Viernes != null || dato.Viernes != undefined){
                viernes = self.ajustarHorario(dato.Viernes.sort(function(a, b){return a - b}));
                dato.vi = viernes;
              }
              if(dato.Sabado != null || dato.Sabado != undefined){
                sabado = self.ajustarHorario(dato.Sabado.sort(function(a, b){return a - b}));
                dato.sa = sabado;
              }
              if(dato.Domingo != null || dato.Domingo != undefined){
                domingo = self.ajustarHorario(dato.Domingo.sort(function(a, b){return a - b}));
                dato.dom = domingo;
              }
            });
            self.contSer = data.servicios.length
            self.data= data.servicios;
            console.log(data.servicios);
            */
          },
          function error(xhr, status) {
            var response = JSON.parse(xhr.response);
            console.log(response);
            app.dialog.alert(response.mensaje, "Error");
          }
        );
      },
      function error(xhr, status) {
        var response = JSON.parse(xhr.response);
        console.log(response);
      }
    );
    

    /* firebase.database().ref('/servicios/').on('value',function(snapshot){
        self.data= [];
          snapshot.forEach(function(childSnapshot){
            var dato=childSnapshot.val();
            if(dato.status === 1){
              dato.service_id = childSnapshot.key;
              if(dato.lunes != null || dato.lunes != undefined){
                lunes = self.ajustarHorario(dato.lunes.sort(function(a, b){return a - b}));
                dato.lu = lunes;
              }
              if(dato.martes != null || dato.martes != undefined){
                martes = self.ajustarHorario(dato.martes.sort(function(a, b){return a - b}));
                dato.ma = martes;
              }
              if(dato.miercoles != null || dato.miercoles != undefined){
                miercoles = self.ajustarHorario(dato.miercoles.sort(function(a, b){return a - b}));
                dato.mi = miercoles;
              }
              if(dato.jueves != null || dato.jueves != undefined){
                jueves = self.ajustarHorario(dato.jueves.sort(function(a, b){return a - b}));
                dato.ju = jueves;
              }
              if(dato.viernes != null || dato.viernes != undefined){
                viernes = self.ajustarHorario(dato.viernes.sort(function(a, b){return a - b}));
                dato.vi = viernes;
              }
              if(dato.sabado != null || dato.sabado != undefined){
                sabado = self.ajustarHorario(dato.sabado.sort(function(a, b){return a - b}));
                dato.sa = sabado;
              }
              if(dato.domingo != null || dato.domingo != undefined){
                domingo = self.ajustarHorario(dato.domingo.sort(function(a, b){return a - b}));
                dato.dom = domingo;
              }
              self.data.push(dato);
            }
        });
          self.contSer = self.data.length
      });*/
  },
  methods: {
    limpiarFiltros() {
      const self = this;
      const app = self.$f7;
      var forEach = Array.prototype.forEach;
      self.listaCategorias = [];

      var catsShows = $$(".boton-active-categoria");

      forEach.call(catsShows, function(elemtoHtml) {
        $$(elemtoHtml).removeClass("boton-active-categoria");
      });

      self.choice = "";
    },
    quitarAcentos(string) {
      var accent_map = {
        á: "a",
        é: "e",
        è: "e",
        í: "i",
        ó: "o",
        ú: "u",
        Á: "a",
        É: "e",
        è: "e",
        Í: "i",
        Ó: "o",
        Ú: "u"
      };
      if (!string) {
        return "";
      }
      var ret = "";
      for (var i = 0; i < string.length; i++) {
        ret += accent_map[string.charAt(i)] || string.charAt(i);
      }
      return ret;
    },
    reservar(servicio) {
      console.log("reservar");
      const self = this;
      const app = self.$f7;
      self.$store.state.servicioAReservar = servicio;
      app.views.main.router.navigate("/fecha_de_cita");
      app.popup.close(".results-popup");
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
    MostrarHorario(lu, ma, mi, ju, vi, sa, dom) {
      const self = this;
      const app = self.$f7;
      var forEach = Array.prototype.forEach;
      var horario = "";
    },
    categorias(value) {
      const self = this;
      const app = self.$f7;
      var forEach = Array.prototype.forEach;
      var eliminar = -1;
      console.log(value);
      if (self.listaCategorias.length === 0) {
        if (self.listaCategorias.length === 3) {
        } else {
          self.listaCategorias.push(value);
        }
      } else {
        forEach.call(self.listaCategorias, function(cat, indice) {
          if (cat === value) {
            eliminar = indice;
          }
        });
        if (eliminar >= 0) {
          self.listaCategorias.splice(eliminar, 1);
        } else {
          if (self.listaCategorias.length === 3) {
          } else {
            self.listaCategorias.push(value);
          }
        }
      }
    },
    aplicarInicial() {
      const self = this;
      const app = self.$f7;
      var forEach = Array.prototype.forEach;
      self.dataSearch = [];
      if(self.$store.state.catInicial == ''){
        self.dataSearch = self.data;
      }else{
        forEach.call(self.data, function(f) {
          console.log(f);
          var banderaVal = 0;
          forEach.call(f.categories, function(f1) {
            if(f1.nombre == self.$store.state.catInicial){
              banderaVal++;
            }
          });
          
          if (banderaVal>0) {
            self.dataSearch.push(f);
          }
        });
      }
    },
    aplicar() {
      const self = this;
      const app = self.$f7;
      var forEach = Array.prototype.forEach;
      self.dataSearch = [];
      forEach.call(self.data, function(f) {
        console.log(f);
        var sercomp = self.quitarAcentos(f.name);
        var prescomp = self.quitarAcentos(f.provider.data.name);
        self.quitarAcentos(self.choice);
        var validacionTitulo =
          sercomp
            .toLowerCase()
            .search(self.quitarAcentos(self.choice).toLowerCase()) == -1;
        var validacionDesc =
          prescomp
            .toLowerCase()
            .search(self.quitarAcentos(self.choice).toLowerCase()) == -1;
        if (validacionTitulo) {
          if (validacionDesc) {
          } else {
            self.dataSearch.push(f);
          }
        } else {
          self.dataSearch.push(f);
        }
      });
      self.filtroCategoria();
    },
    filtroCategoria() {
      const self = this;
      const app = self.$f7;
      var forEach = Array.prototype.forEach;
      if (self.listaCategorias.length !== 0) {
        console.log(self.dataSearch);
        var searchTemp = self.dataSearch;
        self.dataSearch = [];
        var flag = -1;
        forEach.call(searchTemp, function(f) {
          console.log(f);
          flag = -1;
          if (f.categories === null || f.categories === undefined) {
          } else {
            forEach.call(f.categories, function(item) {
              forEach.call(self.listaCategorias, function(item2) {
                console.log(
                  item.nombre + " igual a " + self.iconosCat[item2].nombre
                );
                if (item.nombre === self.iconosCat[item2].nombre) {
                  flag++;
                }
              });
            });
          }
          console.log("bandera " + flag);
          if (flag >= 0) {
            self.dataSearch.push(f);
          }
        });
      }
      app.popup.close(".popup-categorias");
    },
    verCatsBtn(){
      const self = this;
      const app = self.$f7;
      app.popup.open(".popup-categorias");
    },
    verDetallesBtn(){
      const self = this;
      const app = self.$f7;
      app.popup.open(".popup-categorias");
    },
    actAndDisa(index) {
      const self = this;
      const app = self.$f7;
      console.log(self.listaCategorias);
      console.log(index);
      
      var boton = $$('.d-item-modal-filtrar-2')[index];
        if ($$(boton).hasClass("item-modal-active")) {
          $$(boton).removeClass("item-modal-active");
        } else {
          if (self.listaCategorias.length === 3) {
          } else {
            $$(boton).addClass("item-modal-active");
          }
        }
    }
  }
};
</script>