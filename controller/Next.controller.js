sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast",
  "sap/ui/core/routing/History",
  "sap/m/ResponsivePopover",
  "sap/m/Button",
  "Project_2/model/formatter"
], function (Controller, MessageToast, History, ResponsivePopover, Button, formatter) {
  "use strict";

  var that;

  return Controller.extend("Project_2.controller.Next", {

    formatter: formatter,

    onInit: function () {

      console.log("Start loading onInit in UserAdmin.");
      console.log("Finished loading onInit in UserAdmin.");


      var myFRSvalueModel = new sap.ui.model.json.JSONModel("model/servicesTwo.json");
      this.getView().setModel(myFRSvalueModel, "servicesModel");

      console.log(this.getView().getModel("servicesModel"));

      that=this;

    },

    getRouter: function () {
      return sap.ui.core.UIComponent.getRouterFor(this);
    },

    onPressToken: function () {

      var myToken = sap.ui.getCore().getModel("tokenModel");

      sap.m.MessageBox.information(JSON.stringify(myToken.getProperty("/logonToken")));


    },

    onLogoffPress: function () {

      // TODO - only helper variable - needs to be fixed by passing it
      var wacsURL = "http://localhost:6405/biprws";
      // var wacsURL = "www.sme.sk";

      $.ajax({
        url: wacsURL + "/logoff",
        method: "POST",
        dataType: "json",
        headers: {
          "X-SAP-LogonToken": String(sap.ui.getCore().getModel("tokenModel").getProperty("/logonToken")),
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        complete: function (jqXHRobject, textStatus) {

          if (jqXHRobject.status === 0) {

            sap.m.MessageBox.error("Please make sure that you have connectivity to WACS and try to logoff again.", {title: "Communication error (status: 0)" });
            console.log(jqXHRobject);

          } else if (jqXHRobject.status == 200) {

            console.log("Logged off");
            console.log(jqXHRobject);

            // TODO - Odstranit logonToken z modelu
            sap.ui.getCore().getModel("tokenModel").destroy();

            // TODO - a presmerovat na Home
            that.getRouter().navTo("Home", {}, true);

            // MessageToast positioned after navTo so that user can see it also after navigating away.
            // TODO rework so that also username is visible after logoff
            MessageToast.show("Username has logged off from BI4 environment.");

          } 
          
          // User je prihlasny cez API, ale medzitym mu niekto kill-ne session na BI4 environmente (kill, restart SIA/WACS, atd.)
          // TODO at this point it is also needed to get rid of logon token and redirect to Home page
          else if(jqXHRobject.status === 401) {

            

            
            // TODO - na tejto hlaske nemoze dat user escape - musim stlacit a po stlaceni musi byt listener, ktory ma hodi na Home
            // TODO a vymaze referenciu na logonToken

            sap.m.MessageBox.error("User session with your token has either expired or has been logged off from BI4. Please logon again.",  {title: "Not a valid logon token"} );
            sap.ui.getCore().getModel("tokenModel").destroy();
            this.getRouter().navTo("Home", {}, true);

          }

          else {

            // Can't think of any else cases but it is here for completeness
            sap.m.MessageBox.error(jqXHRobject.statusText, {
              title: jqXHRobject.status
            });

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

    onFRSpress: function () {

      MessageToast.show("FRS Button pressed.");

    },

    onUserAdminPress: function (oEvent) {

      this.getRouter().navTo("UserAdmin", {}, false);

    },

    onServicesPress: function () {

      MessageToast.show("Services Button pressed.");

      this.getRouter().navTo("Services", {}, false);

    }

  });

});