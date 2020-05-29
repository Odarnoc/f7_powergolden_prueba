<template>
  <f7-page>
    <!--ingresa tu html aqui -->
    <topmenu title="juan"></topmenu>
    <span>hola</span>

    <div class="block">
      <div class="row">
        <button class="col button button-fill">Button</button>
        <button class="col button button-fill">Button</button>
        <button class="col button button-fill button-round">Round</button>
      </div>
    </div>
    <!-- esto hace lo mismo que lo de arriba -->
    <f7-block>
      <f7-row>
        <f7-col>
          <f7-button fill>Button</f7-button>
        </f7-col>
        <f7-col>
          <f7-button fill>Button</f7-button>
        </f7-col>
        <f7-col>
          <f7-button fill round>Round</f7-button>
        </f7-col>
      </f7-row>
    </f7-block>

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