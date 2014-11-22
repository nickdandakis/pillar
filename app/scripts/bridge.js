'use strict';
var estimote = estimote || {};

estimote = function(){
	var beacons = [];
	var onUpdate = function(){};
	var onTemperatureUpdate = function(temperature, major, minor){};
	var onAccelerometerCountUpdate = function(accelerometerCount, major, minor){};
	var onIndoorLocationUpdate = function(x, y, orientation){};

	var update = function(beaconsJSON){
		$.each(beaconsJSON, function(index, val) {
			if(beacons.length == index){
				beacons.push(new Beacon(val));
			} else {
				beacons[index] = val;
			}
		});

		this.onUpdate(beacons);
	};

	var updateTemperature = function(temperatureJSON){
		var beacon = temperatureJSON;
		
		this.onTemperatureUpdate(parseFloat(beacon.temperature), beacon.major, beacon.minor);	
	};

	var updateAccelerometerCount = function(accelerometerCountJSON){
		var beacon = accelerometerCountJSON;

		this.onAccelerometerCountUpdate(parseInt(beacon.accelerometerCount), beacon.major, beacon.minor);
	};

	var updateIndoorLocation = function(indoorLocationJSON){
		var indoorLocation = indoorLocationJSON;

		this.onIndoorLocationUpdate(parseFloat(indoorLocation.x), parseFloat(indoorLocation.y), parseFloat(indoorLocation.orientation));
	};

	var invoke = function (commandName, args){
		console.log(commandName + ": " + JSON.stringify(args, null, 2));

		window.location = 'ios:' + commandName + ':' + encodeURIComponent(JSON.stringify(args));
  	};

	var getClosestBeacon = function(){
		return beacons[0];
	};

	var getFurthestBeacon = function(){
		return beacons[beacons.length-1];
	};

	var getAllBeacons = function(){
		return beacons;
	};

	var connect = function(major, minor){
		invoke("connect", {"major":major, "minor":minor});
	};

	var disconnect = function(major, minor){
		invoke("disconnect", {"major":major, "minor":minor});
	};

	var resetAccelerometerCount = function(major, minor){
		invoke("resetAccelerometerCount", {"major":major, "minor":minor});
	};

	var findBeaconByMajorMinor = function(major, minor){
		var matchedBeacon;

		$.each(beacons, function(index, val){
			if(val.major == major && val.minor == minor){
				matchedBeacon = beacons[index];
				return false;
			}
		});

		return matchedBeacon;
	};

	var oPublic = {
		onUpdate: onUpdate,
		onTemperatureUpdate: onTemperatureUpdate,
		onAccelerometerCountUpdate: onAccelerometerCountUpdate,
		onIndoorLocationUpdate: onIndoorLocationUpdate,
		update: update,
		updateTemperature: updateTemperature,
		updateAccelerometerCount: updateAccelerometerCount,
		updateIndoorLocation: updateIndoorLocation,
		getClosestBeacon: getClosestBeacon,
		getFurthestBeacon: getFurthestBeacon,
		getAllBeacons: getAllBeacons,
		connect: connect,
		disconnect: disconnect,
		resetAccelerometerCount: resetAccelerometerCount,
		findBeaconByMajorMinor: findBeaconByMajorMinor
	};

	return oPublic;
}();

var Beacon = function(data){
	this.name = data.name;
	this.distance = data.distance;
	this.major = data.major;
	this.minor = data.minor;
	this.rssi = data.rssi;
	this.proximity = data.proximity;
	this.color = data.color;
	this.isMoving = data.isMoving;
};