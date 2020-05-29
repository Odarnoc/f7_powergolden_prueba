<template>
  <f7-page>
    <div class="logo-panel-left">
      <center>
        <i class="far fa-bell panel-open" style="font-size: 1.8rem; padding-bottom: .5rem;"></i>
      </center>
      <center>
        <img src="../../images/logo.png" style="width: 50%;">
      </center>
    </div>
    <a @click="openNot()" v-for="notification in data">
      <div style="width: 100%;">
          <h3 style="margin-bottom: 0px;padding-left: 1rem; padding-right: 1rem;text-align: justify;">{{notification.title}}</h3>
      </div>
      <div style="width: 100%;text-align: justify;">
          <p style="margin-top: 0px;padding-left: 1rem; padding-right: 1rem;">{{notification.body}}</p>
      </div>
      <hr style="">
    </a>  
    
  </f7-page>
</template>
<script>
  import { f7Page, f7Block, f7BlockTitle, f7List, f7ListItem, f7Link } from "framework7-vue";
  export default {
    components: {
      f7Page, 
      f7Block, 
      f7BlockTitle, 
      f7List, 
      f7ListItem,
      f7Link
    },
    data() {
      return {
        data:[],
      };
    },
    created() {
      const self = this;
      const app = self.$f7;

      var url = localStorage.getItem("url_server");
      app.request.json(url+'notifications', 
        function (data) {
          console.log(data);
          self.data = data.data;
        },
        function error(xhr, status) {
          var response = JSON.parse(xhr.response);
          console.log(response);
        }
      );
    },
    methods: {
    },
  };
</script>
