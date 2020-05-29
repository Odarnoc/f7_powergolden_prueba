<template>
  <f7-page class="page-gray">
        <f7-block>
            <div class="d-form-login">
                <hr class="hr-form">
                <p class="title-form">Iniciar sesión</p>
                <p class="sub-title-form">Inicia sesión con tu correo electrónico</p>
                <form id="form-login">
                    <div class="form-group">
                        <input type="email" class="form-control input-form" id="fuser" name="username" aria-describedby="emailHelp" placeholder="Correo electrónico">
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control input-form" id="pass" name="password" placeholder="Contraseña">
                    </div>
                    <button type="button" class="btn btn-red-form" @click="signIn()">Iniciar sesión</button>
                </form>
                <p class="bottom-text-form">¿Aún no tienes una cuenta? <a @click="goRegister()">Registrarte</a></p>
                <p class="bottom-text-form"><a href="/olvide-pass/">¿Olvidaste tu contraseña?</a></p>
            </div>
        </f7-block>
    </f7-page>
</template>
<script>
import { f7Page, f7Navbar, f7BlockTitle, f7Block } from "framework7-vue";
import topmenu from "./menu-bar";
import Dom7 from "dom7/dist/dom7.js";
var $$ = Dom7;
export default {
  components: {
    topmenu
  },
  data() {
    return {

    };
  },
  created() {
    
  },
  methods: {
      signIn() {
      const self = this;
      const app = self.$f7;
      var formData = app.form.convertToData("#form-login");
      var CryptoJS = require("crypto-js");
      console.log(formData);
      let datos = {
        email: formData.username,
        pass: CryptoJS.MD5(formData.password).toString()
      };
      console.log(datos);
      self.login(datos, "0");
      /*firebase.auth().signInWithEmailAndPassword(formData.user, formData.pass).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.warn(errorMessage);
            self.$f7.preloader.hide();
            app.dialog.alert('Usuario o contraseña invalidos','Error');
          }).then(
            function(data) {
              if(data != null || data != undefined){
                self.tipoLogin(data.user.uid);
              }
          });*/
      //app.views.main.router.navigate('/home/');
    },
    login(datos, tipo) {
      const self = this;
      const app = self.$f7;
      app.preloader.show();
      var url = localStorage.getItem("url_server");
      app.request.postJSON(
        url + "authenticate",
        datos,
        function result(data) {
          app.preloader.hide();
          console.log(data.data.client);
          if (data.data.role === undefined) {
            if (data.data.client !== undefined) {
              datos.role = "client";
              console.log(datos);
              app.request.postJSON(
                url + "authenticate",
                datos,
                function result(data2) {
                  app.preloader.hide();
                  console.log(data2);
                  localStorage.setItem("uid", data2.data.id);
                  localStorage.setItem(
                    "user_info",
                    JSON.stringify(data2.data.data)
                  );
                  localStorage.setItem("tipo", "usuarios");
                  localStorage.setItem("token", data2.token);
                  location.reload();
                },
                function error(xhr, status) {
                  var response = JSON.parse(xhr.response);
                  console.log(response);
                  app.preloader.hide();
                  app.dialog.alert(response.message, "Error");
                }
              );
            } else {
              app.preloader.hide();
              app.dialog.alert(
                "El usuario con el que intentas ingresar no corresponde a un cliente",
                "Error"
              );
            }
          } else {
            if (data.data.role === "client") {
              app.preloader.hide();
              console.log(data.data);
              localStorage.setItem("uid", data.data.id);
              localStorage.setItem("user_info", JSON.stringify(data.data.data));
              localStorage.setItem("tipo", "usuarios");
              localStorage.setItem("token", data.data.token);
              location.reload();
            } else {
              app.preloader.hide();
              app.dialog.alert(
                "El usuario con el que intentas ingresar no corresponde a un cliente",
                "Error"
              );
            }
          }
        },
        function error(xhr, status) {
          var response = JSON.parse(xhr.response);
          console.log(response);
          app.preloader.hide();
          if (tipo === "0") {
            app.dialog.alert(response.message, "Error");
          } else {
            app.dialog.alert(
              "La cuenta con la que intentas ingresar no esta registrada por facebook",
              "Error"
            );
          }
        }
      );
    },
    goRegister(){
        const self = this;
        const app = self.$f7;
        app.views.main.router.navigate('/registro/');
    },
  }
};
</script>