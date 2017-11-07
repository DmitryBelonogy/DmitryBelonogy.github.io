function compileTemplate (tpl) {

	let compileTpl = tpl;

	return function (el, data) {
	  let fragment = '';
	  fragment += compileTpl.replace(/\{\{about\}\}/, data.about).replace(/\{\{discription\}\}/, data.discription).replace(/\{\{img_src\}\}/, data.img_src);
	  el.innerHTML = fragment;
	  return fragment;
	};
}

let tpl_about = '<h1>{{about}}</h1><p>{{discription}}</p><br><br><p>Разработал:</p><img src="{{img_src}}">';
let data_about = {
	about: 'О сайте',
	discription: 'Основной функционал приложения заключается в получении данных о погоде в зависимости от координат на карте, возможности порсматривать историю поиска и добавлении закладок',
	img_src: 'img/UtbYXj6TuU8.jpg'
};


