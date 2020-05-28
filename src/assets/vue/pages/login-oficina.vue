<template>
  <f7-page>
        <header class="header-home valign" data-overlay-dark="4" data-scroll-index="0">
    <div class="container" style="margin: auto 1rem;width: 100%;">
      <div class="row">
        <div class="col-lg- col-md-5 col-12">
          <div class="d-form-login">
            <div class="d-form">

              <p class="title-form"><img src="static/logo-ind-color.png" alt="">Iniciar sesión</p>
              <center>
                <form id="form-login" style="width:90%;margin-top:2rem;">
                  
                  
                    <div class="" style="margin-top:2rem;">
                      <div class="floating-label-group">
                        <input type="text" class="form-control input-form" required v-model="email">
                        <label class="floating-label">Codigo de socio</label>
                      </div>
                    </div>

                    <div class="">
                      <div class="floating-label-group">
                        <input type="password" class="form-control input-form" required v-model="pass">
                        <label class="floating-label">Pin</label>
                      </div>
                    </div>
                    <br>

                    <f7-button class="btn-lg-blue" style="padding-top: 10px;" @click="login()">Entrar</f7-button>
                  

                </form>
              </center>

              <div class="d-footer-form">
                <div class="row">
                  <div class="col-lg-6 col-md-6">
                    <p class="t4"><a href="/registroOficina/" class="btn-link">Registrarme como socio</a></p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
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
      email:'',
      pass:''
    };
  },
  created() {
  },
  methods: {
    login() {
      const self = this;
      const app = self.$f7;
      
      app.preloader.show();
      var url = localStorage.getItem("url_server");
      var datos = {
        email: self.email,
        pass: self.pass
      };
      console.log(datos);
      app.request.post(
        url + "sesion-oficina.php",
        datos,
        function result(data) {
          app.preloader.hide();
          var json_mensaje = JSON.parse(data);
          console.log(json_mensaje);
          if (json_mensaje.error != undefined) {
            app.dialog.alert(json_mensaje.mensaje,'Error');
          } else {
            if(parseInt(json_mensaje.rol) == 2){
              localStorage.setItem("user_id",parseInt(json_mensaje.id));
              localStorage.setItem("user_rol",parseInt(json_mensaje.rol));

              self.$store.state.user_id = localStorage.getItem("user_id");
              app.views.main.router.navigate('/dashboardOficina/');
            }else{
              app.dialog.alert('Usuario invalido','Error');
            }
          }
          console.log(data);
        },
        function error(xhr, status) {
          
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