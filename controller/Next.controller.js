sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast",
  "sap/ui/core/routing/History",
  "sap/m/ResponsivePopover",
  "sap/m/Button",
  "Project_2/model/formatter",
  "Project_2/controller/TestRequest"
], function (Controller, MessageToast, History, ResponsivePopover, Button, formatter, TestRequest) {
  "use strict";

  var that;

  return Controller.extend("Project_2.controller.Next", {

    formatter: formatter,

    // test

    onInit: function () {

      that = this;

      console.log("Start loading onInit in Next.");
      console.log("Finished loading onInit in Next.");

      var wacsURL = sap.ui.getCore().getModel("tokenModel").wacs;
      console.log("obsah wacsu: " + sap.ui.getCore().getModel("tokenModel").wacs);

      // define models
      var myFRSvalueModel = new sap.ui.model.json.JSONModel("model/servicesTwo.json"); // original
      var frsModel = new sap.ui.model.json.JSONModel();
      var servicesModel = new sap.ui.model.json.JSONModel();
      var usersModel = new sap.ui.model.json.JSONModel();


      // set View models
      this.getView().setModel(myFRSvalueModel, "servicesModel");

      // set Core models
      sap.ui.getCore().setModel(frsModel, "frsModel");
      sap.ui.getCore().setModel(servicesModel, "servicesModel");
      sap.ui.getCore().setModel(usersModel, "usersModel");

      // console.log(this.getView().getModel("servicesModel"));
      // var test = TestRequest.customMethod();
      // console.log(test);

      var servicesQuery = {

        "query": "select SI_NAME, SI_ID, SI_CUID, SI_PID, SI_DISABLED, SI_SIA_HOSTNAME, SI_AUTOBOOT, SI_STATUSINFO, SI_REQUIRES_RESTART, SI_CURRENT_COMMAND_LINE, SI_METRICS, SI_EXPECTED_RUN_STATE, SI_SERVER_WAITING_FOR_RESOURCES from ci_systemobjects where si_kind='Server'"

      };

      var servicesHeader = {

        "X-SAP-LogonToken": String(sap.ui.getCore().getModel("tokenModel").getProperty("/logonToken")),
        "Accept": "application/json",
         "Content-Type": "application/json"

      }

      var servicesPromise = TestRequest.createDataPromise(wacsURL, "/v1/cmsquery", "POST", servicesHeader, servicesQuery);

      servicesPromise.then((value) => {
        console.log('Promise resolved: ');
        console.log(value);

        // Saving logon token to Core globally as JSONModel
        sap.ui.getCore().getModel("servicesModel").setJSON(JSON.stringify(value.responseJSON));

        console.log("Services data updated.")

    }).catch((reason) => {
        console.log('Promise rejected: ');
        console.log(reason);
        console.log(reason.status + " " + reason.statusText);

        TestRequest.evaluateFailedResponse(reason);

    });  

    },

    getRouter: function () {
      return sap.ui.core.UIComponent.getRouterFor(this);
    },

    onPressToken: function () {

      var myToken = sap.ui.getCore().getModel("tokenModel");

      sap.m.MessageBox.information(JSON.stringify(myToken.getProperty("/logonToken")));


    },

    onLogoffPress: function () {

      // TODO to be checked why it is returning 400

      // var headers = {
      //       "X-SAP-LogonToken": sap.ui.getCore().getModel("tokenModel").getProperty("/logonToken")
      //       }

    //   console.log(headers);

      
    //   var logoffPromise = TestRequest.performLogoffPromise(sap.ui.getCore().getModel("tokenModel").wacs, "/v1/logoff", "POST", headers);

    //   logoffPromise.then((value) => {
    //     console.log('Promise resolved: ');
    //     console.log(value);

    //     // TODO - Odstranit logonToken z modelu
    //     sap.ui.getCore().getModel("tokenModel").destroy();

    //     // TODO - a presmerovat na Home
    //     that.getRouter().navTo("Home", {}, true);
        
    //     // MessageToast positioned after navTo so that user can see it also after navigating away.
    //     // TODO rework so that also username is visible after logoff
    //     MessageToast.show("You were logged off.");

    // }).catch((reason) => {
    //     console.log('Promise rejected: ');
    //     console.log(reason);
    //     console.log(reason.status + " " + reason.statusText);

    //     TestRequest.evaluateFailedResponse(reason);

    // });

      // TODO - only helper variable - needs to be fixed by passing it
 
      var wacsURL = sap.ui.getCore().getModel("tokenModel").wacs;

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

            sap.m.MessageBox.error("Please make sure that you have connectivity to WACS and try to logoff again.", {
              title: "Communication error (status: 0)"
            });
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
          else if (jqXHRobject.status === 401) {




            // TODO - na tejto hlaske nemoze dat user escape - musim stlacit a po stlaceni musi byt listener, ktory ma hodi na Home
            // TODO a vymaze referenciu na logonToken

            sap.m.MessageBox.error("User session with your token has either expired or has been logged off from BI4. Please logon again.", {
              title: "Not a valid logon token"
            });
            sap.ui.getCore().getModel("tokenModel").destroy();
            this.getRouter().navTo("Home", {}, true);

          } else {

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