function clickHistory() {
	let history = document.getElementById('history');
	history.addEventListener('click', (ev) => {
		let curentEv = ev.target;
		let tagName = curentEv.tagName;
		if (tagName !== 'LI') return;
		let cityName = curentEv.innerText;
		cityName = cityName.slice(8);
    map.innerHTML = '';
    getLocationCoordinates(cityName);
	});
}

//clickHistory();