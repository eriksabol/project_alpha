sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
 ], function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("Project_2.controller.App", {

        onInit: function() {

            var oModel = new sap.ui.model.json.JSONModel();

            oModel.setData({
    
            items : [
    
                     {key: "secEnterprise", text: "Enterprise"},
    
                     {key: "secSAPR3", text: "SAP"},
    
                     {key: "secWinAD", text: "Active Directory"}
    
                 ]        
    
             });
    
            this.getView().setModel(oModel);
            // console.log("my App View:");
            // console.log(this.getView());
            // console.log("my __component0:");
            // console.log(sap.ui.getCore().byId("")); 

        },

       onLogin : function () {
           
          MessageToast.show("Login Button pressed.");

        //   var myNextView = new sap.ui.core.mvc.XMLView({

        //         viewName: "Project_2.view.Next"

        //   }); 

        //   sap.ui.getCore().byId("__xmlview0--myApp").removePage("__xmlview0--myPage");

        //   sap.ui.getCore().byId("__xmlview0--myApp").removePage("__xmlview0--myPage");

          //sap.ui.getCore().byId("myContainer");

        //   sap.ui.getCore().byId("__xmlview0--myApp").addPage(myNextView);


        if(jQuery.sap.storage(jQuery.sap.storage.Type.local).put("logonToken","teststring")) {

            console.log("Logon token savend to Local storage.")

        } else {

            console.log("Logon token could not be saved to local Storage");

        }

        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("Next");



       }
    });
 });