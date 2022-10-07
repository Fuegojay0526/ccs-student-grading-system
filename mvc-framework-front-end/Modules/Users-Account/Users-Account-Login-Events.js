//=====================================================================================================================================================	   
//=====================================================================================================================================================	   

  function Login_User()
      {    
		console.log("Login");//Show Login-Form   
	       if($("#LoginMenu").html().toUpperCase().indexOf("LOGOUT") <= -1 )
		      {  $("#Body-Modal-Form").attr("include-html", "Modules/Users-Account/Users-Account-Login-Form.html");
                 HTML_File_Loader.Initiate();
	              
			     $("#Body-PopUpWall").stop().fadeIn();
  	             $("#Body-Modal-Form").stop().fadeIn();
				 $("#LoginForm_TxtPassword").val("");
			     $("#LoginForm_TxtUsername").focus();
			  }
			else{ 
			     if (confirm("Logout Current User.") == true) {
					
					 localStorage.removeItem("User");
                      $.session.remove("JWToken");
			          $.session.remove("UserAccount");
					  $.session.remove("ActivePage");
			          $.session.remove("ActiveFunction");
					  $("#LoginMenu").html("<i id='LoginMenu' class='fa fa-user-lock padding-4'></i>Login");
					  JS_File.Load('Modules/Home-Page/Home-Event.js').then( res => {Main_Home();}).catch(err =>{;});
                   } 
				   location.reload();
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
										    {  $("#Body-PopUpWall").stop().fadeOut();
  	                                           $("#Body-Modal-Form").stop().fadeOut()
										       $.session.set("JWToken", $.trim(xhr.getResponseHeader("Authorization").split("Bearer")[1]));  
											   $.session.set("UserAccount", atob(JSON.parse(atob($.session.get("JWToken").split(".")[1])).RECORD)); 
											   var ObjUserAccount=  JSON.parse($.trim($.session.get("UserAccount")));  
											   localStorage.setItem("User", "LOGOUT")
			
												location.reload();
				
											  $("#LoginMenu").html(" <button id='LoginMenu' class='align-middle rounded-full focus:shadow-outline-purple focus:outline-none'aria-haspopup='true'> <img class='object-cover w-8 h-8 rounded-full' src='Images/favicon.ico' aria-hidden='true'/></button><p type='hidden'Logout</p>");   
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
	

 }   
  
