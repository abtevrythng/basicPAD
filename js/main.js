var element = document.querySelector("trix-editor");
var whichSave = "";
if (
	document.fullscreenEnabled || 
	document.webkitFullscreenEnabled || 
	document.mozFullScreenEnabled ||
	document.msFullscreenEnabled
) {
	$('#modalFullScreen').openModal();
}

if (localStorage.getItem("cleanState") === null || localStorage.getItem("editorState") === null) {
	localStorage["cleanState"] = JSON.stringify(element.editor);
	document.querySelectorAll(".trix-content").focus();
}


$(function() {
  $('.modal-trigger').leanModal();
  $('select').material_select();
  element.editor.loadJSON(JSON.parse(localStorage["editorState"]));
  setContentSize();
});

function setContentSize(){
	var clientHeight = document.getElementById('trix-toolbar-1').clientHeight;
	$( ".trix-content" ).css( "padding-top", clientHeight );
}

function saveAsMARKDOWNDummy(){
  $('#modalSaveMARKDOWN').openModal();
  document.getElementById('filename-html').value = "";
  whichSave = "MARKDOWN";
}

function saveAsMARKDOWN(){
  var fileNameToSaveAs;
  var textToWrite = toMarkdown(document.getElementById("trix-input-1").value, { gfm: true });
  textToWrite = textToWrite.replace(/<\/?(b|div)>/g,"");
  
  if (document.getElementById('filename-markdown').value !== ""){
    fileNameToSaveAs = document.getElementById('filename-markdown').value + ".md" ;
  }
  else
  fileNameToSaveAs = "baciPADFile.md";
  
  var mdFileAsBlob = new Blob([textToWrite], {type:'text/plain;charset=utf-8'});
  saveAs(mdFileAsBlob, fileNameToSaveAs);
}

function saveAsHTMLDummy(){
  $('#modalSaveHTML').openModal();
  document.getElementById('filename-html').value = "";
  whichSave = "HTML";
}

function saveAsHTML(){
  
  var themeElement = document.getElementById("theme");
  var selectedTheme = themeElement.options[themeElement.selectedIndex].value;
  
  var preHTML1 = "<!DOCTYPE html><html><title><a href=\"http://abtevrythng.github.io/basicPAD/\">Generated by BasicPad!</a></title><xmp theme=\"";
  var preHTML2 = "\" style=\"display:none;\">";
  var postHTML = "</xmp><script src=\"http://strapdownjs.com/v/0.2/strapdown.js\"></script></html>";
  var fileNameToSaveAs;
  var markdownMidFile = toMarkdown(document.getElementById("trix-input-1").value, { gfm: true });
  markdownMidFile = markdownMidFile.replace(/<\/?(b|div)>/g,"");
  
  var textToWrite = preHTML1.concat(selectedTheme).concat(preHTML2).concat(document.getElementById("trix-input-1").value).concat(postHTML);
  
  if (document.getElementById('filename-html').value !== ""){
    fileNameToSaveAs = document.getElementById('filename-html').value + ".html" ;
  }
  else
  fileNameToSaveAs = "baciPADFile.html";
  
  var htmlFileAsBlob = new Blob([textToWrite], {type:'text/plain;charset=utf-8'});
  saveAs(htmlFileAsBlob, fileNameToSaveAs);
}

function saveAsTEXTDummy(){
  $('#modalSaveTEXT').openModal();
  document.getElementById('filename-text').value = "";
  whichSave = "TEXT";
}

function saveAsTEXT(){
  //alert("Save as TEXT");
  var myTEXTdocument = element.editor.getDocument()
  var textToWrite = myTEXTdocument.toString()
  
  if (document.getElementById('filename-text').value !== ""){
    fileNameToSaveAs = document.getElementById('filename-text').value + ".txt" ;
  }
  else
  fileNameToSaveAs = "baciPADFile.txt";
  
  var htmlFileAsBlob = new Blob([textToWrite], {type:'text/plain;charset=utf-8'});
  saveAs(htmlFileAsBlob, fileNameToSaveAs);
}

function clearAll(){
  //alert("Not Implemented!");
  if (localStorage.getItem("cleanState") !== null) {
	element.editor.loadJSON(JSON.parse(localStorage["cleanState"]));
	}
	else alert("Not your mistake, something isin't right with me!");
}

function insertHorizontalLine(){
  alert(element.editor.getSelectedRange());
  element.editor.insertString("<strong>Hello</strong>");
}

function cancelCommand(){
  if (whichSave == "HTML")
    $('#modalSaveHTML').closeModal();
  else if (whichSave == "MARKDOWN")
    $('#modalSaveMARKDOWN').closeModal();
  else if (whichSave == "TEXT")
    $('#modalSaveTEXT').closeModal();
  
  whichSave = "";
}

function goFullScreen() {

    var isInFullScreen = (document.fullScreenElement && document.fullScreenElement !==     null) ||    // alternative standard method  
            (document.mozFullScreen || document.webkitIsFullScreen);

    var docElm = document.documentElement;
    if (!isInFullScreen) {

        if (docElm.requestFullscreen) {
            docElm.requestFullscreen();
        }
        else if (docElm.mozRequestFullScreen) {
            docElm.mozRequestFullScreen();
            //alert("Mozilla entering fullscreen!");
        }
        else if (docElm.webkitRequestFullScreen) {
            docElm.webkitRequestFullScreen();
            //alert("Webkit entering fullscreen!");
        }
    }
}

window.addEventListener("resize", function() {
	// Get screen size (inner/outerWidth, inner/outerHeight)
	  setContentSize();
	
}, false);

window.onbeforeunload = function (e) {
    e = e || window.event;

    // For IE and Firefox prior to version 4
    if (e) {
        //e.returnValue = 'Sure?';
        localStorage["editorState"] = JSON.stringify(element.editor);
    }
	else
		Materialize.toast('All set, Begin Writing!', 1000);
};
