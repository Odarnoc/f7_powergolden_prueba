<template>
  <f7-page>

    <div style="background-color: #f7f7f7ff; width: 100%; height: 100%;">
      <div class="login-screen-title" style="margin: 0;position: absolute;top: 50%;left: 50%;-ms-transform: translate(-50%, -50%);transform: translate(-50%, -50%);">
          <img src="../../images/logo.png" style="width: 50%;">
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