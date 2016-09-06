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
    public class Direccion
    {
        public string cod_direccion { get; set; }
       
        [Required(ErrorMessage = "Favor de indicar el tipo de dirección del cliente")]
        [Display(Name = "Tipo de Dirección ")]
        public string tip_direccion { get; set; }

        [Required(ErrorMessage = "Capturar la calle del cliente")]
        [Display(Name = "Calle")]
        public string calle { get; set; }

        [Required(ErrorMessage = "El número exterior es obligatorio")]
        [Display(Name = "Número Exterior")]
        public string num_ext { get; set; }

        //[Required(ErrorMessage = "El número interior  es obligatorio")]
        [Display(Name = "Número Interior ")]
        public string num_int { get; set; }

        [Required(ErrorMessage = "El código postal es obligatorio")]
        [Display(Name = "Código Postal  ")]
        public string cp { get; set; }

        [Required(ErrorMessage = "Favor de indicar el estado")]
        [Display(Name = "Estado")]
        public string cod_estado { get; set; }

        [Required(ErrorMessage = "Favor de indicar delegación / Municipio")]
        [Display(Name = "Delegación / Municipio")]
        public string cod_municipio { get; set; }

       

        [Required(ErrorMessage = "Favor de indicar la colonia")]
        [Display(Name = "Colonia")]
        public string cod_colonia { get; set; }

        [Required(ErrorMessage = "El teléfono es un campo obligatorio")]
        [Display(Name = "Teléfono")]
        public string tel_local { get; set; }
        [Display(Name = "Celular")]
        public string tel_celular { get; set; }
        [Display(Name = "Otro teléfono")]
        public string tel_otro { get; set; }

        /// <summary>
        /// cod_estado
        /// </summary>
        
        public string nom_estado { get; set; }
        /// <summary>
        ///  cod_municipio
        /// </summary>
        
        public string des_municipio { get; set; }
        /// <summary>
        /// cod_colonia
        /// </summary>
        
        public string des_colonia { get; set; }

    }
}