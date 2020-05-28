import PanelLeftPage from './assets/vue/pages/panel-left.vue';
import Home from './assets/vue/pages/home.vue';
import Productos from './assets/vue/pages/productos.vue';
import productoIndividual from './assets/vue/pages/producto-individual.vue';
import Lineas from './assets/vue/pages/lineas.vue';
import sobrePowerGolden from './assets/vue/pages/sobre-power-golden.vue';
import contacto from './assets/vue/pages/contacto.vue';
import sucursales from './assets/vue/pages/sucursales.vue';
import carrito from './assets/vue/pages/carrito.vue';
import perfil from './assets/vue/pages/perfil.vue';
import login from './assets/vue/pages/login.vue';
import registro from './assets/vue/pages/registro.vue';
import recuperarContrasenia from './assets/vue/pages/recuperar-contrasenia.vue';
import pinContrasenia from './assets/vue/pages/pin-contrasenia.vue';
import confirmarContrasenia from './assets/vue/pages/confirmar-contrasenia.vue';
import contraseniaCambiada from './assets/vue/pages/contrasenia-cambiada.vue';
import dashboardOficina from './assets/vue/pages/dashboard-oficina.vue';
import registroOficina from './assets/vue/pages/registro-oficina.vue';
import reporteOficina from './assets/vue/pages/reporte-oficina.vue';
import historialCompras from './assets/vue/pages/historial-compras.vue';
import datosEnvio from './assets/vue/pages/envio.vue';
import resumen from './assets/vue/pages/resumen.vue';
import loginOficina from './assets/vue/pages/login-oficina.vue';
import ventaDirecta from './assets/vue/pages/venta-directa.vue';
import folletosElectronicos from './assets/vue/pages/folletos.vue';
import folletoIndividual from './assets/vue/pages/folleto-individual.vue';
import metodosPago from './assets/vue/pages/metodos-pago.vue';
import comprasPaquetes from './assets/vue/pages/paquetes.vue';
import paqueteIndividual from './assets/vue/pages/paquete-individual.vue';

export default [
  {
    path: '/home/',
    component: Home,
    options: {
        clearPreviousHistory: true,
    }
  },
  {
    path: '/panel-left/',
    component: PanelLeftPage
  },
  {
      path: '/productoIndividual/',
      component: productoIndividual
  },
  {
      path: '/productos/',
      component: Productos
  },
  {
      path: '/lineas/',
      component: Lineas
  },
  {
      path: '/sobrePowerGolden/',
      component: sobrePowerGolden
  },
  {
      path: '/contacto/',
      component: contacto
  },
  {
      path: '/sucursales/',
      component: sucursales
  },
  {
      path: '/perfil/',
      component: perfil
  },
  {
      path: '/carrito/',
      component: carrito
  },
  {
      path: '/login/',
      component: login
  },
  {
      path: '/registro/',
      component: registro
  },
  {
      path: '/recuperarContrasenia/',
      component: recuperarContrasenia
  },
  {
      path: '/pinContrasenia/',
      component: pinContrasenia
  },
  {
      path: '/confirmarContrasenia/',
      component: confirmarContrasenia
  },
  {
      path: '/contraseniaCambiada/',
      component: contraseniaCambiada
  },
  {
      path: '/dashboardOficina/',
      component: dashboardOficina
  },
  {
      path: '/registroOficina/',
      component: registroOficina
  },
  {
      path: '/reporteOficina/',
      component: reporteOficina
  },
  {
      path: '/historialCompras/',
      component: historialCompras
  },
  {
      path: '/datosEnvio/',
      component: datosEnvio
  },
  {
      path: '/resumen/',
      component: resumen
  },
  {
      path: '/loginOficina/',
      component: loginOficina
  },
  {
      path: '/ventaDirecta/',
      component: ventaDirecta
  },
  {
      path: '/folletosElectronicos/',
      component: folletosElectronicos
  },
  {
      path: '/folletoIndividual/',
      component: folletoIndividual
  },
  {
      path: '/metodosPago/',
      component: metodosPago
  },
  {
      path: '/comprasPaquetes/',
      component: comprasPaquetes
  },
  {
      path: '/paqueteIndividual/',
      component: paqueteIndividual
  },
];
