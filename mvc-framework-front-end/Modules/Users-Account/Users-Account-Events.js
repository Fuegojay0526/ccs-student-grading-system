
//=====================================================================================================================================================	   
//=====================================================================================================================================================	   

function Register_UsersAccount()
   {  //Show Users-Account-Form
   
      $("#Body-Container").attr("include-html", "Modules/Users-Account/Users-Account-Form.html");
      HTML_File_Loader.Initiate();
	   
	   $.session.set("ActivePage", "Modules/Users-Account/Users-Account-Events.js");  
	   $.session.set("ActiveFunction", "Register_UsersAccount");
	  
	  $("#UsersAccountForm_TxtPassword").val("");
	  $("#UsersAccountForm_TxtUserName").focus();
			$("#LoginMenu").html(" <button id='LoginMenu' class='align-middle rounded-full focus:shadow-outline-purple focus:outline-none'aria-haspopup='true'> <img class='object-cover w-8 h-8 rounded-full' src='Images/favicon.ico' aria-hidden='true'/></button><p type='hidden'Logout</p>");
 
//------------------------------------------------------------------------------------------------------------------------------------------------------
	//Clean UsersAccountForm Function
	var UsersAccountForm_Clear = function(){
		    $("#UsersAccountForm_TxtRecordID").val("0000");
	        $("#UsersAccountForm_TxtUserName").val("");
			$("#UsersAccountForm_TxtName").val("");
			$("#UsersAccountForm_TxtLastName").val("");
	        $("#UsersAccountForm_TxtEmailAddress").val("");
			$("#UsersAccountForm_TxtPassword").val("");
		 
	        $("#UsersAccountForm_TxtUserName").focus();
	}
	
//------------------------------------------------------------------------------------------------------------------------------------------------------
	
	//User Account NEW Button Click
	$("#UsersAccountForm_BntNEW").bind("click", function (evt)  { UsersAccountForm_Clear(); });  
  
//------------------------------------------------------------------------------------------------------------------------------------------------------   
	
	//User Account SAVE Button Click
	$("#UsersAccountForm_BntSAVE").bind("click", function (evt)
       {     
	      if(typeof($.session.get("JWToken"))== "undefined") {Show_LoginForm();}
	      else{ 
				 var Fields = ["UsersAccountForm_TxtRecordID", "UsersAccountForm_TxtUserName",
				 				"UsersAccountForm_TxtName", "UsersAccountForm_TxtLastName",
								 "UsersAccountForm_Program", "UsersAccountForm_TxtEmailAddress", "UsersAccountForm_TxtPassword"];

				 var InputChecker= $.check.inputs(Fields);
				 
				     if(InputChecker!="")
						 {alert("Error: There is an empty field.!!!\n\nBefore sending the form to the server, the [" + InputChecker.split("_Txt")[1] + "] field must have a value.");}
					 else{
						   var ObjData= {"RecordID": $("#UsersAccountForm_TxtRecordID").val(),
						   	  "Status" : $("UsersAccountForm_TxtStatus").val(),
							  "Username":  $("#UsersAccountForm_TxtUserName").val(),
							  "Name" : $("#UsersAccountForm_Txtname").val(), 
							  "Lastname" : $("#UsersAccountForm_TxtLastname").val(),
							  "Program" : $("#UsersAccountForm_Program").val(),
							  "EmailAddress": $("#UsersAccountForm_TxtEmailAddress").val(), 
							  "Password": $("#UsersAccountForm_TxtPassword").val()};  
							  
							  var RequestProcess = "UPDATE";
							   $.ajaxSetup({ cache: false });
							   
							 async function Update_UserAccount(){
			                    await $.ajax({url : Configuration.URL.Server + Configuration.URL.UserAccount + RequestProcess,
								  	   type: "POST",
									   cache: false,
									   data: JSON.stringify(ObjData),
									   headers: {  "Authorization": "Bearer " + $.session.get("JWToken"),
													"Identity"     :  Configuration.API.Identity,
													"API-Key"      :  Configuration.API.Key,
													"Content-Type" : "application/json" },
									   success: function(output, status, xhr) { 
													try { var ResultObj= JSON.parse($.trim(output));
															if($.trim(output).toUpperCase().indexOf("ERROR:") <= -1)
																{ $.session.set("JWToken", $.trim(xhr.getResponseHeader("Authorization").split("Bearer")[1]));  
											                
													              $("#UsersAccountForm_TxtRecordID").val(ResultObj.Record_ID);
															      $("#UsersAccountForm_TxtUserName").focus();
																  
																  alert("Succes!");
																}
															else{ if(ResultObj.Status.toUpperCase().indexOf("EXPIRED") >=0)            //Token Expired
																	 {Clear_JWToken();}
																  else{ $.session.set("JWToken", $.trim(xhr.getResponseHeader("Authorization").split("Bearer")[1]));  
																		alert(ResultObj.Status); 
																	  }
																}
									 
													} catch(e){ alert($.trim(output)); return false;  }
												},
										error: function(output) { alert("Error in API call"); }
								   }); 
								} Update_UserAccount(); //Execute Asycronous Function   
						  }
	 		  }
	   });  
	   
//------------------------------------------------------------------------------------------------------------------------------------------------------   
	
	
 }   
  
