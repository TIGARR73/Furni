(function() {
	'use strict';

	// Navbar Toggle Functionality for Mobile Menu
	var navbarToggle = function() {
		var toggler = document.querySelector('.menu-toggle');
		var navList = document.querySelector('.nav-list');
		var mainMenu = document.getElementById('mainMenu');
		
		// Try different selectors for different pages
		if (!navList) {
			navList = document.querySelector('#mainMenu');
		}
		if (!navList) {
			navList = document.querySelector('.main-menu');
		}
		
		if (toggler && navList) {
			toggler.addEventListener('click', function(e) {
				e.stopPropagation();
				toggler.classList.toggle('active');
				navList.classList.toggle('active');
				
				// Prevent body scroll when menu is open
				if (navList.classList.contains('active')) {
					document.body.style.overflow = 'hidden';
				} else {
					document.body.style.overflow = '';
				}
			});
			
			// Close menu when clicking outside
			document.addEventListener('click', function(event) {
				var isClickInside = navList.contains(event.target) || toggler.contains(event.target);
				if (!isClickInside && navList.classList.contains('active')) {
					toggler.classList.remove('active');
					navList.classList.remove('active');
					document.body.style.overflow = '';
				}
			});

			// Close menu when clicking on a link
			var menuLinks = navList.querySelectorAll('a');
			menuLinks.forEach(function(link) {
				link.addEventListener('click', function() {
					toggler.classList.remove('active');
					navList.classList.remove('active');
					document.body.style.overflow = '';
				});
			});
		}
	};
	
	// Initialize navbar toggle
	navbarToggle();

	// Testimonials Slider Functionality
	var testimonialsSlider = function() {
		var testimonialsSection = document.querySelector('.testimonials');
		if (!testimonialsSection) return;

		var currentSlide = 0;
		var quotes = [
			{
				text: "Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer convallis volutpat dui quis scelerisque.",
				name: "Maria Jones",
				role: "CEO, Co-Founder, XYZ Inc.",
				image: "images/person-1.png"
			},
			{
				text: "Excellent service and quality products! The furniture we purchased exceeded our expectations. The delivery was fast and the customer support was outstanding throughout the entire process.",
				name: "John Smith",
				role: "Interior Designer, ABC Design",
				image: "images/person-1.png"
			},
			{
				text: "I've been a customer for years and I'm always impressed by the quality and design of their products. Highly recommend Furni for anyone looking for modern, stylish furniture.",
				name: "Sarah Williams",
				role: "Home Owner",
				image: "images/person-1.png"
			}
		];

		var quoteElement = testimonialsSection.querySelector('.quote');
		var personElement = testimonialsSection.querySelector('.person');
		var leftArrow = testimonialsSection.querySelector('.arrow.left');
		var rightArrow = testimonialsSection.querySelector('.arrow.right');
		var dots = testimonialsSection.querySelectorAll('.dot');

		function updateSlide(index) {
			if (index < 0) index = quotes.length - 1;
			if (index >= quotes.length) index = 0;
			currentSlide = index;

			var quote = quotes[currentSlide];
			if (quoteElement) {
				quoteElement.textContent = quote.text;
			}
			if (personElement) {
				var img = personElement.querySelector('img');
				var h3 = personElement.querySelector('h3');
				var span = personElement.querySelector('span');
				if (img) img.src = quote.image;
				if (h3) h3.textContent = quote.name;
				if (span) span.textContent = quote.role;
			}

			// Update dots
			dots.forEach(function(dot, i) {
				if (i === currentSlide) {
					dot.classList.add('active');
				} else {
					dot.classList.remove('active');
				}
			});
		}

		// Arrow navigation
		if (leftArrow) {
			leftArrow.addEventListener('click', function() {
				updateSlide(currentSlide - 1);
			});
		}

		if (rightArrow) {
			rightArrow.addEventListener('click', function() {
				updateSlide(currentSlide + 1);
			});
		}

		// Dot navigation
		dots.forEach(function(dot, index) {
			dot.addEventListener('click', function() {
				updateSlide(index);
			});
		});

		// Auto-play functionality
		var autoplayInterval = setInterval(function() {
			updateSlide(currentSlide + 1);
		}, 5000);

		// Pause on hover
		testimonialsSection.addEventListener('mouseenter', function() {
			clearInterval(autoplayInterval);
		});

		testimonialsSection.addEventListener('mouseleave', function() {
			autoplayInterval = setInterval(function() {
				updateSlide(currentSlide + 1);
			}, 5000);
		});

		// Touch swipe support for mobile
		var touchStartX = 0;
		var touchEndX = 0;

		testimonialsSection.addEventListener('touchstart', function(e) {
			touchStartX = e.changedTouches[0].screenX;
		});

		testimonialsSection.addEventListener('touchend', function(e) {
			touchEndX = e.changedTouches[0].screenX;
			handleSwipe();
		});

		function handleSwipe() {
			if (touchEndX < touchStartX - 50) {
				updateSlide(currentSlide + 1);
			}
			if (touchEndX > touchStartX + 50) {
				updateSlide(currentSlide - 1);
			}
		}

		// Initialize first slide
		updateSlide(0);
	};

	// Initialize testimonials slider
	testimonialsSlider();

	


	var sitePlusMinus = function() {

		var value,
    		quantity = document.getElementsByClassName('quantity-container');

		function createBindings(quantityContainer) {
	      var quantityAmount = quantityContainer.getElementsByClassName('quantity-amount')[0];
	      var increase = quantityContainer.getElementsByClassName('increase')[0];
	      var decrease = quantityContainer.getElementsByClassName('decrease')[0];
	      increase.addEventListener('click', function (e) { increaseValue(e, quantityAmount); });
	      decrease.addEventListener('click', function (e) { decreaseValue(e, quantityAmount); });
	    }

	    function init() {
	        for (var i = 0; i < quantity.length; i++ ) {
						createBindings(quantity[i]);
	        }
	    };

	    function increaseValue(event, quantityAmount) {
	        value = parseInt(quantityAmount.value, 10);

	        console.log(quantityAmount, quantityAmount.value);

	        value = isNaN(value) ? 0 : value;
	        value++;
	        quantityAmount.value = value;
	    }

	    function decreaseValue(event, quantityAmount) {
	        value = parseInt(quantityAmount.value, 10);

	        value = isNaN(value) ? 0 : value;
	        if (value > 0) value--;

	        quantityAmount.value = value;
	    }
	    
	    init();
		
	};
	sitePlusMinus();


})()