(function ($, window, document, undefined) {
    'use strict';

    var headerHeight = $("header").height();
    
    //one page navigation
    $('.navigation.single_page_nav').singlePageNav({
    	currentClass: "active",
    	filter: ':not(.external)',
    	offset: headerHeight
    });

    //start header either fixed or not fixed
    function initHeader(){
		$("header").css("height", headerHeight);
    }
    

    $(".js_rotating").Morphext({
	    animation: "fadeIn",
	    separator: ",",
	    speed: 3500,
	    complete: function () {
	    }
	});

    function handleScrollHeader(){
    	var scrollTop = $(window).scrollTop();
    	if (scrollTop > headerHeight){
    		$("header").addClass("fixed");
    	}else{
    		$("header").removeClass("fixed");
    	}
    }

    //when loading a page check whether i should show the scroll to top button or not
    function initScrollToTop(){
    	var scrollTop = $(window).scrollTop();

    	if (scrollTop > 500){
    		$(".scroll_to_top").addClass("visible");
    	}else{
    		$(".scroll_to_top").removeClass("visible");
    	}
    }

    //init the height of fullscreen image
    function initFullscreenImage(){
    	var winHeight = $(window).height();

    	$(".home_fullscreen_image").css("height", winHeight);
    }

    //when you click the scroll to top button, go to the top of the page
    $(".scroll_to_top").on("click", function(e){
		e.preventDefault();
		$("html, body").animate({scrollTop:0}, 800);
    });

    //init functions
   // initHeader();
    initScrollToTop();
    initFullscreenImage();

    $('.about_eh').equalHeights();
    $('.about_bot_eh').equalHeights();

    $(window).resize(function(){

    	initFullscreenImage();
    	
    })

    //use the init functions when scrolling as well
    $(window).scroll(function(){
    	initScrollToTop();
    	handleScrollHeader();
    });

    //mobile navigation toggle button for mobile menu
    $(".mobile_nav_toggle").on("click", function(){

    	if ($("#header").hasClass("mobile")){
    		$("#header").removeClass("mobile");
    	}else{
    		$("#header").addClass("mobile");
    	}

    	return false;

    });

    //when you click a mobile navigation anchor tag, the nav should close
    $(".navigation > li > a").on("click", function(){

    	if ($("#header").hasClass("mobile")){

    		$("#header").removeClass("mobile");

    	}

    });

	// page transitions
    if ($(".animsition").length){
		$(".animsition").animsition({
			inClass               :   'fade-in',
			outClass              :   'fade-out',
			inDuration            :    1500,
			outDuration           :    800,
			linkElement           :   'a:not([target="_blank"]):not([href^=#]):not([class*="lightbox_item"]):not([class*="popup-video"]):not([data-lightbox^="image_lightbox"])',
			loading               :    true,
			loadingParentElement  :   'body', //animsition wrapper element
			loadingClass          :   'animsition-loading',
			unSupportCss          : [ 'animation-duration',
			                          '-webkit-animation-duration',
			                          '-o-animation-duration'
			                        ],
			overlay               :   false,
			overlayClass          :   'animsition-overlay-slide',
			overlayParentElement  :   'body'
		});
	}

	//lightbox for images
	if ($("a[data-lightbox^='image_lightbox']").length){
		$("a[data-lightbox^='image_lightbox']").magnificPopup({type:'image'});
	}
	
	//lightbox for videos
	if ($('.popup-video').length){
		$('.popup-video').magnificPopup({
			disableOn: 700,
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,

			fixedContentPos: false
		});
	}

	//general slideshow carousel
  	$(".slideshow_items").owlCarousel({
		items : 1,
        dots: true
  	});

	//testimonials slideshow carousel
  	$(".testimonials_slider").owlCarousel({
		items : 1,
        dots: true
  	});

  	//portfolio
  	var portfolioCols = $(".portfolio_grid").attr("data-cols");
    var $workItems = $('.portfolio_grid'),
    colWidth = function () {
      var w = $workItems.width(), 
      columnNum = 1,
      columnWidth = 0;
      if (w > 1170) {
        columnNum  = ((portfolioCols == undefined) ? 3 : portfolioCols);
      } 
      else if (w > 960) {
        columnNum  = 2;
      } 
      else if (w > 640) {
        columnNum  = 2;
      } 
      else if (w > 480) {
        columnNum  = 2;
      }  
      else if (w > 360) {
        columnNum  = 1;
      } 
      columnWidth = Math.floor(w/columnNum);
      $workItems.find('.grid_item').each(function() {
        var $item = $(this),
        multiplier_w = $item.attr('class').match(/item-w(\d)/),
        multiplier_h = $item.attr('class').match(/item-h(\d)/),
        width = multiplier_w ? columnWidth*multiplier_w[1] : columnWidth,
        height = multiplier_h ? columnWidth*multiplier_h[1]*0.75-10 : columnWidth*0.58-10;
        $item.css({
          width: width,
          height: height
        });
      });
      return columnWidth;
    },
    isotope = function () {
      $workItems.isotope({
        resizable: true,
        itemSelector: '.grid_item',
        masonry: {
          columnWidth: colWidth(),
          gutterWidth: 10
        }
      });
    };
    isotope();
    $(window).on("debouncedresize", function(event){
    	isotope();
    });

    //portfolio filter
    $('.portfolio_grid_filter li').on('click', function(){
	    $('.portfolio_grid_filter li').removeClass('active');
	    $(this).addClass('active');

    	var selector = $(this).attr('data-filter');
		$workItems.isotope({
			filter: selector
		});
		return false;
    });

    //pre-loader
	window.addEventListener('DOMContentLoaded', function() {
	    new QueryLoader2(document.querySelector("body"), {
	        barColor: "#999999",
	        backgroundColor: "#ffffff",
	        percentage: true,
	        barHeight: 2,
	        minimumTime: 200,
	        fadeOutTime: 1000,
	        onComplete : function(){

	        }
	    });
	});

	//contact form
	$("body").on("click", ".contact_button", function(){
		var name = $(this).parents(".contact_form").find(".contact_name");
		var email = $(this).parents(".contact_form").find(".contact_email");
		var message = $(this).parents(".contact_form").find(".contact_message");

		var val = $(this).val();

		$(this).val("Loading...");

		$.ajax({
			type: 'POST',
			url: 'ajax/ajax.php',
			data: {
				'name' : name.val(),
				'email' : email.val(),
				'message' : message.val()
			},
			dataType: 'json',
			success: $.proxy(function(data) {

				if (data.error == false){
					name.val('');
					email.val('');
					message.val('');
					$(".contact_form .inputfield").removeClass("contains_error");
				}else{
					$(".contact_form .inputfield").removeClass("contains_error");
					for (var i = 0; i < data.error_fields.length; i++) {
						$(".contact_form .contact_"+data.error_fields[i]).addClass("contains_error");
					};
				}

				$(".contact_form .messages").html(data.response).addClass("visible");

				$(this).val(val);

			}, this)
		});

		return false;

	});
	
	$(".goto_section").on("click", function(){

		var section = $(this).attr("data-section-id");

		$('html, body').animate({scrollTop:$('#' + section).offset().top-50}, 750);
		
		return false;

	});

	function toggleBounce() {
		if (marker.getAnimation() !== null) {
			marker.setAnimation(null);
		} else {
			marker.setAnimation(google.maps.Animation.BOUNCE);
		}
	}
	

	//google maps
	if ($("#gmap").length){

		var marker;
	    $("#gmap").appear();
	    $("body").on("appear", "#gmap", function(event, $all_appeared_elements){

	    	if (!$(this).hasClass("done")){

				//Google map
				var theme_array = [{"stylers":[{"saturation":-100},{"gamma":1}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi.place_of_worship","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi.place_of_worship","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"water","stylers":[{"visibility":"on"},{"saturation":0},{"gamma":0},{"hue":"#000000"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text.fill","stylers":[{"color":"#333333"}]},{"featureType":"road.local","elementType":"labels.text","stylers":[{"weight":0.5},{"color":"#333333"}]},{"featureType":"transit.station","elementType":"labels.icon","stylers":[{"gamma":1},{"saturation":0}]}];

			    var map = new google.maps.Map(document.getElementById('gmap'), {
				    zoom: 12,
					center: {lat: 37.7749, lng: -122.4194},//latitude and longitude
			        styles: theme_array,
					scrollwheel: false
				});

				var contentString = '<p>Google Maps Marker</p>';

				var infowindow = new google.maps.InfoWindow({
					content: contentString
				});

				marker = new google.maps.Marker({
					map: map,
					draggable: true,
					animation: google.maps.Animation.DROP,
					position: {lat: 37.7749, lng: -122.4194},//latitude and longitude
					title: 'Marker Title'
				});
				marker.addListener('click', function(){
					infowindow.open(map, marker);

					toggleBounce();
				});

				$(this).addClass("done");
		    }

	    });
	}

	//check for mobile
	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	//os name
	var OSName = "Unknown OS";
	if (navigator.appVersion.indexOf("Win") != -1) OSName = "Windows";
	else if (navigator.appVersion.indexOf("Mac") != -1) OSName = "MacOS";
	else if (navigator.appVersion.indexOf("X11") != -1) OSName = "UNIX";
	else if (navigator.appVersion.indexOf("Linux") != -1) OSName = "Linux";

	//if not mobile
	if( !isMobile.any() ){

		$(".parallax_item").parallax("50%", 0.4);

		$(".home_fullscreen_image").parallax("50%", 0.4);

		$(window).resize(function(){
			//init parallax
			$(".parallax_item").parallax("50%", 0.4);

			$(".home_fullscreen_image").parallax("50%", 0.4);
		});

		$(window).load(function(){

			//init WOW animations
			new WOW().init();

		});

		//animate skills
	    $(".skills .skill").appear();
	    $("body").on("appear", ".skills .skill", function(event, $all_appeared_elements){

	    	if (!$(this).hasClass("animated")){
		    	var percentage = $(this).find(".bar").attr("data-width");

		    	$(this).find(".barinner").animate({
				    width:percentage
				}, 700);
				$(this).addClass("animated");
		    }

	    });

	    //do counter up
	    $(".counter_up").appear();
	    $("body").on("appear", ".counter_up", function(event, $all_appeared_elements){

	    	if (!$(this).hasClass("animated")){
				$(this).counterUp({
					delay: 10,
					time: 1000
				});
				$(this).addClass("animated");
		    }

	    });

	}else{
		//when on mobile device

		var winHeight = $(window).height();
		$(".home_fullscreen_image").css("height", winHeight + "px");

		//dont do parallax effect, instead show static image
		$(".parallax_item").addClass("no_parallax");

		$(".home_fullscreen_image").addClass("no_parallax");


		//animate skills
	    $(".skills .skill").appear();
	    $("body").on("appear", ".skills .skill", function(event, $all_appeared_elements){

	    	if (!$(this).hasClass("animated")){
		    	var percentage = $(this).find(".bar").attr("data-width");

		    	$(this).find(".barinner").css("width", percentage);
				$(this).addClass("animated");
		    }

	    });

	}

})(jQuery, window, document);