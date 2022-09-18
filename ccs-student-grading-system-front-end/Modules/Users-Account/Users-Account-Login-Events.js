function Login_User()
      {    //Show Login-Form   
	       if($("#LoginMenu").html().toUpperCase().indexOf("LOGOUT") <= -1 )
		      {  JS_File.Load('Modules/Home-Page/Home-Event.js').then( res => {Main_Home();}).catch(err =>{;});
			  }
			else{ 
				$.session.remove("JWToken");
			          $.session.remove("UserAccount");
					  $.session.remove("ActivePage");
			          $.session.remove("ActiveFunction");
					  $("#LoginMenu").html("<i class='fa fa-user-lock padding-4'></i>Login");
					  JS_File.Load('Modules/Home-Page/Home-Event.js').then( res => {Main_Home();}).catch(err =>{;});
			     if (confirm("Logout Current User.") == true) {
                      $.session.remove("JWToken");
			          $.session.remove("UserAccount");
					  $.session.remove("ActivePage");
			          $.session.remove("ActiveFunction");
					  $("#LoginMenu").html("<i class='fa fa-user-lock padding-4'></i>Login");
					  JS_File.Load('Modules/Home-Page/Home-Event.js').then( res => {Main_Home();}).catch(err =>{;});
                   } 
                 }
				 
//------------------------------------------------------------------------------------------------------------------------------------------------------
	
	//Request_Login Function    
	var Request_Login = function()
	{  var ObjData= { "Username" : $("#LoginForm_TxtUsername").val(),
		              "Password" : $("#LoginForm_TxtPassword").val()
					};
						 
	      var RequestProcess = "LOGIN";	
		      $.ajaxSetup({ cache: false });
			  
			async function Login_User(){
			    await $.ajax({ url : Configuration.URL.Server + Configuration.URL.UserAccount + RequestProcess,
                       type: "POST",
			           cache: false,
                       data: JSON.stringify(ObjData),
                       headers: {  "Authorization": "Bearer " + $.session.get("JWToken"),
                                   "Identity"     :  Configuration.API.Identity,
								   "API-Key"      :  Configuration.API.Key,
			                       "Content-Type" : "application/json" },
                       success: function(output, status, xhr) { 
                                   try { //alert(output.trim());
								       var ResultObj= JSON.parse($.trim(output));
									     if($.trim(output).toUpperCase().indexOf("ERROR:") <= -1)
										    {  JS_File.Load('Modules/Home-Page/Home-Event.js').then( res => {Main_Home();}).catch(err =>{;});
											   console.log("Heloo")
										       $.session.set("JWToken", $.trim(xhr.getResponseHeader("Authorization").split("Bearer")[1]));  
											   $.session.set("UserAccount", atob(JSON.parse(atob($.session.get("JWToken").split(".")[1])).RECORD)); 
												 var ObjUserAccount=  JSON.parse($.trim($.session.get("UserAccount")));   
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
 function Registration(){
    location.href = 'User-Registration-Form.html';
} 