<template>
  <f7-page>
    <!--ingresa tu html aqui -->
    <topmenu title="Notificaciones"></topmenu>
    <f7-block>
      <a v-bind:key="notification" v-for="notification in data">
        <div style="width: 100%;">
            <h3 style="margin-bottom: 0px;padding-left: 1rem; padding-right: 1rem;text-align: justify;">{{notification.title}}</h3>
        </div>
        <div style="width: 100%;text-align: justify;">
            <p style="margin-top: 0px;padding-left: 1rem; padding-right: 1rem;">{{notification.body}}</p>
        </div>
        <hr style="">
      </a>
    </f7-block>
    
    <toolbar></toolbar>
  </f7-page>
</template>
<script>
  import { f7Page, f7Navbar, f7BlockTitle, f7Block } from 'framework7-vue';
  import topmenu from "./menu-bar";
  import toolbar from "./toolbar";
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