using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Services;
using PYME_MVC.Models.Busqueda;
using PYME_MVC.Models.ConfiguracionServicios;
using PYME_MVC.Models.InvocarServiciosGenerales;
using System.Web.Script.Serialization;
using PYME_MVC.Models.Catalogos;
using System.Threading;
using PYME_MVC.Models.Entidad;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace PYME_MVC.Controllers
{
    public class CreditosController : Controller
    {
        //
        // GET: /Creditos/

        #region Vistas
        [NoCache]
        public ActionResult BuscarCredito()
        {
            if (Session["usuario"] == null)
            {
                return RedirectToAction("Login", "Account");
            }
            return View();
        }

        [NoCache]
        public ActionResult CreditosSolicitados()
        {
            if (Session["usuario"] == null)
            {
                return RedirectToAction("Login", "Account");
            }
            return View();
        }


        [NoCache]
        public ActionResult DesembolsarCreditos()
        {
            if (Session["usuario"] == null)
                return RedirectToAction("Login", "Account");

            return View();
        }

        [NoCache]
        public ActionResult CreditosFactoraje()
        {
            if (Session["usuario"] == null)
            {
                return RedirectToAction("Login", "Account");
            }
            return View();
        }


        [NoCache]
        [HttpPost]
        public ActionResult DisposicionFactoraje(string p_cod_empresa, string p_num_cliente, string p_num_credito)
        {
            if (Session["usuario"] == null)
            {
                return RedirectToAction("Login", "Account");
            }
            var NuevoCredito = new Credito();

            List<Credito> cred = new Dal().ObtieneDatosCredito(p_cod_empresa, p_num_cliente, p_num_credito);
            if (cred.Count > 0)
            {
                /*Se recupera la información de configuración de un crédito, solo los campos que no se registran en la tabla de créditos y son configuraciones default    */
                List<productos_cred> datoscred = new Dal().ObtieneTipoCredito(cred[0].cod_empresa, cred[0].cod_producto, cred[0].tip_credito, "1");
                if (datoscred.Count > 0)
                {
                    cred[0].max_comision = datoscred[0].max_comision;
                    cred[0].tip_comision = datoscred[0].tip_comision;
                    cred[0].tip_cuota = datoscred[0].tip_cuota;

                }
                NuevoCredito = cred[0];
            }
            return View("DisposicionFactoraje", NuevoCredito);
        }
        
        
        /// <summary>
        /// Método que asigna los valores del cliente para generar o editar un crédito
        /// </summary>
        /// <returns></returns>
        [NoCache]
        [HttpPost]
        public ActionResult CrearCredito(string cod_empresa, string num_cliente)
        {
            if (Session["usuario"] == null)
            {
                return RedirectToAction("Login", "Account");
            }
            var NuevoCredito = new Credito();
            List<Moral> datosPersonaMoral = new Dal().ObtieneDatosPersonaMoral(cod_empresa, num_cliente);
            if (datosPersonaMoral.Count > 0)
            {
                NuevoCredito.cod_agencia = datosPersonaMoral[0].cod_agencia;
                NuevoCredito.num_cliente = datosPersonaMoral[0].num_cliente;
                NuevoCredito.nombre = datosPersonaMoral[0].nombre;
                NuevoCredito.rfc = datosPersonaMoral[0].rfc;
                NuevoCredito.tip_cliente = "M";
            }


            return View("CrearCredito", NuevoCredito);
        }

        /// <summary>
        /// Se consulta el crédito generado para poder editar la información  
        /// </summary>
        /// <returns></returns>
        [NoCache]
        [HttpPost]
        public ActionResult ActualizaCredito(string p_cod_empresa, string p_num_cliente, string p_num_credito)
        {
            if (Session["usuario"] == null)
            {
                return RedirectToAction("Login", "Account");
            }
            var NuevoCredito = new Credito();

            List<Credito> cred = new Dal().ObtieneDatosCredito(p_cod_empresa, p_num_cliente, p_num_credito);
            if (cred.Count > 0)
            {
                /*Se recupera la información de configuración de un crédito, solo los campos que no se registran en la tabla de créditos y son configuraciones default    */
                List<productos_cred> datoscred = new Dal().ObtieneTipoCredito(cred[0].cod_empresa, cred[0].cod_producto, cred[0].tip_credito, "1");
                if (datoscred.Count > 0)
                {
                    cred[0].max_comision = datoscred[0].max_comision;
                    cred[0].tip_comision = datoscred[0].tip_comision;
                    cred[0].tip_cuota = datoscred[0].tip_cuota;

                }
                NuevoCredito = cred[0];
            }
            return View("CrearCredito", NuevoCredito);
        }

        /// <summary>
        /// Pantalla encargada de generar la tabla de pagos 
        /// </summary>
        /// <returns></returns>
        [NoCache]
        [HttpPost]
        public ActionResult ProcesarSolicitud(string p_cod_empresa, string p_num_cliente, string p_num_credito)
        {
            if (Session["usuario"] == null)
            {
                return RedirectToAction("Login", "Account");
            }
            var NuevoCredito = new SolicitudCredito();

            List<Credito> cred = new Dal().ObtieneDatosCredito(p_cod_empresa, p_num_cliente, p_num_credito);
            if (cred.Count > 0)
            {
                NuevoCredito.aforo = cred[0].aforo;
                NuevoCredito.clave_prod = cred[0].clave_prod;
                NuevoCredito.cod_agencia = cred[0].cod_agencia;
                NuevoCredito.cod_empresa = cred[0].cod_empresa;
                NuevoCredito.cod_producto = cred[0].cod_producto;
                NuevoCredito.cod_usuario_aprueba = cred[0].cod_usuario_aprueba;
                NuevoCredito.cod_usuario_modifica = cred[0].cod_usuario_modifica;
                NuevoCredito.cod_usuario_reg = cred[0].cod_usuario_reg;
                NuevoCredito.correo_electronico = cred[0].correo_electronico;
                NuevoCredito.des_estado = cred[0].des_estado;
                NuevoCredito.des_tip_credito = cred[0].des_tip_credito;
                NuevoCredito.dia_pago = cred[0].dia_pago;
                NuevoCredito.dias_mora_permitidos = cred[0].dias_mora_permitidos;
                NuevoCredito.fec_alta = cred[0].fec_alta;
                NuevoCredito.fec_apertura = cred[0].fec_apertura;
                NuevoCredito.fec_cancelacion = cred[0].fec_cancelacion;
                NuevoCredito.fec_aprobacion = cred[0].fec_aprobacion;
                NuevoCredito.fec_solicitud = cred[0].fec_solicitud;
                NuevoCredito.fec_ult_modificacion = cred[0].fec_ult_modificacion;
                NuevoCredito.fec_vencimiento = cred[0].fec_vencimiento;
                NuevoCredito.gracia_principal = cred[0].gracia_principal;
                NuevoCredito.ind_estado = cred[0].ind_estado;
                NuevoCredito.max_comision = cred[0].max_comision;
                NuevoCredito.mom_aprobado = cred[0].mom_aprobado;
                NuevoCredito.mon_comision = cred[0].mon_comision;
                NuevoCredito.mon_credito = cred[0].mon_credito;
                NuevoCredito.mon_cuota = cred[0].mon_cuota;
                NuevoCredito.mon_desembolsado = cred[0].mon_desembolsado;
                NuevoCredito.mon_mora_acumulada = cred[0].mon_mora_acumulada;
                NuevoCredito.mon_saldo = cred[0].mon_saldo;
                NuevoCredito.mon_solicitado = cred[0].mon_solicitado;
                NuevoCredito.nom_producto = cred[0].nom_producto;
                NuevoCredito.nombre = cred[0].nombre;
                NuevoCredito.num_ciclo = cred[0].num_ciclo;
                NuevoCredito.num_cliente = cred[0].num_cliente;
                NuevoCredito.num_credito = cred[0].num_credito;
                NuevoCredito.num_cuotas = cred[0].num_cuotas;
                NuevoCredito.num_referencia = cred[0].num_referencia;
                NuevoCredito.pagos_a_capital = cred[0].pagos_a_capital;
                NuevoCredito.per_cuota = cred[0].per_cuota;
                NuevoCredito.plazo_credito = cred[0].plazo_credito;
                NuevoCredito.por_iva = cred[0].por_iva;
                NuevoCredito.rfc = cred[0].rfc;
                NuevoCredito.tasa_anual = cred[0].tasa_anual;
                NuevoCredito.tasa_mora = cred[0].tasa_mora;
                NuevoCredito.tip_calendario = cred[0].tip_calendario;
                NuevoCredito.tip_cliente = cred[0].tip_cliente;
                NuevoCredito.tip_cob_comision = cred[0].tip_cob_comision;
                NuevoCredito.tip_comision = cred[0].tip_comision;
                NuevoCredito.tip_credito = cred[0].tip_credito;
                NuevoCredito.tip_cuota = cred[0].tip_cuota;
            }
            return View("ProcesarSolicitud", NuevoCredito);
        }


        [NoCache]
        [HttpPost]
        public ActionResult CalculaPlanPago(string p_cod_empresa, string p_num_cliente, string p_num_credito)
        {
            if (Session["usuario"] == null)
            {
                return RedirectToAction("Login", "Account");
            }
            var NuevoCredito = new SolicitudCredito();

            List<Credito> cred = new Dal().ObtieneDatosCredito(p_cod_empresa, p_num_cliente, p_num_credito);
            if (cred.Count > 0)
            {
                NuevoCredito.aforo = cred[0].aforo;
                NuevoCredito.clave_prod = cred[0].clave_prod;
                NuevoCredito.cod_agencia = cred[0].cod_agencia;
                NuevoCredito.cod_empresa = cred[0].cod_empresa;
                NuevoCredito.cod_producto = cred[0].cod_producto;
                NuevoCredito.cod_usuario_aprueba = cred[0].cod_usuario_aprueba;
                NuevoCredito.cod_usuario_modifica = cred[0].cod_usuario_modifica;
                NuevoCredito.cod_usuario_reg = cred[0].cod_usuario_reg;
                NuevoCredito.correo_electronico = cred[0].correo_electronico;
                NuevoCredito.des_estado = cred[0].des_estado;
                NuevoCredito.des_tip_credito = cred[0].des_tip_credito;
                NuevoCredito.dia_pago = cred[0].dia_pago;
                NuevoCredito.dias_mora_permitidos = cred[0].dias_mora_permitidos;
                NuevoCredito.fec_alta = cred[0].fec_alta;
                NuevoCredito.fec_apertura = cred[0].fec_apertura;
                NuevoCredito.fec_cancelacion = cred[0].fec_cancelacion;
                NuevoCredito.fec_aprobacion = cred[0].fec_aprobacion;
                NuevoCredito.fec_solicitud = cred[0].fec_solicitud;
                NuevoCredito.fec_ult_modificacion = cred[0].fec_ult_modificacion;
                NuevoCredito.fec_vencimiento = cred[0].fec_vencimiento;
                NuevoCredito.gracia_principal = cred[0].gracia_principal;
                NuevoCredito.ind_estado = cred[0].ind_estado;
                NuevoCredito.max_comision = cred[0].max_comision;
                NuevoCredito.mom_aprobado = cred[0].mom_aprobado;
                NuevoCredito.mon_comision = cred[0].mon_comision;
                NuevoCredito.mon_credito = cred[0].mon_credito;
                NuevoCredito.mon_cuota = cred[0].mon_cuota;
                NuevoCredito.mon_desembolsado = cred[0].mon_desembolsado;
                NuevoCredito.mon_mora_acumulada = cred[0].mon_mora_acumulada;
                NuevoCredito.mon_saldo = cred[0].mon_saldo;
                NuevoCredito.mon_solicitado = cred[0].mon_solicitado;
                NuevoCredito.nom_producto = cred[0].nom_producto;
                NuevoCredito.nombre = cred[0].nombre;
                NuevoCredito.num_ciclo = cred[0].num_ciclo;
                NuevoCredito.num_cliente = cred[0].num_cliente;
                NuevoCredito.num_credito = cred[0].num_credito;
                NuevoCredito.num_cuotas = cred[0].num_cuotas;
                NuevoCredito.num_referencia = cred[0].num_referencia;
                NuevoCredito.pagos_a_capital = cred[0].pagos_a_capital;
                NuevoCredito.per_cuota = cred[0].per_cuota;
                NuevoCredito.plazo_credito = cred[0].plazo_credito;
                NuevoCredito.por_iva = cred[0].por_iva;
                NuevoCredito.rfc = cred[0].rfc;
                NuevoCredito.tasa_anual = cred[0].tasa_anual;
                NuevoCredito.tasa_mora = cred[0].tasa_mora;
                NuevoCredito.tip_calendario = cred[0].tip_calendario;
                NuevoCredito.tip_cliente = cred[0].tip_cliente;
                NuevoCredito.tip_cob_comision = cred[0].tip_cob_comision;
                NuevoCredito.tip_comision = cred[0].tip_comision;
                NuevoCredito.tip_credito = cred[0].tip_credito;
                NuevoCredito.tip_cuota = cred[0].tip_cuota;
            }
            return View("PlanPagos", NuevoCredito);
        }


        [NoCache]
        [HttpPost]
        public ActionResult SeleccionCuotasPlanPagos(string p_cod_empresa, string p_num_cliente, string p_num_credito)
        {
            if (Session["usuario"] == null)
            {
                return RedirectToAction("Login", "Account");
            }
            var NuevoCredito = new SolicitudCredito();

            /*Se pregunta por si ya previamente se había generado su tabla de amortización para poder 
             * seleccionar las cuotas que desea en caso de que no exista se ejecuta el 
             * cálculo de tabla de amortización simple */
             var result = new Dal().ObtienePlanPagosB(p_cod_empresa, p_num_credito);
             if (result.Count == 0)
             {
                 var values = new NameValueCollection{ 
                {"p_cod_empresa",		  p_cod_empresa},
                {"p_num_credito",         p_num_credito}};
                 new Dal().JsonPost( (new ConfiguracionServicios()).HostPyme + "Guarda/GeneraPlanPagos", values);
             }

            List<Credito> cred = new Dal().ObtieneDatosCredito(p_cod_empresa, p_num_cliente, p_num_credito);
            if (cred.Count > 0)
            {
                NuevoCredito.aforo = cred[0].aforo;
                NuevoCredito.clave_prod = cred[0].clave_prod;
                NuevoCredito.cod_agencia = cred[0].cod_agencia;
                NuevoCredito.cod_empresa = cred[0].cod_empresa;
                NuevoCredito.cod_producto = cred[0].cod_producto;
                NuevoCredito.cod_usuario_aprueba = cred[0].cod_usuario_aprueba;
                NuevoCredito.cod_usuario_modifica = cred[0].cod_usuario_modifica;
                NuevoCredito.cod_usuario_reg = cred[0].cod_usuario_reg;
                NuevoCredito.correo_electronico = cred[0].correo_electronico;
                NuevoCredito.des_estado = cred[0].des_estado;
                NuevoCredito.des_tip_credito = cred[0].des_tip_credito;
                NuevoCredito.dia_pago = cred[0].dia_pago;
                NuevoCredito.dias_mora_permitidos = cred[0].dias_mora_permitidos;
                NuevoCredito.fec_alta = cred[0].fec_alta;
                NuevoCredito.fec_apertura = cred[0].fec_apertura;
                NuevoCredito.fec_cancelacion = cred[0].fec_cancelacion;
                NuevoCredito.fec_aprobacion = cred[0].fec_aprobacion;
                NuevoCredito.fec_solicitud = cred[0].fec_solicitud;
                NuevoCredito.fec_ult_modificacion = cred[0].fec_ult_modificacion;
                NuevoCredito.fec_vencimiento = cred[0].fec_vencimiento;
                NuevoCredito.gracia_principal = cred[0].gracia_principal;
                NuevoCredito.ind_estado = cred[0].ind_estado;
                NuevoCredito.max_comision = cred[0].max_comision;
                NuevoCredito.mom_aprobado = cred[0].mom_aprobado;
                NuevoCredito.mon_comision = cred[0].mon_comision;
                NuevoCredito.mon_credito = cred[0].mon_credito;
                NuevoCredito.mon_cuota = cred[0].mon_cuota;
                NuevoCredito.mon_desembolsado = cred[0].mon_desembolsado;
                NuevoCredito.mon_mora_acumulada = cred[0].mon_mora_acumulada;
                NuevoCredito.mon_saldo = cred[0].mon_saldo;
                NuevoCredito.mon_solicitado = cred[0].mon_solicitado;
                NuevoCredito.nom_producto = cred[0].nom_producto;
                NuevoCredito.nombre = cred[0].nombre;
                NuevoCredito.num_ciclo = cred[0].num_ciclo;
                NuevoCredito.num_cliente = cred[0].num_cliente;
                NuevoCredito.num_credito = cred[0].num_credito;
                NuevoCredito.num_cuotas = cred[0].num_cuotas;
                NuevoCredito.num_referencia = cred[0].num_referencia;
                NuevoCredito.pagos_a_capital = cred[0].pagos_a_capital;
                NuevoCredito.per_cuota = cred[0].per_cuota;
                NuevoCredito.plazo_credito = cred[0].plazo_credito;
                NuevoCredito.por_iva = cred[0].por_iva;
                NuevoCredito.rfc = cred[0].rfc;
                NuevoCredito.tasa_anual = cred[0].tasa_anual;
                NuevoCredito.tasa_mora = cred[0].tasa_mora;
                NuevoCredito.tip_calendario = cred[0].tip_calendario;
                NuevoCredito.tip_cliente = cred[0].tip_cliente;
                NuevoCredito.tip_cob_comision = cred[0].tip_cob_comision;
                NuevoCredito.tip_comision = cred[0].tip_comision;
                NuevoCredito.tip_credito = cred[0].tip_credito;
                NuevoCredito.tip_cuota = cred[0].tip_cuota;
            }
            return View("SeleccionCuotasPlanPagos", NuevoCredito);
        }


        [NoCache]
        [HttpPost]
        public ActionResult AltaFactura(string p_cod_empresa, string p_num_cliente, string p_num_credito)
        {
            if (Session["usuario"] == null)
            {
                return RedirectToAction("Login", "Account");
            }
            var NuevoCredito = new Factura();
            List<Credito> cred = new Dal().ObtieneDatosCredito(p_cod_empresa, p_num_cliente, p_num_credito);
            if (cred.Count > 0)
            {
                NuevoCredito.cod_agencia = cred[0].cod_agencia;
                NuevoCredito.num_credito = cred[0].num_credito;
                NuevoCredito.nombre = cred[0].nombre;
                NuevoCredito.rfc = cred[0].rfc;
            }
            return View("Factoraje", NuevoCredito);
        }

        [NoCache]
        [HttpGet]
        public ActionResult ProcesarDesembolso(string p_cod_empresa, string p_num_cliente, string p_num_credito)
        {
            if (Session["usuario"] == null)
	        {
                return RedirectToAction ("Login", "Account");
	        }

            Dal dal = new Dal();
            Credito _credito = dal.ObtieneDatosCredito(p_cod_empresa, p_num_cliente, p_num_credito)[0];
            List<PlanPagos> _planPagos = dal.ObtienePlanPagos(p_cod_empresa, p_num_credito);
            List<Mensajes> msjs = new List<Mensajes>();

            Models.ViewModels.ProcesaDesembosloViewModel model = new Models.ViewModels.ProcesaDesembosloViewModel();

            var cod_producto = "0";
            if (_credito != null)
            {
                if (_credito.cod_producto != null)
                {
                    cod_producto = _credito.cod_producto;
                }
            }

            model.Set_LstTipoCredito(cod_producto);

            model.DatosCredito = (new SolicitudCredito() * _credito); //Se sobrecarga el operador * para poder castear de Credito a SolicitudCredito
            model.PlanPagos = _planPagos;
            model.PlanPagosString = JsonConvert.SerializeObject(_planPagos, new IsoDateTimeConverter() { DateTimeFormat = "dd/MM/yyyy" });
            model.Mensajes = msjs;

            return View("ProcesarDesembolso", model);
        }

        
        #endregion                                                         

        #region Inserción
        [HttpPost]
        public ActionResult InsertarCredito(Credito model)
        {
            var Msj_info = new List<DatosCatalogos>();
            if (!ModelState.IsValid)
            {
                var index = 1;
                foreach (ModelState modelState in ViewData.ModelState.Values)
                {
                    foreach (ModelError error in modelState.Errors)
                    {
                        Msj_info.Add(new DatosCatalogos() { informativo = index.ToString(), des_informativo = error.ErrorMessage });
                        index++;
                    }
                }
                return Json(Msj_info, JsonRequestBehavior.AllowGet);
            }
            try
            {
                var Usuario = (Seguridad.GestionUsuarios.EntUsuario)Session["usuario"];

                var values = new NameValueCollection
            { 
                { "p_cod_empresa",          model.cod_empresa },
                { "p_num_cliente",          model.num_cliente },
                { "p_tip_cliente",          model.tip_cliente },
                { "p_cod_producto",         model.cod_producto },
                { "p_tip_credito",          model.tip_credito },
                { "p_mon_comision",         model.mon_comision },
                { "p_tasa_anual",           model.tasa_anual },
                { "p_tasa_mora",            model.tasa_mora },
                { "p_plazo_credito",        model.plazo_credito },
                { "p_per_cuota",            model.per_cuota },
                { "p_num_cuotas",           model.num_cuotas },
                { "p_mon_solicitado",       model.mon_solicitado },
                { "p_fec_solicitud",        model.fec_solicitud.Value.ToShortDateString() },
                { "p_fec_apertura",         model.fec_solicitud.Value.ToShortDateString() },
                { "p_por_iva",              model.por_iva },
                { "p_aforo",                model.aforo },
                { "p_pagos_a_capital",      model.pagos_a_capital },
                { "p_gracia_principal",     model.gracia_principal },
                { "p_dia_pago",             model.dia_pago },
                { "p_dias_mora_permitidos", model.dias_mora_permitidos },
                { "p_cod_usuario_reg",      Usuario.cod_usuario },
                { "p_fec_vencimiento",      model.fec_vencimiento.Value.ToShortDateString() },
                { "p_tip_calendario",       model.tip_calendario },
                { "p_tip_cob_comision",     model.tip_cob_comision },
                { "p_por_comision",         model.por_comision },
                { "p_tip_cuota",            model.tip_cuota.ToString() },
                { "p_mon_cuota",            model.mon_cuota },
                { "p_mon_credito",          model.mon_credito }
             };

                var conexion = new ConfiguracionServicios();
                var url = conexion.HostPyme + "Guarda/Desembolso";
                string response = new Dal().JsonPost(url, values);
                if (string.IsNullOrEmpty(response))
                {
                    Msj_info.Add(new DatosCatalogos() { error = "1", des_error = "El servicio no responde (/Guarda/PersonaFisica)" });
                }
                else
                {
                    if (response.Contains("[") && response.Contains("]"))
                    {
                        Msj_info.Add(new DatosCatalogos() { realizado = "1", des_realizado = response });
                    }
                    else
                    {
                        Msj_info.Add(new DatosCatalogos() { informativo = "1", des_informativo = response });
                    }
                }
            }
            catch (Exception ex)
            {
                Msj_info.Add(new DatosCatalogos() { error = "1", des_error = ex.Message });
            }
            return Json(Msj_info, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region Actualización del crédito
        [HttpPost]
        public ActionResult ActualizarCredito(Credito model)
        {
            var Msj_info = new List<DatosCatalogos>();
            if (!ModelState.IsValid)
            {
                var index = 1;
                foreach (ModelState modelState in ViewData.ModelState.Values)
                {
                    foreach (ModelError error in modelState.Errors)
                    {
                        Msj_info.Add(new DatosCatalogos() { informativo = index.ToString(), des_informativo = error.ErrorMessage });
                        index++;
                    }
                }
                return Json(Msj_info, JsonRequestBehavior.AllowGet);
            }
            var Usuario = (Seguridad.GestionUsuarios.EntUsuario)Session["usuario"];

            var values = new NameValueCollection
            { 
                {"p_cod_empresa",		   model.cod_empresa},
                {"p_num_cliente",		   model.num_cliente},
                {"p_tip_cliente",          model.tip_cliente},
                {"p_num_credito",          model.num_credito},
                {"p_cod_producto",         model.cod_producto},
                {"p_tip_credito",          model.tip_credito},
                {"p_mon_comision",         model.mon_comision},
                {"p_tasa_anual",           model.tasa_anual},
                {"p_tasa_mora",            model.tasa_mora},
                {"p_plazo_credito",        model.plazo_credito},
                {"p_per_cuota",            model.per_cuota},
                {"p_num_cuotas",           model.num_cuotas},
                {"p_mon_solicitado",       model.mon_solicitado},
                {"p_fec_solicitud",        model.fec_solicitud.Value.ToShortDateString()},
                {"p_fec_apertura",         model.fec_apertura.Value.ToShortDateString()},
                {"p_por_iva",              model.por_iva},
                {"p_aforo",                model.aforo},
                {"p_pagos_a_capital",      model.pagos_a_capital},
                {"p_gracia_principal",     model.gracia_principal},
                {"p_dia_pago",             model.dia_pago},
                {"p_dias_mora_permitidos", model.dias_mora_permitidos},
                {"p_cod_usuario_modifica", Usuario.cod_usuario},
                {"p_ind_estado",           model.ind_estado} ,
                {"p_fec_vencimiento",      model.fec_vencimiento.Value.ToShortDateString()},
                {"p_tip_calendario",       model.tip_calendario},
                {"p_tip_cob_comision",     model.tip_cob_comision},
                {"p_por_comision",         model.por_comision},
                {"p_tip_cuota",            model.tip_cuota.ToString()},
                {"p_mon_cuota",            model.mon_cuota},
                {"p_mon_credito",            model.mon_credito}
             };
            try
            {
                var conexion = new ConfiguracionServicios();
                var url = conexion.HostPyme + "Guarda/Credito";
                string response = new Dal().JsonPost(url, values);
                if (string.IsNullOrEmpty(response))
                {
                    Msj_info.Add(new DatosCatalogos() { error = "1", des_error = "El servicio no responde (/Guarda/Credito)" });
                }
                else
                {
                    if (response.Contains("[") && response.Contains("]"))
                    {
                        Msj_info.Add(new DatosCatalogos() { realizado = "1", des_realizado = response });
                    }
                    else
                    {
                        Msj_info.Add(new DatosCatalogos() { informativo = "1", des_informativo = response });
                    }
                }
            }
            catch (Exception ex)
            {
                Msj_info.Add(new DatosCatalogos() { error = "1", des_error = ex.Message });
            }
            return Json(Msj_info, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult CreditosCambioEstatus(SolicitudCredito model)
        {
            var Msj_info = new List<DatosCatalogos>();
            var Usuario = (Seguridad.GestionUsuarios.EntUsuario)Session["usuario"];
            var values = new NameValueCollection
            { 
               {"p_cod_empresa",    model.cod_empresa},
               {"p_num_credito",    model.num_credito},
               {"p_ind_estado",     model.ind_estado},
               {"p_observacion",    model.observacion},
               {"p_fec_cambio",     DateTime.Now.ToString("dd/MM/yyyy")},
               {"p_mon_aprobado",   model.mon_aprobado},
               {"p_cod_usuario",    Usuario.cod_usuario}
             };
            try
            {
                var conexion = new ConfiguracionServicios();
                var url = conexion.HostPyme + "Guarda/CreditosCambioEstatus";
                string response = new Dal().JsonPost(url, values);
                if (string.IsNullOrEmpty(response))
                {
                    Msj_info.Add(new DatosCatalogos() { error = "1", des_error = "El servicio no responde (/Guarda/CreditosCambioEstatus)" });
                }
                else
                {
                    if (response.Contains("[") && response.Contains("]"))
                    {
                        Msj_info.Add(new DatosCatalogos() { realizado = "1", des_realizado = response });
                    }
                    else
                    {
                        Msj_info.Add(new DatosCatalogos() { informativo = "1", des_informativo = response });
                    }
                }
            }
            catch (Exception ex)
            {
                Msj_info.Add(new DatosCatalogos() { error = "1", des_error = ex.Message });
            }
            return Json(Msj_info, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult GeneraPlanPagos(Credito model)
        {
            var Msj_info = new List<DatosCatalogos>();
            try
            {
                var Usuario = (Seguridad.GestionUsuarios.EntUsuario)Session["usuario"];
                var values = new NameValueCollection
            { 
                {"p_cod_empresa",		   model.cod_empresa},
                {"p_num_credito",          model.num_credito},
            };

                var conexion = new ConfiguracionServicios();
                var url = conexion.HostPyme + "Guarda/GeneraPlanPagos";
                string response = new Dal().JsonPost(url, values);
                if (string.IsNullOrEmpty(response))
                {
                    Msj_info.Add(new DatosCatalogos() { error = "1", des_error = "El servicio no responde (/Guarda/GeneraPlanPagos)" });
                }
                else
                {
                    if (response.Contains("[") && response.Contains("]"))
                    {
                        Msj_info.Add(new DatosCatalogos() { realizado = "1", des_realizado = response });
                    }
                    else
                    {
                        Msj_info.Add(new DatosCatalogos() { informativo = "1", des_informativo = response });
                    }
                }
            }
            catch (Exception ex)
            {
                Msj_info.Add(new DatosCatalogos() { error = "1", des_error = ex.Message });
            }
            return Json(Msj_info, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult GeneraPlanPagos_Cuotas(Credito model, string No_Cuotas)
        {
            var Msj_info = new List<DatosCatalogos>();
            try
            {
                var Usuario = (Seguridad.GestionUsuarios.EntUsuario)Session["usuario"];
                var conexion = new ConfiguracionServicios();
                if (string.IsNullOrEmpty(No_Cuotas))
                {
                    Msj_info.Add(new DatosCatalogos() { error = "1", des_error = "Favor de seleccionar por lo  menos una cuota" });
                }
                else
                {
                    var Cuotas = JsonConvert.DeserializeObject<List<int>>(No_Cuotas);
                    if (Cuotas.Count > 0)
                    {
                        var urlLimpiaConfiguracion = conexion.HostPyme + "Elimina/PlanPagosBTodos";
                        var creditolimpiarconfi = new NameValueCollection {
                                    {"p_cod_empresa" , model.cod_empresa},
                                    {"p_num_credito" , model.num_credito }
                     
                        };
                        var resp = new Dal().JsonPost(urlLimpiaConfiguracion, creditolimpiarconfi);
                        ///Se limpia la configuración de las cuotas seleccionadas previamente si es que existe  capturada previamente 
                        if (resp.Contains("[") && resp.Contains("]"))
                        {
                            var url = conexion.HostPyme + "Guarda/PlanPagosB";
                            foreach (var item in Cuotas)
                            {
                                var nvcCuotas = new NameValueCollection {
                                    {"p_cod_empresa" , model.cod_empresa},
                                    {"p_num_credito" , model.num_credito },
                                    {"p_num_cuota" , item.ToString() } 
                                };
                                var rep_cuenta = new Dal().JsonPost(url, nvcCuotas);
                                if (!rep_cuenta.Contains("[") && !rep_cuenta.Contains("]"))
                                {
                                    Msj_info.Add(new DatosCatalogos() { error = "1", des_error = rep_cuenta });
                                }
                            }
                            var Recalculaplanpagos = conexion.HostPyme + "Guarda/GeneraPlanPagos";
                            var DatosRecalcula = new NameValueCollection {
                                    {"p_cod_empresa" , model.cod_empresa},
                                    {"p_num_credito" , model.num_credito }
                     
                            };
                            new Dal().JsonPost(Recalculaplanpagos, DatosRecalcula);
                            Msj_info.Add(new DatosCatalogos() { realizado = "1", des_realizado = "Se registró correctamente la configuración" });

                        }
                        else
                        {
                            Msj_info.Add(new DatosCatalogos() { error = "1", des_error = resp });
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Msj_info.Add(new DatosCatalogos() { error = "1", des_error = ex.Message });
            }
            return Json(Msj_info, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult GenerarDispersionFactoraje(Credito model, string Id_factura)
        {
            var Msj_info = new List<DatosCatalogos>();
            try
            {
                var Usuario = (Seguridad.GestionUsuarios.EntUsuario)Session["usuario"];
                var conexion = new ConfiguracionServicios();
                if (string.IsNullOrEmpty(Id_factura))
                {
                    Msj_info.Add(new DatosCatalogos() { error = "1", des_error = "Favor de seleccionar por lo  menos una cuota" });
                }
                else
                {
                    var Id_facturas = JsonConvert.DeserializeObject<List<int>>(Id_factura);
                    if (Id_facturas.Count > 0)
                    {
                        var p_cadena_id_facturas= string.Empty;
                        foreach (var item in Id_facturas)
                        {
                             p_cadena_id_facturas  += item.ToString() +",";
                        }
                        p_cadena_id_facturas = p_cadena_id_facturas.Remove(p_cadena_id_facturas.Length - 1);
                        var parametros = new NameValueCollection {
                                    {"p_cod_empresa" , model.cod_empresa},
                                    {"p_num_credito" , model.num_credito },
                                    {"p_cod_usuario" , Usuario.cod_usuario },
                                    {"p_cadena_id_facturas" , p_cadena_id_facturas  }};
                        var url = conexion.HostPyme + "Guarda/DisposicionFactoraje";
                        string response = new Dal().JsonPost(url, parametros);
                        if (string.IsNullOrEmpty(response))
                        {
                            Msj_info.Add(new DatosCatalogos() { error = "1", des_error = "El servicio no responde (/Guarda/DisposicionFactoraje)" });
                        }
                        else
                        {
                            if (response.Contains("[") && response.Contains("]"))
                            {
                                Msj_info.Add(new DatosCatalogos() { realizado = "1", des_realizado = response });
                            }
                            else
                            {
                                Msj_info.Add(new DatosCatalogos() { informativo = "1", des_informativo = response });
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Msj_info.Add(new DatosCatalogos() { error = "1", des_error = ex.Message });
            }
            return Json(Msj_info, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [NoCache]
        public JsonResult RecalculaPlanPagosRapido(string p_cod_empresa, string p_num_cliente, string p_num_credito, string p_new_fec_apertura)
        {
            Dal dal = new Dal();

            //Obtener todos los datos del crédito a modificar
            Credito _credito = dal.ObtieneDatosCredito(p_cod_empresa, p_num_cliente, p_num_credito)[0];
            _credito.fec_apertura = DateTime.ParseExact(p_new_fec_apertura, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            try
            {
                //Ejecutar el sp de actualización del crédito
                ActualizarCredito(_credito);

                //Ejecutar el sp de áctualización del plan de pagos.
                GeneraPlanPagos(_credito);
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine(ex.ToString());
                return Json(new { resultCode = "error", message = ex.ToString() }, JsonRequestBehavior.AllowGet);
            }


            return Json(new
            {
                resultCode
                    = "success",
                message = "Se actualizó crédito y plan de pagos"
            }, JsonRequestBehavior.AllowGet);
        }

        [NoCache]
        [HttpPost]
        public ActionResult ConfirmarDesembolso(Models.ViewModels.ProcesaDesembosloViewModel creditoViewModel)
        {
            SolicitudCredito _credito = creditoViewModel.DatosCredito;

            var cod_producto = "0";
            if (_credito != null)
            {
                if (_credito.cod_producto != null)
                {
                    cod_producto = _credito.cod_producto;
                }
            }

            creditoViewModel.Set_LstTipoCredito(cod_producto);

            var _mensajes = new List<Mensajes>();

            if (!ModelState.IsValid)
            {
                foreach (ModelState modelState in ViewData.ModelState.Values)
                {
                    foreach (ModelError error in modelState.Errors)
                    {
                        if(string.IsNullOrEmpty(error.ErrorMessage))
                            _mensajes.Add(new Mensajes() { Message = error.Exception.ToString(), MessageCode = CodigoMensaje.Danger });
                        else
                            _mensajes.Add(new Mensajes() { Message = error.ErrorMessage, MessageCaption = "Error", MessageCode = CodigoMensaje.Danger });
                    }
                }
                creditoViewModel.Mensajes = _mensajes;
                return View("ProcesarDesembolso", creditoViewModel);
            }

            var Usuario = (Seguridad.GestionUsuarios.EntUsuario)Session["usuario"];

            var values = new NameValueCollection
            {
                {"p_cod_empresa", _credito.cod_empresa},
                {"p_num_cliente", _credito.num_cliente},
                {"p_num_credito", _credito.num_credito},
                {"p_tip_cliente", _credito.tip_cliente},
                {"p_observacion", _credito.observacion},
                {"p_cod_usuario", Usuario.cod_usuario}
             };
            try
            {
                var conexion = new ConfiguracionServicios();
                var url = conexion.HostPyme + "Guarda/Desembolso";
                string response = new Dal().JsonPost(url, values);
                if (string.IsNullOrEmpty(response))
                {
                    _mensajes.Add(new Mensajes() { Message = "Se produjo un error en el envío de la información", MessageCode = CodigoMensaje.Danger, MessageCaption = "El servicio no responde" });
                }
                else
                {
                    if (response.Contains("[") && response.Contains("]"))
                    {
                        _mensajes.Add(new Mensajes() { Message = response, MessageCaption = "Operación terminada", MessageCode = CodigoMensaje.Success });
                    }
                    else
                    {
                        _mensajes.Add(new Mensajes() { Message = response, MessageCaption = "Error", MessageCode = CodigoMensaje.Danger });
                    }
                }
            }
            catch (Exception ex)
            {
                _mensajes.Add(new Mensajes() { Message = ex.Message, MessageCode= CodigoMensaje.Danger, MessageCaption = "Error Fatal" });
            }

            creditoViewModel.Mensajes = _mensajes;

            return View("ProcesarDesembolso", creditoViewModel);
        }
        #endregion
    }
}
