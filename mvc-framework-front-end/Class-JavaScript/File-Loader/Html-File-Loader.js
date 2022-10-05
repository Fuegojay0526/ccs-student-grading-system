
class HTML_File_Loader{
	
   // Load File through attribute's element
   
  static Initiate(){
   var DocTagName, Cnt, Elment, Html_File, xHttp;
  /*loop through a collection of all HTML elements:*/
    DocTagName = document.getElementsByTagName("*");
  for (Cnt = 0; Cnt < DocTagName.length; Cnt++) {
    Elment = DocTagName[Cnt];
    /*search for elements with a certain atrribute:*/
    Html_File = Elment.getAttribute("include-html");
    if (Html_File) {
      /*make an HTTP request using the attribute value as the file name:*/
      xHttp = new XMLHttpRequest();
      xHttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {Elment.innerHTML = this.responseText;}
          if (this.status == 404) {Elment.innerHTML = "Page not found.";}
          /*remove the attribute, and call this function once more:*/
          Elment.removeAttribute("include-html");
          HTML_File_Loader.Initiate();
        }
      }      
      xHttp.open("GET", Html_File, false);
      xHttp.send();
     return;
    }
  }  
  };
  
}
 