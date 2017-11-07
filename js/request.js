let point = [];
function getCurentPosition() {
	let requestType = document.querySelector('input[name="request_type"]:checked').value;
	if (requestType === 'XHR') {
		var x = new XMLHttpRequest();
		x.open('GET', 'https://api.userinfo.io/userinfos', true);
		x.onload = () => {
			var response = x.responseText;
			response = JSON.parse(response);
			point[0] = response.position.latitude;
			point[1] = response.position.longitude;
			ymaps.ready(init);
		};
		x.send(null);
	} else if (requestType === 'fetch') {
		fetch('https://api.userinfo.io/userinfos')
			.then((response) => {
				return response.json();
			})
			.then((obj) => {
				point[0] = obj.position.latitude;
				point[1] = obj.position.longitude;
				ymaps.ready(init);
			});
	}
}

