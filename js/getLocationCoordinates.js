
function getLocationCoordinates(cityName) {
	let GOOGLE_API_KEY = 'AIzaSyDa7DCL2NO9KMPd9DYVk_u3u0wCbm0XXFY';
	cityName = cityName;
	fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + cityName + '&key=' + GOOGLE_API_KEY)
		.then((req) => {
			return req.json();
		})
		.then((data) => {
			let location = data.results[0].geometry.location;
			point[0] = location.lat;
			point[1] = location.lng;
			map.innerHTML = '';
			init();
		});
}

//getLocationCoordinates('Брест');

let locationName;

function getLocationName(locationCoordinates) {
	let GOOGLE_API_KEY = 'AIzaSyDa7DCL2NO9KMPd9DYVk_u3u0wCbm0XXFY';
	locationCoordinates = locationCoordinates.join(',');
	fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + locationCoordinates + '&key=' + GOOGLE_API_KEY)
		.then((req) => {
			return req.json();
		})
		.then((data) => {
			locationName = data.results[0].address_components[1].long_name + ', ' + data.results[0].address_components[2].long_name;
			console.log('done');
			addPreferenceList (locationName);
		});
}
