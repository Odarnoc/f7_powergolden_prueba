<template>
  <f7-page class="sec-gray">
    <!--ingresa tu html aqui -->
    <f7-navbar>
        <topmenu></topmenu>
    </f7-navbar>

    <f7-block style="margin-top: 0;">

    <f7-row style="margin-bottom: 60px;">
        <f7-col>
          <div class="d-grafica-oficina">
              <f7-button fill style="color:white; "><i class="fas fa-credit-card mr-2" style="margin-right: 10px;"></i>Pago con Tarjeta</f7-button>
          </div>
        </f7-col>
     </f7-row>

    <f7-row style="margin-bottom: 60px;">
        <f7-col>
            <form method="post" id="pay" name="pay" @submit.prevent="submitTarjeta">
                <fieldset>
                    <input type="hidden" name="transaction_amount" id="transaction_amount" value="100">
                    <input type="hidden" name="token" id="token" value="100">
                    <div class="form-group">
                        <div class="floating-label-group">
                            <input type="text" class="form-control input-form-border" id="cardNumber" data-checkout="cardNumber" onselectstart="return false" onpaste="return false" onCopy="return false" onCut="return false" onDrag="return false" onDrop="return false" autocomplete=off />
                            <label class="floating-label">Número de la tarjeta</label>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="floating-label-group">
                            <input type="text" class="form-control input-form-border" id="cardholderName" data-checkout="cardholderName" />
                            <label class="floating-label">Nombre y apellido</label>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="floating-label-group">
                            <input type="text" class="form-control input-form-border" id="cardExpirationMonth" data-checkout="cardExpirationMonth" onselectstart="return false" onpaste="return false" onCopy="return false" onCut="return false" onDrag="return false" onDrop="return false" autocomplete=off />
                            <label class="floating-label">Mes de vencimiento</label>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="floating-label-group">
                            <input type="text" class="form-control input-form-border" id="cardExpirationYear" data-checkout="cardExpirationYear" onselectstart="return false" onpaste="return false" onCopy="return false" onCut="return false" onDrag="return false" onDrop="return false" autocomplete=off />
                            <label class="floating-label">Año de vencimiento</label>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="floating-label-group">
                            <input type="text" class="form-control input-form-border" id="securityCode" data-checkout="securityCode" onselectstart="return false" onpaste="return false" onCopy="return false" onCut="return false" onDrag="return false" onDrop="return false" autocomplete=off />
                            <label class="floating-label">Código de seguridad</label>
                        </div>
                    </div>
                    <div class="form-group" hidden>
                        <div class="floating-label-group">
                            <select class="form-control input-form-border" id="installments" name="installments"></select>
                            <label class="floating-label">Cuotas</label>
                        </div>
                    </div>
                    <input type="hidden" name="payment_method_id" id="payment_method_id" />
                    <button type="submit" class="btn btn-lg-blue mt-4">Pagar</button>
                </fieldset>
            </form>
        </f7-col>
     </f7-row>

    <f7-row style="margin-bottom: 60px;">
        <f7-col>
          <div class="d-grafica-oficina">
              <f7-button fill style="color:white;" @click="pagoReferencia()"><i class="far fa-sticky-note" style="margin-right: 10px;"></i>Pago con Referencia</f7-button>
          </div>
        </f7-col>
     </f7-row>

      <f7-row style="margin-bottom: 60px;">
        <f7-col>
          <div class="d-grafica-oficina">
              <f7-button fill style="color:white;" @click="pagoOxxo()"><i class="fas fa-store" style="margin-right: 10px;"></i>Pagos en Oxxo</f7-button>
          </div>
        </f7-col>
      </f7-row>
        
    </f7-block>


    <toolbar seleccion="2"></toolbar>
    
  </f7-page>
</template>
<script>
    import topmenu from "./menu-bar";
    import toolbar from "./toolbar";
    import seccionbusqueda from "./seccion-busqueda";
    import seccionlineas from "./seccion-lineas";
    export default {
        components: {
        topmenu,
        toolbar,
        seccionbusqueda,
        seccionlineas,
        },
        data() {
        return {
            nombre:"",
            apellidos:"",
            correo:"", 
            telefono:"",
            iduse:0
        };     
    },
    created() {
        const self = this;
        const app = self.$f7;

        self.datosUsuario();

        window.Mercadopago.setPublishableKey(
        "APP_USR-7c786e56-33cf-4138-8b3e-ffdf10de9b3a");

        window.Mercadopago.getIdentificationTypes();

        document
        .getElementById("cardNumber")
        .addEventListener("keyup", guessPaymentMethod);
        document
        .getElementById("cardNumber")
        .addEventListener("change", guessPaymentMethod);

        function guessPaymentMethod(event) {
        let cardnumber = document.getElementById("cardNumber").value;

            if (cardnumber.length >= 6) {
                    let bin = cardnumber.substring(0, 6);
                    window.Mercadopago.getPaymentMethod({
                            bin: bin
                        },
                        self.setPaymentMethod
                    );
                }
            }

        /*Referancia OpenPay*/
        OpenPay.setId('m1ob7biidxpcjepkiqw1');
        OpenPay.setApiKey('pk_c6f578b1dd4a463ca07f2b7a8ea0e87e');
        OpenPay.setSandboxMode(true);
        deviceSessionId = OpenPay.deviceData.setup(
            "payment-form",
            "deviceIdHiddenFieldName"
        );

    },
    mounted(){
        const self = this;
        const app = self.$f7;

        let recaptchaScript = document.createElement('script');
        recaptchaScript.setAttribute('src', 'https://secure.mlstatic.com/sdk/javascript/v1/mercadopago.js');
        document.head.appendChild(recaptchaScript);
        recaptchaScript.setAttribute('src', 'https://openpay.s3.amazonaws.com/openpay.v1.min.js');
        document.head.appendChild(recaptchaScript);
        recaptchaScript.setAttribute('src', 'https://openpay.s3.amazonaws.com/openpay-data.v1.min.js');
        document.head.appendChild(recaptchaScript);
        recaptchaScript.setAttribute('src', ' https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js');
        document.head.appendChild(recaptchaScript);

    },
    methods: {
        datosUsuario(){
            const self = this;
            const app = self.$f7;
            
                var url = localStorage.getItem("url_server");
                let datos = { 
                id: localStorage.getItem('user_id'),
                };
                console.log(datos);
                app.request.post(
                    url + "getdatos.php",
                    datos,
                    function result(respuesta) {
                    var json_mensaje = JSON.parse(respuesta);

                    self.nombre = json_mensaje['nombre'];
                    self.apellidos = json_mensaje['apellidos'];
                    self.correo = json_mensaje['correo'];
                    self.telefono = json_mensaje['telefono'];
                    self.iduse = json_mensaje['id'];
                    localStorage.setItem('usuario_nombre', self.nombre + " " + self.apellidos);
                    localStorage.setItem('usuario_telefono', self.telefono);

                    },
                );

            },
            pagoOxxo(){
                const self = this;
                const app = self.$f7;

                var url = localStorage.getItem("url_server");
                let datos = { 
                transaction_amount: localStorage.getItem('total'),
                sucursal: 0,
                email: self.correo,
                usuariid: localStorage.getItem('user_id'),
                carrito: JSON.parse(localStorage.getItem('carrito')),
                direccion: localStorage.getItem('direccion'),
                estado: localStorage.getItem('estado'),
                cp: localStorage.getItem('codigop'),
                ciudad: localStorage.getItem('ciudad'),
                colonia: localStorage.getItem('colonia')
                };
                console.log(datos);
                app.request.post(
                    url + "pago-ecomerce-oxxo.php",
                    datos,
                    function result(respuesta) {
                    var json_mensaje = JSON.parse(respuesta);
                        if (json_mensaje.error != undefined) {
                            app.dialog.alert(json_mensaje.mensaje,'Error');
                        } else {
                            localStorage.setItem('carrito', JSON.stringify([]));
                            Mercadopago.clearSession();
                            app.dialog.alert(json_mensaje.mensaje,'Éxito');
                            app.views.main.router.navigate('/home/');
                        }

                    },
                );
            },
            pagoReferencia(){
                const self = this;
                const app = self.$f7;

                var url = localStorage.getItem("url_server");
                let datos = { 
                carrito: JSON.parse(localStorage.getItem('carrito')),
                usuariid:localStorage.getItem('user_id'),
                nombre: self.nombre,
                apellido: self.apellidos,
                telefono: localStorage.getItem('usuario_telefono'),
                correo: self.correo,
                total: localStorage.getItem('total'),
                sucursal: 0,
                direccion: localStorage.getItem('direccion'),
                estado: localStorage.getItem('estado'),
                cp: localStorage.getItem('codigop'),
                ciudad: localStorage.getItem('ciudad'),
                colonia: localStorage.getItem('colonia')
                };
                console.log(datos);
                app.request.post(
                    url + "pago-referencia-ecomerce.php",
                    datos,
                    function result(respuesta) {
                    var json_mensaje = JSON.parse(respuesta);
                        if (json_mensaje.error != undefined) {
                            app.dialog.alert("No se pudo realizar la compra.",'Error');
                        } else {
                            localStorage.setItem('carrito', JSON.stringify([]));
                            Mercadopago.clearSession();
                            app.dialog.alert("Compra exitosamente. Se enviara una referencia a su correo electronico.",'Éxito');
                            app.views.main.router.navigate('/home/');
                        }
                    },
                );
            },

            setPaymentMethod(status, response) {
                if (status == 200) {
                    let paymentMethodId = response[0].id;
                    let element = document.getElementById("payment_method_id");
                    element.value = paymentMethodId;
                    self.getInstallments();
                } else {
                    alert(`payment method info error: ${response}`);
                }
            },

            getInstallments() {
                window.Mercadopago.getInstallments({
                        payment_method_id: document.getElementById("payment_method_id").value,
                        amount: parseFloat(document.getElementById("transaction_amount").value)
                    },
                    function(status, response) {
                        if (status == 200) {
                            document.getElementById("installments").options.length = 0;
                            response[0].payer_costs.forEach(installment => {
                                let opt = document.createElement("option");
                                opt.text = installment.recommended_message;
                                opt.value = installment.installments;
                                document.getElementById("installments").appendChild(opt);
                            });
                        } else {
                            alert(`installments method info error: ${response}`);
                        }
                    }
                );
            },

             sdkResponseHandler(status, response) {
                if (status != 200 && status != 201) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Verifica los datos de la tarjeta'
                    });

                } else {
                    $("#token").val(response.id);
                    $("#transaction_amount").val(10);
                    console.log(localStorage.getItem('carrito'));
                    console.log(iduser);
                    var datados = {
                        'carrito': JSON.parse(localStorage.getItem('carrito')),
                        'usuariid': localStorage.getItem('user_id'),
                        "sucursal": 0,
                        "email": self.correo,
                        "transaction_amount": localStorage.getItem('total'),
                        "direccion": localStorage.getItem('direccion'),
                        "estado": localStorage.getItem('estado'),
                        "cp": localStorage.getItem('codigop'),
                        "ciudad": localStorage.getItem('ciudad'),
                        "colonia": localStorage.getItem('colonia')
                    };
                    $("#pay").serializeArray().forEach((value, key) => { datados[value['name']] = value['value'] });
                    $.ajax({
                        url: "mercado-pago.php",
                        type: "post",
                        data: datados,
                        dataType: "json",
                        success(data) {
                            var datatres = data;
                            console.log(data);
                            if (datatres['status'] == "approved") {
                                Mercadopago.clearSession();
                                localStorage.setItem('carrito', JSON.stringify([]));
                                app.dialog.alert("Compra exitosamente. Enviaremos su recibo de compra a su correo electrónico.",'Éxito');
                                app.views.main.router.navigate('/home/');
                            } else {
                                app.dialog.alert("No se pudo completar la compra.",'Error');
                            }
                        },

                    });
                }
            },

            submitTarjeta(){
                var $form = document.querySelector("#pay");
                window.Mercadopago.createToken($form, self.sdkResponseHandler);
                return false;
            }

        },
    };
</script>