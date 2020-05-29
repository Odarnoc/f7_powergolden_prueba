<template>
<!-- TODAS NUESTRAS VARIABLES UTILIZADAS AQUI SON GENERADAS EN EL LOGIN DE LA APLICACION-->
  <f7-page class="page-gray">
    <f7-navbar>
      <topmenu title="Perfil"></topmenu>
    </f7-navbar>

    <f7-block>
      <hr class="hr-form">
      <p class="title-form">Perfil</p>
      <center>
          <!-- LLAMAMOS AL METODO AL HACER CLICK EN LA IMAGEN-->
          <div
            v-if="fotoPerfil != ''"
            class="img-menu-profile-div"
            v-bind:style="{ backgroundImage: 'url(' + fotoPerfil + ')' }"
          ></div>
          <!-- VALIDACION PARA PONER LA FOTO DE PERFIL EN ESTOS CAMPOS-->
          <div v-if="fotoPerfil == ''" class="img-menu-profile-div">
            <i class="far fa-user-circle" style="color:#56565a;font-size: 140px;"></i>
          </div>
          <br>
          <f7-button fill type="button" @click="selctImg()" style="background-color:#f8313e;width:10rem;">Cambiar foto</f7-button>
      </center>
    </f7-block>

    <f7-block>
      <!-- Poner imagen al cambiarlo-->
      <input type="file" name="img" id="img" hidden @change="putImg()" />
      <!-- Forms-->
      <input type="text" v-model="nombre" placeholder="Nombre" />
      <br />
      <input type="email" v-model="correo" placeholder="Correo electrónico" />
      <br />
      <input type="number" v-model="telefono" placeholder="Telefono" />
    </f7-block>

    <f7-block>
      <!-- boton para actualizar informacion-->
      <f7-button fill large type="button" @click="saveProfile()" style="background-color:#f8313e">Guardar cambios</f7-button>
    </f7-block>

<!-- Ventana desplegable cuando se pulse-->
    <f7-popup
      class="popup-confirmar"
      :opened="popupOpened"
      @popup:closed="popupOpened = false"
      style="height: auto !important;margin-top: 50%;"
    >
    <!-- Logotipo-->
      <f7-block>
        <center>
          <i class="far fa-check-circle" style="font-size: 4rem;color: #19ba88;"></i>
        </center>
      </f7-block>
  <!-- Mensaje de exito-->
      <f7-block>
        <center style="font-size: 1.2rem;">{{textExito}}</center>
      </f7-block>
    </f7-popup>

    <toolbar></toolbar>

  </f7-page>
</template>
<script>
import { f7Page, f7Navbar, f7BlockTitle, f7Block } from "framework7-vue";
import topmenu from "./menu-bar";
import toolbar from "./toolbar";
import Dom7 from "dom7/dist/dom7.js";
const $$ = Dom7;
export default {
  components: {
    f7Page,
    f7Navbar,
    f7BlockTitle,
    f7Block,
    topmenu,
    toolbar
  },
  data() {
    return {
      file: null,
      popupOpened: false,
      fotoPerfil: "",
      fotoPerfilAnterior: "",
      nombre: "",
      correo: "",
      telefono: "",
      textExito: "Cambios guardados",
      hora: "",
      pictureID: "",
      verdaderaFotoDePerfil: ""
    };
  },
  created() {
    const self = this;
    const app = self.$f7;
    var uid = localStorage.getItem("uid"); //Llamamos a la variable que contiene el id del usuario que nos genera la bd, esta almacenada en local storage en variable uid generada al moment del login


    console.log("El json original");
    console.log(JSON.parse(localStorage.getItem("user_info"))); //Imprimimos json con datos del usuario que recogemos desde el local storagr
    var perfil = JSON.parse(localStorage.getItem("user_info")); //en la variable llamada user_info que se genera al hacer login

    self.nombre = perfil.full_name;
    self.correo = perfil.email; //nuestras variables generadas que estaban vacias las llamamos con estos datos traidas desde el local storage, guardadas en var perfil
    self.telefono = perfil.phone;
    self.pictureID = perfil.picture;

    var linkFoto =
      "https://www.concita.com.mx:3000/api/v1/image?id=" + perfil.picture; //si el usuario previamente tiene foto de perfil la llamamos en esta parte de la api para mostrarla en el fondo

  //Validaciones, si la foto esta vacia lo dejamos asi, si no sustituimos
    if (perfil.image === null || perfil.image === "") {
      self.fotoPerfil = "";
    } else {
      self.fotoPerfil = linkFoto;
    }
    self.getHora();
  },
  methods: {
    selctImg() { //Metodo para abrir ventana cuando demos click al apartado de la imagen
      const self = this;
      const app = self.$f7;
      $$("#img").click();
    },
    //este metodo la transforma en base64 nuestra imagen
    readURL(input) {
      const self = this;
      const app = self.$f7;
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
          $$("#previewimg").attr("src", e.target.result);
          self.fotoPerfilAnterior = self.fotoPerfil;
          self.fotoPerfil = e.target.result;
          //self.subirImagen(); ********** Este metodo se encargaba en automatico de guardar la imagen en el perfil
          //console.log("datos codificados");
          //console.log(self.fotoPerfil);
          let cambiada = self.fotoPerfil.substring(23, self.fotoPerfil.lenght); 
          //console.log(cambiada);
          self.verdaderaFotoDePerfil = cambiada;
          //console.log(self.fotoPerfil);
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
    //Este metodo cambia la imagen
    putImg() {
      const self = this;
      const app = self.$f7;
      var imgfile = document.getElementById("img");
      self.readURL(imgfile);
    },
    //Este metodo nos regresa a la ventana principal
    cancelar() {
      const self = this;
      const app = self.$f7;
      app.views.main.router.navigate("/home/");
    },
    //este metodo de subir imagen no se necesita porque lo hacemos con el boton de guardar cambios
    subirImagen() {
      const self = this;
      const app = self.$f7;
      var uid = localStorage.getItem("uid");
      var url = localStorage.getItem("url_server");
      let dataJson = {
        user_id: uid,
        image: self.fotoPerfil
      };
      self.$f7.preloader.show();
      app.request.postJSON(
        url + "upload_imagen_perfil.php", //direccion de antiguo api
        {
          data: dataJson
        },
        function result(data) {
          app.preloader.hide();
          console.log(data);
          self.$f7.preloader.hide();
          self.textExito = "Imagen actualizada";
          self.fotoPerfilAnterior = self.fotoPerfil;
          app.popup.open(".popup-confirmar", true);
          setTimeout(() => {
            app.popup.close();
          }, 1000);
        },
        function error(xhr, status) {
          var response = JSON.parse(xhr.response);
          console.log(response);
          self.fotoPerfil = self.fotoPerfilAnterior;
          app.preloader.hide();
          app.dialog.alert(response.mensaje, "Error");
        }
      );
    },
    saveProfile() {
      const self = this;
      const app = self.$f7;
      var dataJson = ""; //variable donde se guarda el json
      var idPicture = ""; //variable que guarda el id la foto que te regresa al hacer el registro

      var uid = localStorage.getItem("uid"); //variable que almacena nuestro id de usuario en el local storage

//esta validacion sirve para generar distintos json en caso de que seleccionemos nueva imagen o no porque asi lo quiere el api, en caso de no haber imagen previa se manda vacio
      if (
        self.verdaderaFotoDePerfil === null ||
        self.verdaderaFotoDePerfil === "" 
      ) {
        dataJson = {
          id: uid,
          role: "client",
          data: {
            full_name: self.nombre,
            email: self.correo,
            phone: self.telefono,
            registration_date: self.hora,
            picture: self.fotoPerfil //si no actualizamos imagen dejamos la misma
          }
        };
      } else {
        dataJson = {
          id: uid,
          role: "client",
          data: {
            full_name: self.nombre,
            email: self.correo,
            phone: self.telefono,
            registration_date: self.hora,
            picture: self.verdaderaFotoDePerfil //si actualizamos mandamos la nueva
          }
        };
      }
      console.log("Json generado");
      console.log(dataJson); //mostramos el json generado
      if (self.validarPerfil(dataJson)) {
        self.$f7.preloader.show(); //request de framework 7, como un ajax pero con metodos propios de este framework - Ver la documentacion request
        app.request({
          url: "https://www.concita.com.mx:3000/api/v1/user/" + uid,
          method: "PUT",
          data: dataJson,
          dataType: "json",
          success: function result(data) {
            app.preloader.hide();
            //console.log("datos mandados si son correctos");
            //console.log(data);
            //console.log("imagen");
            //console.log(data.data.data.picture);
            idPicture = data.data.data.picture; //actualizamos id del producto para mostrarla en el json
            self.$f7.preloader.hide();
            self.textExito = "Cambios guardados";
            app.popup.open(".popup-confirmar", true);
            setTimeout(() => {
              app.popup.close();
            }, 3000);

            localStorage.removeItem("user_info"); //removemos el item porque hemos actualizado los datos
            //console.log("datos enviados"); 
            //actualizamos el picture id generado desde el api para mandarlo al local storage
            dataJson.data.picture = idPicture; 
            //console.log(dataJson.data);
            //generamos nueva variable en el local storage con los datos actualizados
            localStorage.setItem("user_info", JSON.stringify(dataJson.data));
          },
          error: function error(xhr, status) { //metodo inerno de framework7 para saber que hacer si nos da error
            var response = JSON.parse(xhr.response);
            console.log(response);
            app.preloader.hide(); //imprimimos el mensaje que nos devuelva
            app.dialog.alert(response.mensaje, "Error");
          }
        });
      } else {
        app.dialog.alert(self.error, "Error");
      }
    },
    //metodo que nos genera el string donde vamos a guardar la hora de servicio
    getHora() {
      const self = this;
      const app = self.$f7;

      var complete = "";
      var date = new Date();
      var day = date.getDate();
      var month = date.getMonth() + 1;
      var year = date.getFullYear();
      var h = date.getHours();
      var m = date.getMinutes();
      var s = date.getSeconds();

      complete = year + "-" + month + "-" + day + "T" + h + ":" + m + ":" + s;

      self.hora = complete; //mandamos string a variable hora
    },
    //Metodo que valida los campos del formlario
    validarPerfil(form) {
      const self = this;
      const app = self.$f7;
      self.error = "";
      if (!form.data.full_name) {
        self.error = "El Nombre es requerido!";
        return false;
      }
      if (!form.data.email) {
        self.error = "El Email es requerido!";
        return false;
      }
      if (form.data.phone && form.data.phone.length < 10) {
        self.error = "Utiliza minimo 10 digitos en tu telefono.";
        return false;
      }
      return true;
    }
  }
};
</script>