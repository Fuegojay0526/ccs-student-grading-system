
//=====================================================================================================================================================	   
//=====================================================================================================================================================	   
 
 function Change_UserPassword()
   { //Show Change-UserPassword-Form
     $("#Body-Container").attr("include-html", "Modules/Users-Account/Change-Users-Password-Form.html");
      HTML_File_Loader.Initiate();
	  
       $.session.set("ActivePage", "Modules/Users-Account/Change-Users-Password-Event.js");  
	   $.session.set("ActiveFunction", "Change_UserPassword");
		
	  if(typeof($.session.get("JWToken"))== "undefined") {Show_LoginForm();}
	  else{    
	           if(typeof($.session.get("UserAccount"))!= "undefined") 
                     { var ObjUserAccount=  JSON.parse($.trim($.session.get("UserAccount")));  
		                $("#ChangeUsersPasswordForm_TxtName").val(ObjUserAccount.Name);
						$("#ChangeUsersPasswordForm_TxtUsername").val(ObjUserAccount.Username);
						$("#ChangeUsersPasswordForm_RecordID").val(ObjUserAccount.Record_ID);
					  }
		   }
		  
		   $("#ChangeUsersPasswordForm_TxtCurrentPassword").val("");
	       $("#ChangeUsersPasswordForm_TxtNewPassword").val("");
		   $("#ChangeUsersPasswordForm_TxtCurrentPassword").focus();
		   
//------------------------------------------------------------------------------------------------------------------------------------------------------   
	
	//Change Users Password UPDATE Button Click
	$("#ChangeUsersPasswordForm_BtnUPDATE").bind("click", function (evt)
       {     
	      if(typeof($.session.get("JWToken"))== "undefined")
  			  {Show_LoginForm();
		       $("#ChangeUsersPasswordForm_TxtCurrentPassword").val(""); 
			   $("#ChangeUsersPasswordForm_TxtNewPassword").val(""); 
		     }
	      else{ 
				 var Fields = ["ChangeUsersPasswordForm_TxtCurrentPassword", "ChangeUsersPasswordForm_TxtNewPassword", 
				               "ChangeUsersPasswordForm_TxtName", "ChangeUsersPasswordForm_TxtUsername" ];

				 var InputChecker= $.check.inputs(Fields);
				     if(InputChecker!="")
						 {alert("Error: There is an empty field.!!!\n\nBefore sending the form to the server, the [" + InputChecker.split("_Txt")[1] + "] field must have a value.");}
					 else{
						   var ObjData= {"RecordID": $("#ChangeUsersPasswordForm_RecordID").val(),
						                 "Username": $("#ChangeUsersPasswordForm_TxtUsername").val(), 
							   		     "OldPassword": $("#ChangeUsersPasswordForm_TxtCurrentPassword").val(), 
										 "NewPassword": $("#ChangeUsersPasswordForm_TxtNewPassword").val() 
										 };  
							  
							  var RequestProcess = "CHANGE-PASSWORD";
							   $.ajaxSetup({ cache: false });
							   
							 async function Update_UsersPassword(){
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
											                      alert(ResultObj.Status);
																}
															else{ if(ResultObj.Status.toUpperCase().indexOf("EXPIRED") >=0)            //Token Expired
																	 {   $("#ChangeUsersPasswordForm_TxtCurrentPassword").val("");
	                                                                     $("#ChangeUsersPasswordForm_TxtNewPassword").val("");
		                                                                  Clear_JWToken();
																	 }
																  else{ $.session.set("JWToken", $.trim(xhr.getResponseHeader("Authorization").split("Bearer")[1]));  
																		alert(ResultObj.Status); 
																	  }
																}
									 
													} catch(e){ alert($.trim(output)); return false;  }
												},
										error: function(output) { alert("Error in API call"); }
								   }); 
								   
							   } Update_UsersPassword(); //Execute Asycronous Function   
						   }
	 		  }
	   });  
	   
//------------------------------------------------------------------------------------------------------------------------------------------------------   
 }   
  
// Change_UserPassword Function End

//=====================================================================================================================================================	   
//=====================================================================================================================================================	   
//=====================================================================================================================================================	   

  