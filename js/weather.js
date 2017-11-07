let getForecastByLatLng = (location) => {
	let long = location[0];
	let latd = location[1];
	let temp = document.getElementById('temp'),
			summary = document.getElementById('summary'),
			precipProbability = document.getElementById('precipProbability'),
			pressure = document.getElementById('pressure'),
			humidity = document.getElementById('humidity');
	fetch('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/d113af5f82393ef553f48314ae9f42e8/53.890838,27.5372046?lang=ru&units=si')
		.then(r => r.json())
		.then(data => {
			let	temperature = Math.round((data.currently.temperature - 32) * 5 / 9);
			temp.innerHTML = temperature;
			summary.innerHTML = data.currently.summary;
			precipProbability.innerHTML = 'Вероятность осадков ' + data.currently.precipProbability * 100 + '%';
			pressure.innerHTML = 'Атмосферное давление ' + data.currently.pressure + 'Па';
			humidity.innerHTML = 'Влажность ' + data.currently.humidity * 100 + '%';
		});
};

