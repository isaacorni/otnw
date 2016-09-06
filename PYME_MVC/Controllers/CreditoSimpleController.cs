using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PYME_MVC.Controllers
{
    public class CreditoSimpleController : Controller
    {
        //
        // GET: /CreditoSimple/

        public ActionResult Index()
        {
            if (Session["usuario"] == null)
            {
                return RedirectToAction("Login", "Account");
            } 
            return View();
        }

        public ActionResult Global()
        {
            if (Session["usuario"] == null)
            {
                return RedirectToAction("Login", "Account");
            } 
            return View();
        }

        public ActionResult Ballon()
        {
            if (Session["usuario"] == null)
            {
                return RedirectToAction("Login", "Account");
            } 
            return View();
        }

        public ActionResult MesesGracia()
        {
            if (Session["usuario"] == null)
            {
                return RedirectToAction("Login", "Account");
            } 
            return View();
        }

        public ActionResult SaldosInsolutos()
        {
            if (Session["usuario"] == null)
            {
                return RedirectToAction("Login", "Account");
            } 
            return View();
        }

        public ActionResult MesesGraciaSaldoInsoluto()
        {
            if (Session["usuario"] == null)
            {
                return RedirectToAction("Login", "Account");
            } 
            return View();
        }

    }
}
