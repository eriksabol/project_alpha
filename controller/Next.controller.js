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

    onLogoutPress: function () {
      
      MessageToast.show("Logout Button pressed.");

      
      console.log(this.getRouter().getRoute("Home"));
     
      this.getRouter().navTo("Home", {}, true);
    
    },

    onUserNamePress: function (oEvent) {

    },

    onUserAdminPress: function (oEvent) {

      this.getRouter().navTo("UserAdmin", {}, false);

    }

  });


  // Code needs rework
  function logoffRequest(wacsURL, token) {

    $.ajax({
      url: wacsURL + "/logoff",
      method: "POST",
      dataType: "json",
      headers: {
        "X-SAP-LogonToken": String(token)
      },
      success: function (data, textStatus, jqXHRobject) {

        


      },

      error: function(jqXHRobject, textStatus, errorThrown) {



      }

    });

  }

});