<template>
  <f7-page>
    <div class="page-content">
      <div class="content-block">
        <div class="content-block-inner">
          <p>
            <img
              data-src="http://lorempixel.com/500/500/nature/1"
              width="100%"
              class="lazy lazy-fadeIn"
            >
          </p>
          <p>Lorem ipsum dolor sit amet...</p>

          <p>
            <img
              data-src="http://lorempixel.com/500/500/nature/2"
              width="100%"
              class="lazy lazy-fadeIn"
            >
          </p>
          <p>Aenean id congue orci...</p>

          <p>
            <img
              data-src="http://lorempixel.com/500/500/nature/3"
              width="100%"
              class="lazy lazy-fadeIn"
            >
          </p>
          <p>Pellentesque aliquam ...</p>
...
          <p>
            <b>Using as background image:</b>
          </p>
          <div
            data-background="http://lorempixel.com/500/500/people/10"
            style="background: #aaa; height:60vw; background-size-cover"
            class="lazy lazy-fadeIn"
          ></div>
          <p>Suspendisse potenti. Curabitur ...</p>
        </div>
      </div>
    </div>
  </f7-page>
</template>
  <script>
export default {
  props: {
    seleccion: String
  },
  data() {
    return {};
  },
  created() {},
  methods: {
      selctImg(){
       const self = this;
       const app = self.$f7;
       $$("#img").click();
       //var img = $$("#img").val();
       //this.fotoPerfil = img;
      },
      readURL(input) {
        const self = this;
        const app = self.$f7;
        if (input.files && input.files[0]) {
         var reader = new FileReader();   
         reader.onload = function (e) {
          $$('#previewimg').attr('src', e.target.result);
          self.fotoPerfil =e.target.result;
         }
         reader.readAsDataURL(input.files[0]);
       }
      },
      getExtension(filename){
       var parts = filename.split('.');
       return parts[parts.length-1].toLowerCase();
      },
      putImg(){
        const self = this;
        const app = self.$f7;
        var imgfile = document.getElementById("img");
        self.readURL(imgfile);
        self.file = document.getElementById("img").files[0];
        if (self.file) {
          self.ext = self.getExtension(self.file.name);
        } 
      },
      obtenerUrlImagen(nombreImagen){
        const self = this;
        const app = self.$f7;
        firebase.storage().ref().child('ImagenesPerfil/'+nombreImagen).getDownloadURL().then(function(url) {
        console.log(url);
        self.fotoPerfil = url;
        }).catch(function(error) {
            console.log(error);
          });
      },
  }
};
</script>
