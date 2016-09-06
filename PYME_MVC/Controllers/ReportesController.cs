using PYME_MVC.Models.Entidad;
using PYME_MVC.Models.Reportes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PYME_MVC.Controllers
{
    public class ReportesController : Controller
    {
        //
        // GET: /Reportes/

        public ActionResult ContratoSimple()
        {
            if (Session["usuario"] == null)
            {
                return RedirectToAction("Login", "Account");
            } 
            ReportPath model = new ReportPath();
            model.Titulo = "Contrato de crédito simple";
            string content = Url.Content("~/Reporteslayout/viewsReportes.aspx?tip_reporte=rpt_Simple");
            model.ReportPathViews = content;
            return View("Reportes", model);
        }

        public ActionResult ContratoFactoraje()
        {
            if (Session["usuario"] == null)
            {
                return RedirectToAction("Login", "Account");
            }
            ReportPath model = new ReportPath();
            model.Titulo = "Contrato de crédito factoraje ";
            string content = Url.Content("~/Reporteslayout/viewsReportes.aspx?tip_reporte=rpt_Factoraje");
            model.ReportPathViews = content;
            return View("Reportes", model);
        }

        public ActionResult PlanPagos( )
        {
            if (Session["usuario"] == null)
            {
                return RedirectToAction("Login", "Account");
            }
             
            return View();
        }
 

        public ActionResult PlanPagosReporte(string p_cod_empresa ,string p_num_credito )
        {                             
            if (Session["usuario"] == null)
            {
                return RedirectToAction("Login", "Account");
            }
            var objetoCredito = new Credito();
            objetoCredito.cod_empresa = p_cod_empresa;
            objetoCredito.num_credito = p_num_credito;
            Session["ReporteCredito"] = objetoCredito;
            ReportPath model = new ReportPath();
            model.Titulo = "Reporte de Plan de Pagos";
            string content = Url.Content("~/Reporteslayout/viewsReportes.aspx?tip_reporte=rpt_PlanPagos");
            model.ReportPathViews = content;
            return View("Reportes", model);
        }

 
        public ActionResult EstadoCuenta()
        {
            if (Session["usuario"] == null)
            {
                return RedirectToAction("Login", "Account");
            } 
            ReportPath model = new ReportPath();
            string content = Url.Content("~/Reporteslayout/EstadoCuenta/viewsEstadoCuenta.aspx");
            model.ReportPathViews = content;
            return View("Contrato", model);

        }
        //
        // GET: /Reportes/Details/5

        public ActionResult Details(int id)
        {
            return View();
        }

        //
        // GET: /Reportes/Create

        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /Reportes/Create

        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        //
        // GET: /Reportes/Edit/5

        public ActionResult Edit(int id)
        {
            return View();
        }

        //
        // POST: /Reportes/Edit/5

        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        //
        // GET: /Reportes/Delete/5

        public ActionResult Delete(int id)
        {
            return View();
        }

        //
        // POST: /Reportes/Delete/5

        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
