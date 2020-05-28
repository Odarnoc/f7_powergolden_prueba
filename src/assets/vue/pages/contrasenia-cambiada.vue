<template>
  <f7-page>
    <f7-navbar>
      <topmenu></topmenu>
    </f7-navbar>
    <f7-block>
        <div class="d-listo">
            <img src="static/icon-check.svg" alt="">
            <p class="t1">¡Listo!</p>
            <p class="t2">Su contraseña se ha cambiado correctamente</p>
            <f7-button href="/login/" fill large class="mt-30" style="background-color: #49B7F3;">Iniciar sesión</f7-button>
        </div>
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
    };
  },
  created() {
  },
  methods: {
  }
};
</script>