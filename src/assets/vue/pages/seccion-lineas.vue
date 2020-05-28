<template>
    <div id="lineas-asistencia-no-movil" class="col-lg-3 col-md-3">
        <div class="d-lineas">
            <p class="title-sec">LÍneas</p>
            <ul id="lista-lineas">
                <li><a @click="buscarLinea(1)"><i class="fas fa-circle" style="color:#A1775A"></i>Café</a></li>
                <li><a @click="buscarLinea(2)"><i class="fas fa-circle" style="color:#F7D503"></i>Amarilla</a></li>
                <li><a @click="buscarLinea(3)"><i class="fas fa-circle" style="color:#F78FBA"></i>Rosa</a></li>
                <li><a @click="buscarLinea(4)"><i class="fas fa-circle" style="color:#860020"></i>Tinta</a></li>
                <li><a @click="buscarLinea(5)"><i class="fas fa-circle" style="color:#3CC16F"></i>Verde</a></li>
                <li><a @click="buscarLinea(6)"><i class="fas fa-circle" style="color:#49B7F3"></i>Yin Yang</a></li>
                <li><a @click="buscarLinea(7)"><i class="fas fa-circle" style="color:#CA4E36"></i>Estrella</a></li>
            </ul>
        </div>
    </div>
  </template>
  <script>
  export default {
    name: 'seccion-lineas',
    components: {
    },
    methods: {
      buscarLinea(linea){
        const self = this;
        const app = self.$f7;
        self.$store.state.linea = linea;
        var url = localStorage.getItem("url_server");
        app.request.get(
          url + "productos-x-categoria.php",
          {
            categoria:self.$store.state.linea
          },
          function result(data) {
            var json_data = JSON.parse(data);
            console.log(json_data);
            self.$store.state.info_linea = json_data.linea;
            self.$store.state.prods = json_data.productos;
          },
          function error(xhr, status) {
            
          }
        );
        app.views.main.router.navigate('/lineas/'); 
      },
    },
  }
  </script>