sap.ui.define([
    "Project_2/controller/TestRequest",
    "sap/m/MessageBox"
], function () {

    var isMomHappy = true;

    var willIGetNewPhone = new Promise(
        function (resolve, reject) {
            if (isMomHappy) {
                var phone = {
                    brand: 'Samsung',
                    color: 'black'
                };
                resolve(phone); // fulfilled
            } else {
                var reason = new Error('mom is not happy');
                reject(reason); // reject
            }

        }
    );


    return {

        customMethod: function () {

            willIGetNewPhone
                .then(function (fulfilled) {
                    // yay, you got a new phone
                    console.log(fulfilled);
                    // output: { brand: 'Samsung', color: 'black' }
                })
                .catch(function (error) {
                    // oops, mom don't buy it
                    console.log(error.message);
                    // output: 'mom is not happy'
                });

        },

        setInactivityMonitor: function() {

            var t;

            // Akonahle kliknem na nejaky element v okne tak sa resetuje timeout a pocita odznova
            window.onload = resetTimer;
            window.onclick = resetTimer;

            function expired() {

                //sap.m.MessageBox.information("You were now logged off due to inactivity.");
                console.log("** You were logged off.")

            }

            function resetTimer() {

                clearTimeout(t);
                console.log("Timeout cleared");
                t = setTimeout(expired, 5000);

            }

        },

        createDataPromise: function (sURL, sURLsuffix, sMethod, oHeaders, oInputData) {

            return new Promise(function (resolve, reject) {

                $.ajax({
                    url: sURL + sURLsuffix,
                    method: sMethod,
                    contentType: "application/json",
                    headers: JSON.stringify(oHeaders),
                    data: JSON.stringify(oInputData),
                    dataType: "json"

                }).done(resolve).fail(reject);

            });

        },

        evaluateFailedResponse: function(reject) {

            if(reject.status === 0){

                sap.m.MessageBox.error("Communication error. Please check if you have connectivity to WACS server.", {
                    title: "Error " + reject.status
                });
    
            }
        
            else if(typeof reject.responseJSON !== "undefined" && reject.responseText !== "{}"){
    
                sap.m.MessageBox.error(reject.responseJSON.message, {
                    title: reject.status + " " + reject.statusText
                });
    
            }
    
            else {
    
                sap.m.MessageBox.error(reject.statusText, {
                    title: "Error " + reject.status
                });
    
            }

        } 

    };


});