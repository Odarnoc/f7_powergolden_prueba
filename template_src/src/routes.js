import Login from './assets/vue/pages/login.vue';
import NuevoLogin from './assets/vue/pages/nuevo-login.vue';
import Home from './assets/vue/pages/home.vue';
import AboutPage from './assets/vue/pages/about.vue';
import Registro from './assets/vue/pages/registro.vue';
import DynamicRoutePage from './assets/vue/pages/dynamic-route.vue';
import PanelLeftPage from './assets/vue/pages/panel-left.vue';
import PanelRightPage from './assets/vue/pages/panel-rigth.vue';
import ColorThemes from './assets/vue/pages/color-themes.vue';
import Chat from './assets/vue/pages/chat.vue';
import Vuex from './assets/vue/pages/vuex.vue';
import Plantilla from './assets/vue/pages/plantilla.vue';
import Perfil from './assets/vue/pages/perfil.vue';
import Services from './assets/vue/pages/mis_servicios.vue';
import Agenda from './assets/vue/pages/agenda.vue';
import Historial from './assets/vue/pages/historial.vue';
import Configuraciones from './assets/vue/pages/configuracion.vue';
import Footer from './assets/vue/pages/footer.vue';
import OlvidePass from './assets/vue/pages/olvide-pass.vue';
import IniciarSessionComo from './assets/vue/pages/iniciar_sesion_como.vue';
import PinDeConfirmacion from './assets/vue/pages/pin_de_confirmacion.vue';
import RestablecerContrasenia from './assets/vue/pages/restablecer_contrasenia.vue';
import SplashScreen from './assets/vue/pages/splash_screen.vue';
import NuevoServicio from './assets/vue/pages/nuevo_servicio.vue';
import ProveedorCitasPendientes from './assets/vue/pages/proveedor_citas_pendientes.vue';
import SinCitasPendientes from './assets/vue/pages/sin_citas_pendientes.vue';
import BuscarFiltrar from './assets/vue/pages/buscar_filtrar.vue';
import EditarServicio from './assets/vue/pages/editar-servicio.vue';
import VisualizarServicio from './assets/vue/pages/visualizador_servicios.vue';
import ProveedorCitasPendientesConfirmar from './assets/vue/pages/proveedor_citas_pendientes_confirmar.vue';
import FechaDeCita from './assets/vue/pages/fecha_de_cita.vue';
import pagoTargeta from './assets/vue/pages/pago_targeta.vue';
import Prueba from './assets/vue/pages/prueba.vue';
import Notificaciones from './assets/vue/pages/notificaciones.vue';

export default [{
        path: '/',
        component: NuevoLogin,
        options: {
            clearPreviousHistory: true,
        }
    },
    {
        path: '/prueba',
        component: Prueba
    },
    {
        path: '/fecha_de_cita',
        component: FechaDeCita,
    },
    {
        path: '/pago_targeta/',
        component: pagoTargeta,
    },
    {
        path: '/proveedor_citas_pendientes_confirmar',
        component: ProveedorCitasPendientesConfirmar
    },
    {
        path: '/buscar_filtrar',
        component: BuscarFiltrar
    },
    {
        path: '/sin_citas_pendientes',
        component: SinCitasPendientes
    },
    {
        path: '/proveedor_citas_pendientes',
        component: ProveedorCitasPendientes
    },
    {
        path: '/splash_screen',
        component: SplashScreen
    },
    {
        path: '/restablecer_contrasenia',
        component: RestablecerContrasenia
    },
    {
        path: '/iniciar_sesion_como',
        component: IniciarSessionComo
    },
    {
        path: '/pin_de_confirmacion',
        component: PinDeConfirmacion
    },
    {
        path: '/footer/',
        component: Footer
    },
    {
        path: '/olvide-pass/',
        component: OlvidePass
    },
    {
        path: '/about/',
        component: AboutPage
    },
    {
        path: '/home/',
        component: Home,
        options: {
            clearPreviousHistory: true,
        }
    },
    {
        path: '/perfil/',
        component: Perfil
    },
    {
        path: '/servicios/',
        component: Services
    },
    {
        path: '/agenda/',
        component: Agenda
    },
    {
        path: '/historial/',
        component: Historial
    },
    {
        path: '/configuracion/',
        component: Configuraciones
    },
    {
        path: '/plantilla/',
        component: Plantilla
    },
    {
        path: '/registro/',
        component: Registro
    },
    {
        path: '/dynamic-route/blog/:blogId/post/:postId/',
        component: DynamicRoutePage
    },
    {
        path: '/panel-left/',
        component: PanelLeftPage
    },
    {
        path: '/panel-right/',
        component: PanelRightPage
    },
    {
        path: '/color-themes/',
        component: ColorThemes
    },
    {
        path: '/chat/',
        component: Chat
    },
    {
        path: '/nuevoservicio',
        component: NuevoServicio
    },
    {
        path: '/editarservicio',
        component: EditarServicio
    },
    {
        path: '/visualizarservicio',
        component: VisualizarServicio
    },
    {
        path: '/vuex/',
        component: Vuex
    },
    {
        path: '/notificaciones/',
        component: Notificaciones
    },
];