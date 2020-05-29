<template>
  <f7-page>
    <!--ingresa tu html aqui -->
    <topmenu title="Citas Pendientes"></topmenu>

    <br/> 
      <div class="block">
        <div class="row" id="presentacion"> <!-- Letrero citas pendientes -->
          <div class="col">
            <label style="color: #56565a;font-family: Roboto;font-size: 30px;font-weight: 700;">Citas Pendientes</label>
          </div>
        </div>
      </div>

      <!--div cit agendada -->
      <div class="row" id="cita_agendada" style="width: 100%; background-color: #19ba88; height: 50px; display: none;">
        <div class="col">
          <p style="color: #ffffff;font-family: Roboto;font-size: 14px;font-weight: 700; text-align: center;">Cita Agendada</p>
        </div>
      </div>

      <!--div cit cancelada -->
      <div class="row" id="cita_agendada" style="width: 100%; background-color: #f80041; height: 50px; display: none;">
        <div class="col">
          <p style="color: #ffffff;font-family: Roboto;font-size: 14px;font-weight: 700; text-align: center;">Cita Cancelada</p>
        </div>
      </div>

      <!-- Imagen de portada -->
    <div class="block">
       <img src="../../images/fondo_citas.jpg" style="width: 100%; height: 15%;">

      <!-- Letrero servicio -->
      <div class="row">
        <div class="col-100">
          <p class="text-align-center">Servicios</p>
        </div>
      </div>

      <!--Letrero nombre del servicio -->
      <div class="row">
        <div class="col">
         <p class="text-align-center" style="color: #56565a;font-family: Roboto;font-size: 14px;">Como ser un buen presidente</p>
        </div>
      </div>
      <br/> 

      <div class="row">
        <div class="col">
          <p>Solicitantes</p>
        </div>
      </div>
    </div>

    <!-- Citas agendadas pendientes -->

      <div class="card">
        <div class="card-content">
          <div class="list media-list">
            <ul>
              <li class="item-content">
                <div class="item-media"><img src="https://cdn.framework7.io/placeholder/fashion-88x88-4.jpg" width="44"/></div>
                <div class="item-inner">
                  <div class="item-title-row">
                    <div class="item-title">Barack Obamada</div>
                  </div>
                  <div class="item-subtitle"><b>Cita para:</b> 14 de marzo de 1998</div>
                </div>
              </li>
              <li class="item-content">
                <div class="item-media"><img src="https://cdn.framework7.io/placeholder/fashion-88x88-4.jpg" width="44"/></div>
                <div class="item-inner">
                  <div class="item-title-row">
                    <div class="item-title">Barack Obamada</div>
                  </div>
                  <div class="item-subtitle"><b>Cita para:</b> 14 de marzo de 1998</div>
                </div>
              </li>
              <li class="item-content">
                <div class="item-media"><img src="https://cdn.framework7.io/placeholder/fashion-88x88-4.jpg" width="44"/></div>
                <div class="item-inner">
                  <div class="item-title-row">
                    <div class="item-title">Barack Obamada</div>
                  </div>
                  <div class="item-subtitle"><b>Cita para:</b> 14 de marzo de 1998</div>
                </div>
              </li>
            </ul>
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