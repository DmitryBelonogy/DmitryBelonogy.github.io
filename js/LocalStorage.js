function setToLocalStorage(idElement) {

	let id = idElement;
	let el = document.getElementById(id);
	let idLocalStorage = id;

	localStorage.setItem(idLocalStorage, el.innerHTML);
}

function getToLocalStorage (idElement) {

	let id = idElement;
	let el = document.getElementById(id);
	let idLocalStorage = id;

	if (localStorage.length === 0) {
		return;
	} else if (localStorage.getItem(idLocalStorage) === null) {
		return;
	}

	let data = localStorage.getItem(idLocalStorage);
	el.innerHTML = data;
/*
	var promise = new Promise((resolve, reject) => {
  	localStorage.getItem(idLocalStorage);
	});

	promise.then((data) => el.innerHTML = data);
*/
}
