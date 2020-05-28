<template>
  <f7-page>
    <f7-navbar>
      <topmenu></topmenu>
    </f7-navbar>
    <f7-block>
          <p class="title-form"><img src="static/logo-ind-color.png" alt="">Afiliate</p>
          <form class="form-white">
              <div class="floating-label-group">
                  <input type="text" class="form-control input-form" v-model="nombre" required="">
                  <label class="floating-label">Nombre</label>
              </div>
              <div class="floating-label-group">
                  <input type="text" class="form-control input-form" v-model="apellido" required="">
                  <label class="floating-label">Apellido</label>
              </div>
              <div class="floating-label-group">
                  <input type="number" class="form-control input-form" v-model="phone" required="">
                  <label class="floating-label">Teléfono</label>
              </div>
              <div class="floating-label-group">
                  <input type="email" class="form-control input-form" v-model="email" required="">
                  <label class="floating-label">Correo electrónico</label>
              </div>
              <div class="floating-label-group">
                  <input type="password" class="form-control input-form" v-model="pass" required="">
                  <label class="floating-label">Contraseña</label>
              </div>
              <f7-button fill large class="mt-30" style="background-color: #49B7F3;" @click="registrarse()">Aceptar</f7-button>
          </form>
          <div class="d-footer-form">
              <p class="t1">¿Ya tienes una cuenta?</p>
              <p class="t2"><a href="/login/" class="btn-link-active">Iniciar sesión ahora</a></p>
              <div class="mt-30">
                <p class="t3"><a class="btn-link">Términos y condiciones</a></p>
                <p class="t4"><a class="btn-link">Política de privacidad</a></p> 
              </div>   
          </div>
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
      nombre:'',
      apellido:'',
      phone:'',
      email:'',
      pass:'',
    };
  },
  created() {
  },
  methods: {
    registrarse(){
      const self = this;
      const app = self.$f7;

      app.preloader.show();
      var url = localStorage.getItem("url_server");
      var datos = {
        name: self.nombre,
        last_name:self.apellido,
        phone:self.phone,
        email:self.email,
        pass:self.pass,
      };
      console.log(datos);
      app.request.post(
        url + "registro.php",
        datos,
        function result(respuesta) {
          app.preloader.hide();
          var json_mensaje = JSON.parse(respuesta);
          console.log(respuesta);
          if (json_mensaje.error != undefined) {
              app.dialog.alert(json_mensaje.mensaje,'Error');
          } else {
              setTimeout(function(){
                app.views.main.router.navigate('/login/');
              }, 5000);
              app.dialog.alert(json_mensaje.mensaje,'Éxito');
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