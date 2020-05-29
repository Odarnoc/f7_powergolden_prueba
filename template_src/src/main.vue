<template>
  <!-- App -->
  <f7-app :params="f7params">
    <f7-statusbar></f7-statusbar>
    <f7-panel left cover>
      <f7-view url="/panel-left/" links-view=".view-main" />
    </f7-panel>
    <f7-panel right cover>
      <f7-view url="/panel-right/" links-view=".view-main" />
    </f7-panel>
    <f7-view :url="inicial" :main="true" class="ios-edges"></f7-view>
  </f7-app>
</template>
<script>
// Import Routes...
import { f7App, f7Panel, f7View, f7Statusbar } from "framework7-vue";
import routes from "./routes.js";
let theme = "md";
if (document.location.search.indexOf("theme=") >= 0) {
  theme = document.location.search.split("theme=")[1].split("&")[0];
}
export default {
  components: {
    f7App,
    f7Panel,
    f7View,
    f7Statusbar
  },
  data() {
    return {
      inicial: "",
      f7params: {
        theme,
        routes,
        id: "io.framework7.testapp"
      }
    };
  },
  methods: {
    handleBackButton() {
      // NOTE: The back button will behave differently depending on circumstance
      // If the side panel is open, close it
      if (document.querySelector(".panel-left.panel-active")) {
        // This will do nothing when the split-view is open
        return this.$f7.panel.close();
      }
      if (document.querySelector(".panel-right.panel-active")) {
        // This will do nothing when the split-view is open
        return this.$f7.panel.close();
      }
      // Close modals
      // @TODO How to handle modals we shouldn't close like a login-screen?
      if (document.querySelector(".modal-in")) {
        return this.$f7.popover.close();
      }
      // If we have a back button, we want it to go back
      if (this.$f7.views.main.router.history.length > 1) {
        return this.$f7.views.main.router.back();
      }
      // Default to closing the app
      return window.navigator.app.exitApp();
    }
  },
  created() {
    //localStorage.setItem("url_server", 'http://feraxconcitaspruebas.000webhostapp.com/');
    localStorage.setItem(
      "url_server",
      "https://www.concita.com.mx:3000/api/v1/"
    );
    document.addEventListener("backbutton", this.handleBackButton);
    var id = localStorage.getItem("uid");
    this.$store.state.tipo = localStorage.getItem("tipo");

    if (id == null || id == undefined) {
      this.inicial = "/";
    } else {
      if (this.$store.state.tipo === "usuarios") {
        this.inicial = "/home/";
      } else {
        this.inicial = "/servicios/";
      }
    }
  }
};
</script>