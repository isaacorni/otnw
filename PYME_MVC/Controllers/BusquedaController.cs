using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Services;
using PYME_MVC.Models.ConfiguracionServicios;
using PYME_MVC.Models.InvocarServiciosGenerales;
using PYME_MVC.Models.Catalogos;

namespace PYME_MVC.Controllers
{
    public class BusquedaController : Controller
    {

        ConfiguracionServicios _host = new ConfiguracionServicios();

        //
        // GET: /Busqueda/

        public ActionResult Index()
        {

            if (Session["usuario"] == null)
            {
                return RedirectToAction("Login", "Account");
            } 
            return View();
        }


        public ActionResult BuscarTipoPersona()
        {
            if (Session["usuario"] == null)
            {
                return RedirectToAction("Login", "Account");
            } 
            return View();
        }

        [HttpGet]
        public JsonResult ObtieneCliente(string p_cod_empresa, string p_tipo_cliente, string p_cadena_busqueda)
        {
            var Msj_info = new List<DatosCatalogos>();
            try
            {
                var result = new Dal().ObtieneCliente(p_cod_empresa, p_tipo_cliente, p_cadena_busqueda);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Msj_info.Add(new DatosCatalogos() { error = "1", des_error = ex.Message });
            }
            return Json(Msj_info, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult ObtieneCreditoEstatus(string p_cod_empresa, string p_ind_estado)
        {
            var Msj_info = new List<DatosCatalogos>();
            try
            {
                var result = new Dal().ObtieneCreditoEstatus(p_cod_empresa, p_ind_estado);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Msj_info.Add(new DatosCatalogos() { error = "1", des_error = ex.Message });
            }
            return Json(Msj_info, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult ObtieneCreditoTipo(string p_cod_empresa, string p_cod_producto, string p_tip_credito, string p_cadena_busqueda)
        {
            var Msj_info = new List<DatosCatalogos>();
            try
            {
                var result = new Dal().ObtieneCreditoTipo(p_cod_empresa, p_cod_producto, p_tip_credito, p_cadena_busqueda);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Msj_info.Add(new DatosCatalogos() { error = "1", des_error = ex.Message });
            }
            return Json(Msj_info, JsonRequestBehavior.AllowGet);
        }


        [HttpGet]
        public JsonResult ObtieneCredito(string p_cod_empresa, string p_ind_estado, string p_cadena_busqueda)
        {
            var Msj_info = new List<DatosCatalogos>();
            try
            {
                var result = new Dal().ObtieneCredito(p_cod_empresa, p_ind_estado, p_cadena_busqueda);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Msj_info.Add(new DatosCatalogos() { error = "1", des_error = ex.Message });
            }
            return Json(Msj_info, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult ObtienePlanPagos(string p_cod_empresa, string p_num_credito)
        {
            var Msj_info = new List<DatosCatalogos>();
            try
            {
                var result = new Dal().ObtienePlanPagos(p_cod_empresa, p_num_credito);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Msj_info.Add(new DatosCatalogos() { error = "1", des_error = ex.Message });
            }
            return Json(Msj_info, JsonRequestBehavior.AllowGet);
        }


        [HttpGet]
        public JsonResult ObtienePlanPagosB(string p_cod_empresa, string p_num_credito)
        {
            var Msj_info = new List<DatosCatalogos>();
            try
            {
                var result = new Dal().ObtienePlanPagosB(p_cod_empresa, p_num_credito);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Msj_info.Add(new DatosCatalogos() { error = "1", des_error = ex.Message });
            }
            return Json(Msj_info, JsonRequestBehavior.AllowGet);
        }
  

        [HttpGet]
        public JsonResult ObtieneCtaBancarias(string p_cod_empresa, string p_cod_num_cuenta, string p_num_cliente, string p_tip_cliente, string p_estatus)
        {
            var Msj_info = new List<DatosCatalogos>();
            try
            {
                var result = new Dal().ObtieneCtaBancarias(p_cod_empresa, p_cod_num_cuenta, p_num_cliente, p_tip_cliente, p_estatus);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Msj_info.Add(new DatosCatalogos() { error = "1", des_error = ex.Message });
            }
            return Json(Msj_info, JsonRequestBehavior.AllowGet);
        }


        [HttpGet]
        public JsonResult ObtieneAccionistas(string p_cod_empresa, string p_num_cliente, string p_num_accionista, string p_estatus)
        {
            var Msj_info = new List<DatosCatalogos>();
            try
            {
                var result = new Dal().ObtieneAccionistas(p_cod_empresa, p_num_cliente, p_num_accionista, p_estatus);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Msj_info.Add(new DatosCatalogos() { error = "1", des_error = ex.Message });
            }
            return Json(Msj_info, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult ObtieneAvales(string p_cod_empresa, string p_num_cliente, string p_num_aval, string p_estatus)
        {
            var Msj_info = new List<DatosCatalogos>();
            try
            {
                var result = new Dal().ObtieneAvales(p_cod_empresa, p_num_cliente, p_num_aval, p_estatus);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Msj_info.Add(new DatosCatalogos() { error = "1", des_error = ex.Message });
            }
            return Json(Msj_info, JsonRequestBehavior.AllowGet);
        }


        [HttpGet]
        public JsonResult ObtieneRepresentanteLegal(string p_cod_empresa, string p_num_cliente, string p_num_repre_legal, string p_estatus) 
        {
            var Msj_info = new List<DatosCatalogos>();
            try
            {
                var result = new Dal().ObtieneRepresentanteLegal(p_cod_empresa, p_num_cliente, p_num_repre_legal, p_estatus);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Msj_info.Add(new DatosCatalogos() { error = "1", des_error = ex.Message });
            }
            return Json(Msj_info, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult ObtieneResponsablePago(string p_cod_empresa, string p_num_cliente, string p_num_resp_pago, string p_estatus)
        {
            var Msj_info = new List<DatosCatalogos>();
            try
            {
                var result = new Dal().ObtieneResponsablePago(p_cod_empresa, p_num_cliente, p_num_resp_pago, p_estatus);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Msj_info.Add(new DatosCatalogos() { error = "1", des_error = ex.Message });
            }
            return Json(Msj_info, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult ObtieneFactoraje(string p_cod_empresa, string p_num_credito, string p_estatus)
        {
            var Msj_info = new List<DatosCatalogos>();
            try
            {
                var result = new Dal().ObtieneFactoraje(p_cod_empresa, p_num_credito, p_estatus);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Msj_info.Add(new DatosCatalogos() { error = "1", des_error = ex.Message });
            }
            return Json(Msj_info, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult ObtieneCredParaDesembolsar()
        {
            var Msj_info = new List<DatosCatalogos>();
            try
            {
                var result = new Dal().ObtieneCredParaDesembolsar();
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Msj_info.Add(new DatosCatalogos() { error = "1", des_error = ex.Message });
            }
            return Json(Msj_info, JsonRequestBehavior.AllowGet);
        }
    }
}
