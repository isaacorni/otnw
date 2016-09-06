using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Globalization;
using System.Linq;
using System.Web;

namespace PYME_MVC.Models.Entidad
{
    public class Cliente : Fisica
    {
        [Required(ErrorMessage = "El número de cliente es obligativo")]
        [Display(Name = "Número Cliente")]
        public new string num_cliente { get; set; }
    }
}