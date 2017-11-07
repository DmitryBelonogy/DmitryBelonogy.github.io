function compileTemplate (tpl) {

	let compileTpl = tpl;

	return function (el, data) {
	  let fragment = '';
	  fragment += compileTpl.replace(/\{\{about\}\}/, data.about).replace(/\{\{discription\}\}/, data.discription).replace(/\{\{img_src\}\}/, data.img_src);
	  el.innerHTML = fragment;
	  return fragment;
	};
}

let tpl_map = '<div id="preference_star"></div><div id="map"></div><div id="history"></div><div id="weather"><ul><li><span id="temp"></span><sup>o</sup>C</li><li id="summary"></li><li id="precipProbability"></li><li id="pressure"></li><li id="humidity"></li></ul></div><div id="preference"></div>';
let data_map = {};
