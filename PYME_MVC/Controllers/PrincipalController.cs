using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PYME_MVC.Controllers
{
    public class PrincipalController : Controller
    {
        //
        // GET: /Principal/

        public ActionResult Index()
        {
            if (Session["usuario"] == null)
            {
                return RedirectToAction("Login", "Account");
            }                                  
            else
            { return View(); }
        }
        public ActionResult CerrarSesion()
        {
            Session.RemoveAll();
                return RedirectToAction("Login", "Account");
            
        }
    }
}
