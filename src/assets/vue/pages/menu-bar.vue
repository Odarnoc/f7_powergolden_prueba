  <template>
      <f7-navbar style="background-color:white">
        <f7-nav-left>
          <img src="static/logo.png" style="width: 12rem;padding-left:1rem;">
        </f7-nav-left>
        <f7-nav-right>
          <f7-link class="panel-open" open-panel="left" icon="fas fa-bars" style="color:#56565a;"></f7-link>
          <!--<i class="far fa-bell panel-open" data-panel="right" open-panel="right" style="margin-right: 20px">
          </i>-->
      </f7-nav-right>
        
      </f7-navbar>
  </template>
  <script>
  import { f7Page, f7Block, f7Navbar, f7NavLeft, f7NavTitle, f7NavTitleLarge, f7NavRight, f7BlockTitle, f7List, f7ListItem, f7Link, f7Searchbar, f7Icon } from 'framework7-vue';
  export default {
    name: 'menubar',
    props: {
      title: String
    },
    components: {
      f7Page,
      f7Navbar,
      f7NavLeft,
      f7NavTitle,
      f7NavTitleLarge,
      f7NavRight,
      f7BlockTitle,
      f7List,
      f7ListItem,
      f7Link,
      f7Searchbar,
      f7Icon,
      f7Block
    },
  }
  </script>
