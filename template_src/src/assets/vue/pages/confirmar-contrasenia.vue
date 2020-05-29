<template>
  <f7-page>
    <f7-navbar>
      <topmenu></topmenu>
    </f7-navbar>
    <f7-block>
          <p class="title-form"><img src="static/logo-ind-color.png" alt="">Recuperar contraseña</p>
          <form class="form-white">

                <p class="t1">Ingresa tu nueva contraseña </p>

                <div style="margin-bottom: 0;" class="form-group">
                    <div class="floating-label-group">
                        <input type="password" v-model="pass" class="form-control input-form" required="">
                        <label class="floating-label">Nueva contraseña</label>
                    </div>
                </div>
                <div style="margin-bottom: 0;" class="form-group">
                    <div class="floating-label-group">
                        <input type="password" v-model="repass" class="form-control input-form" required="">
                        <label class="floating-label">Confirmar contraseña</label>
                    </div>
                </div>

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
      pass:'',
      repass:'',
    };
  },
  created() {
  },
  methods: {
    recuperar(){
        const self = this;
        const app = self.$f7;
        if(self.pass == self.repass){
            app.preloader.show();
            var url = localStorage.getItem("url_server");
            let datos = {
                pass: self.pass,
                pin: self.$store.state.pin
            };
            console.log(datos);
            app.request.post(
                url + "nueva-contrasena.php",
                datos,
                function result(respuesta) {
                    app.preloader.hide();
                    var json_mensaje = JSON.parse(respuesta);
                    console.log(respuesta);
                    if (json_mensaje.error != undefined) {
                        app.dialog.alert(json_mensaje.mensaje,'Error');
                    } else {
                        app.views.main.router.navigate('/contraseniaCambiada/');
                    }
                },
                function error(xhr, status) {
                    app.preloader.hide();
                }
            );
        }else{
            app.dialog.alert("Las contraseñas no coinciden",'Error');
        }
        
    },
  }
};
</script>