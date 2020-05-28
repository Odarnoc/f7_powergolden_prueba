<template>
  <f7-page>
    <!--ingresa tu html aqui -->
    <f7-navbar>
      <topmenu></topmenu>
    </f7-navbar>

    <header class="header-int valign header-contacto" data-overlay-dark="5" data-scroll-index="0">
        <div class="container" style="margin-right: auto;margin-left: auto;">
            <f7-block>
                <div class="row">
                    <div class="col">
                        <p class="title-header-int">
                            Contacto
                        </p>

                    </div>
                </div>
            </f7-block>
        </div>

    </header>

    <f7-block style="margin-bottom:90px">
      <div class="row">

        <div class="col">
          <div class="d-form-contacto">

            <p class="t1">¿En qué podemos ayudarte?</p>
            <p class="t2">¡Escribenos! en breve nos pondremos en contacto.</p>

            <center>
              <form style="width:90%;margin-top:2rem;">
                
                  <div class="" style="margin-top:2rem;">
                    <div class="floating-label-group">
                      <input type="text" class="form-control input-form" required v-model="name">
                      <label class="floating-label">Nombre</label>
                    </div>
                  </div>

                  <div class="">
                    <div class="floating-label-group">
                      <input type="email" class="form-control input-form" required v-model="mail">
                      <label class="floating-label">Correo electrónico</label>
                    </div>
                  </div>

                  <div class="">
                    <div class="floating-label-group">
                      <input type="number" class="form-control input-form" required v-model="phone">
                      <label class="floating-label">Teléfono</label>
                    </div>
                  </div>

                  <div class="">
                    <div class="floating-label-group">
                      <textarea class="form-control input-form" id="mensaje" rows="3" required v-model="mensaj"></textarea>
                      <label class="floating-label">Mensaje</label>
                    </div>
                  </div>

                  <f7-button type="button" @click="enviar()" class="btn btn-lg-blue">Enviar</f7-button>
              </form>
            </center>
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
  export default {
    components: {
      topmenu,
      toolbar,
    },
    data() {
      return {
        name:'',
        mail:'',
        phone:'',
        mensaj:'',
      };
    },
    created() {
      console.log(localStorage.getItem("tipo"));
    },
    methods: {
      enviar(){
        const self = this;
        const app = self.$f7;

        app.preloader.show();
        var url = localStorage.getItem("url_server");

        var datos = {
          name:self.name,
          mail:self.mail,
          phone:self.phone,
          mensaj:self.mensaj,
        };

        console.log(datos);
        app.request.post(
          url + "contacto.php",
          datos,
          function result(data) {
            app.preloader.hide();
            var json_mensaje = JSON.parse(data);
            console.log(json_mensaje);
            if (json_mensaje.error != undefined) {
              app.dialog.alert(json_mensaje.mensaje,'Error');
            } else {
              app.dialog.alert(json_mensaje.mensaje,'Éxito');
            }
            console.log(data);
            app.views.main.router.navigate('/home/');
          },
          function error(xhr, status) {
            app.preloader.hide();
          }
        );
      },
    },
  };
</script>