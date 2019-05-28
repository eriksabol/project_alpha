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

            // define models
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

            // set View models
            this.getView().setModel(authenticationModel, "authenticationModel");
            
            // set Core models
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
            
            // set authentication URL to property
            sap.ui.getCore().getModel("tokenModel").wacs = wacsInput;
            console.log("console log after adding:" + sap.ui.getCore().getModel("tokenModel").wacs);

            logonTokenPromise.then((value) => {
                console.log('Promise resolved: ');
                console.log(value);

                // Saving logon token to Core globally as JSONModel
                sap.ui.getCore().getModel("tokenModel").setJSON(JSON.stringify(value));

                // Navigating to dashboard view after successfull login
                that.getRouter().navTo("Next", {}, true);

                // Showing information about successfull login
                MessageToast.show("You were logged on.");

            }).catch((reason) => {
                console.log('Promise rejected: ');
                console.log(reason);
                console.log(reason.status + " " + reason.statusText);

                TestRequest.evaluateFailedResponse(reason);

            });

        }

    });

});