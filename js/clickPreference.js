function clickPreference() {
	let preference = document.getElementById('preference');
	preference.addEventListener('click', (ev) => {
		let curentEv = ev.target;
		let tagName = curentEv.tagName;
		if (tagName !== 'LI') return;
		let cityName = curentEv.innerText;
		cityName = cityName.slice(0, -1);
    map.innerHTML = '';
    getLocationCoordinates(cityName);
	});
}

//clickPreference();