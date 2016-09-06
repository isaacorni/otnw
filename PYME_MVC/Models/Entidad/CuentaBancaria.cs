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
    public class CuentaBancaria
    {
        [Required(ErrorMessage = "La empresa es obligatoria")]
        [Display(Name = "Empresa")]
        [DefaultValue("001")]
        public string cod_empresa { get; set; }

        [Display(Name = "Identificador de Cuenta ")]
        public string  cod_num_cuenta { get; set; }


        [Display(Name = "Número Cliente")]
        public string num_cliente { get; set; }

        [Required(ErrorMessage = "Favor de capturar el número de cuenta")]
        [StringLength(100, ErrorMessage = "El número de caracteres de {0} debe ser al menos {2}.", MinimumLength = 2)]
        [Display(Name = "Número de Cuenta")]
        public string num_cuenta { get; set; }

        [Required(ErrorMessage = "Favor de capturar la clabe de cuenta")]
        [StringLength(100, ErrorMessage = "El número de caracteres de {0} debe ser al menos {2}.", MinimumLength = 2)]
        [Display(Name = "Cable Bancario")]
        public string clabe { get; set; }

        [Required(ErrorMessage = "Favor de indicar el banco  ")]
        [Display(Name = "Código Banco")]
        public string cod_banco { get; set; }

        [Required(ErrorMessage = "Favor de indicar si es banco principal")]
        [Display(Name = "Banco Principal")]
        public bool banco_pral { get; set; }

        [Required(ErrorMessage = "Indica tipo de cliente (cuenta del banco)")]
        [Display(Name = "Tipo Cliente")]
        public string tip_cliente { get; set; }
    }
}