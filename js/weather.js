let getForecastByLatLng = (location) => {
	let requestType = document.querySelector('input[name="request_type"]:checked').value;
	let long = location[0];
	let latd = location[1];
	let temp = document.getElementById('temp'),
			summary = document.getElementById('summary'),
			precipProbability = document.getElementById('precipProbability'),
			pressure = document.getElementById('pressure'),
			humidity = document.getElementById('humidity');
	if (requestType === 'XHR') {
		var x = new XMLHttpRequest();
		x.open('GET', `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/d113af5f82393ef553f48314ae9f42e8/${long},${latd}?lang=ru&units=si`, true);
		x.onload = () => {
			var response = x.responseText;
			data = JSON.parse(response);
			temp.innerHTML = Math.round(data.currently.temperature);
			summary.innerHTML = data.currently.summary;
			precipProbability.innerHTML = 'Вероятность осадков ' + data.currently.precipProbability * 100 + '%';
			pressure.innerHTML = 'Атмосферное давление ' + data.currently.pressure + 'Па';
			humidity.innerHTML = 'Влажность ' + data.currently.humidity * 100 + '%';
		};
		x.send(null);
	} else if (requestType === 'fetch') {
		fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/d113af5f82393ef553f48314ae9f42e8/${long},${latd}?lang=ru&units=si`)
		.then(r => r.json())
		.then(data => { 
			temp.innerHTML = Math.round(data.currently.temperature);
			summary.innerHTML = data.currently.summary;
			precipProbability.innerHTML = 'Вероятность осадков ' + data.currently.precipProbability * 100 + '%';
			pressure.innerHTML = 'Атмосферное давление ' + data.currently.pressure + 'Па';
			humidity.innerHTML = 'Влажность ' + data.currently.humidity * 100 + '%';
		});
	}
};

