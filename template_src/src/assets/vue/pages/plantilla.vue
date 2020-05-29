<template>
  <f7-page>
    <!--ingresa tu html aqui -->
    <topmenu title="Concitas"></topmenu>
    

  </f7-page>
</template>
<script>
  import { f7Page, f7Navbar, f7BlockTitle, f7Block } from 'framework7-vue';
  import topmenu from "./menu-bar";
  export default {
    components: {
      f7Page,
      f7Navbar,
      f7BlockTitle,
      f7Block,
      topmenu,
    },
  };
</script>