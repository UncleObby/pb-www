/*
FoldingArticles.js
Copyright(c) 2015 O J Low
Version: 1.0 29/04/2015
Makes all <ARTICLE>s foldable
*/
function foldArticle(elt){ //toggles the expansion of the parent article of the calling element (e.g. <span class='more'>) 

	//identify the parent element, which should be the article
	var eltArticle=elt.parentElement;
	if (eltArticle.nodeName != 'ARTICLE') return; //forget it if the caller is not a child of an ARTICLE
	var aC=eltArticle.children; 
	var aSections = [], aMore = [], aLess = []; // used to collect the article elements we want to change display
	var i; //re-use the same i
	
	//collect the element's we're looking for
	for (i=0; i<aC.length; i++) { 
		if (aC[i].nodeName == 'SECTION') aSections.push(aC[i]);
		if (aC[i].className == 'more') aMore.push(aC[i]);
		if (aC[i].className == 'less') aLess.push(aC[i]);
	}
	// as long as there are at least TWO sections, continue
	if (aSections.length >=2) {
		//if the second section is display:none, then show the sections and the 'less' and hide the 'more', else vice versa
		if (window.getComputedStyle(aSections[1]).getPropertyValue('display') == 'none') {
			for (i = 1 ; i < aSections.length; i++) aSections[i].style.display = 'block';
			for (i = 0; i < aMore.length; i++) aMore[i].style.display = 'none';
			for (i = 0; i < aLess.length; i++) aLess[i].style.display = 'inline';
		} else {
			for (i = 1 ; i < aSections.length; i++) aSections[i].style.display = 'none';
			for (i = 0; i < aMore.length; i++) aMore[i].style.display = 'inline';
			for (i = 0; i < aLess.length; i++) aLess[i].style.display = 'none';
		}				
	} //not 2 SECTIONs
}
function fold(elt) {foldArticle(elt)} 
function makeFoldingArticles(){ //modifies the DOM to make all ARTICLEs with >1 SECTION foldable
	var aA = document.getElementsByTagName('ARTICLE'); //all ARTICLEs
	var aS = []; ///sections for each article
	var i,j; //re-used
	//for each, get all sections and if more than one, add a 'more' span, click handlers to foldArticle
	for (i=0; i<aA.length; i++) {
		aS = aA[i].getElementsByTagName('SECTION');
		//if more than one section
		if (aS.length>1) {
			//make the first section clickable
			aS[0].addEventListener("click", function (){fold(this)});
			//add a 'more' after the first section
			var newMore = document.createElement("span");
			newMore.className='more';
			newMore.addEventListener("click", function (){fold(this)});
			aA[i].insertBefore(newMore, aS[0].nextSibling);
			//set the display style of subsequent sections to none
			for (j=1; j<aS.length; j++) aS[j].style.display='none';
			//add a 'less' at the end of the article
			var newLess = document.createElement("span");
			newLess.className='less';
			newLess.addEventListener("click", function (){fold(this)});
			aA[i].appendChild(newLess);
		}
	}
}
//run makeFoldingArticles on load
window.addEventListener('load', makeFoldingArticles);
