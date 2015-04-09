var Beacon = require("com.drtech.altbeacon");
Beacon.addBeaconLayout("m:2-3=0215,i:4-19,i:20-21,i:22-23,p:24-24");
Beacon.bindBeaconService();
Beacon.addEventListener("beaconProximity", rangingCallback);
Beacon.setScanPeriods({
	foregroundScanPeriod: 300,
    foregroundBetweenScanPeriod: 500,
    backgroundScanPeriod: 10000,
    backgroundBetweenScanPeriod: 60000
});

//Altbeacon.startRangingForRegion(region)
function doClick(e) {
    //alert($.label.text);
    Beacon.startRangingForRegion ({
    	identifier: 'Region by UUID only',
		uuid: 'E2C56DB5-DFFB-48D2-B060-D0F5A71096E0'
    });
    $.appWindow.backgroundColor = '#00f';
}

function rangingCallback(e) {
	console.log("proximity: " + e.proximity);
	console.log("accuracy: " + e.accuracy);
	
	var blue = Math.min(15, Math.round(e.accuracy));
	blue = Math.max(0, blue);
	var red = 15 - blue;
	console.log (red + " " + blue);
	console.log (red.toString(16) + " " + blue.toString(16));
	$.appWindow.backgroundColor = '#' + red.toString(16) + '0' + blue.toString(16);
}

$.appWindow.open();

function startRanging() {
	$.label.removeEventListener("click", startRanging);
	$.label.addEventListener("click", stopRanging);
	$.label.title = 'Stop Ranging';	
	Beacon.startRangingForRegion ({
    	identifier: 'Region by UUID only',
		uuid: 'E2C56DB5-DFFB-48D2-B060-D0F5A71096E0'
    });
    $.appWindow.backgroundColor = '#00f';
}

function stopRanging() {
	$.label.removeEventListener("click", stopRanging);
	$.label.addEventListener("click", startRanging);
	$.label.title = 'Start Ranging';	
	Beacon.stopRangingForAllBeacons ();
	$.appWindow.backgroundColor = '#000';
}
