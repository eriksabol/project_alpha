sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function (Controller, MessageToast, MessageBox) {
    "use strict";

    var that;

    return Controller.extend("Project_2.controller.Home", {

        onInit: function () {

            console.log("Start loading onInit in Home");

            // 1. ty by sa malo chekcnut ci existuju uz nejake logontokeny v local storage-i. Ak
            // ano, tak sa musia overit ci su aktivne a ak nie tak zmazat.

            var oModel = new sap.ui.model.json.JSONModel();
            var tokenModel = new sap.ui.model.json.JSONModel();

            that = this;

            oModel.setData({

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

            this.getView().setModel(oModel, "authenticationModel");
            sap.ui.getCore().setModel(tokenModel, "tokenModel");

            console.log("Finished loading onInit in Home");

        },

        getRouter : function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

        onPressLogin: function () {
          
                var wacsInput = this.getView().byId("input-wacs").getValue();
                var usernameInput = this.getView().byId("input-username").getValue();
                var passwordInput = this.getView().byId("input-password").getValue();
                var authenticationInput = this.getView().byId("input-authentication").getSelectedKey();

                // console.log(wacsInput + " " + usernameInput + " " + passwordInput + " " + authenticationInput);

                var inputData = {
                    "clienttype": "",
                    "userName": usernameInput,
                    "password": passwordInput,
                    "auth": authenticationInput
                };

                // ! Pocas testingu bez BI4 toto musi byt zakommentovane 
                loginRequest(wacsInput, inputData, processTheOutput);

                // ! Pocas live testingu toto musi byt zakomentovane
                 // this.loginRequestTest(wacsInput, inputData);
                // this.getRouter().navTo("Next", {}, true);
            

        },

        loginRequestTest: function(URL, inputObject) {

            console.log(URL + inputObject);
            this.getRouter();
            test();

        }  

    });

    function loginRequest(URL, inputObject, callbackFunction) {

        // TODO: here we should somehow check whether there is an existing logon token in sap storage

        // Request for login to BI 4.2 via REST
        $.ajax({
            url: URL + "/logon/long",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(inputObject),
            dataType: "json",
            success: function (data, textStatus, jqXHRobject) {

                console.log("It's success");
                console.log(jqXHRobject);

                if (callbackFunction != null) {

                    // Aj jqXHRobject obsahuje returned data (logon token)
                    callbackFunction(jqXHRobject);

                }

            },
            error: function (jqXHRobject, textStatus, errorThrown) { //Object, String, String

                console.log("It's fail.");

                if (callbackFunction != null) {

                    // Teraz to bude iba objekt s chybami alebo undefined
                    callbackFunction(jqXHRobject);

                }

            }

        });
    }

    function processTheOutput(result) {

        console.log(result);

        // Check returned object and process further

        if (typeof result.responseJSON === "undefined") {

            sap.m.MessageBox.error("No JSON response detected. Please check if you have connectivity to WACS server.");

        } else if (result.responseJSON.error_code !== null && result.statusText !== "OK") {

             sap.m.MessageBox.error(result.responseJSON.message, {
                title: result.status + " " + result.statusText
            });

        } else {

            // Saving logon token to Core globally as JSONModel
            sap.ui.getCore().getModel("tokenModel").setJSON(JSON.stringify(result.responseJSON));

            // Navigating to dashboard view after successfull login
            that.getRouter().navTo("Next", {}, true);

            MessageToast.show("You were logged in to BI4 environment.");

        }

    }

    function test() {

        console.log("This is a test outside function.")

        console.log("Has model? " + sap.ui.getCore().hasModel());
        console.log("This is the model: " + sap.ui.getCore().getModel("tokenModel"));

        var coreModel = sap.ui.getCore().getModel("tokenModel");

        coreModel.loadData("model/logonToken.json");

        console.log("This is the model: " + coreModel);

        console.log(coreModel);

        console.log(that.getRouter());




    }

});