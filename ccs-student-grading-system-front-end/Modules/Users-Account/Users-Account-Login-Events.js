//=====================================================================================================================================================	   
//=====================================================================================================================================================	   

function Login_User()
{    //Show Login-Form   
	 
		   
//------------------------------------------------------------------------------------------------------------------------------------------------------

//Request_Login Function    
var Request_Login = function()
{  var ObjData= { "Username" : $("#LoginForm_TxtUsername").val(),
				"Password" : $("#LoginForm_TxtPassword").val()
			  };
				   
	var RequestProcess = "LOGIN";	
		$.ajaxSetup({ cache: false });
		
	  async function Login_User(){
		  await $.ajax({ url : Config.URL.Server + Config.URL.UserAccount + RequestProcess,
				 type: "POST",
				 cache: false,
				 data: JSON.stringify(ObjData),
				 headers: {  "Authorization": "Bearer " + $.session.get("JWToken"),
							 "Identity"     :  Config.API.Identity,
							 "API-Key"      :  Config.API.Key,
							 "Content-Type" : "application/json" },
				 success: function(output, status, xhr) { 
							 try { //alert(output.trim());
								 var ResultObj= JSON.parse($.trim(output));
								   if($.trim(output).toUpperCase().indexOf("ERROR:") <= -1)
									  {  window.location ="index.html"
										 
										 $.session.set("JWToken", $.trim(xhr.getResponseHeader("Authorization").split("Bearer")[1]));  
										 $.session.set("UserAccount", atob(JSON.parse(atob($.session.get("JWToken").split(".")[1])).RECORD)); 
										  }
								   else{alert(ResultObj.Status);}
							   
								} catch(e){ alert($.trim(output)); return false;  }
							},
				 error: function(output) { alert("Error in API call"); }
			 });
		  } Login_User(); //Execute Asycronous Function   
			 
}

//------------------------------------------------------------------------------------------------------------------------------------------------------

//LoginForm LOGIN Button Click    
$("#LoginForm_BntLOGIN").bind("click", function (evt) {Request_Login(); });

//------------------------------------------------------------------------------------------------------------------------------------------------------

//LoginForm CANCEL Button Click    	 
$("#LoginForm_BntCANCEL").bind("click", function (evt)
 {   $("#Body-PopUpWall").stop().fadeOut();
	   $("#Body-Modal-Form").stop().fadeOut();
 });   

//------------------------------------------------------------------------------------------------------------------------------------------------------

//LoginForm CANCEL Button Click  
$("#LoginForm_TxtPassword").keypress(function(event){
var keycode = (event.keyCode ? event.keyCode : event.which);
 if(keycode == "13"){Request_Login();}
});

//------------------------------------------------------------------------------------------------------------------------------------------------------	   

}   

// Login_User Function End

//=====================================================================================================================================================	   
//=====================================================================================================================================================	   
//=====================================================================================================================================================	   
