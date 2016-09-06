using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Globalization;
using System.Linq;
using System.Web;

namespace PYME_MVC.Models.Entidad
{
    public class Moral : Direccion
    {
        [Display(Name = "Empresa")]
        [DefaultValue("001")]
        public string cod_empresa { get; set; }

        [Display(Name = "No. Agencia")]
        public string cod_agencia { get; set; }

        [Display(Name = "No. Cliente")]
        public string num_cliente { get; set; }

        [Required(ErrorMessage = "La razón social es obligatoria")]
        [Display(Name = "Razón Social")]
        public string nombre { get; set; }

        [Required(ErrorMessage = "El número de acta es obligatorio")]
        [Display(Name = "Número Acta")]
        public string num_acta { get; set; }

        //[Required(ErrorMessage = "El grupo empresarial es obligatorio")]
        [Display(Name = "Grupo Empresarial")]
        public string gpo_empresarial { get; set; }


        [Required(ErrorMessage = "El número de acta es obligatorio")]
        [Display(Name = "Fecha de Constitución")]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public Nullable<DateTime> fec_constitucion { get; set; }



        [Display(Name = "Sindicato")]
        public bool con_sindicato { get; set; }


        [Required(ErrorMessage = "El RFC es obligatorio")]
        [Display(Name = "RFC")]
        public string rfc { get; set; }

        [Required(ErrorMessage = "El correo electrónico debe ser capturado de forma correcta")]
        [Display(Name = "Correo Electrónico")]
        [RegularExpression("^([a-zA-Z0-9_\\-\\.]+)@[a-z0-9-]+(\\.[a-z0-9-]+)*(\\.[a-z]{2,3})$", ErrorMessage = "El correo no cuenta con el formato correcto ")]
        public string correo_electronico { get; set; }

        [Required(ErrorMessage = "Favor de indicar la actividad económica")]
        [Display(Name = "Actividad Económica")]
        public string cod_actividad { get; set; }

        [Required(ErrorMessage = "Favor de indicar el sector económico")]
        [Display(Name = "Sector Económico")]
        public string cod_sector { get; set; }



        
        [Display(Name = "Tipo de Dirección ")]
        public string tip_direccion_f { get; set; }

        [Display(Name = "Calle")]
        public string calle_f { get; set; }

        [Display(Name = "Número Exterior")]
        public string num_ext_f { get; set; }

        [Display(Name = "Número Interior ")]
        public string num_int_f { get; set; }

        [Display(Name = "Código Postal  ")]
        public string cp_f { get; set; }

        [Display(Name = "Estado")]
        public string cod_estado_f { get; set; }

        [Display(Name = "Delegación / Municipio")]
        public string cod_municipio_f { get; set; }

        [Display(Name = "Colonia")]
        public string cod_colonia_f { get; set; }

        [Display(Name = "Teléfono")]
        public string tel_local_f { get; set; }
        [Display(Name = "Celular")]
        public string tel_celular_f { get; set; }
        [Display(Name = "Otro teléfono")]
        public string tel_otro_f { get; set; }

        public string cod_direccion_f { get; set; }
    }
}