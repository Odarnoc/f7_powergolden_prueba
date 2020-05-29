  <template>
    <f7-block style="background-color:#fff;">
      <f7-row>
          <f7-col>
              <form class="f-search-home">
                  <f7-row class="form-row">
                      <f7-col width="80" class="form-group">
                          <input name="busqueda" v-model="busqueda" type="text" class="form-control input-search" placeholder="Buscar productos">
                      </f7-col>
                      <f7-col width="20" class="form-group text-center">
                          <f7-button class="btn-search" @click="buscar()" style="margin-top:1rem" role="button"><img src="static/icon-search-white.svg" alt=""></f7-button>
                      </f7-col>
                  </f7-row>
              </form>
          </f7-col>
      </f7-row>
    </f7-block>
  </template>
  <script>
  export default {
    name: 'seccion-busqueda',
    props: {
      busqueda: String
    },
    components: {
    },
    methods: {
      buscar(){
        const self = this;
        const app = self.$f7;
        self.$store.state.busqueda = self.busqueda;
        app.views.main.router.navigate('/productos/'); 
      },
    },
  }
  </script>