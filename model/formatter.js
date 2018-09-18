sap.ui.define([], function() {

	"use strict";

	return {

		myHeapFormatter: function(sCommandLine) {

			var re = /Xmx[0-9]{1,4}./;

			var sPortValue = re.exec(sCommandLine);

            console.log("reached before return");

			if (sPortValue) {

				return sPortValue;

			} else {

                console.log("reached n/a");

				return "-";
			}

        },

        myNewPortFormatter: function(sCommandLine) {

            var rex = /-requestport [0-9]{4,5}/;

			var sPortValue = rex.exec(sCommandLine);

            console.log("reached before return");

			if (sPortValue) {

				return sPortValue;

			} else {

                console.log("reached n/a");

				return "-";
			}

        },
        
        myTestFormatter: function(sCMD) {

            return sCMD;

        },

		enabledFormatter: function(sDisabled) {

			var status = "";

			if (sDisabled) {

				status = "Disabled";

			} else {

				status = "Enabled";

			}

			return status;

		},

		serverStatus: function(sServerStatus) {

			var state = "";

			switch (sServerStatus) {

				case 0:
					state = "Stopped";
					break;
				case 1:
					state = "Starting";
					break;
				case 2:
					state = "Initializing";
					break;
				case 3:
					state = "Running";
					break;
				case 4:
					state = "Stopping";
					break;
				case 5:
					state = "Failed";
					break;
				case 6:
					state = "Running with Errors";
					break;
				case 7:
					state = "Running with Warnings";
			}

			return state;

		},

		myPortFormatter: function(sPathOne, sPathTwo, sPathThree) {

			var rex = /^[0-9]{4,5}/;

			var resultValue;

			var oneValue = rex.exec(sPathOne);
			var twoValue = rex.exec(sPathTwo);
			var threeValue = rex.exec(sPathThree);

			if (oneValue) {
				resultValue = oneValue;
			}

			if (twoValue) {
				resultValue = twoValue;
			}

			if (threeValue) {
				resultValue = threeValue;
			}

			if (resultValue == null) {

				resultValue = "-";
			}

			return resultValue;

		},

		myAutoBootFormatter: function(sAutoboot) {

			if (sAutoboot) {

				return "On";

			} else {

				return "Off";

			}

		},
		
		isFlagged: function(sFlag) {
			
			if(sFlag) {
				
				return true;
				
			}
			
			return false;
			
		},

		getPercentage: function(sNumber) {

			return parseFloat(Number(sNumber).toFixed(1));

		},

		getAvailableSpace: function(sNumber) {

			var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
			if (sNumber == 0) return '0 Byte';
			var i = parseInt(Math.floor(Math.log(sNumber) / Math.log(1024)));
			return Math.round(sNumber / Math.pow(1024, i), 2) + ' ' + sizes[i] + " available";

		}

	};

});