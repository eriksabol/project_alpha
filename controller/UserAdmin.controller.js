sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/routing/History"
 ], function (Controller, MessageToast, History) {
    "use strict";

    return Controller.extend("Project_2.controller.UserAdmin", {

        onInit : function () {
          
          console.log("test");

          if(jQuery.sap.storage(jQuery.sap.storage.Type.local).get("logonToken") == null) {

            console.log("logontoken undefined");
            var oRootRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRootRouter.navTo("App", true);

         }

         var oModel = new sap.ui.model.json.JSONModel("model/user.json");
         this.getView().setModel(oModel, "userModel");

         console.log(oModel);

        },
        
        onBackPress : function () {
          MessageToast.show("Back Button pressed.");

            var oHistory = History.getInstance();

            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
              window.history.go(-1);
            } else {
              var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
              oRouter.navTo("Next", true);
            }

       }

    });
 });