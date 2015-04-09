function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function rangingCallback(e) {
        console.log("proximity: " + e.proximity);
        console.log("accuracy: " + e.accuracy);
        var blue = Math.min(15, Math.round(e.accuracy));
        blue = Math.max(0, blue);
        var red = 15 - blue;
        console.log(red + " " + blue);
        console.log(red.toString(16) + " " + blue.toString(16));
        $.appWindow.backgroundColor = "#" + red.toString(16) + "0" + blue.toString(16);
    }
    function startRanging() {
        $.label.removeEventListener("click", startRanging);
        $.label.addEventListener("click", stopRanging);
        $.label.title = "Stop Ranging";
        Beacon.startRangingForRegion({
            identifier: "Region by UUID only",
            uuid: "E2C56DB5-DFFB-48D2-B060-D0F5A71096E0"
        });
        $.appWindow.backgroundColor = "#00f";
    }
    function stopRanging() {
        $.label.removeEventListener("click", stopRanging);
        $.label.addEventListener("click", startRanging);
        $.label.title = "Start Ranging";
        Beacon.stopRangingForAllBeacons();
        $.appWindow.backgroundColor = "#000";
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.appWindow = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "appWindow"
    });
    $.__views.appWindow && $.addTopLevelView($.__views.appWindow);
    $.__views.label = Ti.UI.createButton({
        font: {
            fontSize: 12
        },
        title: "Start Scanning",
        id: "label"
    });
    $.__views.appWindow.add($.__views.label);
    startRanging ? $.__views.label.addEventListener("click", startRanging) : __defers["$.__views.label!click!startRanging"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var Beacon = require("com.drtech.altbeacon");
    Beacon.addBeaconLayout("m:2-3=0215,i:4-19,i:20-21,i:22-23,p:24-24");
    Beacon.bindBeaconService();
    Beacon.addEventListener("beaconProximity", rangingCallback);
    Beacon.setScanPeriods({
        foregroundScanPeriod: 300,
        foregroundBetweenScanPeriod: 500,
        backgroundScanPeriod: 1e4,
        backgroundBetweenScanPeriod: 6e4
    });
    $.appWindow.open();
    __defers["$.__views.label!click!startRanging"] && $.__views.label.addEventListener("click", startRanging);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;