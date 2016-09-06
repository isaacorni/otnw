using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace PYME_MVC
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "CrearCredito",
                url: "Creditos/CrearCredito/{num_cliente}",
                defaults: new { controller = "Creditos", action = "CrearCredito" }
                );

 
            routes.MapRoute(
                name: "CatalogoColonia",
                url: "Captura/CatalogoColonia/{cod_postal}",
                defaults: new { controller = "Captura", action = "CatalogoColonia" }
                );


            routes.MapRoute(
                name: "ObtieneTipoCredito",
                url: "Captura/ObtieneTipoCredito/{p_cod_empresa}/{p_cod_producto}/{p_tip_credito}/{p_estatus}",
                defaults: new { controller = "Captura", action = "ObtieneTipoCredito" }
                );


            routes.MapRoute(
                name: "ObtieneDomicilioSepomex",
                url: "Captura/ObtieneDomicilioSepomex/{p_cp}/{p_cod_colonia}",
                defaults: new { controller = "Captura", action = "ObtieneDomicilioSepomex" }
                );

            routes.MapRoute(
                name: "ObtenerSector",
                url: "Captura/ObtenerSector/{cod_actividad}",
                defaults: new { controller = "Captura", action = "ObtenerSector" }
                );

            routes.MapRoute(
                name: "ObtieneCtaBancarias",
                url: "Busqueda/ObtieneCtaBancarias/{p_cod_empresa}/{p_cod_num_cuenta}/{p_num_cliente}/{p_tip_cliente}/{p_estatus}",
                defaults: new { controller = "Busqueda", action = "ObtieneCtaBancarias" }
                );


            routes.MapRoute(
                name: "ObtieneAccionistas",
                url: "Busqueda/ObtieneAccionistas/{p_cod_empresa}/{p_num_cliente}/{p_num_accionista}/{p_estatus}",
                defaults: new { controller = "Busqueda", action = "ObtieneAccionistas" }
                );

            routes.MapRoute(
                name: "ObtieneAvales",
                url: "Busqueda/ObtieneAvales/{p_cod_empresa}/{p_num_cliente}/{p_num_aval}/{p_estatus}",
                defaults: new { controller = "Busqueda", action = "ObtieneAvales" }
                );

            routes.MapRoute(
                name: "ObtieneRepresentanteLegal",
                url: "Busqueda/ObtieneRepresentanteLegal/{p_cod_empresa}/{p_num_cliente}/{p_num_repre_legal}/{p_estatus}",
                defaults: new { controller = "Busqueda", action = "ObtieneRepresentanteLegal" }
                );

            routes.MapRoute(
                name: "ObtieneResponsablePago",
                url: "Busqueda/ObtieneResponsablePago/{p_cod_empresa}/{p_num_cliente}/{p_num_resp_pago}/{p_estatus}",
                defaults: new { controller = "Busqueda", action = "ObtieneResponsablePago" }
                );
                   
            routes.MapRoute(
                name: "ObtieneCliente",
                url: "Busqueda/ObtieneCliente/{p_cod_empresa}/{p_tipo_cliente}/{p_cadena_busqueda}",
                defaults: new { controller = "Busqueda", action = "ObtieneCliente" }
                );

            routes.MapRoute(
                name: "ObtieneCreditoEstatus",
                url: "Busqueda/ObtieneCreditoEstatus/{p_cod_empresa}/{p_ind_estado}",
                defaults: new { controller = "Busqueda", action = "ObtieneCreditoEstatus" }
                );

            routes.MapRoute(
                name: "ObtieneCreditoTipo",
                url: "Busqueda/ObtieneCreditoTipo/{p_cod_empresa}/{p_cod_producto}/{p_tip_credito}/{p_cadena_busqueda}",
                defaults: new { controller = "Busqueda", action = "ObtieneCreditoTipo" }
                );

            routes.MapRoute(
                name: "ObtieneCredito",
                url: "Busqueda/ObtieneCredito/{p_cod_empresa}/{p_ind_estado}/{p_cadena_busqueda}",
                defaults: new { controller = "Busqueda", action = "ObtieneCredito" }
                );

            routes.MapRoute(
               name: "ObtienePlanPagos",
               url: "Busqueda/ObtienePlanPagos/{p_cod_empresa}/{p_num_credito}",
               defaults: new { controller = "Busqueda", action = "ObtienePlanPagos" }
               );

            routes.MapRoute(
              name: "ObtienePlanPagosB",
              url: "Busqueda/ObtienePlanPagosB/{p_cod_empresa}/{p_num_credito}",
              defaults: new { controller = "Busqueda", action = "ObtienePlanPagosB" }
              );
           
            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Principal", action = "Index", id = UrlParameter.Optional }
                );
            
            routes.MapRoute(
                name: "ObtieneFactoraje",
                url: "Busqueda/ObtieneFactoraje/{p_cod_empresa}/{p_num_credito}/{p_estatus}",
                defaults: new { controller = "Busqueda", action = "ObtieneFactoraje" }
                );

        }
    }
}