sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast",
  "sap/ui/core/routing/History",
  "sap/m/ResponsivePopover",
  "sap/m/Button"
], function (Controller, MessageToast, History, ResponsivePopover, Button) {
  "use strict";

  return Controller.extend("Project_2.controller.Next", {

    onInit: function() {

      console.log("Start loading onInit in UserAdmin.");
      console.log("Finished loading onInit in UserAdmin.");

    },

    getRouter : function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
    },
    
    onPressToken: function() {

      var myToken = sap.ui.getCore().getModel("tokenModel");

      sap.m.MessageBox.information(JSON.stringify(myToken.getProperty("/logonToken")));


    },

    onLogoffPress: function () {
      
      // TODO - only helper variable - needs to be fixed by passing it
      var wacsURL = "http://localhost:6405/biprws";

        $.ajax({
          url: wacsURL + "/v1/logoff",
          method: "POST",
          dataType: "json",
          headers: {
            "X-SAP-LogonToken": String(sap.ui.getCore().getModel("tokenModel").getProperty("/logonToken")),
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          complete: function (jqXHRobject, textStatus) {
    
            if(jqXHRobject.status == 200) {

              console.log("Logged off");
              console.log(jqXHRobject);

              // TODO - 1) Odstranit logonToken z modelu
              // TODO - 2) Pohrat sa trochu s repsonsami - error/success lebo nejako to nefacha

              //this.getRouter().navTo("Home", {}, true);

              // Positioned after navTo so that user can see the MessgeToast after navigating away.
              MessageToast.show("Your were logged off from BI4 environment.");

            }

            else {

              console.log("Apparently not logged off!");
              console.log(jqXHRobject);
              console.log(textStatus);


            }

          }
    
        });

        // ! Has to be commented when testing online
        // this.getRouter().navTo("Home", {}, true);
    
    },

    onUserNamePress: function (oEvent) {

    },

    onFRSpress: function() {

      MessageToast.show("FRS Button pressed.");

    },

    onUserAdminPress: function (oEvent) {

      this.getRouter().navTo("UserAdmin", {}, false);

    },

    onServicesPress: function() {

      MessageToast.show("Services Button pressed.");

      this.getRouter().navTo("Services", {}, false);

    }

  });


  // Code needs rework
  function logoffRequest(wacsURL, token) {



  }

});