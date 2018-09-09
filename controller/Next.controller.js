sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast",
  "sap/ui/core/routing/History",
  "sap/m/ResponsivePopover",
  "sap/m/Button"
], function (Controller, MessageToast, History, ResponsivePopover, Button) {
  "use strict";

  return Controller.extend("Project_2.controller.Next", {

    onLogoutPress: function () {
      MessageToast.show("Logout Button pressed.");

      if (jQuery.sap.storage(jQuery.sap.storage.Type.local).remove("logonToken") !== null) {

        console.log("Logon token successfully removed from Local storage.")

      } else {

        console.log("Logon token could not be removed from local Storage");

      }

      var oHistory = History.getInstance();

      var sPreviousHash = oHistory.getPreviousHash();

      if (sPreviousHash !== undefined) {
        window.history.go(-1);
      } else {
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("App", true);
      }

    },

    onUserNamePress: function (oEvent) {

      var oPopover = new ResponsivePopover({
        showHeader: false,
        placement: sap.m.PlacementType.Bottom,
        content: [
          new Button({
            text: 'Feedback',
            type: sap.m.ButtonType.Transparent
          }),
          new Button({
            text: 'Help',
            type: sap.m.ButtonType.Transparent
          }),
          new Button({
            text: 'Logout',
            type: sap.m.ButtonType.Transparent
          })
        ]
      }).addStyleClass('sapMOTAPopover sapTntToolHeaderPopover');

      oPopover.openBy(oEvent.getSource());

    },

    onUserAdminPress: function (oEvent) {

      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.navTo("UserAdmin");

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