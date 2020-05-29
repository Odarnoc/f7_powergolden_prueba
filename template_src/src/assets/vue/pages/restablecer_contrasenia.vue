<template>
<f7-page class="page-gray">
        <f7-block>
          <f7-fab @click="back()" position="left-top" style="background-color: transparent;">
            <i class="fas fa-chevron-left" style="color: #56565a"></i>
          </f7-fab>
            <div class="d-form-login">
                <hr class="hr-form">
                <p class="title-form">Restablecer contraseña</p>
                <p class="sub-title-form" style="text-align: justify;">Ingresa tu nueva contraseña para <span class="text-rosa" style="font-family: roboto-medium;">{{this.$store.state.resetPassEmail}}</span></p>
                <form id="form-login">
                    <div class="form-group">
                        <input type="password" class="form-control input-form" aria-describedby="emailHelp" id="pass" name="pass" placeholder="Contraseña nueva" @input="pass = $event.target.value">
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control input-form" aria-describedby="emailHelp" id="repass" name="repass" placeholder="Repetir contraseña" @input="repass = $event.target.value">
                        <center class="text-rosa" :class="msjEmailValid">
                          Las contraseñas no coinciden
                        </center>
                        <center class="text-rosa" :class="msjPassValid">
                          Las contraseñas debe contener minimo 6 caracteres
                        </center>
                    </div>
                    <button type="button" class="btn btn-red-form" @click="continuar()">Restablecer</button>
                </form>
            </div>
        </f7-block>

        <f7-popup class="popup-confirmar" :opened="popupOpened" @popup:closed="popupOpened = false" style="height: auto !important;margin-top: 50%;">

          <f7-block>
            <center>
              <i class="far fa-check-circle" style="font-size: 4rem;color: #19ba88;"></i>
            </center>
          </f7-block>

          <f7-block>
            <center style="font-size: 1.2rem;">
              Contraseña actualizada
            </center>
          </f7-block>
      </f7-popup>
    </f7-page>
  <!-- <f7-page>
   <f7-fab @click="back()" position="left-top" slot="fixed" style="background-color: transparent;">
        <i class="fas fa-chevron-left" style="color: #56565a"></i>
      </f7-fab>
      <div class="login-screen-title" style="background-color: #f7f7f7;margin: 0px;padding-bottom: 50px;padding-top: 50px;">
          <img src="../../images/logo.png" style="width: 50%;">
      </div>


      <f7-block>
          
          <center>
              Restablecer contraseña:
          </center>
          <center class="text-rosa" >
            {{this.$store.state.resetPassEmail}}
          </center>
          <input type="password" id="pass" name="pass" placeholder="Contraseña nueva" @input="pass = $event.target.value">
          <input type="password" id="repass" name="repass" placeholder="Repetir contraseña" @input="repass = $event.target.value">
          <center class="text-rosa" :class="msjEmailValid">
            Las contraseñas no coinciden
          </center>
          <center class="text-rosa" :class="msjPassValid">
            Las contraseñas debe contener minimo 6 caracteres
          </center>
          <f7-button style="background-color: #19ba88;color: white; margin-top: 1rem;" large raised @click="continuar()">Restablecer</f7-button>
        </f7-block>

        <f7-popup class="popup-confirmar" :opened="popupOpened" @popup:closed="popupOpened = false" style="height: auto !important;margin-top: 50%;">

          <f7-block>
            <center>
              <i class="far fa-check-circle" style="font-size: 4rem;color: #19ba88;"></i>
            </center>
          </f7-block>

          <f7-block>
            <center style="font-size: 1.2rem;">
              Contraseña actualizada
            </center>
          </f7-block>
      </f7-popup>

  </f7-page> -->
</template>
<script>
  import { f7Page, f7Navbar, f7BlockTitle, f7Block } from 'framework7-vue';
  import topmenu from "./menu-bar";
  export default {
    components    : {
      f7Page,
      f7Navbar,
      f7BlockTitle,
      f7Block,
      topmenu,
    },
    data() {
      return {
        popupOpened:false,
        username: '',
        pass:'',
        repass:'',
        msjEmailValid:'ocultar',
        msjPassValid:'ocultar',
      };
    },
    created() {
    },
    methods: {
      continuar() {
          const self = this;
          const app = self.$f7;
          
          if(self.pass === '' || self.pass === null){
            self.msjPassValid = "mostrar";
            setTimeout(() => {
              self.msjPassValid = "ocultar";
            }, 3500);
          }else{
            if(self.pass.length < 6){
              self.msjPassValid = "mostrar";
              setTimeout(() => {
                self.msjPassValid = "ocultar";
              }, 3500);
            }else{
              if(self.pass === self.repass){
                self.cambiarpass();
              }else{
                self.msjEmailValid = "mostrar";
                setTimeout(() => {
                  self.msjEmailValid = "ocultar";
                }, 3500);
              }
            }
          }
          
      },
      cambiarpass(){
        const self = this;
        const app = self.$f7;

        var CryptoJS = require("crypto-js");

        let restData ={
          code:self.$store.state.resetCode,
          password:CryptoJS.MD5(self.pass).toString()
        };
        console.log(restData);

        app.preloader.show();
        var url = localStorage.getItem("url_server");
        
        app.request.postJSON(url+'resetPassword', 
        restData, 
        function result(data) {
          self.msjPassValid = "ocultar";
          self.msjEmailValid = "ocultar";
          console.log('se cambio el pass');
          app.preloader.hide();
          app.popup.open('.popup-confirmar',true);
          setTimeout(() => {
            app.popup.close();
            setTimeout(() => {
              app.views.main.router.navigate('/');
            }, 500);
          }, 3000);
          
        },
        function error(xhr, status) {
          app.preloader.hide();
          var response = JSON.parse(xhr.response);
          console.log(response);
          app.dialog.alert('Código expirado','Error');
        });
        /*
        var user = firebase.auth().currentUser;

        user.updatePassword(newPassword).then(function() {
          self.msjPassValid = "ocultar";
          self.msjEmailValid = "ocultar";
          console.log('se cambio el pass');
          //app.views.main.router.navigate('/');
        }).catch(function(error) {
          // An error happened.
        });
        */
      },
      back(){
        const self = this;
        const app = self.$f7;
        app.views.main.router.back();
      },
    },
  };
</script>