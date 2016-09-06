using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PYME_MVC.Models.ConfiguracionServicios;
using PYME_MVC.Models.InvocarServiciosGenerales;
using PYME_MVC.Models.Catalogos;
using PYME_MVC.Models.Entidad;

namespace PYME_MVC.Models.ViewModels
{
    public class ProcesaDesembosloViewModel
    {
        private List<PlanPagos> _planPagos;
        private string _planPagosString;
        private SolicitudCredito _datosCredito;
        private IEnumerable<Mensajes> _mensajes;


        public ConfiguracionServicios.ConfiguracionServicios _host;
        private List<Object> _mSucursales;
        private List<Object> _lstPeriocidad;
        private List<Credito> _lstEstatusCredito;
        private List<Credito> _lstEstatusCreditoFilt;
        private List<Object> _lstProductos;
        private List<Object> _lstTipo_Credito;
        private Dictionary<string, string> _lsttip_cob_comision;
        private Dictionary<string, string> _lsttip_calendario;
        private Dictionary<string, string> _lsttip_comision;

        public List<PlanPagos> PlanPagos
        {
            get { return _planPagos; }
            set { _planPagos = value; }
        }


        public SolicitudCredito DatosCredito
        {
            get { return _datosCredito; }
            set { _datosCredito = value; }
        }

        public string PlanPagosString
        {
            get { return _planPagosString; }
            set { _planPagosString = value; }
        }

        public IEnumerable<Mensajes> Mensajes
        {
            get { return _mensajes; }
            set { _mensajes = value; }
        }

        public List<Credito> LstEstatusCreditoFilt
        {
            get { return _lstEstatusCreditoFilt; }
        }

        public Dictionary<string, string> Lsttip_calendario
        {
            get { return _lsttip_calendario; }
        }

        public Dictionary<string, string> Lsttip_cob_comision
        {
            get { return _lsttip_cob_comision; }
        }

        public Dictionary<string, string> Lsttip_comision
        {
            get { return _lsttip_comision; }
        }

        public List<Object> MSucursales
        {
            get { return _mSucursales; }
        }

        public List<Object> LstPeriocidad
        {
            get { return _lstPeriocidad; }
        }

        public List<Credito> LstEstatusCredito
        {
            get { return _lstEstatusCredito; }
        }

        public List<Object> LstProductos
        {
            get { return _lstProductos; }
        }

        public List<Object> LstTipo_Credito
        {
            get { return _lstTipo_Credito; }
        }
        
        public ProcesaDesembosloViewModel()
        {
            _host = new ConfiguracionServicios.ConfiguracionServicios();
            _mSucursales = new Dal().JsonList(_host.HostPyme + "Busqueda/ObtieneCatAgencias/001/1");
            _lstPeriocidad = new Dal().JsonList(_host.HostPyme + "Busqueda/ObtieneCatPeriocidad/001/1");
            _lstProductos = new Dal().JsonList(_host.HostPyme + "Busqueda/ObtieneCatProductos/001/1");
            _lstEstatusCredito = new Dal().ObtieneCatEstatusCredito("001", "2");

            _lstEstatusCreditoFilt = _lstEstatusCredito.Where(s => s.ind_estado == "A" || s.ind_estado == "R").ToList<Credito>();

            _lsttip_calendario = new Dictionary<string, string>();
            _lsttip_calendario.Add("FINANCIERO (360)", "1");
            _lsttip_calendario.Add("NATURAL (365)", "2");

            _lsttip_cob_comision = new Dictionary<string, string>();
            _lsttip_cob_comision.Add("CONTADO", "C");
            _lsttip_cob_comision.Add("DESEMBOLSO", "D");
            _lsttip_cob_comision.Add("FINANCIADO", "F");
            _lsttip_cob_comision.Add("LIQUIDAR", "L");

            //INDICA SI LA COMISIÓN ES DE TIPO  P  = PORCENTAJE  M = MONTO    
            _lsttip_comision = new Dictionary<string, string>();
            _lsttip_comision.Add("PORCENTAJE", "P");
            _lsttip_comision.Add("MONTO", "M");
        }

        public void Set_LstTipoCredito(string cod_producto)
        {
            _lstTipo_Credito = new Dal().JsonList(_host.HostPyme + "Busqueda/ObtieneTipoCredito/001/" + cod_producto + "/none/1");
        }
    }
}