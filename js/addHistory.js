function searchSity() {
	let sityName = document.getElementById('sityName');
	let search_btn = document.getElementById('search_btn');
	let map = document.getElementById('map');
	search_btn.addEventListener('click', (ev) => {
		ev.preventDefault();
		if (sityName.value === '') {
			return;
		}
    map.innerHTML = '';
    getLocationCoordinates(sityName.value);
		addHistory(sityName.value);
		sityName.value = '';
	});
}

//searchSity();

let addHistory = (sityName) => {
	let history = document.getElementById('history');
	let newLi = document.createElement('li');

	let historyLength = history.children.length;

//	console.log(history.children[2]);

  if (historyLength >= 10) {
  	history.removeChild(history.children[9]);
  }

	let hours = new Date().getHours();

	if (hours < 10) {
		hours = '0' + hours;
	}

	let minuts = new Date().getMinutes();

	if (minuts < 10) {
		minuts = '0' + minuts;
	}

  newLi.innerHTML = hours + ':' + minuts + ' - ' + sityName;
  
  history.insertBefore(newLi, history.children[0]);

  setToLocalStorage('history');

};



