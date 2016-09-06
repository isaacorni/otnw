using System.ComponentModel.DataAnnotations;

namespace PYME_MVC.Models.Busqueda
{
    public class BuscarPersonas
    {
        public string num_cliente { get; set; }
        public string nombre { get; set; }
        [Display(Name = "Tipo de cliente ")]
        public string tip_cliente { get; set; }
        public string rfc { get; set; }
        public string correo_electronico { get; set; }
        public string tipo_persona { get; set; }
        public string razon_social { get; set; }
        public string accion { get; set; }

        [Required(ErrorMessage = "Se requiere un criterio de búsqueda")]
        [Display(Name = "Buscar:")]
        public string cadenabusqueda { get; set; }
    }
 
   

    public class productos_cred
    {
        public string cod_empresa { get; set; }
        public string cod_producto { get; set; }
        public string nom_producto { get; set; }
        public string clave_prod { get; set; }
        public string tip_credito { get; set; }
        public string des_tip_credito { get; set; }
        public string ind_mes_gracia { get; set; }
        public string ind_aforo { get; set; }
        public string ind_pago_capital { get; set; }
        public string tip_comision { get; set; }
        public string max_comision { get; set; }
        public int dias_mora_permitidos { get; set; }
        public int estatus { get; set; }
        public int tip_cuota { get; set; }
    }
}