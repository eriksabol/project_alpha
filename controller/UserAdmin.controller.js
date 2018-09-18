sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/routing/History"
 ], function (Controller, MessageToast, History) {
    "use strict";

    var that;

    return Controller.extend("Project_2.controller.UserAdmin", {

      
        onInit : function() {
          
          console.log("Start loading onInit in UserAdmin.");

          var liveJSONmodel = new sap.ui.model.json.JSONModel();

          var oModel = new sap.ui.model.json.JSONModel("model/user.json");
          this.getView().setModel(oModel, "userModel");

          console.log(oModel);

          console.log("Finished loading onInit in UserAdmin.");

          that = this;

        },
        
        getRouter : function () {
          return sap.ui.core.UIComponent.getRouterFor(this);
        },

        onBeforeRendering: function() {

        //   if(jQuery.sap.storage(jQuery.sap.storage.Type.local).get("logonTokens") === null) {

        //     this.getRouter().navTo("Home", {}, true);

        //  }
          
        },

        onPressLoadUsers: function() {

          MessageToast.show("Load users clicked");




          that.getView().byId("userListTable").setBusy(true);

          var myWorkingModel = this.getView().getModel("userModel");

          var servicesQuery = {

            "query": "select SI_NAME, SI_ID, SI_CUID, SI_KIND, SI_CREATION_TIME, SI_ALIASES, SI_DEFAULT_OBJECT, SI_USERGROUPS, SI_FAVORITES_FOLDER, SI_INBOX, SI_PERSONALCATEGORY, SI_LASTLOGONTIME, SI_NAMEDUSER, SI_CHANGEPASSWORD, SI_DEFAULTOBJECT from ci_systemobjects where si_kind='User'"

          };

          $.ajax({
            url: "http://localhost:6405/biprws/v1/cmsquery",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(servicesQuery),
            headers: {
              "X-SAP-LogonToken": String(sap.ui.getCore().getModel("tokenModel").getProperty("/logonToken")),
              "Accept": "application/json",
              "Content-Type": "application/json"
            },
            dataType: "json",
            success: function (data, textStatus, jqXHRobject) {

                console.log("It's success");
                console.log(jqXHRobject);

                // console.log(oModel);
                // console.log(this.getView());
                // console.log(this.getView().getModel("servicesModel"));
                that.getView().getModel("userModel").setJSON(JSON.stringify(jqXHRobject.responseJSON));
                that.getView().byId("userListTable").setBusy(false);
                MessageToast.show("Users reloaded");
                //this.getView().getModel("servicesModel").loadData(JSON.stringify(jqXHRobject.responseJSON));

            },
            error: function (jqXHRobject, textStatus, errorThrown) { //Object, String, String

                console.log("It's fail.");
                console.log(jqXHRobject);

                that.getView().byId("userListTable").setBusy(false);


            }

        });





        },
        
        onBackPress : function() {
         
          MessageToast.show("Back Button pressed.");

          console.log(this.getRouter().getRoute());

            console.log(this.getRouter().getTarget());

            var oHistory = History.getInstance();

            var sPreviousHash = oHistory.getPreviousHash();
            
            console.log ("previous history: " + oHistory.getPreviousHash());

            if (sPreviousHash !== undefined) {
              
              window.history.go(-1);

            } else {
              
              this.getRouter().navTo("Next", {}, true);

            }

       }

    });
 });