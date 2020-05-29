<template>
  <f7-page>
    <f7-list style="margin-top: 0px;">
      <f7-list-item style="margin-left:.3rem;">
        <img src="../../images/logo.png" style="width: 50%;margin-top:1rem;margin-bottom:1rem;">
      </f7-list-item>
      <f7-list-button style="margin-left:.2rem;" v-if="this.$store.state.tipo=='usuarios'" panel-close href="/home/" title="Inicio"></f7-list-button>
      <f7-list-button style="margin-left:.2rem;" panel-close href="/perfil/" title="Ver perfil"></f7-list-button>
      <f7-list-button style="margin-left:.2rem;" v-if="this.$store.state.tipo=='proveedores'" panel-close href="/servicios/" title="Mis servicios"></f7-list-button>
      <f7-list-button style="margin-left:.2rem;" v-if="this.$store.state.tipo=='proveedores'" panel-close href="/agenda/" title="Agenda"></f7-list-button>
      <f7-list-button style="margin-left:.2rem;" v-if="this.$store.state.tipo=='usuarios'" panel-close href="/agenda/" title="Agenda"></f7-list-button>
      <f7-list-button style="margin-left:.2rem;" v-if="this.$store.state.tipo=='proveedores'" panel-close href="/historial/" title="Historial de citas"></f7-list-button>
      <f7-list-item>
        <f7-button fill round color="red" style="padding-left:1rem;padding-right:1rem;" panel-close @click="logout()">Cerrar sesión</f7-button>
      </f7-list-item>
    </f7-list>
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
      };
    },
    created() {
      const self = this;
      const app = self.$f7;
    },
    methods: {
      logout(){
        const self = this;
        const app = self.$f7;

        localStorage.clear();
        location.reload();
      },
    },
  };
</script>
