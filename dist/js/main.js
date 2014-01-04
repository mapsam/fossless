function init() {

	// populates pageNav list based on number of <section> elements
	var numSections = $('#main').children('section').length;
	for(mug=0;mug<numSections;mug++){
		section = $('#main section').eq(mug);
		sectionId = section.attr('id');
		sectionName = section.find('h1').text();
		// use section info to create menu item on sidebar
		var menuItem = '<li><a href="#'+sectionId+'">'+sectionName+'</a></li>'
		var menu = $('#pageNav');
		menu.append(menuItem); // add item to menu
	}

	// highlights current active page menu item on sidebar
	var aside = $('aside'),
		asideHeight = aside.outerHeight()+30,
		menuItems = aside.find('a'),
		scrollItems = menuItems.map(function(){
			var item = $($(this).attr('href'));
			if (item.length) { return item; }
		});

    // box shadow on nav once it is scrolled from top
	$(window).scroll(function() {
		
		// uses sidebar menu items to add or remove class
		var fromTop = $(this).scrollTop()+asideHeight;
		var current = scrollItems.map(function(){
			if ($(this).offset().top < fromTop) {
				return this;
			}
		});
		current = current[current.length-1];
		var id = current && current.length ? current[0].id : "";
		menuItems
			.parent().removeClass('active')
			.end().filter('[href=#'+id+']').parent().addClass('active');

		// updates header sizing
		var scroll = $(window).scrollTop();
		if ( scroll < 2 ) {
			$('nav').css("opacity", 0.5);
		}
		else {
			$('nav').css("opacity", 1.0);
		}

		


	});

	$(document).ready(function(){
		var height = $('header').height();
		$('a[href*=#]').click(function() {
			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
			&& location.hostname == this.hostname) {
				var $target = $(this.hash);
				$target = $target.length && $target
				|| $('[name=' + this.hash.slice(1) +']');
				if ($target.length) {
					var targetOffset = ($target.offset().top)-height;
					$('html,body')
					.animate({scrollTop: targetOffset}, 800);
					return false;
	      		}
	    	}
	  	});
	});
}

window.onLoad = init();
