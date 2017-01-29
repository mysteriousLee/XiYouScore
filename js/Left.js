// window.onload = function(){
// 	GetInfor();
// }
//滑动侧栏效果
 function showleft () {
    	var left = document.getElementById('ShowLeft');
    	$("#ShowLeft").animate({left:'0%'},1000);
    }
function hideleft () {
		var left = document.getElementById('ShowLeft');
		$("#ShowLeft").animate({left:'-55%'},1000);
}
function LeftTouch(){
	  var startx,starty;
	  var endx,endy;
	  var el=document.getElementsByTagName('html')[0];
	  function cons(){  
	         //console.log(starty);
	         //console.log(endy);
	         if((startx != endx) || (starty != endy)){
	            if((startx > endx) && (Math.abs(starty-endy) < 100)){  //判断左右移动程序
	                //alert('left');
	                hideleft();
	              }
	              else if((startx < endx) && (Math.abs(starty-endy) < 100)){
	                  //alert('right');
	                  showleft();
	             }
	          }
	        
	    }
	  el.addEventListener('touchstart',function(e){
	           var touch=e.changedTouches;
	           startx=touch[0].clientX;
	           starty=touch[0].clientY;
	  });
	  el.addEventListener('touchend',function(e){
	           var touch=e.changedTouches;
	           endx=touch[0].clientX;
	           endy=touch[0].clientY;
	           cons(); 
      });
  }
  LeftTouch();
  //判断是否有侧栏
  function judgeleftshow () {
  	var left = document.getElementById('ShowLeft');
  	if(left.style.left > "-55%")
  		hideleft();
  	else
  		showleft();
  }
//获取用户信息
function GetLeftInfor () {
	//console.log(1111);
	var user = $.cookie('username');
	var password = $.cookie('password');
	var session = $.cookie('ASP.NET_SessionId');
	$.ajax({
		    type : 'GET',
	        dataType : 'jsonp',
	        data : {
	        	 username : user,
	        	 password : password,
	             session : session
	        },
	        success : function(person){
	        	SetLeftInfo(person);
	        	GetImg();
	        },
	        url : "http://scoreapi.xiyoumobile.com/users/info"
	});
}
function SetLeftInfo (person) {
	var leftname = document.getElementById('leftname');
	leftname.innerHTML = person.result.name;
}
//获取图片url
function GetImg () {
	var user = $.cookie('username');
	var session = $.cookie('ASP.NET_SessionId');
    var urlString = 'http://scoreapi.xiyoumobile.com/users/img?username=' + user + '&session=' + session;
	var photo = document.getElementById('userphoto');
	photo.src = urlString;
}
function ScoreFind () {
	window.location.href = "ScoreShow.html";
}
function InfoFind () {
	window.location.href = "Info.html";
}
function LibraryFind () {
	window.location.href = "http://jiayudong.cn/Library/";
}
function ReturnBack () {
	window.location.href = "index.html";
}
function MakeUpFind () {
	window.location.href = "MakeUp.html";
}