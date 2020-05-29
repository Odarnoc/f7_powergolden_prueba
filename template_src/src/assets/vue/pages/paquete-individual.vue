<template>
  <f7-page class="sec-gray">
    <!--ingresa tu html aqui -->
    <f7-navbar>
      <topmenu></topmenu>
    </f7-navbar>

    <f7-block style="margin-top: 0;">

    </f7-block>

    <toolbar seleccion="2"></toolbar>
    
  </f7-page>
</template>
<script>
    import topmenu from "./menu-bar";
    import toolbar from "./toolbar";
    import seccionbusqueda from "./seccion-busqueda";
    import seccionlineas from "./seccion-lineas";
    export default {
        components: {
        topmenu,
        toolbar,
        seccionbusqueda,
        seccionlineas,
        },
        data() {
        return {
            resultado: []
        };
    },
    created() {
        const self = this;
        const app = self.$f7;



    },
    methods: {

    },
  };
</script>