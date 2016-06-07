//count the number of all articals
var count  = function(cb) {
	$.ajax({
		type: 'get',
		url: 'http://10.124.18.115:8080/apis/v1/article/?token=3eaf6c95602d3e662154667b0cfa7a7a2310b3b1',
		// url: 'http://www.uberqd.com/apis/v1/article/',
		crossDomain: true,
		dataType: 'json',
		success: function(data){
			cb(data.meta.count);
		},
		error: function (err) {
			console.log(222);
		},
	});
};
//count the number of all published articals
var countPub = function(cb) {
	$.ajax({
		type: 'get',
		url: 'http://10.124.18.115:8080/apis/v1/article/',
		// url: 'http://www.uberqd.com/apis/v1/article/',
		crossDomain: true,
		dataType: 'json',
		success: function(data){
			cb(data.meta.count);
		},
		error: function (err) {
			console.log(222);
		},
	});
};
//style the page for all the articals
var page = function() {
	count(function (cou){
		var size = 5;
		var number = Math.ceil(cou/size);
		// console.log("The number of page is"+number);fa
		for(var i = 1; i<= number; i++) {
			$("#pp").append("<li class='index'><a href='#'>"+i+"</a></li>");
		}
	});
};
//style the page for published articals
var pagePub = function() {
	countPub(function (cou){
		var size = 5;
		var number = Math.ceil(cou/size);
		// console.log("The number of page is"+number);fa
		for(var i = 1; i<= number; i++) {
			$("#pp").append("<li class='index'><a href='#'>"+i+"</a></li>");
		}
	});
};
//style the page for unpublished articals
var pageUnpub = function() {
	count(function (c){
		countPub(function (cou){
			var size = 5;
			var number = Math.ceil((c-cou)/size);
			// console.log("The number of page is"+number);fa
			for(var i = 1; i<= number; i++) {
				$("#pp").append("<li class='index'><a href='#'>"+i+"</a></li>");
			}
		});
	});
};
//request contents for all articals
var request = function (rangeStart, rangeEnd) {
	$.ajax({
		type: "get",
		url: 'http://10.124.18.115:8080/apis/v1/article/?rangeStart='+rangeStart+'&rangeEnd='+rangeEnd+'&token=3eaf6c95602d3e662154667b0cfa7a7a2310b3b1',
		crossDomain: true,
		dataType: 'json',
		success: function(data){
			// console.log(data);
			var art = data.data.map((d) => {
				if(d.meta.show == true) {
					return `<li class="list" id="${d.id}"><img src="${d.briefImage}" alt="Image"/><div class="info"><a href=""><bold>${d.title}</bold></a>
					<ul><li>${d.meta.comment} Comments</li><li>${d.meta.view} views</li><li>${d.meta.like} likes<br><button class="edit">EDIT DETAIL</button><button class='delete'>DETELE</button><button class='publish published' data-show=${d.meta.show}>UNPUBLISH</button></div><li>`;
				}
				else {
					return `<li class="list" id="${d.id}"><img src="${d.briefImage}" alt="Image"/><div class="info"><a href=""><bold>${d.title}</bold></a>
					<ul><li>${d.meta.comment} Comments</li><li>${d.meta.view} views</li><li>${d.meta.like} likes<br><button class="edit">EDIT DETAIL</button><button class='delete'>DETELE</button><button class='publish unpublished' data-show=${d.meta.show}>PUBLISH</button></div><li>`;
				}
			}).join('');
			$("#listAll").html(art);
			// if(d.show == true) {

			// }
		},
		error: function (err) {
			console.log(222);
		},
	})
};
//request contents for all published articals
var requestPub = function (rangeStart, rangeEnd) {
	$.ajax({
		type: "get",
		url: 'http://10.124.18.115:8080/apis/v1/article/?rangeStart='+rangeStart+'&rangeEnd='+rangeEnd,
		crossDomain: true,
		dataType: 'json',
		success: function(data){
			// console.log(data);
			var art = data.data.map((d) => {
					return `<li class="list" id="${d.id}"><img src="${d.briefImage}" alt="Image"/><div class="info"><a href=""><bold>${d.title}</bold></a>
					<ul><li>${d.meta.comment} Comments</li><li>${d.meta.view} views</li><li>${d.meta.like} likes<br><button class="edit">EDIT DETAIL</button><button class='delete'>DETELE</button><button class='publish published' data-show=${d.meta.show}>UNPUBLISH</button></div><li>`;
			}).join('');
			$("#listAll").html(art);
		},
		error: function (err) {
			console.log(222);
		},
	})
};
//request contents for all unpublished articals
var requestUnpub = function (rangeStart, rangeEnd) {
	$.ajax({
		type: "get",
		url: 'http://10.124.18.115:8080/apis/v1/article/?rangeStart='+rangeStart+'&rangeEnd='+rangeEnd+'&token=3eaf6c95602d3e662154667b0cfa7a7a2310b3b1',
		crossDomain: true,
		dataType: 'json',
		success: function(data){
			// console.log(data);
			var art = data.data.map((d) => {
					if(d.meta.show == false) {
						return `<li class="list" id="${d.id}"><img src="${d.briefImage}" alt="Image"/><div class="info"><a href=""><bold>${d.title}</bold></a>
						<ul><li>${d.meta.comment} Comments</li><li>${d.meta.view} views</li><li>${d.meta.like} likes<br><button class="edit">EDIT DETAIL</button><button class='delete'>DETELE</button><button class='publish unpublished' data-show=${d.meta.show}>PUBLISH</button></div><li>`;
					}
			}).join('');
			$("#listAll").html(art);
		},
		error: function (err) {
			console.log(222);
		},
	})
};
$(document).ready(function(){
	page();
	request(0, 5);

	$("#pp").click(function(e) {
		var t = $(e.target).text();
		// console.log(t);
		var s = (t-1)*5;
		var e = t*5;
		// console.log(s);
		// console.log(e);
		request(s, e);
	});
	$("#listAll").on("click", ".edit", function(){
		// console.log($(this).parent().parent().parent().parent().attr("id"));
		var iden = $(this).parent().parent().parent().parent().attr("id");
		console.log('AddArtical.html?id='+iden);
		window.location.href='AddArtical.html?id='+iden;
	});

	$("#listAll").on("click", ".delete", function(){
		// $("#dialog-confirm").dialog({
		// 	resizable: true,
		// 	height: 140,
		// 	modal: true,
		// 	buttons: {
		// 		"Delete this artical": function() {
		// 			var iden = $(this).parent().parent().parent().parent().attr("id");
		// 			console.log(iden);
		// 			var target = $(this).parent().parent().parent().parent();
		// 			// target.remove();
		// 			$.ajax({
		// 				type: "delete",
		// 				url: "http://10.124.18.115:8080/api/v1/article/"+iden+"/?token=3eaf6c95602d3e662154667b0cfa7a7a2310b3b1",
		// 				crossDomain: true,
		// 				dataType: 'json',
		// 				success: function(){
		// 					console.log("Delete successfully");
		// 					target.remove();
		// 				},
		// 				error: function (){
		// 					console.log("Delete failed");
		// 				}
		// 			});
		// 			$(this).dialog("close");
		// 		},
		// 		Cancel: function(){
		// 			$(this).dialog("close");
		// 		}
		// 	}
		// });
		var result = confirm("Are you sure you want to delete this artical?");
		if(result){
			var iden = $(this).parent().parent().parent().parent().attr("id");
			console.log(iden);
			var target = $(this).parent().parent().parent().parent();
			// target.remove();
			$.ajax({
				type: "delete",
				url: "http://10.124.18.115:8080/api/v1/article/"+iden+"/?token=3eaf6c95602d3e662154667b0cfa7a7a2310b3b1",
				crossDomain: true,
				dataType: 'json',
				success: function(){
					console.log("Delete successfully");
					target.remove();
				},
				error: function (){
					console.log("Delete failed");
				}
			});
		};
	});

	$("#listAll").on("click", ".publish", function(){
		var iden = $(this).parent().parent().parent().parent().attr("id");
		var self = this;
		// var value = $($(this)[0]).data("show");
		var value = $(self).data("show");
		console.log(value);

		$.ajax({
	      type: "post",
	      url: "http://10.124.18.115:8080/api/v1/article/"+iden+"/",
	      data: "show=" + !value + "&token=3eaf6c95602d3e662154667b0cfa7a7a2310b3b1",
	      crossDomain: true,
	      dataType: 'json',
	      success: function(data){
	        // if(data.data.show == true) {
	        // 	alert("You have already published this artical");
	        // }
	        // else {

	        // }
	        // console.log(data);
	        $(self).data("show", !value);
	        if(value==true){
	        	$(self).html("PUBLISH");
	        }
	        else{
	        	$(self).html("UNPUBLISH");
	        }
	        console.log($(self).data("show"));
	      }
	    });
	    // console.log("After change the status is"+$($(this)[0]).data("show"));
	});

	$("#sideBar").on("click", "#allArtical", function(){
		$("#pp").empty();
		page();
		request(0, 5);
	});
	$("#sideBar").on("click", "#publishedArtical", function(){
		$("#pp").empty();
		pagePub();
		requestPub(0,5);
	});
	$("#sideBar").on("click", "#unpublishedArtical", function(){
		$("#pp").empty();
		pageUnpub();
		requestUnpub(0, 5);
	});
});