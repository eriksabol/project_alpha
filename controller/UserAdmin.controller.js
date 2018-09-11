sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/routing/History"
 ], function (Controller, MessageToast, History) {
    "use strict";

    return Controller.extend("Project_2.controller.UserAdmin", {

        onInit : function() {
          
          console.log("Start loading onInit in UserAdmin.");

          var liveJSONmodel = new sap.ui.model.json.JSONModel();

          var oModel = new sap.ui.model.json.JSONModel("model/user.json");
          this.getView().setModel(oModel, "userModel");

          console.log(oModel);

          console.log("Finished loading onInit in UserAdmin.");

        },
        
        getRouter : function () {
          return sap.ui.core.UIComponent.getRouterFor(this);
        },

        onBeforeRendering: function() {

        //   if(jQuery.sap.storage(jQuery.sap.storage.Type.local).get("logonTokens") === null) {

        //     this.getRouter().navTo("Home", {}, true);

        //  }
          
        },
        
        onBackPress : function() {
         
          MessageToast.show("Back Button pressed.");

          console.log(this.getRouter().getRoute());

            console.log(this.getRouter().getTarget());

            var oHistory = History.getInstance();

            var sPreviousHash = oHistory.getPreviousHash();
            
            console.log ("previous history: " + oHistory.getPreviousHash());

            if (sPreviousHash !== undefined) {
              
              window.history.go(-1);

            } else {
              
              this.getRouter().navTo("Next", {}, true);

            }

       }

    });
 });