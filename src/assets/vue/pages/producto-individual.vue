<template>
  <f7-page>
    <!--ingresa tu html aqui -->
    <f7-navbar>
      <topmenu></topmenu>
    </f7-navbar>

    <seccionbusqueda></seccionbusqueda>

    <f7-block id="inicio" class="sec-gray">
    <div class="container">
        <div class="row">
            <seccionlineas></seccionlineas>
        </div>

        <div class="row">
                <nav aria-label="breadcrumb" style="width:100%">
                    <ol class="breadcrumb" style="list-style: none;display: flex;">
                        <li class="breadcrumb-item" @click="navegar('/home/',0)">Inicio</li>
                        <li class="breadcrumb-item" @click="navegar('/lineas/',info_prod.categoria)">Linea {{info_prod.linea}}</li>
                        <li class="breadcrumb-item" >{{info_prod.nombre}}</li>
                    </ol>
                </nav>
        </div>

        <div class="row row-pro-ind ">
            <div class="col-lg-12 col-md-12 ">
                <div class="d-pro-ind ">
                    <div class="row">
                        <div class="col-lg-4 col-md-4">
                            <div class="d-img-pro-ind ">
                                <img :src="$store.state.url_server+'productos_img/'+info_prod.imagen" alt="">
                            </div>
                        </div>
                        <div class="col-lg-8 col-md-8">
                            <div class="d-info-pro-ind">
                                <div class="row">
                                    <div class="col-lg-8 col-md-8">
                                        <span class="badge badge-disponible" v-if="info_prod.existencia != 0">Disponible: {{info_prod.existencia}} pz.</span>
                                        <span class="badge badge-disponible" style="background-color:#ff4c4c" v-else>No disponible: {{info_prod.existencia}} pz.</span>
                                        <p class="title-pro-ind one-line">{{info_prod.nombre}}</p>
                                    </div>
                                    <div class="col-lg-4 col-md-4">
                                        <p class="price-pro-ind">${{info_prod.precio}}</p>
                                    </div>
                                </div>
                                <p class="sub-title-pro-ind">{{info_prod.descripcion}}</p>
                                <div class="row row-info-pro-ind">
                                    <div class="col-lg-12 col-md-12">
                                        <p class="t1"><b>Ingredientes:</b> {{info_prod.ingredientes}}</p>
                                        <p class="t2"><b>Modo de uso:</b> {{info_prod.uso}}</p>
                                    </div>
                                </div>
                                <div class="row row-cant-pro-ind" v-if="info_prod.existencia != 0">
                                    <div class="col-lg-12 col-md-12">
                                        <form class="form-cant-pro-ind">
                                            <p class="t1"><b>Cantidad</b></p>
                                            <f7-row>
                                                <f7-col width="20">
                                                    <f7-button @click="decrementar()" fill style="margin:1rem 0;background-color: rgba(0,0,0,0.1);color: black;"><strong>-</strong></f7-button>
                                                </f7-col>
                                                <f7-col width="60">
                                                    <input disabled type="number" style="text-align: center" class="form-control cant-number" v-model="cantidad" placeholder="">
                                                </f7-col>
                                                <f7-col width="20">
                                                    <f7-button @click="incrementar()" fill style="margin:1rem 0;background-color: rgba(0,0,0,0.1);color: black;"><strong>+</strong></f7-button>
                                                </f7-col>
                                            </f7-row>
                                            <f7-button type="button" class="btn btn-add-car" @click="agregar()">Agregar al carrito</f7-button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <br>
        <p class="title-sec mb-20">Relacionados</p>
        <br>

        <div class="row">
            <div class="row row-items-pro lista-productos-movil">
                
                <div class="d-all-item-pro" v-bind:key="(item, index)" v-for="(item, index) in prodsRelacionados">
                  <div class="d-item-pro h-100" style="padding-bottom: 1rem;">
                    <div class="row">
                      <f7-col width="40">
                        <div class="d-img-pro">
                          <img :src="$store.state.url_server+'productos_img/'+item.imagen" alt="">
                        </div>
                      </f7-col>
                      <f7-col width="60">
                        <div class="d-info-pro">
                          <p class="t1" :style="'color:'+item.color">Línea {{item.linea}}</p>
                          <p class="t2">{{item.nombre}}</p>
                          <p class="t4 two-lines">{{item.ingredientes}}</p>
                          <br>
                          <a class="btn-blue mt-3" @click="verProd(item.id)" role="button">Ver producto</a>
                        </div>
                      </f7-col>
                    </div>
                  </div>
                </div>


            </div>

        </div>
    </div>

  </f7-block>

    <toolbar></toolbar>
    
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
        info_prod:{},
        prodsRelacionados:[],
        cantidad:1,
      };
    },
    created() {
      const self = this;
      const app = self.$f7;
      app.preloader.show();
      self.obtenerData();
    },
    methods: {
      navegar(ruta,linea){
        const self = this;
        const app = self.$f7;
        self.$store.state.linea = linea;
        app.views.main.router.navigate(ruta); 
      },
      agregar(){
        const self = this;
        const app = self.$f7;
        var carrito = localStorage.getItem('carrito');
        var cant = self.cantidad;
        console.log(self.info_prod);

        self.info_prod.cant = cant;
        var carritoTemporal = [];
        if (carrito == null || carrito == "" || carrito == undefined) {
            carritoTemporal.push(self.info_prod);
            app.dialog.alert('Producto agregado a tu carrito','Éxito');
        } else {
            var badera = true;
            carritoTemporal = JSON.parse(carrito);
            carritoTemporal.forEach(item => {
                if (item.id == self.info_prod.id) {
                    badera = false;
                }
            });
            if (badera) {
                carritoTemporal.push(self.info_prod);
                app.dialog.alert('Producto agregado a tu carrito','Éxito');
            } else {
              app.dialog.alert('El producto seleccionado ya existe en tu carrito','Advertencia');
            }
        }
        console.log(carritoTemporal);
        
        localStorage.setItem('carrito', JSON.stringify(carritoTemporal));
      },
      incrementar(){
        const self = this;
        const app = self.$f7;
        self.cantidad = parseInt(self.cantidad);
        self.cantidad++;
      },
      decrementar(){
        const self = this;
        const app = self.$f7;
        self.cantidad = parseInt(self.cantidad);
        if(self.cantidad == 1){
            return;
        }
        self.cantidad--;
      },
      obtenerData(){
        const self = this;
        const app = self.$f7;
        var url = localStorage.getItem("url_server");
        app.request.get(
          url + "producto-indiv.php",
          {
            producto_id:self.$store.state.prod_id
          },
          function result(data) {
            app.preloader.hide();
            var json_data = JSON.parse(data);
            console.log(json_data);
            self.info_prod = json_data.info_prod;
            self.prodsRelacionados = json_data.relacionados;
          },
          function error(xhr, status) {
            app.preloader.hide();
          }
        );
      },
      verProd(id){
        const self = this;
        const app = self.$f7;
        console.log(id);
        self.$store.state.prod_id = id;
        app.preloader.show();
        self.obtenerData();
        location.href = "#inicio";
      },
    },
  };
</script>