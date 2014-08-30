var youtubeGallery = function(element, user, size){
	$(element).append(gallery);
	
	$.ajax({
		url:'http://gdata.youtube.com/feeds/api/videos?max-results='+20+'&alt=json&orderby=published&format=5&author='+'caimeuerj'+'&callback=?',
		type: 'GET',
		dataType: 'json',
		success: function(data){
			var feed = data.feed;
			var entries = feed.entry || [];
			
			var mainVideo = entries[0].link[0].href;
			var videoId = youtubeid(mainVideo);
			
			$('#player').append(player(videoId, 0));
			
			for (var i = 0; i < entries.length; i++) {
				var entry = entries[i];
				var url = entry.link[0].href;
				var title = entry.title.$t;
				var thumb = entry.media$group.media$thumbnail[0].url;
				
				$('#playlist').append(thumbs(url, thumb, title));
			}
			
			$('#playlist li:first-child').addClass('current');
			
			$('.carousel').carousel({
				itemsPerPage: 4,
				itemsPerTransition: 4,
				nextPrevLinks: true,	
			});
		}
	});
	
	$(element).on('click', '#playlist a', function(e){
		e.preventDefault();
		
		if($(this).parent().hasClass('current')) return;
		
		var url = $(this).attr('href');
		var videoId = youtubeid(url);
		
		$('#playlist li').removeClass('current');
		$(this).parent().addClass('current');
		
		$('#player').html(player(videoId, 1));
	})
}

var youtubeid = function(url) {
	var ytid = url.match("[\\?&]v=([^&#]*)");
	ytid = ytid[1];
	return ytid;
};

var gallery = function(){
	return [
		'<div id="videos"><div id="player"></div><div class="carousel"><ul id="playlist"></ul></div></div>'
	].join('');	
}

var player = function(videoId, autoplay){
	return [
		'<iframe width="400" height="254" src="http://www.youtube.com/embed/'+videoId+'?autoplay='+autoplay+'" frameborder="0" allowfullscreen></iframe>'
	].join('');	
}

var thumbs = function(url, thumb, title){
	return [
		'<li><a href="'+url+'" title="'+title+'"><span></span><img src="'+thumb+'" alt="'+title+'" title="'+title+'" /></a></li>'
	].join('');	
}

$(document).ready(youtubeGallery('#gallery','billabongprobr', 20));