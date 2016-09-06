using System.Collections.Specialized;
using System.Web.Mvc;
using System.Web.Mvc.Html;
using System.Web.Services;
using PYME_MVC.Models.InvocarServiciosGenerales;
using PYME_MVC.Models.ConfiguracionServicios;
using System.Web.Script.Serialization;
using System.Collections.Generic;
using PYME_MVC.Models.Entidad;
using System;
using System.Collections;
using PYME_MVC.Models.Catalogos;
using Newtonsoft.Json;
using System.Web.Caching;
using System.Web;


namespace PYME_MVC.Controllers
{
    public class CapturaController : Controller
    {
        //
        // GET: /Captura/
        ConfiguracionServicios _host = new ConfiguracionServicios();

        [NoCache]
        public ActionResult Index()
        {
            if (Session["usuario"] == null)
            {
                return RedirectToAction("Login", "Account");
            }
            return View();
        }


        [NoCache]
        private ActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            else
            {
                return RedirectToAction("Index", "Principal");
            }
        }

        [NoCache]
        public ActionResult PersonaResponLegal(string str_JSON = null)
        {
            ViewBag.nombre = "";
            ViewBag.numCliente = "";
            ViewBag.rSocial = "";
            if (str_JSON != null)
            {
                var json_serializer = new JavaScriptSerializer();
                var routes_list = (IDictionary<string, object>)json_serializer.DeserializeObject(str_JSON);
                ViewBag.nombre = routes_list["NOMBRE"];
                ViewBag.numCliente = routes_list["NUM_CLIENTE"];
                ViewBag.rfc = routes_list["RFC"];
                ViewBag.eMail = routes_list["CORREO_ELECTRONICO"];
                ViewBag.rSocial = routes_list["RAZON_SOCIAL"];
                ViewBag.tPersona = routes_list["TIPO_PERSONA"];
                ViewBag.tCliente = routes_list["TIP_CLIENTE"];
            }
            return View();
        }

        [NoCache]
        public ActionResult PersonaAval(string str_JSON = null)
        {
            ViewBag.nombre = "";
            ViewBag.numCliente = "";
            ViewBag.rSocial = "";
            if (str_JSON != null)
            {
                var json_serializer = new JavaScriptSerializer();
                var routes_list = (IDictionary<string, object>)json_serializer.DeserializeObject(str_JSON);
                ViewBag.nombre = routes_list["NOMBRE"];
                ViewBag.numCliente = routes_list["NUM_CLIENTE"];
                ViewBag.rfc = routes_list["RFC"];
                ViewBag.eMail = routes_list["CORREO_ELECTRONICO"];
                ViewBag.rSocial = routes_list["RAZON_SOCIAL"];
                ViewBag.tPersona = routes_list["TIPO_PERSONA"];
                ViewBag.tCliente = routes_list["TIP_CLIENTE"];
            }
            return View();
        }

        #region Vistas
        [NoCache]
        [AllowAnonymous]
        public ActionResult PersonaFisica()
        {
            if (Session["usuario"] == null)
            {
                return RedirectToAction("Login", "Account");
            }
            return View();
        }

        [NoCache]
        [AllowAnonymous]
        public ActionResult PersonaMoral()
        {
            if (Session["usuario"] == null)
            {
                return RedirectToAction("Login", "Account");
            } 
            return View();
        }


        [NoCache]
        [HttpPost]
        public ActionResult PersonaFisica(Fisica model)
        {
            if (Session["usuario"] == null)
            {
                return RedirectToAction("Login", "Account");
            } 
            if (model.num_cliente == null)
            {
                // Si llegamos a este punto, es que se ha producido un error y volvemos a mostrar el formulario
                ModelState.AddModelError("", "FAVOR DE LLENAR LOS CAMPOS REQUERIDOS.");
                return View(model);
            }
            else
            {
                var editarCliente = new Fisica();
                try
                {
                    var cod_empresa = "001";
                    List<Fisica> datosPersonaFisica = new Dal().ObtieneDatosPersonaFisica(cod_empresa, model.num_cliente);
                    if (datosPersonaFisica.Count > 0)
                    {
                        editarCliente.num_cliente = datosPersonaFisica[0].num_cliente;
                        editarCliente.cod_agencia = datosPersonaFisica[0].cod_agencia;
                        editarCliente.nombre = datosPersonaFisica[0].nombre;
                        editarCliente.seg_nombre = datosPersonaFisica[0].seg_nombre;
                        editarCliente.ape_paterno = datosPersonaFisica[0].ape_paterno;
                        editarCliente.ape_materno = datosPersonaFisica[0].ape_materno;
                        editarCliente.fec_nacimiento = datosPersonaFisica[0].fec_nacimiento;
                        editarCliente.sexo = datosPersonaFisica[0].sexo;
                        editarCliente.edo_civil = datosPersonaFisica[0].edo_civil;
                        editarCliente.cod_nacionalidad = datosPersonaFisica[0].cod_nacionalidad;
                        editarCliente.rfc = datosPersonaFisica[0].rfc;
                        editarCliente.curp = datosPersonaFisica[0].curp;
                        editarCliente.tip_id = datosPersonaFisica[0].tip_id;
                        editarCliente.num_id = datosPersonaFisica[0].num_id;
                        editarCliente.correo_electronico = datosPersonaFisica[0].correo_electronico;
                        editarCliente.cod_actividad = datosPersonaFisica[0].cod_sector + ":" + datosPersonaFisica[0].cod_actividad;
                        editarCliente.cod_sector = datosPersonaFisica[0].cod_sector;
                        editarCliente.ind_estado = datosPersonaFisica[0].ind_estado;
                        editarCliente.cod_usuario = datosPersonaFisica[0].cod_usuario;
                        editarCliente.fec_alta = datosPersonaFisica[0].fec_alta;
                        /*Consultar la información de su dirección */

                        List<Direccion> datosDireccion = new Dal().ObtieneDireccionCliente(cod_empresa, "1", model.num_cliente, "0", "F1", "1");
                        if (datosDireccion.Count > 0)
                        {
                            editarCliente.tip_direccion = datosDireccion[0].tip_direccion;
                            editarCliente.calle = datosDireccion[0].calle;
                            editarCliente.num_ext = datosDireccion[0].num_ext;
                            editarCliente.num_int = datosDireccion[0].num_int;
                            editarCliente.cp = datosDireccion[0].cp;
                            editarCliente.cod_estado = datosDireccion[0].cod_estado;
                            editarCliente.cod_municipio = datosDireccion[0].cod_municipio;
                            editarCliente.cod_colonia = datosDireccion[0].cod_colonia;
                            editarCliente.tel_local = datosDireccion[0].tel_local;
                            editarCliente.tel_celular = datosDireccion[0].tel_celular;
                            editarCliente.tel_otro = datosDireccion[0].tel_otro;
                        }
                    }
                    ModelState.Clear();
                }
                catch (Exception)
                {
                    throw;
                }
                return View("PersonaFisica", editarCliente);
            }
        }

        [NoCache]
        [HttpPost]
        public ActionResult PersonaMoral(Moral model)
        {
            if (Session["usuario"] == null)
            {
                return RedirectToAction("Login", "Account");
            } 
            if (model.num_cliente == null)
            {
                // Si llegamos a este punto, es que se ha producido un error y volvemos a mostrar el formulario
                ModelState.AddModelError("", "FAVOR DE LLENAR LOS CAMPOS REQUERIDOS.");
                return View(model);
            }
            else
            {
                var editarCliente = new Moral();
                try
                {
                    var cod_empresa = "001";
                    List<Moral> datosPersMoral = new Dal().ObtieneDatosPersonaMoral(cod_empresa, model.num_cliente);
                    if (datosPersMoral.Count > 0)
                    {
                        editarCliente.num_cliente = datosPersMoral[0].num_cliente;
                        editarCliente.cod_agencia = datosPersMoral[0].cod_agencia;
                        editarCliente.nombre = datosPersMoral[0].nombre;
                        editarCliente.num_acta = datosPersMoral[0].num_acta;
                        editarCliente.gpo_empresarial = datosPersMoral[0].gpo_empresarial;
                        editarCliente.fec_constitucion = datosPersMoral[0].fec_constitucion;
                        editarCliente.con_sindicato = datosPersMoral[0].con_sindicato;
                        editarCliente.rfc = datosPersMoral[0].rfc;
                        editarCliente.correo_electronico = datosPersMoral[0].correo_electronico;
                        editarCliente.cod_actividad = datosPersMoral[0].cod_sector + ":" + datosPersMoral[0].cod_actividad;
                        editarCliente.cod_sector = datosPersMoral[0].cod_sector;
                        /*Consultar la información de su dirección */

                        List<Direccion> datosDireccion = new Dal().ObtieneDireccionCliente(cod_empresa, "1", model.num_cliente, "0", "M0", "1");
                        if (datosDireccion.Count > 0)
                        {
                            editarCliente.cod_direccion = datosDireccion[0].cod_direccion;
                            editarCliente.tip_direccion = datosDireccion[0].tip_direccion;
                            editarCliente.calle = datosDireccion[0].calle;
                            editarCliente.num_ext = datosDireccion[0].num_ext;
                            editarCliente.num_int = datosDireccion[0].num_int;
                            editarCliente.cp = datosDireccion[0].cp;
                            editarCliente.cod_estado = datosDireccion[0].cod_estado;
                            editarCliente.cod_municipio = datosDireccion[0].cod_municipio;
                            editarCliente.cod_colonia = datosDireccion[0].cod_colonia;
                            editarCliente.tel_local = datosDireccion[0].tel_local;
                            editarCliente.tel_celular = datosDireccion[0].tel_celular;
                            editarCliente.tel_otro = datosDireccion[0].tel_otro;
                        }
                        List<Direccion> datosDireccionFiscal = new Dal().ObtieneDireccionCliente(cod_empresa, "1", model.num_cliente, "0", "M1", "1");
                        if (datosDireccionFiscal.Count > 0)
                        {
                            editarCliente.cod_direccion_f = datosDireccionFiscal[0].cod_direccion;
                            editarCliente.tip_direccion_f = datosDireccionFiscal[0].tip_direccion;
                            editarCliente.calle_f = datosDireccionFiscal[0].calle;
                            editarCliente.num_ext_f = datosDireccionFiscal[0].num_ext;
                            editarCliente.num_int_f = datosDireccionFiscal[0].num_int;
                            editarCliente.cp_f = datosDireccionFiscal[0].cp;
                            editarCliente.cod_estado_f = datosDireccionFiscal[0].cod_estado;
                            editarCliente.cod_municipio_f = datosDireccionFiscal[0].cod_municipio;
                            editarCliente.cod_colonia_f = datosDireccionFiscal[0].cod_colonia;
                            editarCliente.tel_local_f = datosDireccionFiscal[0].tel_local;
                            editarCliente.tel_celular_f = datosDireccionFiscal[0].tel_celular;
                            editarCliente.tel_otro_f = datosDireccionFiscal[0].tel_otro;
                        }
                    }
                    ModelState.Clear();
                }
                catch (Exception)
                {
                    throw;
                }
                return View("PersonaMoral", editarCliente);
            }
        }
        #endregion

        #region Registro de los datos
        [HttpPost]
        public ActionResult InsertarPersonaFisica(Fisica model, string json_cuentas = null)
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
            model.cod_empresa = "001";
            var values = new NameValueCollection
            {  
            {"p_cod_empresa"           ,model.cod_empresa },
            {"p_cod_agencia"           ,model.cod_agencia },
            {"p_nombre"                ,model.nombre },
            {"p_seg_nombre"            ,model.seg_nombre },
            {"p_ape_paterno"           ,model.ape_paterno },
            {"p_ape_materno"           ,model.ape_materno},
            {"p_fec_nacimiento"        ,model.fec_nacimiento.Value.ToShortDateString()},
            {"p_sexo"                  ,model.sexo },
            {"p_edo_civil"             ,model.edo_civil },
            {"p_cod_nacionalidad"      ,model.cod_nacionalidad },
            {"p_rfc"                   ,model.rfc },
            {"p_curp"                  ,model.curp },
            {"p_tip_id"                ,model.tip_id },
            {"p_num_id"                ,model.num_id },
            {"p_correo_electronico"    ,model.correo_electronico },
            {"p_cod_actividad"         ,model.cod_actividad.Substring(model.cod_actividad.IndexOf(":")+1) },
            {"p_cod_sector"            ,model.cod_sector},
            {"p_cod_usuario"           ,Usuario.cod_usuario },
            {"p_tip_direccion"         ,model.tip_direccion },
            {"p_calle"                 ,model.calle },
            {"p_num_ext"               ,model.num_ext },
            {"p_num_int"               ,model.num_int },
            {"p_cod_estado"            ,model.cod_estado },
            {"p_cp"                    ,model.cp },
            {"p_cod_municipio"         ,model.cod_municipio},
            {"p_cod_colonia"           ,model.cod_colonia},
            {"p_tel_local"             ,model.tel_local },
            {"p_tel_celular"           ,model.tel_celular },
            {"p_tel_otro"              ,model.tel_otro },
                           
            };
            try
            {
                var conexion = new ConfiguracionServicios();
                var url = conexion.HostPyme + "Guarda/PersonaFisica";
                string response = new Dal().JsonPost(url, values);
                if (string.IsNullOrEmpty(response))
                {
                    Msj_info.Add(new DatosCatalogos() { error = "1", des_error = "El servicio no responde (/Guarda/PersonaFisica)" });
                }
                else
                {
                    if (response.Contains("[") && response.Contains("]"))
                    {

                        var p1 = response.Substring(response.LastIndexOf('[') + 1);
                        var Num_cliente = p1.Substring(0, p1.LastIndexOf(']'));
                        #region Ins Direccion
                        /*Un vez que se crea el cliente se inserta la dirección */
                        values.Add("p_num_persona", "0");
                        values.Add("p_num_cliente", Num_cliente);
                        values.Add("p_tip_cliente", "F1");
                        var urlDireccion = conexion.HostPyme + "Guarda/DireccionCliente";
                        var msjDireccion = new Dal().JsonPost(urlDireccion, values);
                        if (!msjDireccion.Contains("[") && !msjDireccion.Contains("]"))
                        {
                            Msj_info.Add(new DatosCatalogos() { error = "1", des_error = msjDireccion });
                        }
                        #endregion
                        #region Ins Cuentas Bancarias
                        var cuentas = JsonConvert.DeserializeObject<List<CuentaBancaria>>(json_cuentas);
                        if (cuentas.Count > 0)
                        {
                            var urlcuentas = conexion.HostPyme + "/Guarda/CuentaBancaria";
                            foreach (var item in cuentas)
                            {
                                var cuentabancaria = new NameValueCollection {
                                    {"p_cod_empresa"	  , model.cod_empresa  },
                                    {"p_num_cliente"      , Num_cliente  },
                                    {"p_num_cuenta"       , item.num_cuenta },
                                    {"p_clabe"            , item.clabe },
                                    {"p_cod_banco"        , item.cod_banco },
                                    {"p_banco_pral"       , item.banco_pral ? "1" : "0" },
                                    {"p_tip_cliente"      , "F" },
                                    {"p_cod_usuario"      , Usuario.cod_usuario  }
                                };
                                var rep_cuenta = new Dal().JsonPost(urlcuentas, cuentabancaria);
                                if (!rep_cuenta.Contains("[") && !rep_cuenta.Contains("]"))
                                {
                                    Msj_info.Add(new DatosCatalogos() { error = "1", des_error = rep_cuenta });
                                }

                            }

                        }
                        #endregion
                        /*Mensaje de confirmación a la vista */
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
        public ActionResult ActualizaPersonaFisica(Fisica model)
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
            model.cod_empresa = "001";
            var values = new NameValueCollection
            { 
                 {"p_cod_empresa"           ,model.cod_empresa },
                 {"p_num_cliente"           ,model.num_cliente },
                 {"p_cod_agencia"           ,model.cod_agencia },
                 {"p_nombre"                ,model.nombre },
                 {"p_seg_nombre"            ,model.seg_nombre },
                 {"p_ape_paterno"           ,model.ape_paterno },
                 {"p_ape_materno"           ,model.ape_materno},
                 {"p_fec_nacimiento"        ,model.fec_nacimiento.Value.ToShortDateString()},
                 {"p_sexo"                  ,model.sexo },
                 {"p_edo_civil"             ,model.edo_civil },
                 {"p_cod_nacionalidad"      ,model.cod_nacionalidad },
                 {"p_rfc"                   ,model.rfc },
                 {"p_curp"                  ,model.curp },
                 {"p_tip_id"                ,model.tip_id },
                 {"p_num_id"                ,model.num_id },
                 {"p_correo_electronico"    ,model.correo_electronico },
                 {"p_cod_actividad"         ,model.cod_actividad.Substring(model.cod_actividad.IndexOf(":")+1) },
                 {"p_cod_sector"            ,model.cod_sector},
                 {"p_estatus"               ,"1"},
                 {"p_cod_usuario"           ,Usuario.cod_usuario },
                 {"p_cod_direccion"         ,"1"},
                 {"p_tip_direccion"         ,model.tip_direccion },
                 {"p_calle"                 ,model.calle },
                 {"p_num_ext"               ,model.num_ext },
                 {"p_num_int"               ,model.num_int },
                 {"p_cod_estado"            ,model.cod_estado },
                 {"p_cp"                    ,model.cp },
                 {"p_cod_municipio"         ,model.cod_municipio},
                 {"p_cod_colonia"           ,model.cod_colonia},
                 {"p_tel_local"             ,model.tel_local },
                 {"p_tel_celular"           ,model.tel_celular },
                 {"p_tel_otro"              ,model.tel_otro },
                 {"p_num_persona"           ,"0" },
                 {"p_tip_cliente"           ,"F1" },
            };
            try
            {
                var conexion = new ConfiguracionServicios();
                var url = conexion.HostPyme + "Guarda/PersonaFisica";
                string response = new Dal().JsonPost(url, values);
                if (string.IsNullOrEmpty(response))
                {
                    Msj_info.Add(new DatosCatalogos() { error = "1", des_error = "El servicio no responde (/Guarda/PersonaFisica)" });
                }
                else
                {
                    if (response.Contains("[") && response.Contains("]"))
                    {
                       #region Upd Direccion
                        /*Un vez que se crea el cliente se inserta la dirección */
                        var urlDireccion = conexion.HostPyme + "Guarda/DireccionCliente";
                        var msjDireccion = new Dal().JsonPost(urlDireccion, values);
                        if (!msjDireccion.Contains("[") && !msjDireccion.Contains("]"))
                        {
                            Msj_info.Add(new DatosCatalogos() { error = "1", des_error = msjDireccion });
                        }
                        #endregion
                        /*Mensaje de confirmación a la vista */
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
        public ActionResult InsertarPersonaMoral(Moral model, string json_cuentas = "", string json_Accionistas = "", string json_RepresentanteLegal = "", string json_Aval = "", string json_ResponsablePago ="")
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
            model.cod_empresa = "001";
            var values = new NameValueCollection
            {  
                {"p_cod_empresa"        ,model.cod_empresa},
                {"p_cod_agencia"        ,model.cod_agencia},
                {"p_nombre"             ,model.nombre},
                {"p_num_acta"           ,model.num_acta},
                {"p_fec_constitucion"   ,model.fec_constitucion.Value.ToShortDateString()},
                {"p_rfc"                ,model.rfc},
                {"p_cod_actividad"      ,model.cod_actividad.Substring(model.cod_actividad.IndexOf(":")+1)},
                {"p_cod_sector"         ,model.cod_sector},
                {"p_correo_electronico" ,model.correo_electronico},
                {"p_con_sindicato"      ,model.con_sindicato? "1" : "0" },
                {"p_gpo_empresarial"    ,model.gpo_empresarial},
                {"p_cod_usuario"        ,Usuario.cod_usuario},
                {"p_tip_direccion"      ,model.tip_direccion },
                {"p_calle"              ,model.calle },
                {"p_num_ext"            ,model.num_ext },
                {"p_num_int"            ,model.num_int },
                {"p_cod_estado"         ,model.cod_estado },
                {"p_cp"                 ,model.cp },
                {"p_cod_municipio"      ,model.cod_municipio },
                {"p_cod_colonia"        ,model.cod_colonia },
                {"p_tel_local"          ,model.tel_local },
                {"p_tel_celular"        ,model.tel_celular },
                {"p_tel_otro"           ,model.tel_otro }
            };
            try
            {
                var conexion = new ConfiguracionServicios();
                var url = conexion.HostPyme + "Guarda/PersonaMoral";
                string response = new Dal().JsonPost(url, values);
                if (string.IsNullOrEmpty(response))
                {
                    Msj_info.Add(new DatosCatalogos() { error = "1", des_error = "El servicio no responde (/Guarda/PersonaMoral)" });
                }
                else
                {
                    if (response.Contains("[") && response.Contains("]"))
                    {
                        var p1 = response.Substring(response.LastIndexOf('[') + 1);
                        var Num_cliente = p1.Substring(0, p1.LastIndexOf(']'));
                        #region Ins Direccion
                        /*Un vez que se crea el cliente se inserta la dirección */
                        values.Add("p_num_persona", "0");
                        values.Add("p_num_cliente", Num_cliente);
                        values.Add("p_tip_cliente", "M0");
                        var urlDireccion = conexion.HostPyme + "Guarda/DireccionCliente";
                        var msjDireccion = new Dal().JsonPost(urlDireccion, values);
                        if (!msjDireccion.Contains("[") && !msjDireccion.Contains("]"))
                        {
                            Msj_info.Add(new DatosCatalogos() { error = "1", des_error = msjDireccion });
                        }
                        #endregion
                        #region Ins Direccion Física
                        if (!string.IsNullOrEmpty(model.tip_direccion_f) & !string.IsNullOrEmpty(model.calle_f) & !string.IsNullOrEmpty(model.num_ext_f) &  !string.IsNullOrEmpty(model.cod_estado_f) & !string.IsNullOrEmpty(model.cp_f) &
                            !string.IsNullOrEmpty(model.cod_municipio_f) & !string.IsNullOrEmpty(model.cod_colonia_f) & !string.IsNullOrEmpty(model.tel_local_f))
                        {
                            /*Un vez que se crea el cliente se inserta la dirección */
                            var valuesdir_f = new NameValueCollection
                             {  
                                 {"p_cod_empresa"        ,model.cod_empresa},
                                 {"p_num_persona"        ,"0"},
                                 {"p_num_cliente"        ,Num_cliente},
                                 {"p_tip_cliente"        ,"M1"},
                                 {"p_cod_usuario"        ,Usuario.cod_usuario},
                                 {"p_tip_direccion"      ,model.tip_direccion_f },
                                 {"p_calle"              ,model.calle_f },
                                 {"p_num_ext"            ,model.num_ext_f },
                                 {"p_num_int"            ,model.num_int_f },
                                 {"p_cod_estado"        ,model.cod_estado_f },
                                 {"p_cp"                ,model.cp_f },
                                 {"p_cod_municipio"      ,model.cod_municipio_f },
                                 {"p_cod_colonia"        ,model.cod_colonia_f },
                                 {"p_tel_local"          ,model.tel_local_f },
                                 {"p_tel_celular"        ,model.tel_celular_f },
                                 {"p_tel_otro"          ,model.tel_otro_f }
                             };
                            var msjDireccion_f = new Dal().JsonPost(urlDireccion, valuesdir_f);
                            if (!msjDireccion_f.Contains("[") && !msjDireccion_f.Contains("]"))
                            {
                                Msj_info.Add(new DatosCatalogos() { error = "1", des_error = msjDireccion_f });
                            }
                        }
                        #endregion
                        #region Ins Cuentas Bancarias
                        var cuentas = JsonConvert.DeserializeObject<List<CuentaBancaria>>(json_cuentas);
                        if (cuentas.Count > 0)
                        {
                            var urlcuentas = conexion.HostPyme + "/Guarda/CuentaBancaria";
                            foreach (var item in cuentas)
                            {
                                var cuentabancaria = new NameValueCollection {
                                    {"p_cod_empresa"	  , model.cod_empresa  },
                                    {"p_num_cliente"      , Num_cliente  },
                                    {"p_num_cuenta"       , item.num_cuenta },
                                    {"p_clabe"            , item.clabe },
                                    {"p_cod_banco"        , item.cod_banco },
                                    {"p_banco_pral"       , item.banco_pral ? "1" : "0" },
                                    {"p_tip_cliente"      , "M" },
                                    {"p_cod_usuario"      , Usuario.cod_usuario  }
                                };
                                var rep_cuenta = new Dal().JsonPost(urlcuentas, cuentabancaria);
                                if (!rep_cuenta.Contains("[") && !rep_cuenta.Contains("]"))
                                {
                                    Msj_info.Add(new DatosCatalogos() { error = "1", des_error = rep_cuenta });
                                }

                            }

                        }
                        #endregion
                        #region Ins Accionistas
                        var Accionistas = JsonConvert.DeserializeObject<List<Accionista>>(json_Accionistas);
                        if (Accionistas.Count > 0)
                        {
                            var urlAC = conexion.HostPyme + "/Guarda/Accionistas";
                            foreach (var item in Accionistas)
                            {
                                var datosAccionistas = new NameValueCollection 
                                {
                                    {"p_cod_empresa"     ,  model.cod_empresa  },
                                    {"p_num_cliente"     , Num_cliente },
                                    {"p_nombre"          , item.nombre },
                                    {"p_seg_nombre"      , item.seg_nombre },
                                    {"p_ape_paterno"     , item.ape_paterno },
                                    {"p_ape_materno"     , item.ape_materno },
                                    {"p_tip_accionistas" , item.tip_accionistas },
                                    {"p_rfc"             , item.rfc },
                                    {"p_curp"            , item.curp },
                                    {"p_porc_acciones"   , item.porc_acciones },
                                    {"p_importe_capital" , item.importe_capital },
                                    {"p_cod_nacionalidad", item.cod_nacionalidad },
                                    {"p_cod_usuario"     , Usuario.cod_usuario},
                                    {"p_tip_cliente"     , item.tip_cliente },
                                    {"p_tip_direccion"   , item.tip_direccion },
                                    {"p_calle"           , item.calle },
                                    {"p_num_ext"         , item.num_ext },
                                    {"p_num_int"         , item.num_int },
                                    {"p_cod_estado"      , item.cod_estado },
                                    {"p_cp"              , item.cp },
                                    {"p_cod_municipio"   , item.cod_municipio },
                                    {"p_cod_colonia"     , item.cod_colonia },
                                    {"p_tel_local"       , item.tel_local },
                                    {"p_tel_celular"     , item.tel_celular },
                                    {"p_tel_otro"        , item.tel_otro}
                                };
                                var rep_AC = new Dal().JsonPost(urlAC, datosAccionistas);
                                if (!rep_AC.Contains("[") && !rep_AC.Contains("]"))
                                {
                                    Msj_info.Add(new DatosCatalogos() { error = "1", des_error = rep_AC });
                                }
                            }
                        }
                        #endregion
                        #region Ins Representante Legal
                        var RepresentanteLegal = JsonConvert.DeserializeObject<List<RepresentanteLegal>>(json_RepresentanteLegal);
                        if (RepresentanteLegal.Count > 0)
                        {
                            var urlRL = conexion.HostPyme + "/Guarda/RepresentanteLegal";
                            foreach (var item in RepresentanteLegal)
                            {
                                var datosRepresentanteLegal = new NameValueCollection 
                                {
                                    {"p_cod_empresa"        ,model.cod_empresa},
                                    {"p_num_cliente"        ,Num_cliente},
                                    {"p_nombre"             ,item.nombre},
                                    {"p_seg_nombre"         ,item.seg_nombre},
                                    {"p_ape_paterno"        ,item.ape_paterno},
                                    {"p_ape_materno"        ,item.ape_materno},
                                    {"p_tip_repre_legal"    ,item.tip_repre_legal},
                                    {"p_rfc"                ,item.rfc},
                                    {"p_curp"               ,item.curp},
                                    {"p_num_escritura"      ,item.num_escritura},
                                    {"p_folio_mercantil"    ,item.folio_mercantil},
                                    {"p_cod_tipo_facultades",item.cod_tipo_facultades},
                                    {"p_cod_ejercimiento"   ,item.cod_ejercimiento},
                                    {"p_cod_usuario"        ,Usuario.cod_usuario},
                                    {"p_tip_cliente"        ,item.tip_cliente},
                                    {"p_tip_direccion"      ,item.tip_direccion},
                                    {"p_calle"              ,item.calle},
                                    {"p_num_ext"            ,item.num_ext},
                                    {"p_num_int"            ,item.num_int},
                                    {"p_cod_estado"         ,item.cod_estado},
                                    {"p_cp"                 ,item.cp},
                                    {"p_cod_municipio"      ,item.cod_municipio},
                                    {"p_cod_colonia"        ,item.cod_colonia},
                                    {"p_tel_local"          ,item.tel_local},
                                    {"p_tel_celular"        ,item.tel_celular},
                                    {"p_tel_otro"           ,item.tel_otro}
                                };
                                var rep_RL = new Dal().JsonPost(urlRL, datosRepresentanteLegal);
                                if (!rep_RL.Contains("[") && !rep_RL.Contains("]"))
                                {
                                    Msj_info.Add(new DatosCatalogos() { error = "1", des_error = rep_RL });
                                }
                            }
                        }
                        #endregion
                        #region Ins Aval
                        var Aval = JsonConvert.DeserializeObject<List<Aval>>(json_Aval);
                        if (Aval.Count > 0)
                        {
                            var urlAval = conexion.HostPyme + "/Guarda/Aval";
                            foreach (var item in Aval)
                            {
                                var datosAval = new NameValueCollection 
                                {
                                    {"p_cod_empresa"     , model.cod_empresa },
                                    {"p_num_cliente"     , Num_cliente },
                                    {"p_nombre"          , item.nombre },
                                    {"p_seg_nombre"      , item.seg_nombre },
                                    {"p_ape_paterno"     , item.ape_paterno },
                                    {"p_ape_materno"     , item.ape_materno },
                                    {"p_tip_aval"        , item.tip_aval },
                                    {"p_rfc"             , item.rfc },
                                    {"p_curp"            , item.curp },
                                    {"p_cod_nacionalidad", item.cod_nacionalidad },
                                    {"p_cod_usuario"     , Usuario.cod_usuario },
                                    {"p_tip_cliente"     , item.tip_cliente },
                                    {"p_tip_direccion"   , item.tip_direccion },
                                    {"p_calle"           , item.calle },
                                    {"p_num_ext"         , item.num_ext },
                                    {"p_num_int"         , item.num_int },
                                    {"p_cod_estado"      , item.cod_estado },
                                    {"p_cp"              , item.cp },
                                    {"p_cod_municipio"   , item.cod_municipio },
                                    {"p_cod_colonia"     , item.cod_colonia },
                                    {"p_tel_local"       , item.tel_local },
                                    {"p_tel_celular"     , item.tel_celular },
                                    {"p_tel_otro"        , item.tel_otro },
                                };
                                var rep_Aval = new Dal().JsonPost(urlAval, datosAval);
                                if (!rep_Aval.Contains("[") && !rep_Aval.Contains("]"))
                                {
                                    Msj_info.Add(new DatosCatalogos() { error = "1", des_error = rep_Aval });
                                }
                            }
                        }
                        #endregion
                        #region Ins Responsable Pago
                        var ResponsablePago = JsonConvert.DeserializeObject<List<ResponsablePago>>(json_ResponsablePago);
                        if (ResponsablePago.Count > 0)
                        {
                            var urlRP = conexion.HostPyme + "/Guarda/ResponsablePago";
                            foreach (var item in ResponsablePago)
                            {
                                var datosRP= new NameValueCollection 
                                {
                                   {"p_cod_empresa"       , model.cod_empresa },
                                   {"p_num_cliente"       , Num_cliente },
                                   {"p_nombre"            , item.nombre },
                                   {"p_seg_nombre"        , item.seg_nombre },
                                   {"p_ape_paterno"       , item.ape_paterno },
                                   {"p_ape_materno"       , item.ape_materno },
                                   {"p_tip_resp_pago"     , item.tip_resp_pago},
                                   {"p_rfc"               , item.rfc },
                                   {"p_curp"              , item.curp },
                                   {"p_puesto"            , item.puesto },
                                   {"p_correo_electronico", item.correo_electronico },
                                   {"p_cod_usuario"       , Usuario.cod_usuario  },
                                   {"p_tip_cliente"       , item.tip_cliente },
                                   {"p_tip_direccion"     , item.tip_direccion },
                                   {"p_calle"             , item.calle },
                                   {"p_num_ext"           , item.num_ext },
                                   {"p_num_int"           , item.num_int },
                                   {"p_cod_estado"        , item.cod_estado },
                                   {"p_cp"                , item.cp },
                                   {"p_cod_municipio"     , item.cod_municipio },
                                   {"p_cod_colonia"       , item.cod_colonia },
                                   {"p_tel_local"         , item.tel_local },
                                   {"p_tel_celular"       , item.tel_celular },
                                   {"p_tel_otro"          , item.tel_otro },
                                };
                                var rep_Aval = new Dal().JsonPost(urlRP, datosRP);
                                if (!rep_Aval.Contains("[") && !rep_Aval.Contains("]"))
                                {
                                    Msj_info.Add(new DatosCatalogos() { error = "1", des_error = rep_Aval });
                                }
                            }
                        }
                        #endregion
                        /*Mensaje de confirmación a la vista */
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
        public ActionResult ActualizaPersonaMoral(Moral model)
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
            model.cod_empresa = "001";
            var values = new NameValueCollection
            { 
                {"p_cod_empresa"        ,model.cod_empresa},
                {"p_num_cliente"        ,model.num_cliente },
                {"p_cod_agencia"        ,model.cod_agencia},
                {"p_nombre"             ,model.nombre},
                {"p_num_acta"           ,model.num_acta},
                {"p_fec_constitucion"   ,model.fec_constitucion.Value.ToShortDateString()},
                {"p_rfc"                ,model.rfc},
                {"p_cod_actividad"      ,model.cod_actividad.Substring(model.cod_actividad.IndexOf(":")+1)},
                {"p_cod_sector"         ,model.cod_sector},
                {"p_correo_electronico" ,model.correo_electronico},
                {"p_con_sindicato"      ,model.con_sindicato? "1" : "0" },
                {"p_gpo_empresarial"    ,model.gpo_empresarial},
                {"p_estatus"            ,"1"},
                {"p_cod_usuario"        ,Usuario.cod_usuario },
                {"p_cod_direccion"      ,model.cod_direccion},
                {"p_tip_direccion"      ,model.tip_direccion },
                {"p_calle"              ,model.calle },
                {"p_num_ext"            ,model.num_ext },
                {"p_num_int"            ,model.num_int },
                {"p_cod_estado"         ,model.cod_estado },
                {"p_cp"                 ,model.cp },
                {"p_cod_municipio"      ,model.cod_municipio},
                {"p_cod_colonia"        ,model.cod_colonia},
                {"p_tel_local"          ,model.tel_local },
                {"p_tel_celular"        ,model.tel_celular },
                {"p_tel_otro"           ,model.tel_otro },
                {"p_num_persona"        ,"0" },
                {"p_tip_cliente"        ,"M0" },
            };
            try
            {
                var conexion = new ConfiguracionServicios();
                var url = conexion.HostPyme + "Guarda/PersonaMoral";
                string response = new Dal().JsonPost(url, values);
                if (string.IsNullOrEmpty(response))
                {
                    Msj_info.Add(new DatosCatalogos() { error = "1", des_error = "El servicio no responde (/Guarda/PersonaMoral)" });
                }
                else
                {
                    if (response.Contains("[") && response.Contains("]"))
                    {
                        #region Upd Direccion
                        /*Un vez que se crea el cliente se inserta la dirección */
                        var urlDireccion = conexion.HostPyme + "Guarda/DireccionCliente";
                        var msjDireccion = new Dal().JsonPost(urlDireccion, values);
                        if (!msjDireccion.Contains("[") && !msjDireccion.Contains("]"))
                        {
                            Msj_info.Add(new DatosCatalogos() { error = "1", des_error = msjDireccion });
                        }
                        #endregion
                        #region Ins Direccion Física
                        if (!string.IsNullOrEmpty(model.tip_direccion_f) & !string.IsNullOrEmpty(model.calle_f) & !string.IsNullOrEmpty(model.num_ext_f) &
                            !string.IsNullOrEmpty(model.cod_estado_f) & !string.IsNullOrEmpty(model.cp_f) &
                            !string.IsNullOrEmpty(model.cod_municipio_f) & !string.IsNullOrEmpty(model.cod_colonia_f) & !string.IsNullOrEmpty(model.tel_local_f))
                        {
                            /*Un vez que se crea el cliente se inserta la dirección */
                            var valuesdir_f = new NameValueCollection
                             {  
                                 {"p_cod_empresa"        ,model.cod_empresa},   
                                 {"p_num_persona"        ,"0"},
                                 {"p_num_cliente"        , model.num_cliente},
                                 {"p_tip_cliente"        ,"M1"},
                                 {"p_cod_usuario"        ,Usuario.cod_usuario},
                                 {"p_tip_direccion"      ,model.tip_direccion_f },
                                 {"p_calle"              ,model.calle_f },
                                 {"p_num_ext"            ,model.num_ext_f },
                                 {"p_num_int"            ,model.num_int_f },
                                 {"p_cod_estado"        ,model.cod_estado_f },
                                 {"p_cp"                ,model.cp_f },
                                 {"p_cod_municipio"      ,model.cod_municipio_f },
                                 {"p_cod_colonia"        ,model.cod_colonia_f },
                                 {"p_tel_local"          ,model.tel_local_f },
                                 {"p_tel_celular"        ,string.IsNullOrEmpty(model.tel_celular_f) ?null:model.tel_celular_f },
                                 {"p_tel_otro"          , string.IsNullOrEmpty(model.tel_otro_f) ? null: model.tel_otro_f }  ,
                                 {"p_estatus"           ,"1" }

                             };
                            if(!string.IsNullOrEmpty( model.cod_direccion_f))
                            {
                                 valuesdir_f.Add("p_cod_direccion",model.cod_direccion_f );    

                            }
                            var msjDireccion_f = new Dal().JsonPost(urlDireccion, valuesdir_f);
                            if (!msjDireccion.Contains("[") && !msjDireccion.Contains("]"))
                            {
                                Msj_info.Add(new DatosCatalogos() { error = "1", des_error = msjDireccion });
                            }
                        }
                        #endregion
                        /*Mensaje de confirmación a la vista */
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
        public ActionResult GuardaCuentaBancaria(CuentaBancaria model)
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
            {{"p_cod_empresa"   , model.cod_empresa },
             {"p_num_cliente"   , model.num_cliente },
             {"p_num_cuenta"    , model.num_cuenta },
             {"p_clabe"         , model.clabe },
             {"p_cod_banco"     , model.cod_banco },
             {"p_banco_pral"    , model.banco_pral? "1" : "0"  },
             {"p_tip_cliente"   , model.tip_cliente },
             {"p_cod_usuario"   , Usuario.cod_usuario },
             {"p_estatus"       , "1" }};

            if (model.cod_num_cuenta != null)
            {
                values.Add("p_cod_num_cuenta", model.cod_num_cuenta);
            }

            try
            {
                var conexion = new ConfiguracionServicios();
                var url = conexion.HostPyme + "Guarda/CuentaBancaria";
                string response = new Dal().JsonPost(url, values);
                if (string.IsNullOrEmpty(response))
                {
                    Msj_info.Add(new DatosCatalogos() { error = "1", des_error = "El servicio no responde (/Guarda/CuentaBancaria)" });
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
        public ActionResult GuardaAccionistas(Accionista model)
        {
            var Msj_info = new List<DatosCatalogos>();
            var continuar = true;
            if (!ModelState.IsValid)
            {
                var index = 1;
                foreach (ModelState modelState in ViewData.ModelState.Values)
                {
                    foreach (ModelError error in modelState.Errors)
                    {
                        List<string> Omisiones = new List<string>();
                        Omisiones.Add("El código de la agencia es requerida");
                        Omisiones.Add("El género es un campo obligatorio");
                        Omisiones.Add("El estado civil es obligatorio");
                        Omisiones.Add("Favor de indicar el tipo de identificador del cliente");
                        Omisiones.Add("El correo electrónico debe ser capturado de forma correcta");
                        Omisiones.Add("Favor de indicar la actividad económica");
                        Omisiones.Add("Favor de indicar el sector económico");
                        Omisiones.Add("Favor de capturar el identificador del cliente");
                        Omisiones.Add("La fecha de nacimiento es obligatoria");
                        /*Se omiten validaciones que el accionista no cuenta */
                        if (!Omisiones.Contains(error.ErrorMessage))
                        {
                            continuar = false;
                            Msj_info.Add(new DatosCatalogos() { informativo = index.ToString(), des_informativo = error.ErrorMessage });
                            index++;
                        }
                    }
                }
            }
            if (!continuar)
            {
                return Json(Msj_info, JsonRequestBehavior.AllowGet);
            }

            var Usuario = (Seguridad.GestionUsuarios.EntUsuario)Session["usuario"];

            var values = new NameValueCollection
            {
               {"p_cod_empresa", model.cod_empresa},
               {"p_num_cliente", model.num_cliente},
               {"p_nombre", model.nombre},
               {"p_seg_nombre", model.seg_nombre},
               {"p_ape_paterno", model.ape_paterno},
               {"p_ape_materno", model.ape_materno},
               {"p_tip_accionistas", model.tip_accionistas},
               {"p_rfc", model.rfc},
               {"p_curp", model.curp},
               {"p_porc_acciones", model.porc_acciones},
               {"p_importe_capital", model.importe_capital},
               {"p_cod_nacionalidad", model.cod_nacionalidad},
               {"p_cod_usuario",  Usuario.cod_usuario},
               {"p_estatus", "1"},
               {"p_cod_direccion", model.cod_direccion},
               {"p_tip_cliente", model.tip_cliente},
               {"p_tip_direccion", model.tip_direccion},
               {"p_calle", model.calle},
               {"p_num_ext", model.num_ext},
               {"p_num_int", model.num_int},
               {"p_cod_estado", model.cod_estado},
               {"p_cp", model.cp},
               {"p_cod_municipio", model.cod_municipio},
               {"p_cod_colonia", model.cod_colonia},
               {"p_tel_local", model.tel_local},
               {"p_tel_celular", model.tel_celular},
               {"p_tel_otro", model.tel_otro}
            };
            if (!string.IsNullOrEmpty( model.num_accionista  ))
            {
                values.Add("p_num_accionista", model.num_accionista);
            }
            try
            {
                var conexion = new ConfiguracionServicios();
                var url = conexion.HostPyme + "Guarda/Accionistas";
                string response = new Dal().JsonPost(url, values);
                if (string.IsNullOrEmpty(response))
                {
                    Msj_info.Add(new DatosCatalogos() { error = "1", des_error = "El servicio no responde (/Guarda/Accionistas)" });
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
        public ActionResult GuardaRepresentanteLegal(RepresentanteLegal model)
        {
            var Msj_info = new List<DatosCatalogos>();
            var continuar = true;
            if (!ModelState.IsValid)
            {
                var index = 1;
                foreach (ModelState modelState in ViewData.ModelState.Values)
                {
                    foreach (ModelError error in modelState.Errors)
                    {
                        List<string> Omisiones = new List<string>();
                        Omisiones.Add("El código de la agencia es requerida");
                        Omisiones.Add("El género es un campo obligatorio");
                        Omisiones.Add("El estado civil es obligatorio");
                        Omisiones.Add("Favor de indicar el tipo de identificador del cliente");
                        Omisiones.Add("El correo electrónico debe ser capturado de forma correcta");
                        Omisiones.Add("Favor de indicar la actividad económica");
                        Omisiones.Add("Favor de indicar el sector económico");
                        Omisiones.Add("Favor de capturar el identificador del cliente");
                        Omisiones.Add("La nacionalidad del cliente es obligatoria");
                        Omisiones.Add("La fecha de nacimiento es obligatoria");
                        /*Se omiten validaciones que el accionista no cuenta */
                        if (!Omisiones.Contains(error.ErrorMessage))
                        {
                            continuar = false;
                            Msj_info.Add(new DatosCatalogos() { informativo = index.ToString(), des_informativo = error.ErrorMessage });
                            index++;
                        }
                    }
                }
            }
            if (!continuar)
            {
                return Json(Msj_info, JsonRequestBehavior.AllowGet);
            }

            var Usuario = (Seguridad.GestionUsuarios.EntUsuario)Session["usuario"];
            var values = new NameValueCollection
            {
               {"p_cod_empresa", 		 model.cod_empresa},
               {"p_num_cliente", model.num_cliente},
               {"p_nombre", model.nombre},
               {"p_seg_nombre", model.seg_nombre},
               {"p_ape_paterno", model.ape_paterno},
               {"p_ape_materno", model.ape_materno},
               {"p_tip_repre_legal", model.tip_repre_legal},
               {"p_rfc", model.rfc},
               {"p_curp", model.curp},
               {"p_num_escritura", model.num_escritura},
               {"p_folio_mercantil", model.folio_mercantil},
               {"p_cod_tipo_facultades", model.cod_tipo_facultades},
               {"p_cod_ejercimiento", model.cod_ejercimiento},
               {"p_cod_usuario", Usuario.cod_usuario },
               {"p_estatus", "1"},
               {"p_cod_direccion", model.cod_direccion},
               {"p_tip_cliente", model.tip_cliente},
               {"p_tip_direccion", model.tip_direccion},
               {"p_calle", model.calle},
               {"p_num_ext", model.num_ext},
               {"p_num_int", model.num_int},
               {"p_cod_estado", model.cod_estado},
               {"p_cp", model.cp},
               {"p_cod_municipio", model.cod_municipio},
               {"p_cod_colonia", model.cod_colonia},
               {"p_tel_local", model.tel_local},
               {" p_tel_celular", model.tel_celular},
               {" p_tel_otro", model.tel_otro}
            };
            if (!string.IsNullOrEmpty(model.num_repre_legal))
            {
                values.Add("p_num_repre_legal", model.num_repre_legal);
            }
            try
            {
                var conexion = new ConfiguracionServicios();
                var url = conexion.HostPyme + "Guarda/RepresentanteLegal";
                string response = new Dal().JsonPost(url, values);
                if (string.IsNullOrEmpty(response))
                {
                    Msj_info.Add(new DatosCatalogos() { error = "1", des_error = "El servicio no responde (/Guarda/RepresentanteLegal)" });
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
        public ActionResult GuardaAval(Aval model)
        {
            var Msj_info = new List<DatosCatalogos>();
            var continuar = true;
            if (!ModelState.IsValid)
            {
                var index = 1;
                foreach (ModelState modelState in ViewData.ModelState.Values)
                {
                    foreach (ModelError error in modelState.Errors)
                    {
                        List<string> Omisiones = new List<string>();
                        Omisiones.Add("El código de la agencia es requerida");
                        Omisiones.Add("El género es un campo obligatorio");
                        Omisiones.Add("El estado civil es obligatorio");
                        Omisiones.Add("Favor de indicar el tipo de identificador del cliente");
                        Omisiones.Add("El correo electrónico debe ser capturado de forma correcta");
                        Omisiones.Add("Favor de indicar la actividad económica");
                        Omisiones.Add("Favor de indicar el sector económico");
                        Omisiones.Add("Favor de capturar el identificador del cliente");
                        Omisiones.Add("La fecha de nacimiento es obligatoria");
                        /*Se omiten validaciones que el accionista no cuenta */
                        if (!Omisiones.Contains(error.ErrorMessage))
                        {
                            continuar = false;
                            Msj_info.Add(new DatosCatalogos() { informativo = index.ToString(), des_informativo = error.ErrorMessage });
                            index++;
                        }
                    }
                }
            }
            if (!continuar)
            {
                return Json(Msj_info, JsonRequestBehavior.AllowGet);
            }

            var Usuario = (Seguridad.GestionUsuarios.EntUsuario)Session["usuario"];
            var values = new NameValueCollection
            {
                {"p_cod_empresa", 	model.cod_empresa},
                {"p_num_cliente", 	model.num_cliente},
                {"p_nombre", 		model.nombre},
                {"p_seg_nombre", 	model.seg_nombre},
                {"p_ape_paterno", 	model.ape_paterno},
                {"p_ape_materno", 	model.ape_materno},
                {"p_tip_aval", 		model.tip_aval},
                {"p_rfc", 		    model.rfc},
                {"p_curp", 		    model.curp},
                {"p_cod_nacionalidad", model.cod_nacionalidad},
                {"p_cod_usuario", 	Usuario.cod_usuario},
                {"p_estatus", 		"1"},
                {"p_cod_direccion", model.cod_direccion},
                {"p_tip_cliente", 	model.tip_cliente},
                {"p_tip_direccion", model.tip_direccion},
                {"p_calle", 		model.calle},
                {"p_num_ext", 		model.num_ext},
                {"p_num_int", 		model.num_int},
                {"p_cod_estado", 	model.cod_estado},
                {"p_cp", 		    model.cp},
                {"p_cod_municipio", model.cod_municipio},
                {"p_cod_colonia", 	model.cod_colonia},
                {"p_tel_local", 	model.tel_local},
                {"p_tel_celular", 	model.tel_celular},
                {"p_tel_otro", 		model.tel_otro},
            };
            if (!string.IsNullOrEmpty(model.num_aval))
            {
                values.Add("p_num_aval", model.num_aval);
            }
            try
            {
                var conexion = new ConfiguracionServicios();
                var url = conexion.HostPyme + "Guarda/Aval";
                string response = new Dal().JsonPost(url, values);
                if (string.IsNullOrEmpty(response))
                {
                    Msj_info.Add(new DatosCatalogos() { error = "1", des_error = "El servicio no responde (/Guarda/Aval)" });
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
        public ActionResult GuardaResponsablePago(ResponsablePago model)
        {
            var Msj_info = new List<DatosCatalogos>();
            var continuar = true;
            if (!ModelState.IsValid)
            {
                var index = 1;
                foreach (ModelState modelState in ViewData.ModelState.Values)
                {
                    foreach (ModelError error in modelState.Errors)
                    {
                        List<string> Omisiones = new List<string>();
                        Omisiones.Add("El código de la agencia es requerida");
                        Omisiones.Add("El género es un campo obligatorio");
                        Omisiones.Add("El estado civil es obligatorio");
                        Omisiones.Add("Favor de indicar el tipo de identificador del cliente");
                        Omisiones.Add("El correo electrónico debe ser capturado de forma correcta");
                        Omisiones.Add("Favor de indicar la actividad económica");
                        Omisiones.Add("Favor de indicar el sector económico");
                        Omisiones.Add("Favor de capturar el identificador del cliente");
                        Omisiones.Add("La nacionalidad del cliente es obligatoria");
                        Omisiones.Add("La fecha de nacimiento es obligatoria");
                        /*Se omiten validaciones que el accionista no cuenta */
                        if (!Omisiones.Contains(error.ErrorMessage))
                        {
                            continuar = false;
                            Msj_info.Add(new DatosCatalogos() { informativo = index.ToString(), des_informativo = error.ErrorMessage });
                            index++;
                        }
                    }
                }
            }
            if (!continuar)
            {
                return Json(Msj_info, JsonRequestBehavior.AllowGet);
            }
            var Usuario = (Seguridad.GestionUsuarios.EntUsuario)Session["usuario"];
            var values = new NameValueCollection
            {
                   {"p_cod_empresa", 	model.cod_empresa},
                   {"p_num_cliente", 	model.num_cliente},
                   {"p_nombre", 	model.nombre},
                   {"p_seg_nombre", 	model.seg_nombre},
                   {"p_ape_paterno", 	model.ape_paterno},
                   {"p_ape_materno", 	model.ape_materno},
                   {"p_tip_resp_pago", 	model.tip_resp_pago},
                   {"p_rfc", 	model.rfc},
                   {"p_curp", 	model.curp},
                   {"p_puesto", 	model.puesto},
                   {"p_correo_electronico", 	model.correo_electronico},
                   {"p_cod_usuario", 	Usuario.cod_usuario},
                   {"p_estatus", 	"1"},
                   {"p_cod_direccion", 	model.cod_direccion},
                   {"p_tip_cliente", 	model.tip_cliente},
                   {"p_tip_direccion", 	model.tip_direccion},
                   {"p_calle", 	model.calle},
                   {"p_num_ext", 	model.num_ext},
                   {"p_num_int", 	model.num_int},
                   {"p_cod_estado", 	model.cod_estado},
                   {"p_cp", 	model.cp},
                   {"p_cod_municipio", 	model.cod_municipio},
                   {"p_cod_colonia", 	model.cod_colonia},
                   {"p_tel_local", 	model.tel_local},
                   {"p_tel_celular", 	model.tel_celular},
                   {"p_tel_otro", 	model.tel_otro},
            };
            if (!string.IsNullOrEmpty(model.num_resp_pago))
            {
                values.Add("p_num_resp_pago", model.num_resp_pago);
            }
            try
            {
                var conexion = new ConfiguracionServicios();
                var url = conexion.HostPyme + "Guarda/ResponsablePago";
                string response = new Dal().JsonPost(url, values);
                if (string.IsNullOrEmpty(response))
                {
                    Msj_info.Add(new DatosCatalogos() { error = "1", des_error = "El servicio no responde (/Guarda/ResponsablePago)" });
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
        public ActionResult GuardaFactura(Factura model)
        {
            var Msj_info = new List<DatosCatalogos>();
            var Usuario = (Seguridad.GestionUsuarios.EntUsuario)Session["usuario"];
            try
            {
                 var values = new NameValueCollection
            {
                {"p_cod_empresa",       model.cod_empresa	},
                {"p_num_credito",       model.num_credito	},
                {"p_num_factura",       model.num_factura	},
                {"p_mon_real_fact",     model.mon_real_fact	},
                {"p_mon_valor_fact",    model.mon_valor_fact	},
                {"p_mon_entregado",     model.mon_entregado	},
                {"p_mon_a_pagar",       model.mon_a_pagar	},
                {"p_mon_aforo",         model.mon_aforo	},
                {"p_mon_iva",           model.mon_iva	},
                {"p_mon_intereses",     model.mon_intereses	},
                {"p_por_aforo",         model.por_aforo	},
                {"p_por_iva",           model.por_iva },
                {"p_por_tasa_anual",    model.por_tasa_anual	},
                {"p_por_tasa_mensual",    model.por_tasa_mensual	},
                {"p_dia_int",  model.dia_int	},
                {"p_fec_inicio",        model.fec_inicio.Value.ToShortDateString()	},
                {"p_fec_vencimiento",   model.fec_vencimiento.Value.ToShortDateString()	},
                {"p_fec_pago",          model.fec_pago.Value.ToShortDateString()	},
                {"p_cod_usuario",       Usuario.cod_usuario	},
            };
            if (!string.IsNullOrEmpty(model.id_factura))
            {
                values.Add("p_id_factura", model.id_factura);
            }
           
                var conexion = new ConfiguracionServicios();
                var url = conexion.HostPyme + "Guarda/Factura";
                string response = new Dal().JsonPost(url, values);
                if (string.IsNullOrEmpty(response))
                {
                    Msj_info.Add(new DatosCatalogos() { error = "1", des_error = "El servicio no responde (/Guarda/Factura)" });
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

        #region Eliminación de registros lógicos
        [HttpPost]
        public ActionResult DelCuentaBancaria(CuentaBancaria model)
        {
            var Msj_info = new List<DatosCatalogos>();
            var Usuario = (Seguridad.GestionUsuarios.EntUsuario)Session["usuario"];
            model.cod_empresa = "001";
            var values = new NameValueCollection
            {{"p_cod_empresa"   , model.cod_empresa },
             {"p_cod_num_cuenta", model.cod_num_cuenta },
             {"p_num_cliente"   , model.num_cliente },
             {"p_num_cuenta"    , model.num_cuenta },
             {"p_cod_usuario"   , Usuario.cod_usuario }};
            try
            {
                var conexion = new ConfiguracionServicios();
                var url = conexion.HostPyme + "Elimina/CuentaBancaria";
                string response = new Dal().JsonPost(url, values);
                if (string.IsNullOrEmpty(response))
                {
                    Msj_info.Add(new DatosCatalogos() { error = "1", des_error = "El servicio no responde (Elimina/CuentaBancaria)" });
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
        public ActionResult DelAccionista(Accionista model)
        {
            var Msj_info = new List<DatosCatalogos>();
            var Usuario = (Seguridad.GestionUsuarios.EntUsuario)Session["usuario"];
            var values = new NameValueCollection
            {
                {"p_cod_empresa"   , model.cod_empresa },
                {"p_num_cliente"   , model.num_cliente },
                {"p_num_accionista", model.num_accionista },
                {"p_tip_cliente"   , model.tip_cliente },
                {"p_cod_usuario"   , Usuario.cod_usuario }
            };
            try
            {
                var conexion = new ConfiguracionServicios();
                var url = conexion.HostPyme + "Elimina/Accionistas";
                string response = new Dal().JsonPost(url, values);
                if (string.IsNullOrEmpty(response))
                {
                    Msj_info.Add(new DatosCatalogos() { error = "1", des_error = "El servicio no responde (Elimina/Accionistas)" });
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
        public ActionResult DelRepresentanteLegal(RepresentanteLegal model)
        {
            var Msj_info = new List<DatosCatalogos>();
            var Usuario = (Seguridad.GestionUsuarios.EntUsuario)Session["usuario"];
            var values = new NameValueCollection
            {
                {"p_cod_empresa"   , model.cod_empresa },
                {"p_num_cliente"   , model.num_cliente },
                {"p_num_repre_legal", model.num_repre_legal },
                {"p_tip_cliente"   , model.tip_cliente },
                {"p_cod_usuario"   , Usuario.cod_usuario }
            };
            try
            {
                var conexion = new ConfiguracionServicios();
                var url = conexion.HostPyme + "Elimina/RepresentanteLegal";
                string response = new Dal().JsonPost(url, values);
                if (string.IsNullOrEmpty(response))
                {
                    Msj_info.Add(new DatosCatalogos() { error = "1", des_error = "El servicio no responde (Elimina/RepresentanteLegal)" });
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
        public ActionResult DelAval(Aval model)
        {
            var Msj_info = new List<DatosCatalogos>();
            var Usuario = (Seguridad.GestionUsuarios.EntUsuario)Session["usuario"];
            var values = new NameValueCollection
            {
                {"p_cod_empresa"   , model.cod_empresa },
                {"p_num_cliente"   , model.num_cliente },
                {"p_num_aval"      , model.num_aval },
                {"p_tip_cliente"   , model.tip_cliente },
                {"p_cod_usuario"   , Usuario.cod_usuario }
            };
            try
            {
                var conexion = new ConfiguracionServicios();
                var url = conexion.HostPyme + "Elimina/Avales";
                string response = new Dal().JsonPost(url, values);
                if (string.IsNullOrEmpty(response))
                {
                    Msj_info.Add(new DatosCatalogos() { error = "1", des_error = "El servicio no responde (Elimina/Avales)" });
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
        public ActionResult DelResponsablePago(ResponsablePago model)
        {
            var Msj_info = new List<DatosCatalogos>();
            var Usuario = (Seguridad.GestionUsuarios.EntUsuario)Session["usuario"];
            var values = new NameValueCollection
            {
                {"p_cod_empresa"   , model.cod_empresa },
                {"p_num_cliente"   , model.num_cliente },
                {"p_num_resp_pago" , model.num_resp_pago },
                {"p_tip_cliente"   , model.tip_cliente },
                {"p_cod_usuario"   , Usuario.cod_usuario }
            };
            try
            {
                var conexion = new ConfiguracionServicios();
                var url = conexion.HostPyme + "Elimina/ResponsablePago";
                string response = new Dal().JsonPost(url, values);
                if (string.IsNullOrEmpty(response))
                {
                    Msj_info.Add(new DatosCatalogos() { error = "1", des_error = "El servicio no responde (Elimina/ResponsablePago)" });
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

        #region Catalogos
        [WebMethod]
        public JsonResult ObtenerAgencias(string p_cod_empresa, string p_estatus )
        {
            var urlA = _host.HostPyme + "Busqueda/ObtieneCatAgencias/" + p_cod_empresa + "/" + p_estatus;
            var result = new Dal().JsonList(urlA);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [WebMethod]
        public JsonResult ObtieneCatBancos(string cod_empresa)
        {
            var urlA = new Dal().ObtieneCatBancos(cod_empresa);
            return Json(urlA, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult ObtenerSector(string cod_actividad)
        {
            var urlA = new Dal().ObtenerSector(cod_actividad);
            return Json(urlA, JsonRequestBehavior.AllowGet);
        }


        [HttpGet]
        public JsonResult CatalogoColonia(string cod_postal)
        {
            var urlA = new Dal().CatalogoColonia(cod_postal);
            return Json(urlA, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult ObtieneDomicilioSepomex(string p_cp, string p_cod_colonia)
        {
            var urlA = new Dal().ObtieneDomicilioSepomex(p_cp, p_cod_colonia);
            return Json(urlA, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult ObtieneDatosPersonaMoral(string p_cod_empresa, string p_num_cliente)
        {
            var urlA = new Dal().ObtieneDatosPersonaMoral(p_cod_empresa, p_num_cliente);
            return Json(urlA, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult ObtieneTipoCredito(string p_cod_empresa, string p_cod_producto, string p_tip_credito, string p_estatus)
        {
            try
            {
                return Json(new Dal().ObtieneTipoCredito(p_cod_empresa, p_cod_producto, p_tip_credito, p_estatus), JsonRequestBehavior.AllowGet);
            }
            catch (System.Exception)
            {
                throw;
            }
        }


        #endregion

         
    }

}

 