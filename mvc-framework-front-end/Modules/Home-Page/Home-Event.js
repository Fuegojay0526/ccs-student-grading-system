
function Main_Home()
  {   $("#Body-Container").attr("include-html", "Modules/Home-Page/Home-Page.html");
      HTML_File_Loader.Initiate();
	  
	   $.session.set("ActivePage", "Modules/Home-Page/Home-Event.js");  
	   $.session.set("ActiveFunction", "Main_Home");
  }