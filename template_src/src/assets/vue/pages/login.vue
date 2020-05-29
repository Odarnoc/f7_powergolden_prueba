<template>
  <f7-page>
    <div class="page-content login-screen-content">
      <div class="login-screen-title logo-login-back">
        <img src="../../images/logo.png" style="width: 50%;" />
      </div>
      <f7-row style>
        <f7-col>
          <center>
            <f7-link
              tab-link="#login-tab"
              class="login-tabs"
              id="iniciar"
              @click="activarLogin()"
            >Iniciar sesión</f7-link>
          </center>
        </f7-col>
        <f7-col>
          <center>
            <f7-link
              tab-link="#register-tab"
              class="login-tabs"
              id="registrar"
              @click="activarRegistrar()"
            >Regístrate</f7-link>
          </center>
        </f7-col>
      </f7-row>

      <f7-tabs animated style="height: auto;">
        <f7-tab id="login-tab" tab-active>
          <f7-block>
            <label>Iniciar con Facebook</label>
            <a @click="loginFB()" class="boton-fb">
              <span style="padding-left: 1.5rem;padding-top: .2rem;" class="fab fa-facebook-f"></span>
              <center>Facebook</center>
            </a>
            <form id="form-login">
              <label style="padding-top: 1rem;">Iniciar con correo</label>
              <input type="text" id="fuser" name="username" placeholder="Correo electrónico" />
              <input type="password" id="pass" name="password" placeholder="Contraseña" />
            </form>
            <div
              style="text-align: right;margin-bottom: 1rem;font-family: roboto-medium;font-style: italic;"
            >
              <a href="/olvide-pass/">Olvide mi contraseña</a>
            </div>
            <span style="font-family: roboto-light;padding-top: 1rem;">
              Al registrarse, usted acepta nuestros
              <a href>Terminos de servicio</a>
            </span>
            <f7-button
              style="background-color: #19ba88;color: white; margin-top: 1rem;"
              large
              raised
              @click="signIn()"
            >Continuar</f7-button>
          </f7-block>
        </f7-tab>

        <f7-tab id="register-tab">
          <f7-block>
            <f7-block>
              <label>Regístrate con Facebook</label>
              <a @click="registroFB()" class="boton-fb">
                <span style="padding-left: 1.5rem;padding-top: .2rem;" class="fab fa-facebook-f"></span>
                <center>Facebook</center>
              </a>
              <form id="form-register">
                <label style="padding-top: 1rem;">Regístrate con correo</label>
                <input required type="text" name="name" placeholder="Nombre" />
                <input type="email" id="fuser" name="user" placeholder="Correo electrónico" />
                <input
                  type="number"
                  name="phone"
                  placeholder="Telefono"
                  maxlength="15"
                  oninput="if(this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                  pattern="^[0-9]*$"
                />
                <input type="password" id="pass" name="pass" placeholder="Contraseña" />
                <input type="password" id="repass" name="repass" placeholder="Repetir contraseña" />
              </form>

              <div hidden>
                <center>Selecciona perfil deceado</center>
                <f7-row style="font-size: 3rem;">
                  <f7-col>
                    <center>
                      <a @click="activarUsuario()">
                        <i id="usei" class="fas fa-user"></i>
                      </a>
                    </center>
                  </f7-col>
                  <f7-col>
                    <center>
                      <a @click="activarProveedor()">
                        <i id="provi" class="fas fa-user-tie"></i>
                      </a>
                    </center>
                  </f7-col>
                </f7-row>
                <f7-row style="margin-bottom: 1rem;">
                  <f7-col id="use" style="padding-bottom: .5rem;">
                    <center>
                      <a id="usea" class="text-gris" @click="activarUsuario()">Usuario</a>
                    </center>
                  </f7-col>
                  <f7-col id="prov" style="padding-bottom: .5rem;">
                    <center>
                      <a id="prova" @click="activarProveedor()">Proveedor</a>
                    </center>
                  </f7-col>
                </f7-row>
              </div>

              <span style="font-family: roboto-light;padding-top: 1rem;">
                Al registrarse, usted acepta nuestros
                <a href>Terminos de servicio</a>
              </span>

              <f7-button
                style="background-color: #19ba88;color: white; margin-top: 1rem;"
                large
                raised
                @click="register()"
              >Continuar</f7-button>
            </f7-block>
          </f7-block>
        </f7-tab>
      </f7-tabs>
      <!-- Login form -->
    </div>
    <br />
    <br />

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
import Dom7 from "dom7/dist/dom7.js";
var $$ = Dom7;
export default {
  components: {},
  data() {
    return {
      username: "",
      password: "",
      tipo: "",
      error: "",
      popupOpened: false
    };
  },
  mounted() {
    this.activarLogin();
    this.activarUsuario();
  },
  methods: {
    activarLogin() {
      $$("#iniciar").addClass("login-tabs-active");
      $$("#registrar").removeClass("login-tabs-active");
      $$("#register-tab").addClass("ajustar-tabs");
      $$("#login-tab").removeClass("ajustar-tabs");
    },
    activarRegistrar() {
      $$("#iniciar").removeClass("login-tabs-active");
      $$("#registrar").addClass("login-tabs-active");
      $$("#login-tab").addClass("ajustar-tabs");
      $$("#register-tab").removeClass("ajustar-tabs");
    },
    activarUsuario() {
      const self = this;
      const app = self.$f7;
      self.tipo = "usuario";
      $$("#use").addClass("login-tabs-active");
      $$("#prov").removeClass("login-tabs-active");
      $$("#use").addClass("text-rosa");
      $$("#prov").removeClass("text-rosa");
      $$("#usei").addClass("text-rosa");
      $$("#provi").removeClass("text-rosa");
      $$("#prova").addClass("text-gris");
      $$("#usea").removeClass("text-gris");
    },
    activarProveedor() {
      const self = this;
      const app = self.$f7;
      self.tipo = "proveedor";
      $$("#prov").addClass("login-tabs-active");
      $$("#use").removeClass("login-tabs-active");
      $$("#prov").addClass("text-rosa");
      $$("#use").removeClass("text-rosa");
      $$("#provi").addClass("text-rosa");
      $$("#usei").removeClass("text-rosa");
      $$("#usea").addClass("text-gris");
      $$("#prova").removeClass("text-gris");
    },
    loginFB() {
      const self = this;
      const app = self.$f7;
      var provider = new firebase.auth.FacebookAuthProvider();
      // for Facebook -> prov = new firebase.auth.FacebookAuthProvider();
      firebase
        .auth()
        .signInWithRedirect(provider)
        .then(function() {
          return firebase.auth().getRedirectResult();
        })
        .then(function(response) {
          console.log(response.user.email);
          var CryptoJS = require("crypto-js");
          let datos = {
            email: response.user.email,
            pass: CryptoJS.MD5(response.user.email).toString()
          };
          self.login(datos, "1");
        });
    },
    registroFB() {
      const self = this;
      const app = self.$f7;
      var provider = new firebase.auth.FacebookAuthProvider();
      var CryptoJS = require("crypto-js");

      firebase
        .auth()
        .signInWithRedirect(provider)
        .then(function() {
          return firebase.auth().getRedirectResult();
        })
        .then(function(response) {
          let dataJson = {
            email: response.user.email,
            pass: CryptoJS.MD5(response.user.email).toString(),
            name: response.user.displayName,
            phone: "0"
          };
          console.log("respuesta");
          console.log(response);
          console.log("Json");
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
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
          console.log(error);
          app.dialog.alert(errorMessage, "Error");
        });
    },
    tipoLogin(uid) {
      const self = this;
      const app = self.$f7;
      var provider = false;
      var user = false;
      firebase
        .database()
        .ref("/proveedores/" + uid + "/perfil")
        .once("value")
        .then(function(snapshot) {
          var datos = snapshot.val();
          if (datos != null || datos != undefined) {
            /*localStorage.setItem("tipo", 'proveedores');
            self.$store.state.tipo='proveedores';
            self.$f7.preloader.hide();
            localStorage.setItem("uid", uid);
            location.reload();*/
            self.$f7.preloader.hide();
            app.dialog.alert("Usuario no disponible", "Error");
          }
        });
      firebase
        .database()
        .ref("/usuarios/" + uid + "/perfil")
        .once("value")
        .then(function(snapshot) {
          var datos = snapshot.val();
          if (datos != null || datos != undefined) {
            localStorage.setItem("tipo", "usuarios");
            self.$store.state.tipo = "usuarios";
            self.$f7.preloader.hide();
            localStorage.setItem("uid", uid);
            location.reload();
          } else {
            app.dialog.alert("Usuario no registrado", "Error");
          }
        });
    },
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
          phone: formData.phone
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
      if (!form.phone) {
        self.error = "Telefono requerido.";
        return false;
      }
      if (form.phone.length < 10) {
        self.error = "Utiliza minimo 10 digitos en tu telefono.";
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
    back() {
      const self = this;
      const app = self.$f7;
      app.popup.close();
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
    }
  }
};
</script>
