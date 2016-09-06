<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="viewsReportes.aspx.cs" Inherits="PYME_MVC.Reporteslayout.viewsReportes" %>

<%@ Register Assembly="Microsoft.ReportViewer.WebForms, Version=11.0.0.0, Culture=neutral, PublicKeyToken=89845dcd8080cc91" Namespace="Microsoft.Reporting.WebForms" TagPrefix="rsweb" %>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width" />
    <link href="../../Scripts/css/bootstrap.css" rel="stylesheet" />
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div class="container">
            <br />
            <rsweb:reportviewer id="ReportViewer1"
                runat="server"
                asyncrendering="false"
                sizetoreportcontent="true"
                showrefreshbutton="false"
                showfindcontrols="false"
                showpagenavigationcontrols="false"
                showbackbutton="false" 
                Height="100%"
                Width="100%" BorderStyle="None">
            </rsweb:reportviewer>
        </div>
        <asp:ScriptManager ID="ScriptManager1" runat="server"></asp:ScriptManager>
    </form>
</body>
</html>
