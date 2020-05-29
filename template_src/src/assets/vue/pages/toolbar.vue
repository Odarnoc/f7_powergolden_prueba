<template>
  <f7-toolbar bottom-md style="background-color: #FFF !important;">
      <a href="/home/" class="tab-link" >
        <i style="font-size: 23px !important;" class="fas fa-home"></i>
      </a>
      <a @click="listaProds()" class="tab-link" >
        <i style="font-size: 23px !important;" class="fas fa-clipboard-list"></i>
      </a>
      <a href="/perfil/" class="tab-link">
        <i style="font-size: 23px !important;" class="fas fa-user"></i>
      </a>
      <a href="/notificaciones/" class="tab-link">
        <i style="font-size: 23px !important;" class="fas fa-bell"></i>
      </a>
    </f7-toolbar>
  </template>
  <script>
  export default {
    props: {
      seleccion: String
    },
    data() {
      return {
        homeActivo: '',
        carActivo: '',
        helpActivo: '',
        giftActivo: '',
      };
    },
    created() {
      switch(this.seleccion) {
          case '1':
            this.giftActivo = 'tab-link-active';
            break;
          case '2':
            this.homeActivo = 'tab-link-active';
            break;
          case '3':
            this.carActivo = 'tab-link-active';
            break;
          case '4':
            this.helpActivo = 'tab-link-active';
            break;
          default:
            this.giftActivo ='toolbar-active-select';
            this.homeActivo ='toolbar-active-select';
            this.carActivo ='toolbar-active-select';
            this.helpActivo ='toolbar-active-select';
            break;
        }
    },
    methods: {
      listaProds(){
        const self = this;
        const app = self.$f7;
        self.$store.state.catInicial = '';
        app.views.main.router.navigate('/buscar_filtrar'); 
      },
    },
  };
  </script>