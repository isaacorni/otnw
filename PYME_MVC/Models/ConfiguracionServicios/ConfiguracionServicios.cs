using System.Configuration;

namespace PYME_MVC.Models.ConfiguracionServicios
{
    
    /// <summary>
    /// ESTE MODULO NOS SIRVE PARA ACCEDER A LAS VARIABLES DE CONEXION PARA TENER COMUNICACION CON LA BASE DE DATOS 
    /// </summary>
    public class ConfiguracionServicios
    {
        public string HostPyme = ConfigurationManager.AppSettings["HostPyme"];
        public string HostAltasClientes = ConfigurationManager.AppSettings["HostAltasClientes"];
        public string HostSolicitudes = ConfigurationManager.AppSettings["HostSolicitudes"];
    }
}