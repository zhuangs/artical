$("#page1").click(function(){
	request(0, 3);
});
$("#page2").click(function(){
	request(3, 4);
});
$("#page3").click(function(){
	request(4, 8);
});
var request = function (rangeStart, rangeEnd) {
		$.ajax({
		type: "get",
		// url: "/?rangeStart" + rangeStart + "&rangeEnd=" + rangeEnd,
		// dataType: "json",
		crossDomain: true, 
		// data: data,
		success: function(data, err) {
			console.log(111);
			var ed = {
			            "id": 11,
			            "fid": "0000000011",
			            "title": "5.21，爱你我愿意",
			            "briefImage": "http://ww2.sinaimg.cn/mw690/0061L9l4jw1f443vyo6pdj30oo0dwgo1.jpg",
			            "meta": {
			                "comment": 0,
			                "view": 5,
			                "created_at": 1463903351000,
			                "like": 0
			            },
			        };
			var dd = [];
			for (let i=rangeStart; i<rangeEnd; ++i)
				dd.push(ed);

			data = {
				"meta": {
			        "lastUpdated": 1464594908083,
			        "count": rangeEnd - rangeStart,
			        "error": {
			            "errmsg": "success",
			            "errcode": 0
			        }
			    },
			    "data": dd
			};
			console.log(data);
			var art = data.data.map((d) => {
				return `<li class="list"><img src="${d.briefImage}" alt="Image"/><div class="info"><a href=""><bold>${d.title}</bold></a>
				<ul><li>${d.meta.comment} Comments</li><li>${d.meta.view} views</li><li>${d.meta.like} likes<br><button>EDIT DETAIL</button><button>DETELE</button><button>PUBLISH</button></div><li>`;
			}).join('');
			$("#listAll").html(art);
		},
		error: function (err) {
			console.log(222);
		},
	})
};
$(document).ready(function(){
	// init 
	request(0, 5);

});
