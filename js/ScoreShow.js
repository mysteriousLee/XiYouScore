window.onload = function(){
	GetUserInfor();
	GetLeftInfor();
	GetTime();
}
var termlong = 0;
//获取浏览器cookie
function getCookie(name)
{
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))
	   return unescape(arr[2]);
	else
	   return null;
}
//获取时间
function GetTime () {
	var time = new Date();
	time = time.getHours();
	return time;
}
//获取用户信息
function GetUserInfor () {
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
	        	//console.log(person);
	        	GetPersonInfo(person);
	        	SetLeftInfo(person);
	        },
	        url : "http://scoreapi.xiyoumobile.com/users/info"
	});
	$.ajax({
		    type : 'GET',
	        dataType : 'jsonp',
	        data : {
	        	 username : user,
	        	 password : password,
	             session : session
	        },
	        success : function(score){
	        	console.log(score);
	        	GetScore(score);
	        },
	        url : "http://scoreapi.xiyoumobile.com/score/year"
	});
}
//初始化成绩操作
function GetScore (Score) {
	//console.log(Score);
	SetSelectYear(Score);
	SetScoreBlank(Score,Score.result.score.length-1);
	SetTermOneScore(Score,Score.result.score.length-1);
	SetTermTwoScore(Score,Score.result.score.length-1);
}
//为每一学期设置成绩
function SetTermTwoScore (Score,i) {
	var paperscore;
	var Termtwo = document.getElementById('ShowTermtwo');
	if(Score.result.score[i].Terms.length > 1){
		for(var k = 0;k < Score.result.score[i].Terms[1].Scores.length; k++){
         var  subject = Score.result.score[i].Terms[1].Scores[k];
         if(subject.TestScore.length == 0){
         	paperscore = "/";
         }
         else{
         	paperscore = subject.TestScore[0];
         }
         var score = document.createElement('div');
         score.style.top = (4.5 + k * 12) + "rem";
         score.className = "score";
         score.id = i + "-" + 1 + "-" + k;
         score.onclick = function(){
         	ShowFloat ();
         	floatscore(Score,this.id);
         }
         var Title = document.createElement('div');
         Title.className = "scoreTitle";
         Title.innerHTML = subject.Title;
         score.appendChild(Title);
         var midterm = document.createElement('div');
         midterm.className = "midterm";
         midterm.innerHTML = "期中:"+ subject.RealScore;
         score.appendChild(midterm);
         var paper = document.createElement('div');
         paper.className = "paper";
         paper.innerHTML = "卷面:" + paperscore;
         score.appendChild(paper);
         var usual = document.createElement('div');
         usual.className = "usual";
         usual.innerHTML = "平时:" + subject.UsualScore;
         score.appendChild(usual);
         var finals = document.createElement('div');
         finals.className = "finals";
         finals.innerHTML = "总评:" + subject.EndScore;
         score.appendChild(finals);
         Termtwo.appendChild(score);
	  }
	}
}
function SetTermOneScore (Score,i) {
	var paperscore;
	var Termone = document.getElementById('ShowTermone');
	if(Score.result.score[i].Terms.length > 0){
		for(var k = 0;k < Score.result.score[i].Terms[0].Scores.length; k++){
	         var  subject = Score.result.score[i].Terms[0].Scores[k];
	         if(subject.TestScore.length == 0){
	         	paperscore = "/";
	         }
	         else{
	         	paperscore = subject.TestScore[0];
	         }
	         var score = document.createElement('div');
	         score.style.top = (4.5 + k * 12) + "rem";
	         score.className = "score";
	         score.id = i + "-" + 0 + "-" + k;
	         score.onclick = function(){
	         	ShowFloat ();
	         	floatscore(Score,this.id);
	         }
	         var Title = document.createElement('div');
	         Title.className = "scoreTitle";
	         Title.innerHTML = subject.Title;
	         score.appendChild(Title);
	         var midterm = document.createElement('div');
	         midterm.className = "midterm";
	         midterm.innerHTML = "期中:"+ subject.RealScore;
	         score.appendChild(midterm);
	         var paper = document.createElement('div');
	         paper.className = "paper";
	         paper.innerHTML = "卷面:" + paperscore;
	         score.appendChild(paper);
	         var usual = document.createElement('div');
	         usual.className = "usual";
	         usual.innerHTML = "平时:" + subject.UsualScore;
	         score.appendChild(usual);
	         var finals = document.createElement('div');
	         finals.className = "finals";
	         finals.innerHTML = "总评:" + subject.EndScore;
	         score.appendChild(finals);
	         Termone.appendChild(score);
		}}
}
//设置用户姓名
function GetPersonInfo (person) {
	var hour = GetTime();
    var name = person.result.name;
    var pname = document.getElementById('username');
    if(hour >= 5 && hour <= 11)
       pname.innerHTML = "早上好！" + name + "同学";
    if(hour >= 12 && hour <= 18)
       pname.innerHTML = "下午好！" + name + "同学";
    if((hour >= 19 && hour <= 23) || (hour >= 0 && hour <= 4))
       pname.innerHTML = "晚上好！" + name + "同学";
}
//设置下拉框
function SetSelectYear (Score) {
	var select = document.getElementById('selectyear');
	termlong = Score.result.score.length;
	for(var i = Score.result.score.length-1;i >= 0; i--)
	{
		var newoption = document.createElement('option');
		newoption.className = "option";
        newoption.innerHTML = "学年 | " + Score.result.score[i].year + " 年度";
        newoption.id = "select-" + i;
        select.appendChild(newoption);
	}
	select.onchange = function(){
	   ClearBlank();
       SetScoreBlank(Score,termlong - select.selectedIndex - 1);
       SetTermOneScore(Score,termlong - select.selectedIndex - 1);
       SetTermTwoScore(Score,termlong - select.selectedIndex - 1);
	}
}
//设置成绩框高度（两学期大值）
function SetScoreBlank (Score,i) {
	//console.log(i);
	var ShowBlank = document.getElementById('Show');
	var timelong = 0;
	for(var j = 0;j < Score.result.score[i].Terms.length; j++)
	{
		if(timelong <= Score.result.score[i].Terms[j].Scores.length)
		   timelong = Score.result.score[i].Terms[j].Scores.length;
	}
	ShowBlank.style.height = timelong * 12.2 + 4.5 + 'rem';
	//console.log(ShowBlank.style.height);
	SetTermBlank(ShowBlank.style.height);
}
//为每一学期框设置高度
function SetTermBlank (height) {
	var Termone = document.getElementById('ShowTermone');
	var Termtwo = document.getElementById('ShowTermtwo');
	Termone.style.height = height;
	Termtwo.style.height = height;
}
//清空所有成绩
function ClearBlank () {
	var ShowTermone = document.getElementById('ShowTermone');
	var score = ShowTermone.getElementsByClassName('score');
	var length = score.length;
	for(var i = 0;i < length; i++){
		ShowTermone.removeChild(score[0]);
	}
	var ShowTermtwo = document.getElementById('ShowTermtwo');
	score = ShowTermtwo.getElementsByClassName('score');
	length = score.length;
	for(var i = 0;i < length; i++){
		ShowTermtwo.removeChild(score[0]);
	}
}
//显示浮动框
function ShowFloat () {
	var floatdiv = document.getElementById('floatdiv');
	var scorediv = document.getElementById('Show');
	scorediv.style.display = "none";
	floatdiv.style.display = "block";
}
//关闭浮动
function CloseFloat () {
	var floatdiv = document.getElementById('floatdiv');
	var scorediv = document.getElementById('Show');
	scorediv.style.display = "block";
	floatdiv.style.display = "none";
}
//浮动框显示成绩
function floatscore (Score,id) {
	var time = id.split('-');
    var subject = Score.result.score[time[0]].Terms[time[1]].Scores[time[2]];
    var floatname = document.getElementById('floatname');
    var floatCode = document.getElementById('floatCode');
    var floatSchool = document.getElementById('floatSchool');
    var floatType = document.getElementById('floatType');
    var floatCredit = document.getElementById('floatCredit');
    var floatUsualScore = document.getElementById('floatUsualScore');
    var floatpaperscore = document.getElementById('floatpaperscore');
    var floatEndScore = document.getElementById('floatEndScore');
    var floatExam = document.getElementById('floatExam');
    floatname.innerHTML = subject.Title;
    floatCode.innerHTML = "课程代码：" + subject.Code;
    floatSchool.innerHTML = "开课学院：" + subject.School;
    floatType.innerHTML = "课程性质：" + subject.Type;
    floatCredit.innerHTML = "绩点：" + subject.Credit;
    floatUsualScore.innerHTML = "平时成绩：" + subject.UsualScore;
	if(subject.TestScore.length == 0){
	       floatpaperscore.innerHTML = "卷面成绩：" + "/";
	}
	else{
	       floatpaperscore.innerHTML = "卷面成绩：" + subject.TestScore[0];
	}
	floatEndScore.innerHTML = "最终成绩: " + subject.EndScore;
	floatExam.innerHTML = "状态状态：" + subject.Exam;
}

 


 