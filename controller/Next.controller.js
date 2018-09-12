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

    onFRSpress: function() {

      var textString = "\/usr\/sap\/RO2\/sap_bobj\/enterprise_xi40\/linux_x64\/\/boe_filesd -loggingPath -Xmx2g \/usr\/sap\/RO2\/sap_bobj\/logging\/ -requestport 6402 -fg -restart -name Input.frhdstdrqrv20 -pidfile \/usr\/sap\/RO2\/sap_bobj\/serverpids\/frhdstdrqrv20_frhdstdrqrv20.InputFileRepository.pid -ns dcplnx23099339:6400";

      var re = /Xmx[0-9]{1,4}./;

			var sPortValue = re.exec(textString);

			if (sPortValue) {

				console.log(sPortValue);

			} else {

				console.log("-");
			}

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