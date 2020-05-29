<template>
  <f7-page class="page-gray">
        <f7-block>
            <div class="d-form-login">
                <hr class="hr-form">
                <p class="title-form">Registrarte</p>
                <p class="sub-title-form">Para registrarte completa el siguiente formulario</p>
                <form id="form-register">
                    <div class="form-group">
                            <input type="text" name="name" class="form-control input-form" placeholder="Nombre *">
                        </div>
                        <div class="form-group">
                            <input type="email" id="fuser" name="user" class="form-control input-form" aria-describedby="emailHelp" placeholder="Correo electrónico *">
                        </div>
                        <div class="form-group">
                          <input type="password" id="pass" name="pass" class="form-control input-form" placeholder="Contraseña">
                        </div>
                        <div class="form-group">
                          <input type="password" id="repass" name="repass" class="form-control input-form" placeholder="Repetir contraseña">
                        </div>
                    <button type="button" class="btn btn-red-form" @click="register()">Registrarte ahora</button>
                </form>
                <p class="bottom-text-form">¿Ya tienes una cuenta?<br><a @click="goLogin()">Iniciar sesión</a></p>
            </div>
        </f7-block>
        <f7-popup
          class="popup-confirmar"
          :opened="popupOpened"
          @popup:closed="popupOpened = false"
          style="height: auto !important;margin-top: 50%;"
        >
          <f7-block>
            <center>
              <i class="far fa-check-circle" style="font-size: 4rem;color: #19ba88;"></i>
            </center>
          </f7-block>

          <f7-block>
            <center style="font-size: 1.2rem;">Registro exitoso</center>
            <center style="font-size: 1.2rem;">Revisa tu correo para completar el registro</center>
            <f7-button
              style="background-color: #19ba88;color: white; margin-top: 1rem;"
              large
              raised
              @click="aceptRegister()"
            >Aceptar</f7-button>
          </f7-block>
        </f7-popup>
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
      popupOpened: false
    };
  },
  created() {
  },
  methods: {
    aceptRegister() {
      location.reload();
    },
    register() {
      const self = this;
      const app = self.$f7;
      //var url = localStorage.getItem("url_server");
      var formData = app.form.convertToData("#form-register");
      var CryptoJS = require("crypto-js");
      if (self.validarRegistro(formData)) {
        let dataJson = {
          email: formData.user,
          pass: CryptoJS.MD5(formData.repass).toString(),
          name: formData.name,
          phone: ''
        };
        console.log(dataJson);

        app.request.postJSON(
          "https://www.concita.com.mx:3000/api/v1/createclient",
          dataJson,
          function result(data) {
            app.preloader.hide();
            console.log(data);
            app.popup.open(".popup-confirmar", true);
          },
          function error(xhr, status) {
            var response = JSON.parse(xhr.response);
            console.log(response);
            app.preloader.hide();
            app.dialog.alert(response.message, "Error");
          }
        );
        /*
            firebase.auth().createUserWithEmailAndPassword(formData.user, formData.pass).catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              console.log(error)
              if(errorCode==="auth/email-already-in-use"){
                app.dialog.alert('El correo con el que intentas registrarte ya esta en uso','Error');
              }else{
                app.dialog.alert('Tenemos un problema con tu registro','Error');
              }
              
            }).then(
              function(data) {
                firebase.database().ref().child('/'+self.tipo+'/'+data.user.uid+'/perfil').set(dataJson).then(function(data2) {
                  
                  app.popup.open('.popup-confirmar',true); 
                });
                
            });*/
      } else {
        app.dialog.alert(self.error, "Error");
      }
    },
    validarRegistro(form) {
      const self = this;
      const app = self.$f7;
      var correoVal = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i;
      self.error = "";
      if (!form.name) {
        self.error = "Nombre requerido.";
        return false;
      }
      if (!form.user) {
        self.error = "Correo requerido.";
        return false;
      }
      if (!correoVal.test(form.user)) {
        self.error = "Correo invalido.";
        return false;
      }
      if (!form.pass || !form.repass) {
        self.error = "Contraseña requerida.";
        return false;
      }
      if (form.pass.length < 6) {
        self.error = "Utiliza minimo 6 caracteres en tu contraseña.";
        return false;
      }
      if (form.pass !== form.repass) {
        self.error = "Las contraseñas no coinciden";
        return false;
      }
      return true;
    },
    goLogin(){
        const self = this;
        const app = self.$f7;
        app.views.main.router.navigate('/');
    },
  }
};
</script>