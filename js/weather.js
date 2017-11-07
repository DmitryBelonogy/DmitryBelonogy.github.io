let getForecastByLatLng = (location) => {
	let long = location[0];
	let latd = location[1];
	let temp = document.getElementById('temp'),
			summary = document.getElementById('summary'),
			precipProbability = document.getElementById('precipProbability'),
			pressure = document.getElementById('pressure'),
			humidity = document.getElementById('humidity');
	fetch('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/d113af5f82393ef553f48314ae9f42e8/53.890838,27.5372046?lang=ru&units=si')
  	.then((req) => req.json())
		.then((data) => {
			console.log(data);
//			let obj = JSON.parse(data.body);
//			let	temperature = Math.round((obj.currently.temperature - 32) * 5 / 9);
//			temp.innerHTML = temperature;
//			summary.innerHTML = obj.currently.summary;
//			precipProbability.innerHTML = 'Вероятность осадков ' + obj.currently.precipProbability * 100 + '%';
//			pressure.innerHTML = 'Атмосферное давление ' + obj.currently.pressure + 'Па';
//			humidity.innerHTML = 'Влажность ' + obj.currently.humidity * 100 + '%';			
		});
};

