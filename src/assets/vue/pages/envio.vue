<template>
  <f7-page class="sec-gray">
    <!--ingresa tu html aqui -->
    <f7-navbar>
      <topmenu></topmenu>
    </f7-navbar>

    <f7-block style="margin-top: 0;">
    <div class="container">
      <div class="row">

        <div class="col-lg-9 col-md-6 bg-gray lista-productos-movil">
                    <div class="">
                        <div class="row">
                            <div class="col-lg-12 col-md-12">
                                <div class="d-title-cuenta">
                                    <p class="title-cuenta">Datos de envio.</p>
                                    <p class="small-text-cuenta">Proporciona tus datos de dirección para poder generar tu envío.</p>
                                </div>
                            </div>

                        </div>

                        <div class="row row-form-perfil footer-movil">

                            <div class="col-lg-8 col-md-8 offset-lg-2 offset-md-2">

                                <div id="lista-productos" style="margin-bottom:4rem;">

                                    <div class="d-item-carrito">
                                    
                                        <f7-row class="row">

                                            <f7-col width="100%">
                                                <div class="floating-label-group">
                                                    <label>Direccion.</label>
                                                    <input type="text" class="form-control input-form-underline" required v-model="direccion">
                                                </div>
                                            </f7-col>

                                            <f7-col width="100%">
                                                <div class="floating-label-group">
                                                    <label >Ciudad.</label>
                                                    <input type="text" class="form-control input-form-underline" required v-model="ciudad">
                                                </div>
                                            </f7-col>

                                            <f7-col width="100%">
                                                <div class="floating-label-group">
                                                    <label >Colonia.</label>
                                                    <input type="text" class="form-control input-form-underline" required v-model="colonia">
                                                </div>
                                            </f7-col>

                                            <f7-col width="50">
                                                <div class="floating-label-group">
                                                    <label >Codigo Postal.</label>
                                                    <input type="text" class="form-control input-form-underline" required v-model="cp">
                                                </div>
                                            </f7-col>

                                            <f7-col width="50">
                                                <div class="floating-label-group">
                                                    <div class="floating-label-group">
                                                        <label >Estado.</label>
                                                        <select autocomplete="false" value="'BC'" style="height:60%;" class="form-control" v-model="estado" required>
                                                            <option value="AG">Aguascalientes</option>
                                                            <option value="BC">Baja California Norte</option>
                                                            <option value="BS">Baja California Sur</option>
                                                            <option value="CM">Campeche</option>
                                                            <option value="CS">Chiapas</option>
                                                            <option value="CH">Chihuahua</option>
                                                            <option value="DF">Ciudad de Mexico</option>
                                                            <option value="CO">Coahuila</option>
                                                            <option value="CL">Colima</option>
                                                            <option value="DG">Durango</option>
                                                            <option value="GT">Guanajuato</option>
                                                            <option value="GR">Guerrero</option>
                                                            <option value="HG">Hidalgo</option>
                                                            <option value="JA">Jalisco</option>
                                                            <option value="MX">Estado de Mexico</option>
                                                            <option value="MI">Michoacan</option>
                                                            <option value="MO">Morelos</option>
                                                            <option value="NA">Nayarit</option>
                                                            <option value="NL">Nuevo Leon</option>
                                                            <option value="OA">Oaxaca</option>
                                                            <option value="PU">Puebla</option>
                                                            <option value="QT">Queretaro</option>
                                                            <option value="QR">Quintana Roo</option>
                                                            <option value="SL">San Luis Potosi</option>
                                                            <option value="SI">Sinaloa</option>
                                                            <option value="SO">Sonora</option>
                                                            <option value="TB">Tabasco</option>
                                                            <option value="TM">Tamaulipas</option>
                                                            <option value="TL">Tlaxcala</option>
                                                            <option value="VE">Veracruz</option>
                                                            <option value="YU">Yucatan</option>
                                                            <option value="ZA">Zacatecas</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </f7-col>

                                        </f7-row>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

      </div>
    </div>
    </f7-block>

    <div class="navbar-bottom" style="bottom: 55px;">
        <div class="d-btn-carrito" style="margin-top: 0px;">
            <f7-row>
                <f7-col width="100%">
                    <f7-button large style="background-color: #49B7F3;color:#fff;" @click="confirmar()">Continuar</f7-button>
                </f7-col>
            </f7-row>
        </div>
    </div>
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
            direccion: "",
            ciudad: "",
            colonia: "",
            estado: "",
            cp: "",
        };
    },
    created() {
        const self = this;
        const app = self.$f7;
    },
    methods: {
        confirmar(){
            const self = this;
            const app = self.$f7;

            if(self.validaciones()){
                localStorage.setItem("direccion", self.direccion);
                localStorage.setItem("ciudad", self.ciudad);
                localStorage.setItem("colonia", self.colonia);
                localStorage.setItem("estado", self.estado);
                localStorage.setItem("codigop", self.cp);
                
                app.views.main.router.navigate('/resumen/'); 
            }

            },
        validaciones(){
            const self = this;
            const app = self.$f7;

            if(self.direccion==""){
                app.dialog.alert("Llenar el campo direccion","PowerGolden");
                return false;
            }
            if(self.ciudad==""){
                app.dialog.alert("Llenar el campo ciudad","PowerGolden");
                return false;
            }
            if(self.colonia==""){
                app.dialog.alert("Llenar el campo colonia","PowerGolden");
                return false;
            }
            if(self.cp==""){
                app.dialog.alert("Llenar el campo codigo postal","PowerGolden");
                return false;
            }
            if(self.cp.length>5 || self.cp.length<5){
                app.dialog.alert("Introducir un codigo postal valido","PowerGolden");
                return false;
            }
            if(self.estado==""){
                app.dialog.alert("Seleccionar un estado","PowerGolden");
                return false;
            }
                return true;
            },
        },
    };
</script>