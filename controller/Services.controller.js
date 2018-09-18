sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/routing/History",
    "Project_2/model/formatter"
 ], function (Controller, MessageToast, History, formatter) {
    "use strict";

    var that;

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

          sap.ui.getCore().setModel(oModel, "servicesModel");

          that = this;

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

        onPressLoadModel: function() {

          that.getView().byId("servicesListTable").setBusy(true);

          var myWorkingModel = this.getView().getModel("servicesModel");

          var servicesQuery = {

            "query": "select SI_NAME, SI_ID, SI_CUID, SI_PID, SI_DISABLED, SI_SIA_HOSTNAME, SI_AUTOBOOT, SI_STATUSINFO, SI_REQUIRES_RESTART, SI_CURRENT_COMMAND_LINE, SI_METRICS, SI_EXPECTED_RUN_STATE, SI_SERVER_WAITING_FOR_RESOURCES from ci_systemobjects where si_kind='Server'"

          };

          $.ajax({
            url: "http://localhost:6405/biprws/v1/cmsquery",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(servicesQuery),
            headers: {
              "X-SAP-LogonToken": String(sap.ui.getCore().getModel("tokenModel").getProperty("/logonToken")),
              "Accept": "application/json",
              "Content-Type": "application/json"
            },
            dataType: "json",
            success: function (data, textStatus, jqXHRobject) {

                console.log("It's success");
                console.log(jqXHRobject);

                // console.log(oModel);
                // console.log(this.getView());
                // console.log(this.getView().getModel("servicesModel"));
                that.getView().getModel("servicesModel").setJSON(JSON.stringify(jqXHRobject.responseJSON));
                that.getView().byId("servicesListTable").setBusy(false);
                MessageToast.show("Services reloaded");
                //this.getView().getModel("servicesModel").loadData(JSON.stringify(jqXHRobject.responseJSON));

            },
            error: function (jqXHRobject, textStatus, errorThrown) { //Object, String, String

                console.log("It's fail.");
                console.log(jqXHRobject);

                that.getView().byId("servicesListTable").setBusy(false);


            }

        });



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