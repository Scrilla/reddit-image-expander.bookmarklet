javascript: 

var linkList = linkList ? linkList : [];

$(".ui-resizable-handle").parent().show();

if (!jQuery.ui) {
	script = document.createElement("script");
	script.src = "http://code.jquery.com/ui/1.11.0/jquery-ui.min.js";
	script.onload = function(){
		if (jQuery.ui)
			AddImages();
	};
	document.body.appendChild(script);
} 

else {
	AddImages();
}

function AddImages(){
	
	$("a.title")
		.each(function () {
			var href = $(this).attr("href"),
				$button = $("<div class='expando-button collapsed video expand-bookmarklet'></div>")
					.click(function(){
						$(this).parent().nextAll("p.expand-bookmarklet").toggle();
					}),
				$img;
				
			if (
					href
					&& !inArray( href, linkList )
					&& (
							href.indexOf(".jpeg") >= 0
							|| href.indexOf(".jpg") >= 0
							|| href.indexOf(".gif" ) >= 0
							|| href.indexOf(".png" ) >= 0
							|| ( 
									href.indexOf("imgur") >= 0
									&& href.indexOf(",") === -1
								)
							&& href.indexOf("www.dropbox") === -1
							&& href.indexOf("imgur.com/a/") === -1
							&& href.indexOf("imgur.com/gallery/") === -1
						)
				) 	
			{
				ext = (href.indexOf('imgur')>=0) ? '.jpg' :''; 
				$img = $("<p style='width:350px' class='expand-bookmarklet'><img style='display:block;width:100%;' src='" + href + ext + "' /></p>");
				$(this)
					.after($button)
					.parent()
					.nextAll(".buttons")
					.after($img);
				linkList.push(href);
			}
		}
	);
	
	$("p.expand-bookmarklet")
		.resizable({ 
			handles: "se", 
			aspectRatio: true  
		});
		
	$(".ui-resizable-handle")
		.css({
			"display" : "block",
			"height" : "100%",
			"width" : "100%",
			"position" : "absolute",
			"bottom" : "0",
			"left" : "0",
			"background" : "transparent"
		})
		.parent()
		.css("position", "relative");
}

function inArray(needle, haystack) {
	var i, length;
	for (i = 0, length = haystack.length; i < length; i++) {
		if (haystack[i] == needle)
			return true;
	}
	return false;
}
