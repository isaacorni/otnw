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
    public class Persona  : Direccion
    {
        [Display(Name = "Empresa")]
        [DefaultValue("001")]
        public string cod_empresa { get; set; }

        [Required(ErrorMessage = "El código de la agencia es requerida")]
        [StringLength(5, ErrorMessage = "El número de caracteres de {0} debe ser al menos {2}.", MinimumLength = 4)]
        [Display(Name = "Sucursal")]
        public string cod_agencia { get; set; }

        [Required(ErrorMessage = "El nombre del cliente es obligatorio")]
        [StringLength(100, ErrorMessage = "El número de caracteres de {0} debe ser al menos {2}.", MinimumLength = 2)]
        [Display(Name = "Nombre")]
        public string nombre { get; set; }

        [Required(ErrorMessage = "El apellido paterno del cliente es obligatorio")]
        [StringLength(100, ErrorMessage = "El número de caracteres de {0} debe ser al menos {2}.", MinimumLength = 2)]
        [Display(Name = "Apellido Paterno")]
        public string ape_paterno { get; set; }

        [StringLength(100, ErrorMessage = "El número de caracteres de {0} debe ser al menos {2}.", MinimumLength = 2)]
        [Display(Name = "Segundo Nombre")]
        public string seg_nombre { get; set; }

        [Display(Name = "Apellido Materno")]
        public string ape_materno { get; set; }

        [Required(ErrorMessage = "La fecha de nacimiento es obligatoria")]
        [Display(Name = "Fecha de Nacimiento")]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public Nullable<DateTime> fec_nacimiento { get; set; }

        [Required(ErrorMessage = "El género es un campo obligatorio")]
        [Display(Name = "Sexo")]
        public string sexo { get; set; }

        [Required(ErrorMessage = "El estado civil es obligatorio")]
        [Display(Name = "Estado Civil")]
        public string edo_civil { get; set; }

        [Required(ErrorMessage = "La nacionalidad del cliente es obligatoria")]
        [Display(Name = "Nacionalidad")]
        public string cod_nacionalidad { get; set; }

        [Required(ErrorMessage = "Favor de capturar el RFC del cliente")]
        [Display(Name = "RFC")]
        public string rfc { get; set; }

        [Required(ErrorMessage = "Favor de capturar el CURP  del cliente")]
        [Display(Name = "CURP")]
        public string curp { get; set; }

        [Required(ErrorMessage = "Favor de indicar el tipo de identificador del cliente")]
        [Display(Name = "Identificado   Personal")]
        public string tip_id { get; set; }

        [Required(ErrorMessage = "Favor de capturar el identificador del cliente")]
        [Display(Name = "Identificación")]
        public string num_id { get; set; }

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

        [Display(Name = "Usuario")]
        public string cod_usuario { get; set; }


        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        [UIHint("DateTime2")]
        public Nullable<DateTime> fec_alta { get; set; }
        public string ind_estado { get; set; }
        public string tip_cliente { get; set; }
      
    }
}