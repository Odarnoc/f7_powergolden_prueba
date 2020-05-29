<template>
<f7-page class="page-gray">
        <f7-block>
          <f7-fab @click="back()" position="left-top" style="background-color: transparent;">
            <i class="fas fa-chevron-left" style="color: #56565a"></i>
          </f7-fab>
            <div class="d-form-login">
                <hr class="hr-form">
                <p class="title-form">Pin de confirmacion</p>
                <p class="sub-title-form" style="text-align: justify;">
                  Ingresa los cuatro digitos de confirmacion que enviamos a:
                  <br>
                  <br> 
                  <span class="text-rosa" style="font-family: roboto-medium;">{{this.$store.state.resetPassEmail}}</span> 
                </p>
                <form id="formCode">

                  <div class="row">
                    <div class="col" style="width: 3.2rem;">
                      <center>
                        <input type="number" id="number1" name="number1" placeholder="0" maxlength="1" oninput="if(this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" pattern="^[0-9]*$">
                      </center> 
                    </div>
                    
                    <div class="col" style="width: 3.2rem;">
                      <center>
                        <input type="number" id="number2" name="number2" placeholder="0" maxlength="1" oninput="if(this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" pattern="^[0-9]*$">
                      </center> 
                    </div><div class="col" style="width: 3.2rem;">
                      <center>
                        <input type="number" id="number3" name="number3" placeholder="0" maxlength="1" oninput="if(this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" pattern="^[0-9]*$">
                      </center> 
                    </div><div class="col" style="width: 3.2rem;">
                      <center>
                        <input type="number" id="number4" name="number4" placeholder="0" maxlength="1" oninput="if(this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" pattern="^[0-9]*$">
                      </center> 
                    </div>  
                    
                  </div>
                  
                </form>
                <button type="button" class="btn btn-red-form" @click="continuar()">Continuar</button>
                
                
                <center class="text-rosa" :class="msjEmailValid" style="margin-top:1rem;">
                  Código incorrecto
                </center>
            </div>
        </f7-block>
  </f7-page>
</template>
<script>
  import { f7Page, f7Navbar, f7BlockTitle, f7Block } from 'framework7-vue';
  import topmenu from "./menu-bar";
  import Dom7 from 'dom7/dist/dom7.js';
  var $$ = Dom7;
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
        username: '',
        msjEmailValid:'ocultar',
      };
    },
    created() {
    },
    methods: {
      continuar() {
          const self = this;
          const app = self.$f7;
          var formdata=app.form.convertToData('#formCode');
          var codigo= formdata.number1+''+formdata.number2+''+formdata.number3+''+formdata.number4;
          
          app.preloader.show();
          var url = localStorage.getItem("url_server");
          app.request.postJSON(url+'confirmCode', 
          { 
            code: codigo
          }, 
          function result(data) {
            console.log(data);
            self.msjEmailValid = "ocultar";
            self.$store.state.resetCode=codigo;
            app.preloader.hide();
            app.views.main.router.navigate('/restablecer_contrasenia');
          },
          function error(xhr, status) {
            app.preloader.hide();
            self.msjEmailValid = "mostrar";
            setTimeout(() => {
              self.msjEmailValid = "ocultar";
            }, 3500);
          }); 
      },
      back(){
        const self = this;
        const app = self.$f7;
        app.views.main.router.back();
      },
    },
  };
</script>