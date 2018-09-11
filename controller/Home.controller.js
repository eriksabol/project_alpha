sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function (Controller, MessageToast, MessageBox) {
    "use strict";

    return Controller.extend("Project_2.controller.Home", {

        onInit: function () {

            console.log("Load");

            // 1. ty by sa malo chekcnut ci existuju uz nejake logontokeny v local storage-i. Ak
            // ano, tak sa musia overit ci su aktivne a ak nie tak zmazat.

            var oModel = new sap.ui.model.json.JSONModel();

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

            if(isThereOrphanedToken()) {

                console.log("Your logon tokens are there");


            }

            console.log("test");

        },

        onPressLogin: function () {

            MessageToast.show("Login Button pressed.");

            // ! added for logontoken verification
            if(!isThereOrphanedToken()) {

                var wacsInput = this.getView().byId("input-wacs").getValue();
                var usernameInput = this.getView().byId("input-username").getValue();
                var passwordInput = this.getView().byId("input-password").getValue();
                var authenticationInput = this.getView().byId("input-authentication").getSelectedKey();

                console.log(wacsInput + " " + usernameInput + " " + passwordInput + " " + authenticationInput);

                var inputData = {
                    "clienttype": "",
                    "userName": usernameInput,
                    "password": passwordInput,
                    "auth": authenticationInput
                };

                // Pocas testingu bez BI4 toto musi byt zakommentovane 
                // loginRequest(wacsInput, inputData, processTheOutput);

                // Pocas live testingu toto musi byt zakomentovane
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("Next");
            }

            else {

                var logonToken = JSON.parse(jQuery.sap.storage(jQuery.sap.storage.Type.local).get("logonTokens"));

                console.log(logonToken);

                sap.m.MessageBox.error("Your logon tokens are: " + JSON.stringify(logonToken));
            }


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

        // jQuery.sap.require("jquery.sap.storage");
        // var oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);

        // console.log("oStorage: " + oStorage);

        // console.log(oStorage.isSupported());

        // var mockLogonToken = "dcplnx23099339:6400@{3&2=507714,U3&2v=dcplnx23099339:6400,UP&66=60,U3&68=secEnterprise:Administrator,UP&S9=12,U3&qe=100,U3&vz=erjMxF8o2a9vxFPOxnl.qIvOB.yeJW8wHh9JAOUwts0,UP}";

        // console.log(oStorage.put("logonToken_dcplnx23099339:6400", mockLogonToken));



        // Check returned object and process further

        if (typeof result.responseJSON === "undefined") {

            //sap.m.MessageToast.show("No JSON response detected. Please check if you have connectivity to REST services.");

            sap.m.MessageBox.error("No JSON response detected. Please check if you have connectivity to WACS server.");
            // na message box mozeme dat este callback aby vycistil fieldy ked user
            // klikne na zavriet.

        } else if (result.responseJSON.error_code !== null) {

            //sap.m.MessageToast.show(result.responseJSON.error_code + " " + result.responseJSON.message);

            sap.m.MessageBox.error(result.responseJSON.message, {
                title: result.status + " " + result.statusText
            });

        } else {

            if (jQuery.sap.storage(jQuery.sap.storage.Type.local).put("logonToken", "teststring")) {

                console.log("Logon token savend to Local storage.")

            } else {

                console.log("Logon token could not be saved to local Storage");

            }

            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("Next");

            // 1. uloz logonToken na sap local storage
            // 2. naviguj na druhy view/controller kde uz budem vo vnutri (logoff button sa presunie tam).
            // testujem git

        }

    }

    function isThereOrphanedToken() {

        var localStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);

        if(localStorage.get("logonTokens") !== null) {

            return true;

        }

        else {

            return false;

        }
        
        
        
        
        
        
        
        // if (localStorage.isSupported()) {

        //     if(jQuery.sap.storage(jQuery.sap.storage.Type.local).get("logonTokens") !== null) {

        //         var logonToken = JSON.parse(jQuery.sap.storage(jQuery.sap.storage.Type.local).get("logonTokens"));

        //         console.log(logonToken);

        //         sap.m.MessageBox.warning("Your local storage contains the following logon tokens" + logonToken, {title: "Warning", actions: sap.m.MessageBox.Action.YES,
            
        //             onClose: function(oAction) {

        //                 console.log(oAction);

        //                 if(oAction === sap.m.MessageBox.Action.YES) {

        //                     alert("yes");

        //                 }

        //             }
                                   
        //     });

        //     }

        //     // Pride kod, ktory checkne ci tam uz je nejaky logon token a zobrazi hlasku, ci chce vsetky tokeny zmazat.
        //     // Zmazanie bude asi JSON request na logoff, ak sa vrati error tak to zmaze. Ak sa vrati uspesne prihlasenie, tak
        //     // tu session odhlasi.

        // } else {

        //     sap.m.MessageBox.error("Your browse does not support local storage functionality. You are not able to use this application.");

        //     this.getView().byId("input-wacs").setEnabled(false);
        //     this.getView().byId("input-username").setEnabled(false);
        //     this.getView().byId("input-password").setEnabled(false);

        //     // Is already disabled in view:
        //     //this.getView().byId("input-authentication").setEnabled(false);

        // }

    }

});