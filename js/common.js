$(window).scroll(function() {

	var st = $(this).scrollTop(); 

	$(".paralax1").css({
		"transform" : "translate( 0%, -" + st/4 + "%"
	});

	$(".history").css({
		"transform" : "translate( 0%, -" + st/16 + "%"
	});

});
