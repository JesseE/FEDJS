// Namespace.
var SCOREAPP = SCOREAPP || {};



// Self invoking anonymous function.
(function () {



// Data objecten.
SCOREAPP.game = {

};

SCOREAPP.schedule = {

};

SCOREAPP.ranking = {

};



// Controller [Zorgt ervoor dat de router gaat werken.]
SCOREAPP.controller = {
	init: function () {
		SCOREAPP.router.init();
	}
};



// Routing [Gebruik de micro-library: Routie.]
SCOREAPP.router = {
	init: function(){
		routie({
			'/game': function() {
				SCOREAPP.page.render('game');
			},

			'/schedule': function() {
				SCOREAPP.page.render('schedule');
			},

			'/ranking': function(){
				SCOREAPP.page.render('ranking');
			},

			'*': function(){
				SCOREAPP.page.render('game');
			}
		});
	},

	change: function () {
        var route = window.location.hash.slice(2),
            sections = $$('section'),
            section = $$('[data-route=' + route + ']')[0];

        // Show active section, hide all other
        if (section) {
			for (var i=0; i < sections.length; i++){
				sections[i].classList.remove('active');
			}
			section.classList.add('active');
		}

		// Default route
		if (!route) {
			sections[0].classList.add('active');
		}

	}
};

// Pages
SCOREAPP.page = {
	render: function (route) {
		var data;
		switch (route){
			case 'game':
			data = SCOREAPP.game;
			break;
			
			case 'schedule':
			$$.get('https://api.leaguevine.com/v1/pools/19222/?access_token=52b1add650', {}, function(data){
				console.log(data);
			});
			data = SCOREAPP.schedule;
			break;
			
			case 'ranking':
			data = SCOREAPP.ranking;
			break;

			default :
			data = SCOREAPP.game;
		}

		Transparency.render($$('[data-route='+route+']')[0], data);
		SCOREAPP.router.change();
	}
};

// DOMReady [Start app wanneer DOM klaar is.]
domready(function () {
	SCOREAPP.controller.init();
});


})();