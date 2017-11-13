function addPreferences() {
	let preferenceStar = document.getElementById('preference_star');
	if (!preferenceStar) return;
  preferenceStar.addEventListener('click', (ev) => {
    ev.preventDefault();
    getLocationName(center);
  });
}

function addPreferenceList (locationName) {
  let preference = document.getElementById('preference');
  let newLi = document.createElement('li');
  newLi.innerHTML = locationName + '<span class="remove">&#10006;</span>';
  
  preference.appendChild(newLi);
  setToLocalStorage('preference');
}

//addPreferences();

function removePreferenses() {
	document.getElementById('preference').addEventListener('click', function (ev) {
		ev.preventDefault();
		var remove = document.getElementsByClassName("remove");
		var i;
		for (i=0; i < remove.length; i++){
			remove[i].onclick = function(){
				var parent = this.parentElement;
				parent.remove();
			};
		}
		setToLocalStorage('preference');
	});
}

//removePreferenses();


