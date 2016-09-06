using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PYME_MVC.Models.Entidad
{
    public enum CodigoMensaje
    {
        Success,
        Info,
        Warning,
        Danger,
    }

    public class Mensajes
    {
        private CodigoMensaje _messageCode;
        private string _cssClass;
        private bool _error;

        public string Message { get; set; }
        public string MessageCaption { get; set; }

        public bool Error { get { return _error; } }
        public string CssClass { get { return _cssClass; } }
        public CodigoMensaje MessageCode
        {
            get { return _messageCode; }
            set 
            {
                _messageCode = value;
                switch (_messageCode)
                {
                    case CodigoMensaje.Success:
                        _cssClass = "alert-success";
                        _error = false;
                        break;
                    case CodigoMensaje.Info:
                        _cssClass = "alert-info";
                        _error = false;
                        break;
                    case CodigoMensaje.Warning:
                        _cssClass = "alert-warning";
                        _error = false;
                        break;
                    case CodigoMensaje.Danger:
                        _cssClass = "alert-danger";
                        _error = true;
                        break;
                    default:
                        break;
                }
            }
        }

        public Mensajes()
        {
            this.MessageCaption = string.Empty;
            this.MessageCode = CodigoMensaje.Info;
            this.Message = string.Empty;
        }

    }
}