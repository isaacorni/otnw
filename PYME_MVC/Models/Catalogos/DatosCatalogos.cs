using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PYME_MVC.Models.Catalogos
{
    public class DatosCatalogos
    {
        public string cod_agencia { get; set; }
        public string des_agencia { get; set; }
        public string cod_ente { get; set; }
        public string cod_actividad { get; set; }
        public string des_actividad { get; set; }
        public string cod_postal { get; set; }
        public string cod_usuario { get; set; }
        public string fec_sistema { get; set; }

        /// <summary>
        /// cod_estado
        /// </summary>
        public string cod_estado { get; set; }
        public string nom_estado { get; set; }
        /// <summary>
        ///  cod_municipio
        /// </summary>
        public string cod_municipio { get; set; }
        public string des_municipio { get; set; }
        /// <summary>
        /// cod_colonia
        /// </summary>
        public string cod_colonia { get; set; }
        public string des_colonia { get; set; }

        /// <summary>
        /// Propiedades utilizadas para el retorno de la información a la vista 
        /// </summary>
        public string error { get; set; }
        public string des_error { get; set; }
        public string advertencia { get; set; }
        public string des_advertencia { get; set; }
        public string informativo { get; set; }
        public string des_informativo { get; set; }
        public string realizado { get; set; }
        public string des_realizado { get; set; }

        
    }
}