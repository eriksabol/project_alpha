sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/routing/History",
    "Project_2/model/formatter"
 ], function (Controller, MessageToast, History, formatter) {
    "use strict";

    return Controller.extend("Project_2.controller.Services", {

        formatter: formatter,

        onInit : function() {
          
          console.log("Start loading onInit in Services.");

          var liveJSONmodel = new sap.ui.model.json.JSONModel();

          var oModel = new sap.ui.model.json.JSONModel("model/services.json");
          this.getView().setModel(oModel, "servicesModel");

          console.log(oModel);

          console.log("Finished loading onInit in Services.");

          console.log(formatter);

        },
        
        getRouter : function () {
          return sap.ui.core.UIComponent.getRouterFor(this);
        },

        onBeforeRendering: function() {

        //   if(jQuery.sap.storage(jQuery.sap.storage.Type.local).get("logonTokens") === null) {

        //     this.getRouter().navTo("Home", {}, true);

        //  }
          
        },

        onPressTest: function() {

          var myWorkingModel = this.getView().getModel("servicesModel");

          console.log(myWorkingModel.getProperty("/entries/0/SI_STATUSINFO/0/SI_STATUS"));

          console.log(myWorkingModel.setProperty("/entries/0/SI_STATUSINFO/0/SI_STATUS", getRandomInt(0, 7)));

        },

        onPressChangeModel: function() {

          var myWorkingModel = this.getView().getModel("servicesModel");

          myWorkingModel.loadData("model/servicesTwo.json");

        },
        
        onBackPress : function() {
         
          MessageToast.show("Back Button pressed.");

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

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

 });