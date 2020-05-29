<template>
  <f7-page>
    <f7-list style="margin-top: 0px;margin-bottom: 0px;">
      <f7-list-item style="margin-left:.3rem;">
        <img src="static/logo.png" style="width: 90%;margin-top:1rem;margin-bottom:1rem;">
      </f7-list-item>
      <f7-list-button style="margin-left:.2rem;" panel-close href="/home/" title="Inicio"></f7-list-button>
      <f7-list-button style="margin-left:.2rem;" panel-close href="/sobrePowerGolden/" title="Sobre Power Golden"></f7-list-button>
      <f7-list-button style="margin-left:.2rem;" panel-close href="/contacto/" title="Contacto"></f7-list-button>
      <f7-list-button style="margin-left:.2rem;" panel-close href="/sucursales/" title="Sucursales"></f7-list-button>
      <f7-list-button v-if="$store.state.user_id == null || $store.state.user_id == undefined || $store.state.user_id == ''" style="margin-left:.2rem;" panel-close href="/login/" title="Mi perfil"></f7-list-button>
      <f7-list-button v-else style="margin-left:.2rem;" panel-close href="/perfil/" title="Mi perfil"></f7-list-button>
      <f7-list-button v-if="$store.state.user_id == null || $store.state.user_id == undefined || $store.state.user_id == ''" style="margin-left:.2rem;color: #49B7F3;" panel-close href="/loginOficina/" title="Socios"></f7-list-button>
      <f7-list-button v-else style="margin-left:.2rem;color: #49B7F3;" panel-close @click="logout()" title="Cerrar sesión"></f7-list-button>
    </f7-list>
    <hr>
    <f7-menu v-if="$store.state.user_id != null && $store.state.user_id != undefined && $store.state.user_id != ''">
      <f7-menu-item left text="Oficina virtual" dropdown style="">
        <f7-menu-dropdown left>
          <f7-menu-dropdown-item panel-close href="/dashboardOficina/" text="Dashboard"></f7-menu-dropdown-item>
          <f7-menu-dropdown-item panel-close class="pt-1" href="/registroOficina/" text="Registro"></f7-menu-dropdown-item>
          <f7-menu-dropdown-item panel-close class="pt-1" href="/comprasPaquetes/" text="Paquetes"></f7-menu-dropdown-item>
          <f7-menu-dropdown-item panel-close class="pt-1" href="/folletosElectronicos/" text="Folletos electronicos"></f7-menu-dropdown-item>
          <f7-menu-dropdown-item panel-close class="pt-1" href="/historialCompras/" text="Compras"></f7-menu-dropdown-item>
          <f7-menu-dropdown-item class="pt-1" href="#" text="Mi organización"></f7-menu-dropdown-item>
          <f7-menu-dropdown-item panel-close class="pt-1" href="/reporteOficina/" text="Reportes"></f7-menu-dropdown-item>
        </f7-menu-dropdown>
      </f7-menu-item>
    </f7-menu>
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
        self.$store.state.user_id = '';
        localStorage.setItem("user_id",'');
        localStorage.setItem("user_rol",'');
      },
    },
  };
</script>
