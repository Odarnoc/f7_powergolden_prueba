<template>
  <div class="navbar-bottom" id="menu-bottom-movil">
      <a class="item" id="inicio-active" href="/home/" :class="homeActivo"><img src="static/icon-home.svg" alt=""></a>
      <a class="item" v-if="$store.state.user_id == null || $store.state.user_id == undefined || $store.state.user_id == ''" id="carrito-active" href="/login/" :class="carActivo"><img src="static/icon-bag-menu.svg" alt=""></a>
      <a class="item" v-else id="carrito-active" href="/carrito/" :class="carActivo"><img src="static/icon-bag-menu.svg" alt=""></a>
      <a class="item" v-if="$store.state.user_id == null || $store.state.user_id == undefined || $store.state.user_id == ''" id="perfil-active" href="/login/" :class="perfilActivo"><img src="static/icon-user-menu.svg" alt=""></a>
      <a class="item" v-else id="perfil-active" href="/perfil/" :class="perfilActivo"><img src="static/icon-user-menu.svg" alt=""></a>
  </div>
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
        perfilActivo: '',
      };
    },
    created() {
      switch(this.seleccion) {
          case '1':
            this.homeActivo = 'active';
            break;
          case '2':
            this.carActivo = 'active';
            break;
          case '3':
            this.perfilActivo = 'active';
            break;
          default:
            this.homeActivo ='';
            this.carActivo ='';
            this.perfilActivo ='';
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