sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/routing/History"
 ], function (Controller, MessageToast, History) {
    "use strict";

    return Controller.extend("Project_2.controller.UserAdmin", {

        onInit : function () {
          
          console.log("test");

        var liveJSONmodel = new sap.ui.model.json.JSONModel();

         var oModel = new sap.ui.model.json.JSONModel("model/user.json");
         this.getView().setModel(oModel, "userModel");

         console.log(oModel);

        },

        onBeforeRendering: function() {

          if(jQuery.sap.storage(jQuery.sap.storage.Type.local).get("logonTokens") === null) {

            var oRootRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRootRouter.navTo("Home", true);

         }
          
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