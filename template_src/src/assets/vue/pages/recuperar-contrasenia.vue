<template>
  <f7-page>
    <f7-navbar>
      <topmenu></topmenu>
    </f7-navbar>
    <f7-block>
          <p class="title-form"><img src="static/logo-ind-color.png" alt="">Recuperar contraseña</p>
          <form class="form-white">

                <p class="t1">Ingresa el correo electrónico de tu cuenta</p>

                <div style="margin-bottom: 1rem;" class="form-group">
                    <div class="floating-label-group">
                    <input type="text" v-model="email" class="form-control input-form" required="">
                    <label class="floating-label">Correo electrónico</label>
                    </div>
                </div>

                <p class="t2">Enviaremos un código a tu correo electrónico para restablecer tu contraseña</p>

                <f7-button fill large class="mt-30" style="background-color: #49B7F3;" @click="recuperar()">Continuar</f7-button>

            </form>
    </f7-block>
  </f7-page>
</template>
<script>
import topmenu from "./menu-bar";
import Dom7 from "dom7/dist/dom7.js";
var $$ = Dom7;
export default {
  components: {
    topmenu
  },
  data() {
    return {
      email:'',
    };
  },
  created() {
  },
  methods: {
    recuperar(){
        const self = this;
        const app = self.$f7;

        app.preloader.show();
        var url = localStorage.getItem("url_server");
        let datos = {
            email: self.email
        };
        console.log(datos);
        app.request.post(
            url + "recuperar_contrasena.php",
            datos,
            function result(respuesta) {
                app.preloader.hide();
                var json_mensaje = JSON.parse(respuesta);
                console.log(respuesta);
                if (json_mensaje.error != undefined) {
                    app.dialog.alert(json_mensaje.mensaje,'Error');
                } else {
                    app.views.main.router.navigate('/pinContrasenia/');
                }
            },
            function error(xhr, status) {
                app.preloader.hide();
            }
        );
    },
  }
};
</script>