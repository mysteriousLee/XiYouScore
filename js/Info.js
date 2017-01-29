window.onload = function(){
	GetPersonInfo();
}
  //获取浏览器cookie
function getCookie(name)
{
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))
	   return unescape(arr[2]);
	else
	   return null;
}
//获取个人信息
function GetPersonInfo () {
	var user = getCookie('username');
	var password = getCookie('password');
	var session = getCookie('ASP.NET_SessionId');
	$.ajax({
			    type : 'GET',
		        dataType : 'jsonp',
		        data : {
		        	 username : user,
		        	 password : password,
		             session : session
		        },
		        success : function(person){
		            console.log(person);
		        	SetPersonInfo(person);
		        	var imgUrl = 'http://scoreapi.xiyoumobile.com/users/img?username=' + user + '&session=' + session;
		        	$("#basicphoto").attr('src',imgUrl);
		        	$("#userphoto").attr('src',imgUrl);
		        },
		        url : "http://scoreapi.xiyoumobile.com/users/info"
		});
}
//设置个人信息
function SetPersonInfo (person) {
	var leftname = document.getElementById('leftname');
	var name = document.getElementById('basicname');
	var username = document.getElementById('basicusername');
	var sex = document.getElementById('basicsex');
	var birthday = document.getElementById('basicbirthday');
	var college = document.getElementById('basiccollege');
	var classname = document.getElementById('basicclass');
	var bir = GetBirthday(person.result.brithday);
	leftname.innerHTML = person.result.name;
	name.innerHTML = person.result.name;
	username.innerHTML = "学号：" + person.result.username;
	sex.innerHTML = "性别：" + person.result.sex;
	birthday.innerHTML = "生日：" + bir;
	college.innerHTML = "学院：" + person.result.college;
	classname.innerHTML = "班级：" + person.result.class + "班";
}
//设置生日字符串
function GetBirthday (birthday) {
	var year = birthday.substr(0,4);
	var month = birthday.substr(4,2);
	var day = birthday.substr(6,2);
	var birth = year + "年" + month + "月" + day + "日";
	return birth;
}
