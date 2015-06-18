$(document).ready(function(){

var request = {
		count: "50",
		access_token: "11985134.5dc6eba.cd35ca5a81374458a1ca648169d421f6",
		min_id: "",
		max_id: "",
	};

var pagination;

$.ajax({
		url: "https://api.instagram.com/v1/users/self/media/recent/",
		data: request,
		dataType: "jsonp",
		type: "GET",
	})
	.done(function(result){
		pagination = result.pagination;
		$.each(result.data, function(i, data){
			$('div.infiniteScroll').append('<li><a target="_blank" href="' + data.link + '"><img src="' + data.images.thumbnail.url + '"/></a></li>');
			console.log(data.images.thumbnail.url);
		});
	})
	.fail(function(jqXHR, error, errorThrown){
		console.log(error);
	});

var scroll = function(){
	$('div.infiniteScroll ul').animate({left: '-6000px'}, 10000);
}

var nextResult = function(){
	var next = $.ajax({
		url: pagination.next_url,
		data: request,
		dataType: "jsonp",
		type: "GET",
	})
	.done(function(next){
		pagination = next.pagination;
		$.each(next.data, function(e, item){
			$('div.infiniteScroll ul').append('<li><a target="_blank" href="' + item.link + '"><img src="' + item.images.thumbnail.url + '"/></a></li>');
		});
	})
	.fail(function(jqXHR, error, errThrown){
		console.log(error);
	});	
}


setInterval(function(){
	nextResult();
}, 3000);

});