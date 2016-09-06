using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Net;
using System.Web.Http;
using Newtonsoft.Json;
using PYME_MVC.Models.Busqueda;
using PYME_MVC.Models.Catalogos;
using PYME_MVC.Models.Entidad;
using Newtonsoft.Json.Converters;


namespace PYME_MVC.Models.InvocarServiciosGenerales
{
    public class Dal
    {

        ConfiguracionServicios.ConfiguracionServicios _conexion = new ConfiguracionServicios.ConfiguracionServicios();
        
        WebClient client = new WebClient();

        //Convierte un < ver CREF = " DateTime " / > hacia y desde el formato de fecha ISO 
        //Para asegurar que no se tendrá problemas con el formato de las fechas al momento de desrealizar las fechas 
        IsoDateTimeConverter dateTimeConverter = new IsoDateTimeConverter { DateTimeFormat = "dd/MM/yyyy" };

        [HttpPost]
        public string JsonPost(string url, NameValueCollection values)
        {

            try
            {
                using (WebClient client = new WebClient())
                {
                    byte[] resp = client.UploadValues(url, "POST", values);
                    string respuesta = System.Text.ASCIIEncoding.UTF8.GetString(resp);

                    respuesta = respuesta.Replace("\n", "").Replace("\"", "");

                    return respuesta;
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        #region Catalogos
        // 2015/11/23 Luis Morales
        // La siguiente funcion regresa una lista tipo objeto de un JSON del URL Proporcionado en tipo Objeto
        public List<Object> JsonList(string url)
        {
            try
            {
                using (client = new WebClient())
                {
                    var response = client.DownloadString(url);
                    var res = (List<Object>)JsonConvert.DeserializeObject(response, (typeof(List<Object>)));
                    return res;
                }
            }
            catch (Exception) { throw; }
        }

        public List<Credito> ObtieneCatEstatusCredito(string p_cod_empresa, string p_ind_estado)
        {
            var url = _conexion.HostPyme + "Busqueda/ObtieneCatEstatusCredito/" + p_cod_empresa + '/' + p_ind_estado;
            using (client = new WebClient())
            {
                var response = client.DownloadString(url);
                var res = JsonConvert.DeserializeObject<List<Credito>>(response, dateTimeConverter); 
                return res;
            }
        }

        public List<DatosCatalogos> ObtieneCatBancos(string cod_empresa)
        {

            var url = _conexion.HostPyme + "Busqueda/ObtieneCatBancos/" + cod_empresa;

            using (client = new WebClient())
            {
                var response = client.DownloadString(url);
                var res = JsonConvert.DeserializeObject<List<DatosCatalogos>>(response, dateTimeConverter);
                return res;
            }
        }

        public List<DatosCatalogos> ObtenerSector(string cod_actividad)
        {
            var url = _conexion.HostAltasClientes + "obten_sector/" + cod_actividad;

            using (client = new WebClient())
            {
                var response = client.DownloadString(url);
                var res = JsonConvert.DeserializeObject<List<DatosCatalogos>>(response, dateTimeConverter);
                return res;
            }
        }
       
        public object ObtieneCliente(string p_cod_empresa, string p_tipo_cliente, string p_cadena_busqueda)
        {
            try
            {
                var url = _conexion.HostPyme + "Busqueda/ObtieneCliente/";
                url = url + p_cod_empresa + '/' + p_tipo_cliente + '/' + p_cadena_busqueda;

                using (client = new WebClient())
                {
                    var response = client.DownloadString(url);
                    var res = JsonConvert.DeserializeObject<List<BuscarPersonas>>(response, dateTimeConverter);
                    return res;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public object ObtieneCreditoEstatus(string p_cod_empresa, string p_ind_estado)
        {
            try
            {
                var url = _conexion.HostPyme + "Busqueda/ObtieneCreditoEstatus/";
                url = url + p_cod_empresa + '/' + p_ind_estado;

                using (client = new WebClient())
                {
                    var response = client.DownloadString(url);
                    var res = JsonConvert.DeserializeObject<List<Credito>>(response, dateTimeConverter);
                    return res;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public object ObtieneCreditoTipo(string p_cod_empresa, string p_cod_producto, string p_tip_credito, string p_cadena_busqueda)
        {
            try
            {
                var url = _conexion.HostPyme + "Busqueda/ObtieneCreditoTipo/";
                url = url + p_cod_empresa + '/' + p_cod_producto + '/' + p_tip_credito + '/' + p_cadena_busqueda;

                using (client = new WebClient())
                {
                    var response = client.DownloadString(url);
                    var res = JsonConvert.DeserializeObject<List<Credito>>(response, dateTimeConverter);
                    return res;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public object ObtieneCredito(string p_cod_empresa, string p_ind_estado, string p_cadena_busqueda)
        {
            try
            {
                var url = _conexion.HostPyme + "Busqueda/ObtieneCredito/";
                url = url + p_cod_empresa + '/' + p_ind_estado + '/' + p_cadena_busqueda;

                using (client = new WebClient())
                {
                    var response = client.DownloadString(url);
                    var res = JsonConvert.DeserializeObject<List<Credito>>(response, dateTimeConverter);
                    return res;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<PlanPagos> ObtienePlanPagos(string p_cod_empresa, string p_num_credito)
        {
            try
            {
                var url = _conexion.HostPyme + "Busqueda/ObtienePlanPagos/";
                url = url + p_cod_empresa + '/' + p_num_credito ;
                using (client = new WebClient())
                {
                    var response = client.DownloadString(url);
                    var res = JsonConvert.DeserializeObject<List<PlanPagos>>(response, dateTimeConverter);
                    return res;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<PlanPagos> ObtienePlanPagosB(string p_cod_empresa, string p_num_credito)
        {
            try
            {
                var url = _conexion.HostPyme + "Busqueda/ObtienePlanPagosB/";
                url = url + p_cod_empresa + '/' + p_num_credito;
                using (client = new WebClient())
                {
                    var response = client.DownloadString(url);
                    var res = JsonConvert.DeserializeObject<List<PlanPagos>>(response, dateTimeConverter);
                    return res;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// Retorna el catálogo de colonias filtrado por el código postal 
        /// </summary>
        /// <param name="cod_postal"></param>
        /// <returns></returns>
        public List<DatosCatalogos> CatalogoColonia(string cod_postal)
        {
            try
            {
                var url = _conexion.HostPyme + "Busqueda/ObtieneColoniasSepomex/" + cod_postal;
                var client = new WebClient();
                var response = client.DownloadString(url);
                return JsonConvert.DeserializeObject<List<DatosCatalogos>>(response, dateTimeConverter);
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        ///  Retorna el estado, municipio  localidad de una dirección filtrada por código postal y colonia 
        /// </summary>
        /// <param name="cod_postal"></param>
        /// <param name="cod_distrito"></param>
        /// <returns></returns>
        public List<DatosCatalogos> ObtieneDomicilioSepomex(string p_cp, string p_cod_colonia)
        {
            try
            {
                var url = _conexion.HostPyme + "Busqueda/ObtieneDomicilioSepomex/" + p_cp + "/" + p_cod_colonia;
                var client = new WebClient();
                var response = client.DownloadString(url);
        
                return JsonConvert.DeserializeObject<List<DatosCatalogos>>(response, dateTimeConverter);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<productos_cred> ObtieneTipoCredito(string p_cod_empresa, string p_cod_producto, string p_tip_credito, string p_estatus)
        {
            var url = _conexion.HostPyme + "Busqueda/ObtieneTipoCredito/" + p_cod_empresa + "/" + p_cod_producto + "/" + p_tip_credito + "/" + p_estatus;

            using (client = new WebClient())
            {
                var response = client.DownloadString(url);
                var res = JsonConvert.DeserializeObject<List<productos_cred>>(response, dateTimeConverter);
                return res;
            }
        }

        public List<CuentaBancaria> ObtieneCtaBancarias(string p_cod_empresa, string p_cod_num_cuenta, string p_num_cliente, string p_tip_cliente, string p_estatus)
        {
            var url = _conexion.HostPyme + "Busqueda/ObtieneCtaBancarias/" + p_cod_empresa + "/" + p_cod_num_cuenta + "/" + p_num_cliente + "/" + p_tip_cliente + "/" + p_estatus;
            using (client = new WebClient())
            {
                var response = client.DownloadString(url);
                var res = JsonConvert.DeserializeObject<List<CuentaBancaria>>(response, dateTimeConverter);
                return res;
            }
        }

        public List<Accionista> ObtieneAccionistas(string p_cod_empresa, string p_num_cliente, string p_num_accionista, string p_estatus)
        {
            try
            {
                var url = _conexion.HostPyme + "Busqueda/ObtieneAccionistas/" + p_cod_empresa + "/" + p_num_cliente + "/" + p_num_accionista + "/" + p_estatus;
                var response = client.DownloadString(url);
                var res = JsonConvert.DeserializeObject<List<Accionista>>(response, dateTimeConverter);
                return res;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<Aval> ObtieneAvales(string p_cod_empresa, string p_num_cliente, string p_num_aval, string p_estatus)
        {
            try
            {              
                var url = _conexion.HostPyme + "Busqueda/ObtieneAvales/" + p_cod_empresa + "/" + p_num_cliente + "/" + p_num_aval + "/" + p_estatus;
                var response = client.DownloadString(url);
                var res = JsonConvert.DeserializeObject<List<Aval>>(response, dateTimeConverter); 
                return res;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<RepresentanteLegal> ObtieneRepresentanteLegal(string p_cod_empresa, string p_num_cliente, string p_num_repre_legal, string p_estatus)
        {
            try      
            {
                var url = _conexion.HostPyme + "Busqueda/ObtieneRepresentanteLegal/" + p_cod_empresa + "/" + p_num_cliente + "/" + p_num_repre_legal + "/" + p_estatus;
                var response = client.DownloadString(url);
                var res = JsonConvert.DeserializeObject<List<RepresentanteLegal>>(response, dateTimeConverter); 
                return res;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<ResponsablePago> ObtieneResponsablePago(string p_cod_empresa, string p_num_cliente, string p_num_resp_pago, string p_estatus)
        {
            try
            {
                var url = _conexion.HostPyme + "Busqueda/ObtieneResponsablePago/" + p_cod_empresa + "/" + p_num_cliente + "/" + p_num_resp_pago + "/" + p_estatus;
                var response = client.DownloadString(url);
                var res = JsonConvert.DeserializeObject<List<ResponsablePago>>(response, dateTimeConverter); 
                return res;
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// Función que retorna la dirección del cliente 
        /// </summary>
        /// <param name="cod_empresa"></param>
        /// <param name="p_cod_direccion"></param>
        /// <param name="p_num_cliente"></param>
        /// <param name="p_tip_cliente"></param>
        /// <param name="p_estatus"></param>
        /// <returns></returns>
        public List<Direccion> ObtieneDireccionCliente(string cod_empresa, string p_cod_direccion, string p_num_cliente, string p_num_persona, string p_tip_cliente, string p_estatus)
        {
            try
            {
                var url = _conexion.HostPyme + "Busqueda/ObtieneDireccionCliente/" + cod_empresa + "/" + p_cod_direccion+ "/" + p_num_cliente + "/" + p_num_persona+"/"+ p_tip_cliente+ "/" +p_estatus;
                var client = new WebClient();
                var response = client.DownloadString(url);
                return JsonConvert.DeserializeObject<List<Direccion>>(response, dateTimeConverter); 
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// Retorna la dirección de un cliente cuando su combinación es correcta y valida, en estado municipio colonia y código postal 
        /// </summary>
        /// <param name="cod_estado">   Estado </param>
        /// <param name="cod_provincia">Código del municipio</param>
        /// <param name="cod_distrito"> Código de la colonia</param>
        /// <param name="cod_postal">   Código postal</param>
        /// <returns></returns>
        public List<Direccion> ObtieneDomicilioCliente(string p_cp, string p_cod_estado, string p_cod_municipio, string p_cod_colonia)
        {
            try
            {
                var url = _conexion.HostPyme + "Busqueda/ObtieneDomicilioCliente/" + p_cp + "/" + p_cod_estado + "/" + p_cod_municipio + "/" + p_cod_colonia;
                var client = new WebClient();
                var response = client.DownloadString(url);
                return JsonConvert.DeserializeObject<List<Direccion>>(response, dateTimeConverter); 
            }
            catch (Exception)
            {
                throw;
            }
        }
   
        public List<DatosCatalogos> ObtenerAgencias(string p_cod_empresa, string p_estatus)
        {
            var url = _conexion.HostPyme + "Busqueda/ObtieneCatAgencias/" + p_cod_empresa + "/" + p_estatus;
            using (WebClient client = new WebClient())
            {
                var response = client.DownloadString(url);
                return JsonConvert.DeserializeObject<List<DatosCatalogos>>(response, dateTimeConverter);
            }
        }
        #endregion

        /// <summary>
        ///  función que retorna las Información de una o todas las personas fisicas  
        /// </summary>
        /// <param name="p_cod_empresa"></param>
        /// <param name="p_num_cliente"></param>
        /// <returns></returns>
        public List<Fisica> ObtieneDatosPersonaFisica(string cod_empresa, string num_cliente)
        {
            try
            {
                var url = _conexion.HostPyme + "Busqueda/ObtieneDatosPersonaF/" + cod_empresa + "/" + num_cliente;
                var client = new WebClient();
                var response = client.DownloadString(url);
                return JsonConvert.DeserializeObject<List<Fisica>>(response, dateTimeConverter); 

            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        ///  función que retorna las Información de una o todas las personas moral 
        /// </summary>
        /// <param name="p_cod_empresa"></param>
        /// <param name="p_num_cliente"></param>
        /// <returns></returns>
        public List<Moral> ObtieneDatosPersonaMoral(string cod_empresa, string num_cliente)
        {
            try
            {
                var url = _conexion.HostPyme + "Busqueda/ObtieneDatosPersonaM/" + cod_empresa + "/" + num_cliente;
                var client = new WebClient();
                var response = client.DownloadString(url);
                return JsonConvert.DeserializeObject<List<Moral>>(response, dateTimeConverter); 
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// Retorna la información de un crédito por cliente en específico 
        /// </summary>
        /// <param name="p_cod_empresa"></param>
        /// <param name="p_num_cliente"></param>
        /// <param name="p_num_credito"></param>
        /// <returns></returns>
        public List<Credito> ObtieneDatosCredito(string p_cod_empresa, string p_num_cliente, string p_num_credito)
        {
            try
            {
                var url = _conexion.HostPyme + "Busqueda/ObtieneDatosCredito/" + p_cod_empresa + "/" + p_num_cliente + "/" + p_num_credito;
                var client = new WebClient();
                var response = client.DownloadString(url);
                return JsonConvert.DeserializeObject<List<Credito>>(response, dateTimeConverter); 
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// Retorna la información de un crédito por cliente en específico 
        /// </summary>
        /// <param name="p_cod_empresa"></param>
        /// <param name="p_num_credito"></param>
        /// <returns></returns>
        public List<ReportePlanPagos> ObtieneDatosReporteCredito(string p_cod_empresa, string p_num_credito)
        {
            try
            {
                var url = _conexion.HostPyme + "Busqueda/ObtieneDatosReporteCredito/" + p_cod_empresa  + "/" + p_num_credito;
                var client = new WebClient();
                var response = client.DownloadString(url);
                return JsonConvert.DeserializeObject<List<ReportePlanPagos>>(response, dateTimeConverter);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<Factura> ObtieneFactoraje(string p_cod_empresa, string p_num_credito, string p_estatus)
        {
            try
            {
                var url = _conexion.HostPyme + "Busqueda/ObtieneFactoraje/" + p_cod_empresa + "/" + p_num_credito +  "/" + p_estatus;
                var response = client.DownloadString(url);
                var res = JsonConvert.DeserializeObject<List<Factura>>(response, dateTimeConverter);
                return res;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<Credito> ObtieneCredParaDesembolsar()
        {
            try
            {
                var url = _conexion.HostPyme + "Busqueda/ObtieneCredParaDesembolsar";

                using (client = new WebClient())
                {
                    var response = client.DownloadString(url);
                    var res = JsonConvert.DeserializeObject<List<Credito>>(response, dateTimeConverter);
                    return res;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

   }
}