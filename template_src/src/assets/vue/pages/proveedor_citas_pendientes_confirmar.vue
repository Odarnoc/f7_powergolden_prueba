<template>
  <f7-page>
    <!--ingresa tu html aqui -->

<div class="modal-overlay" id="modal-overlay"></div>

<div class="modal" id="modal">
  <button class="close-button" id="close-button">Obvious Close Button</button>
  <div class="modal-guts">
    <h1>Modal Example</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae expedita corrupti laudantium aperiam, doloremque explicabo ipsum earum dicta saepe delectus totam vitae ipsam doloribus et obcaecati facilis eius assumenda, cumque.</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae expedita corrupti laudantium aperiam, doloremque explicabo ipsum earum dicta saepe delectus totam vitae ipsam doloribus et obcaecati facilis eius assumenda, cumque.</p>
    
  </div>
</div>

<button id="open-button" class="open-button">Open Button</button>    

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
    on: {
      pageInit: function () {
        $$(document).on('page:init', function (e) {
          // Do something here when page loaded and initialized

          
          var modal = document.querySelector("#modal");
          var modalOverlay = document.querySelector("#modal-overlay");
          var closeButton = document.querySelector("#close-button");
          var openButton = document.querySelector("#open-button");

          closeButton.addEventListener("click", function() {
            modal.classList.toggle("closed");
            modalOverlay.classList.toggle("closed");
          });

          openButton.addEventListener("click", function() {
            modal.classList.toggle("closed");
            modalOverlay.classList.toggle("closed");
          });

        });
      },
    },
  };



</script>

<script>

  
</script>
