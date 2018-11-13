$(document).ready(function(){
	$("#back-top").hide();
	$(function() {
		$('.down').click(function () {
			$('body,html').animate({
				scrollTop: $('footer').offset().top
			}, 10000);
		return false;
		});
	});
});

$(document).ready(function(){
	$("#back-top").hide();
	$(function() {
		$(window).scroll(function() {
			if ($(this).scrollTop() > 400) {
				$('#back-top').fadeIn(); }
				else {
					$('#back-top').fadeOut();
				}
		});
		$('#back-top a').click(function () {
			$('body,html').animate({
				scrollTop: 0
			}, 400);
		return false;
		});
	});
});
