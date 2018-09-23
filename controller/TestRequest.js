sap.ui.define([
    "Project_2/controller/TestRequest"
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

            

        } 



    };


});