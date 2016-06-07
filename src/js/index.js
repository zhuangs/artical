$(document).ready(function(){
  var parameters = location.search.substring(1).split("&");
  var temp = parameters[0].split("=");
  l = unescape(temp[1]);
  // console.log(parameters);
  // console.log(temp);
  // console.log(l);
  if(l !== 'undefined') {
    $.ajax({
      type: "get",
      url: "http://10.124.18.115:8080/api/v1/article/"+l+"?token=3eaf6c95602d3e662154667b0cfa7a7a2310b3b1",
      crossDomain: true,
      dataType: 'json',
      success: function(data){
        // console.log(data.data.title);
        console.log(data);
        $("#title").val(data.data.title);
        $("#image").val(data.data.brief_image);
        $("#banner").val(data.data.banner);
        $("#content").val(data.data.content);
        $("#show").val(data.data.show);
      }
    });
    $('#data-back-btn').click(function(){
      window.location.href='index.html';
    });
    $('#data-upload-btn').click(function(e){
      console.log("12312123123: " + $('.myForm').serialize());
      
      $.ajax({
        url: "http://10.124.18.115:8080/api/v1/article/"+l+"/",
        data:$('.myForm').serialize(), 
        type:'post',
        dataType: "json",
        crossDomain: true,
        success:function(data){
          // console.log(data.errmsg);
          console.log($('.myForm').serialize());
          console.log(data);
          // alert(data.errcode + ': ' +data.errmsg);
          console.log("xxxxx");
          $(".error").remove();
          if(data.errcode == 400101) {
            $("<span class='error'>Token cannot be empty</span>").insertAfter("#tokenL");
          }
          else if(data.errcode == 400126) {
            $("<span class='error'>Article title required</span>").insertAfter("#titleL");
          }
          else if(data.errcode == 400127) {
            $("<span class='error'>Article brief_image required</span>").insertAfter("#imageL");
          }
          else if(data.errcode == 400128) {
            $("<span class='error'>Article banner required</span>").insertAfter("#bannerL");
          }
          else if(data.errcode == 400129) {
            $("<span class='error'>Article content required</span>").insertAfter("#contentL");
          }
          else {
            alert("You have successfully editted this artical!")
            window.location.href='index.html';
          }
        },
        error:function(){
          // console.log(errmsg);
        }
      });
      return false;
    });
  }

  else {
    $('#data-back-btn').click(function(){
      window.location.href='index.html';
    });
    $('#data-upload-btn').click(function(e){
      console.log("12312123123: " + $('.myForm').serialize());
      
      $.ajax({
        url:'http://10.124.18.115:8080/apis/v1/article/',
        data:$('.myForm').serialize(), 
        type:'post',
        dataType: "json",
        crossDomain: true,
        success:function(data){
          // console.log(errmsg);
          // alert(data.errcode + ': ' +data.errmsg);
          $(".error").remove();
          if(data.errcode == 400101) {
            $("<span class='error'>Token cannot be empty</span>").insertAfter("#tokenL");
          }
          if(data.errcode == 400126) {
            $("<span class='error'>Article title required</span>").insertAfter("#titleL");
          }
          if(data.errcode == 400127) {
            $("<span class='error'>Article brief_image required</span>").insertAfter("#imageL");
          }
          if(data.errcode == 400128) {
            $("<span class='error'>Article banner required</span>").insertAfter("#bannerL");
          }
          if(data.errcode == 400129) {
            $("<span class='error'>Article content required</span>").insertAfter("#contentL");
          }
          if(data.errcode == 0) {
            alert("You have successfully submmitted a new artical!")
            window.location.href='index.html';
          }
        },
        error:function(){
          // console.log(errmsg);
        }
      });
      return false;
    });
  }
});
