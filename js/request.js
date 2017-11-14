let point = [];
console.log(point);
function getCurentPosition() {
	if (point[0] && point[1]) {
		ymaps.ready(init);
    clickPreference();
    addPreferences();
    removePreferenses();
    clickHistory();
    searchSity();	
	} else {
		fetch('https://api.userinfo.io/userinfos')
		.then((response) => {
			return response.json();
		})
		.then((obj) => {
			point[0] = obj.position.latitude;
			point[1] = obj.position.longitude;
			ymaps.ready(init);
	    clickPreference();
	    addPreferences();
	    removePreferenses();
	    clickHistory();
	    searchSity();		
		});
	}
	
}

