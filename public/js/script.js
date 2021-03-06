var map;
var myLatLng;
$(document).ready(function(){
	geoLocationInit();

	//Get current position
	function geoLocationInit() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(success, fail);
		} else {
			alert('Browser not supported');
		}
	}

	//Success geo location
	function success(position) {
		var latval = position.coords.latitude;
		var lngval = position.coords.longitude;
		myLatLng = new google.maps.LatLng(latval, lngval);
		createMap(myLatLng);
		// nearbySearch(myLatLng, 'school');
		searchGirls(latval, lngval);
	}

	//Fail geo location
	function fail() {
		alert('it fails');
	}

	//Create Map
	function createMap(myLatLng) {
		map = new google.maps.Map(document.getElementById('map'), {
			center: myLatLng,
			zoom: 12
		});

		var marker = new google.maps.Marker({
			position: myLatLng,
			map: map
		});
	}

	//Create marker
	function createMarker(latlng, icn, name) {
		var marker = new google.maps.Marker({
			position: latlng,
			map: map,
			icon: icn,
			title: name
		});
	}

	//Nearby search
	// function nearbySearch(myLatLng, type) {
	// 	var request = {
	// 		location: myLatLng,
	// 		radius: '2500',
	// 		types: [type]
	// 	};
	// 	service = new google.maps.places.PlacesService(map);
	// 	service.nearbySearch(request, callback);

	// 	function callback(results, status) {
	// 		if (status == google.maps.places.PlacesServiceStatus.OK) {
	// 			for (var i = 0; i < results.length; i++) {
	// 				var place = results[i];
	// 				latlng = place.geometry.location;
	// 				icn = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
	// 				name = place.name;
	// 				createMarker(latlng, icn, name);
	// 			}
	// 		}
	// 	}
	// }

	//Search girls
	function searchGirls(lat, lng) {
		$.post('/api/searchGirls', {lat:lat, lng:lng}, function(match) {
			$.each(match, function(i, val) {
				var glatval = val.lat;
				var glngval = val.lng;
				var gname = val.name;
				var GLatLng = new google.maps.LatLng(glatval, glngval);
				var gicn = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
				createMarker(GLatLng, gicn, gname);
			});
		});
	}
});