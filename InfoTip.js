/*
infotip.js
Copyright (C) 2015 O J Low
Version: 1.0 2015-05-19
Generates info tips from span elements
Locates all <SPAN class='infotip'> elements and swaps the text for a (i) symbol, moving the text to an adjacent floating DIV to show/hide on click/mouseover
*/

//global variable to store timers
var infoTipData = {};
function makeInfoTips(){
	//collect all elements with class 'tipInfo'
	var aT = document.getElementsByClassName('tipInfo');
	var i,j; //re-use loop counter
	var tipX, tipY; //position of tip
	var tipHtml; //the innerHTML of the tip to use
	//for each, make the infotip
	for (i=0; i<aT.length; i++) {
		//extract the content of the infotip
		tipHTML = aT[i].innerHTML;
		//hide the infotip source element, but leave it in the DOM
		aT[i].style.display='none';

		//create a span to click on for the tip to appear - leave the content and styling to the CSS
		var s = document.createElement('span');
		s.className='tipIcon';
		s.addEventListener('click', function(){toggleTip(this)});
		s.addEventListener('mouseenter', function(){showTip(this)});
		s.addEventListener('mouseleave', function(){hideTip(this)});
		aT[i].parentElement.insertBefore(s, aT[i]);

		//get the position of the tip marker
		tipX = pageOffset(s).left + s.offsetWidth;
		tipY = pageOffset(s).top;

		
		//create the new DIV
		var d = document.createElement('div');
		d.style.display='none'; //hidden until shown
		d.style.position='absolute';
		d.style.left = tipX + 20;
		d.style.top = tipY;
		d.innerHTML=aT[i].innerHTML;
		d.className = 'tipBox';
		//insert it immediately before the infotip source element
		aT[i].parentElement.insertBefore(d, aT[i]);		
    }
}
function showTip(e){//shows the tip next to this element
	e.nextSibling.style.display='block';
}
function hideTip(e){ //hides the tip next to this element
	e.nextSibling.style.display='none';
}
function toggleTip(e){ //toggles the tip next to this element
	e.nextSibling.style.display=(e.nextSibling.style.display=='none'?'block':'none');
}
var pageOffset = function(e) {
    var top = 0, left = 0;
    do {
        top += e.offsetTop  || 0;
        left += e.offsetLeft || 0;
        e = e.offsetParent;
    } while(e);
    return {top: top, left: left}
}		
	



//initialise on page load
window.addEventListener('load',makeInfoTips);