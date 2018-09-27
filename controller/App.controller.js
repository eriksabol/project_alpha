sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "Project_2/controller/TestRequest"
], function (Controller, MessageToast, MessageBox, TestRequest) {
    "use strict";

    return Controller.extend("Project_2.controller.App", {

        onInit: function() {

            TestRequest.setInactivityMonitor();

        }

    });

});