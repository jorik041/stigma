ymaps.ready(function () {
	// Создание экземпляра карты и его привязка к созданному контейнеру.
	var myMap = new ymaps.Map('map', {
				center: [ 42.97700507447011, 47.47518149999989 ],
				zoom: 15, 
				controls: []
			}),

	// Создание вложенного макета содержимого балуна.
		MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
			`<div class="baloon">
				<div class="baloon__img">
					<img src=$[properties.img]>
				</div>
				<div class="baloon__adress">
					<div class="sd1"><p>$[properties.address]</p></div>
					<div class="sd2"><p>$[properties.subaddress]</p></div>
					<div class="sd3"><p>Телефон: <span class="baloon__adress-phone">$[properties.telefon]</span></p></div>
					<div class="sd3"><p>Режим работы: $[properties.mode]</p></div>
					<div class="baloon__call call-to-action">
						<a href=""> Записаться на прием </a>
				</div>
				</div>				
			</div>
			`
		),

	// Создание метки с пользовательским макетом балуна.
		mahachkalaPlacemark = window.myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
			img: '../images/aga.png',
			address: 'Проспект Агасиева, д. 27',
			subaddress: '(ТЦ "Дербент", 1-ый этаж)',
			telefon: '+7 (988) 649-72-58',
			mode: '9:00-17:00'
		}, {
			iconLayout: 'default#image',
			iconImageHref: '../images/map.png',
			iconImageSize: [30, 45],
			balloonShadow: false,
			balloonContentLayout: MyBalloonContentLayout,
			balloonPanelMaxMapArea: 0,
			balloonOffset: [-220, -20],
			balloonPanelMaxMapArea: 0, 
			openEmptyBalloon: true,
			hideIconOnBalloonOpen: false,
		});
	
	myMap.geoObjects.add(mahachkalaPlacemark);
	myPlacemark.balloon.open();

	if($(window).width() < 481 ) {
		myPlacemark.balloon.close();
	}
});
