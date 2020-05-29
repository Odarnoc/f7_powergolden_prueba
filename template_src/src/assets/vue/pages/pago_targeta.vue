<template>
  <f7-page>
    <f7-navbar title="">
        <div class="title" style="width: 100%; word-wrap: break-word !important;">
          <f7-col width="33" style="font-size: 100% !important; text-align: center; word-wrap: break-word !important;">Pago con targeta</f7-col>
        </div>
    </f7-navbar>
    <f7-block>
        <f7-row>
            <f7-col>
                Tarjetas de crédito
                <br>
                <img width="45%" src="../../images/pagos/cards1.png">
            </f7-col>
        </f7-row>
        <f7-row>
            <f7-col>
                Tarjetas de débito
                <br>
                <img width="100%" src="../../images/pagos/cards2.png">
            </f7-col>
        </f7-row>
        <form id="processCard" name="processCard">
            <label style="font-size: .9rem;">Nombre titular</label>
            <input style="margin-top: 0px;" data-openpay-card="holder_name" size="50" type="text" placeholder="Como aparece en la targeta">
            <label style="font-size: .9rem;">Número de tarjeta</label>
            <input style="margin-top: 0px;" data-openpay-card="card_number" size="50" type="text" placeholder="">
            <label style="font-size: .9rem;">Fecha de expiración</label>
            <f7-row>
                <f7-col>
                    <input style="margin-top: 0px;" data-openpay-card="expiration_month" size="4" type="text" placeholder="Mes">
                </f7-col>
                <f7-col>
                    <input style="margin-top: 0px;" data-openpay-card="expiration_year" size="4" type="text" placeholder="Año">
                </f7-col>
            </f7-row>
            <label style="font-size: .9rem;">Código de seguridad</label>
            <f7-row>
                <f7-col width="35">
                    <input data-openpay-card="cvv2" size="5" type="text" placeholder="CVV2">
                </f7-col>
                <f7-col width="65">
                    <img style="margin-top: 1.4rem;" src="../../images/pagos/cvv.png">
                </f7-col>
            </f7-row>

            <f7-row>
                <f7-col width="">
                    Transacciones realizadas vía:
                    <br>
                    <img width="30%" style="margin-top: 1.2rem;" src="../../images/pagos/openpay.png">
                </f7-col>
            </f7-row>
            <f7-row>
                <f7-col width="15">
                    <img width="100%" style="margin-top: 1.2rem;" src="../../images/pagos/security.png">
                </f7-col>
                <f7-col width="85" style="margin-top: 1.1rem;">
                    Tus pagos se realizan de forma segura con encriptación de 256 bits
                </f7-col>
            </f7-row>
            <f7-button id="makeRequestCard" style="background-color: #19ba88;color: white; margin-top: 1rem;" large raised>Pagar</f7-button>
        </form>
    </f7-block>
    
  </f7-page>
</template>
<script>
  import { f7Page, f7Navbar, f7BlockTitle, f7Block } from 'framework7-vue';

  export default {
    components: {
      f7Page,
      f7Navbar,
      f7BlockTitle,
      f7Block,
    },
  };
</script>