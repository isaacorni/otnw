using Microsoft.Reporting.WebForms;
using PYME_MVC.Models.Entidad;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace PYME_MVC.Reporteslayout
{
    public partial class viewsReportes : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                HttpRequest rq = Request;

                string numCredito = rq.QueryString["tip_reporte"];
                switch (numCredito)
                {
                    case "rpt_Factoraje": GeneraReporteFactoraje(); break;
                    case "rpt_Simple": GeneraReporteSimple(); break;
                    case "rpt_PlanPagos": GeneraReportePlanPagos(); break;
                }

            }
            catch (Exception)
            {
                throw;
            }
        }

        private void GeneraReporteFactoraje() {
            try
            {
                var lstParam = new List<ReportParameter>();
                lstParam.Add(new ReportParameter("Tasa_Int", "                  "));
                lstParam.Add(new ReportParameter("Linea_credito", "                  "));
                lstParam.Add(new ReportParameter("Num_cuotas", "                  "));
                lstParam.Add(new ReportParameter("Linea_credito", "                  "));
                lstParam.Add(new ReportParameter("Des_per_cuota", "                  "));
                lstParam.Add(new ReportParameter("Fec_apertura", "                  "));
                lstParam.Add(new ReportParameter("Fec_vencimiento", "                  "));
                lstParam.Add(new ReportParameter("Porc_com", "                  "));
                lstParam.Add(new ReportParameter("Tasa_mora", "                  ")); ;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reporteslayout/Contratos/rpt_Factoraje.rdlc");
                ReportViewer1.LocalReport.SetParameters(lstParam);

                ReportViewer1.LocalReport.Refresh();
            }
            catch (Exception)
            {
                throw;
            }
        }
        private void GeneraReporteSimple()
        {
            try
            {

                var lstParam = new List<ReportParameter>();
                lstParam.Add(new ReportParameter("Nombre", "                  "));
                lstParam.Add(new ReportParameter("Representante", "                  "));
                lstParam.Add(new ReportParameter("Avales", "                  "));
                lstParam.Add(new ReportParameter("Fec_constitucion", "                  "));
                lstParam.Add(new ReportParameter("num_acta", "                  "));
                lstParam.Add(new ReportParameter("RFC", "                  "));
                lstParam.Add(new ReportParameter("Direccion_moral", "                  "));
                lstParam.Add(new ReportParameter("Dir_Rep_Legal", "                  "));
                lstParam.Add(new ReportParameter("Dir_aval", "                  "));
                lstParam.Add(new ReportParameter("Mon_desembolsado", "                  "));
                lstParam.Add(new ReportParameter("Mon_Desem_Letras", "                  "));
                lstParam.Add(new ReportParameter("Fec_Cuota_1", "                  "));
                lstParam.Add(new ReportParameter("dia_pago", "                  "));
                lstParam.Add(new ReportParameter("Tasa_int_anual", "                  "));
                lstParam.Add(new ReportParameter("Porc_Comision", "                  "));
                lstParam.Add(new ReportParameter("Porc_Com_letra", "                  "));
                lstParam.Add(new ReportParameter("Fec_vencimiento", "                  "));
                lstParam.Add(new ReportParameter("Años_num_duracion", "                  "));
                lstParam.Add(new ReportParameter("Fec_apertura", "                  "));
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reporteslayout/Contratos/rpt_Simple.rdlc");
                ReportViewer1.LocalReport.SetParameters(lstParam);
                ReportViewer1.LocalReport.Refresh();
            }
            catch (Exception)
            {

                throw;
            }
        }
        private void GeneraReportePlanPagos()
        {

            try
            {
                var ReporteCredito = (Credito)Session["ReporteCredito"];
                var paramCredito = new ReportePlanPagos();
                if (ReporteCredito != null)
                {
                    List<ReportePlanPagos> datosCredito = (List<ReportePlanPagos>)new PYME_MVC.Models.InvocarServiciosGenerales.Dal().ObtieneDatosReporteCredito(ReporteCredito.cod_empresa, ReporteCredito.num_credito);

                    if (datosCredito.Count > 0)
                    {
                        List<PlanPagos> lstPlanPagos = (List<PlanPagos>)new PYME_MVC.Models.InvocarServiciosGenerales.Dal().ObtienePlanPagos(ReporteCredito.cod_empresa, ReporteCredito.num_credito);
                        paramCredito = datosCredito[0];
                        var lstParam = new List<ReportParameter>();
                        lstParam.Add(new ReportParameter("num_credito", paramCredito.num_credito));
                        lstParam.Add(new ReportParameter("num_cliente",paramCredito.num_cliente));
                        lstParam.Add(new ReportParameter("nombre",paramCredito.nombre));
                        lstParam.Add(new ReportParameter("des_dir",paramCredito.des_dir));
                        lstParam.Add(new ReportParameter("des_asent",paramCredito.des_asent));
                        lstParam.Add(new ReportParameter("correo_electronico",paramCredito.correo_electronico));
                        lstParam.Add(new ReportParameter("ind_estado",paramCredito.ind_estado));
                        lstParam.Add(new ReportParameter("mon_aprobado",paramCredito.mon_aprobado));    ///??????????????????????
                        lstParam.Add(new ReportParameter("por_comision",paramCredito.por_comision));
                        lstParam.Add(new ReportParameter("tasa_anual",paramCredito.tasa_anual));
                        lstParam.Add(new ReportParameter("tasa_mensual",paramCredito.tasa_mensual));
                        lstParam.Add(new ReportParameter("fec_inicio",paramCredito.fec_inicio.Value.ToShortDateString()));
                        lstParam.Add(new ReportParameter("plazo_credito",paramCredito.plazo_credito));
                        lstParam.Add(new ReportParameter("mon_comision",paramCredito.mon_comision));
                        lstParam.Add(new ReportParameter("int_credito",paramCredito.int_credito));
                        lstParam.Add(new ReportParameter("mon_a_pagar",paramCredito.mon_a_pagar));
                        lstParam.Add(new ReportParameter("fec_vencimiento",paramCredito.fec_vencimiento.Value.ToShortDateString()));
                        ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reporteslayout/PlanPagos/rpt_PlanPagos.rdlc");
                        ReportViewer1.LocalReport.SetParameters(lstParam);
                        ReportViewer1.LocalReport.DataSources.Clear();
                        ReportDataSource rdc = new ReportDataSource("DataSet1", lstPlanPagos);
                        ReportViewer1.LocalReport.DataSources.Add(rdc);
                        ReportViewer1.LocalReport.Refresh();
                    }
                }
            }
            catch (Exception)
            {
                
                throw;
            }
        }
    }
}