// ==UserScript==
// @name          yjs xuanke
// @namespace     http://wdjwxh.byr.cn/
// @description   jiayou
// @include       http://yjxt.bupt.edu.cn/Gstudent/Course/PlanCourseOnlineSel.aspx*
// @exclude
// @exclude
// @website tampermonkey
// @require http://code.jquery.com/jquery-1.8.2.min.js
// ==/UserScript==

function wait_done(){
	if($("iframe[name=selClass]").length > 0){
		window.setTimeout(wait_done,50);
	}else{
		location.reload();
	}
}

function wait_iframe(){
	var ifr = document.getElementsByName( 'selClass' );
	console.log(ifr);
	if(ifr.length == 0)
		window.setTimeout(wait_iframe, 1000);
	else{
		var ifrDoc = (ifr[0].contentDocument) ? ifr[0].contentDocument : ifr[0].contentWindow.document;
		//var inputs = ifrDoc.getElementsByTagName( 'input' );

		console.log(ifrDoc);

		if($("iframe[name=selClass]").contents().find('input[type=image]').first().length == 0){
			window.setTimeout(wait_iframe,50);
		}else{
			$("iframe[name=selClass]").contents().find('input[type=image]').first().trigger('click');
			wait_done();
		}
	}

}
var sss = ['嵌入式系统','企业信息化工程实训'];
var flag = false;
console.log('['+new Date().toLocaleString()+']');
for(var s in sss){
	var last = $('.Grid_Line>tbody>tr').find(":contains('"+sss[s]+"')").last();
	if (last.length != 0){
		console.log('找到 '+sss[s]+',检查是否可选中...');
		var button1 = $(last).parent().nextAll().find(":contains('选择上课班级')");
		//  var button2 = $(last).parent().nextAll().find(":contains('选择上课班级')")
		if(button1.length != 0){
			console.log('恭喜！正在点击中....');
			button1.trigger('click');
			wait_iframe();
			flag = true;
			break;
		}
	}
}

if(!flag){
	console.log('[两分钟后自动刷新]');
	window.setTimeout('location.reload();', 5000);
}
