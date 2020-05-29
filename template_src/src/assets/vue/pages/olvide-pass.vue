<template>
    <f7-page class="page-gray">
        <f7-block>
          <f7-fab @click="back()" position="left-top" style="background-color: transparent;">
            <i class="fas fa-chevron-left" style="color: #56565a"></i>
          </f7-fab>
            <div class="d-form-login">
                <hr class="hr-form">
                <p class="title-form">Olvide mi contraseña</p>
                <p class="sub-title-form" style="text-align: justify;">Ingresa el correo con la cual estas registrado en <span class="text-rosa" style="font-family: roboto-medium;">CONCITA</span> para poder enviarte un código de confirmación y proceder al cambio de contraseña.</p>
                <form id="form-login">
                    <div class="form-group">
                        <input type="email" class="form-control input-form" aria-describedby="emailHelp" id="fname" name="firstname" placeholder="Correo electrónico" @input="email = $event.target.value">
                        <center class="text-rosa" :class="msjEmailValid">
                          Correo incorrecto
                        </center>
                        <center class="text-rosa" :class="msjEmailNotFound">
                          Correo no registrado
                        </center>
                    </div>
                    <button type="button" class="btn btn-red-form" @click="continuar()">Continuar</button>
                </form>
            </div>
        </f7-block>
    </f7-page>
</template>
<script>
  import { f7Page, f7Block, f7Navbar, f7NavLeft, f7NavTitle, f7NavTitleLarge, f7NavRight, f7BlockTitle, f7List, f7ListItem, f7Link, f7Searchbar, f7Icon } from 'framework7-vue';
  export default {
    components: {
      f7Page,
      f7Navbar,
      f7NavLeft,
      f7NavTitle,
      f7NavTitleLarge,
      f7NavRight,
      f7BlockTitle,
      f7List,
      f7ListItem,
      f7Link,
      f7Searchbar,
      f7Icon,
      f7Block
    },
    data() {
      return {
        username: '',
        password: '',
        msjEmailValid:'ocultar',
        msjEmailNotFound:'ocultar',
      };
    },
    created() {
    },
    methods: {
      validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      },
	    continuar() {
	        const self = this;
	        const app = self.$f7;
          if(self.validateEmail(self.email)){
            app.preloader.show();
            var url = localStorage.getItem("url_server");
            app.request.postJSON(url+'forgotPassword', 
            { 
              role: 'client',
              email:self.email
            }, 
            function result(data) {
              console.log(data);
              self.msjEmailValid = "ocultar";
              self.msjEmailNotFound = "ocultar";
              self.$store.state.resetPassEmail=self.email;
              app.preloader.hide();
              app.views.main.router.navigate('/pin_de_confirmacion');
            },
            function error(xhr, status) {
              app.preloader.hide();
              self.msjEmailNotFound = "mostrar";
              setTimeout(() => {
                self.msjEmailNotFound = "ocultar";
              }, 3500);
            });

            
            /*firebase.auth().sendPasswordResetEmail(self.email).then(function() {
              self.msjEmailValid = "ocultar";
              self.msjEmailNotFound = "ocultar";
              self.$store.state.resetPassEmail=self.email;
              app.views.main.router.navigate('/pin_de_confirmacion');
            }).catch(function(error) {
              console.log(error);
              if(error.code === "auth/user-not-found"){
                self.msjEmailNotFound = "mostrar";
                setTimeout(() => {
                  self.msjEmailNotFound = "ocultar";
                }, 3500);
              }
            });*/
            
          }else{
            self.msjEmailValid = "mostrar";
            setTimeout(() => {
              self.msjEmailValid = "ocultar";
            }, 3500);
          }
	    },
      back(){
        const self = this;
        const app = self.$f7;
        app.views.main.router.back();
      },
	  },
  };
</script>
