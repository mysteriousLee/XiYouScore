window.onload = function(){
	GetMakeUpInfo();
	GetLeftInfor();
}
function GetMakeUpInfo () {
	var user = $.cookie('username');
	var session = $.cookie('ASP.NET_SessionId');
	console.log(session);
	//console.log(user);
	//console.log(session);
	$.ajax({
		    type : 'GET',
	        dataType : 'jsonp',
	        data : {
	        	 username : user,
	             session : session
	        },
	        success : function(info){
	        	console.log(info);
	        	JudgeInfo(info);
	        },
	        url : "http://scoreapi.xiyoumobile.com/makeup"
	});

}
function JudgeInfo (info) {
	if(info.result.length == 0)
		alert('未检测到您的补考信息!');
	else
		SetMakeUpInfo(info);
}
function SetMakeUpInfo (info) {
	console.log(info);
	var makeupbody = document.getElementsByClassName('makeupbody')[0];
	makeupbody.style.height = 16 + 22 * info.result.length + 'rem';
	for(var i = 0;i < info.result.length; i++){
		var newdiv = document.createElement('div');
		newdiv.className = "makeup";
		newdiv.style.top = 17 + i * 22 + 'rem';
        var classname = info.result[i].className;
        var room = info.result[i].room;
        var seat = info.result[i].seat;
        var time = info.result[i].time;
        var newclass = document.createElement('div');
        var newroom = document.createElement('div');
        var newseat = document.createElement('div');
        var newtime = document.createElement('div');
        newclass.innerHTML = "课程：" + classname;
        newclass.className = "className";
        newdiv.appendChild(newclass);
        newroom.innerHTML = "教室：" + room;
        newroom.className = "room";
        newdiv.appendChild(newroom);
        newseat.innerHTML = "座位：" + seat;
        newseat.className = "seat";
        newdiv.appendChild(newseat);
        newtime.innerHTML = "时间：" + time;
        newtime.className = "time";
        newdiv.appendChild(newtime);
        makeupbody.appendChild(newdiv);
	}
}


