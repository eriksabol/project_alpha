sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "Project_2/controller/TestRequest"
], function (Controller, MessageToast, MessageBox, TestRequest) {
    "use strict";

    var that;

    return Controller.extend("Project_2.controller.Home", {

        onInit: function () {

            // outer reference
            that = this;

            console.log("Start loading onInit in Home");

            //! create all relevant models for login

            /*
            model for available authentication types - REST API cannot return authentication types without logging in,
            therefore it must just defined manually
            */
            var authenticationModel = new sap.ui.model.json.JSONModel();
            var tokenModel = new sap.ui.model.json.JSONModel();

            authenticationModel.setData({

                items: [

                    {
                        key: "secEnterprise",
                        text: "Enterprise"
                    },

                    {
                        key: "secSAPR3",
                        text: "SAP"
                    },

                    {
                        key: "secWinAD",
                        text: "Active Directory"
                    },

                    {
                        key: "secLDAP",
                        text: "LDAP"
                    }

                ]

            });

            // set models
            this.getView().setModel(authenticationModel, "authenticationModel");
            sap.ui.getCore().setModel(tokenModel, "tokenModel");

            console.log("Finished loading onInit in Home");

        },

        getRouter: function () {
            return sap.ui.core.UIComponent.getRouterFor(this);
        },

        onPressLogin: function () {

            var wacsInput = this.getView().byId("input-wacs").getValue();
            var usernameInput = this.getView().byId("input-username").getValue();
            var passwordInput = this.getView().byId("input-password").getValue();
            var authenticationInput = this.getView().byId("input-authentication").getSelectedKey();

            var inputData = {
                "clienttype": "",
                "userName": usernameInput,
                "password": passwordInput,
                "auth": authenticationInput
            };

            // create promises
            var logonTokenPromise = TestRequest.createDataPromise(wacsInput, "/logon/long", "POST", null, inputData);

            logonTokenPromise.then((value) => {
                console.log('Promise resolved: ');
                console.log(value);

                // Saving logon token to Core globally as JSONModel
                sap.ui.getCore().getModel("tokenModel").setJSON(JSON.stringify(value.responseJSON));

                // Navigating to dashboard view after successfull login
                that.getRouter().navTo("Next", {}, true);

                MessageToast.show("You were logged on.");

            }).catch((reason) => {
                console.log('Promise rejected: ');
                console.log(reason);
                console.log(reason.status + " " + reason.statusText);

                TestRequest.evaluateFailedResponse(reason);
            });

            // ! Pocas testingu bez BI4 toto musi byt zakommentovane 
            //loginRequest(wacsInput, inputData, processTheOutput);

            // ! Pocas live testingu toto musi byt zakomentovane
            // this.loginRequestTest(wacsInput, inputData);
            // this.getRouter().navTo("Next", {}, true);


        }
        // ,

        // loginRequestTest: function (URL, inputObject) {

        //     console.log(URL + inputObject);
        //     this.getRouter();
        //     test();

        // }

    });

    // function loginRequest(URL, inputObject, callbackFunction) {

    //     // TODO: here we should somehow check whether there is an existing logon token in sap storage

    //     // Request for login to BI 4.2 via REST
    //     $.ajax({
    //         url: URL + "/logon/long",
    //         method: "POST",
    //         contentType: "application/json",
    //         data: JSON.stringify(inputObject),
    //         dataType: "json",
    //         success: function (data, textStatus, jqXHRobject) {

    //             console.log("It's success");
    //             console.log(jqXHRobject);

    //             if (callbackFunction != null) {

    //                 // Aj jqXHRobject obsahuje returned data (logon token)
    //                 callbackFunction(jqXHRobject);

    //             }

    //         },
    //         error: function (jqXHRobject, textStatus, errorThrown) { //Object, String, String

    //             console.log("It's fail.");

    //             if (callbackFunction != null) {

    //                 // Teraz to bude iba objekt s chybami alebo undefined
    //                 callbackFunction(jqXHRobject);

    //             }

    //         }

    //     });
    // }

    // function processTheOutput(result) {

    //     console.log(result);

    //     // Check returned object and process further

    //     // TODO rework loop for checking the output into case statement?

    //     if (result.status === 0) {

    //         sap.m.MessageBox.error("Communication error (status: 0). Please check if you have connectivity to WACS server.");

    //     } else if (result.status === 200 && typeof result.responseJSON !== "undefined") {

    //         // Saving logon token to Core globally as JSONModel
    //         sap.ui.getCore().getModel("tokenModel").setJSON(JSON.stringify(result.responseJSON));

    //         // Navigating to dashboard view after successfull login
    //         that.getRouter().navTo("Next", {}, true);

    //         MessageToast.show("You were logged on to BI4 environment.");

    //     } else if (result.status !== 200 && typeof result.responseJSON !== "undefined" && result.responseText !== "{}") {

    //         sap.m.MessageBox.error(result.responseJSON.message, {
    //             title: result.status + " " + result.statusText
    //         });

    //     } else {

    //         sap.m.MessageBox.error(result.statusText, {
    //             title: result.status
    //         });

    //     }

    // }

    // function test() {

    //     console.log("This is a test outside function.")

    //     console.log("Has model? " + sap.ui.getCore().hasModel());
    //     console.log("This is the model: " + sap.ui.getCore().getModel("tokenModel"));

    //     var coreModel = sap.ui.getCore().getModel("tokenModel");

    //     coreModel.loadData("model/logonToken.json");

    //     console.log("This is the model: " + coreModel);

    //     console.log(coreModel);

    //     console.log(that.getRouter());

    //     const myRequest = new Request('http://localhost:6405/biprws/logon/long');


    // }

});