<template>
  <f7-page>
    <topmenu title="Citas Pendientes"></topmenu>

      <div class="block">

        <div class="row" id="presentacion"> <!-- Letrero citas pendientes -->
          <div class="col">
            <label style="color: #56565a;font-family: Roboto;font-size: 30px;font-weight: 700;">Citas Pendientes</label>
          </div>
        </div>

        <div style="width: 100%; min-height: 100vh;position:relative; display:block;">
          <div  style="position:absolute;top:50%; height:50%; text-align:center;margin:10px;">
            <label style="color: #b4b7bf;font-size: 16px;font-weight: 500;">Sin citas pendientes por confirmar</label>
          </div>
        </div>

      </div>

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