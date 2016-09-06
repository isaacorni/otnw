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
    public class RepresentanteLegal: Persona
    {
        [Display(Name = "Número Cliente")]
        public string num_cliente { get; set; }

        [Display(Name = "No. Representante Legal")]
        public string num_repre_legal { get; set; }

        public string tip_repre_legal { get; set; }

        [Display(Name = "Núm. Escritura")]
        public string num_escritura { get; set; }
        [Display(Name = "Folio Mercantil")]
        public string folio_mercantil { get; set; }
        [Display(Name = "Tipo Facultades")]
        public string cod_tipo_facultades { get; set; }
        [Display(Name = "Cód")]
        public string cod_ejercimiento { get; set; }
    }
}