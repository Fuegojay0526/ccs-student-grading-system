
//=====================================================================================================================================================	   
//=====================================================================================================================================================	   

function Register_UsersAccount()
   {  //Show Users-Account-Form
   
      $("#Body-Container").attr("include-html", "Modules/Users-Account/Users-Account-Form.html");
      HTML_File_Loader.Initiate();
	   
	   $.session.set("ActivePage", "Modules/Users-Account/Users-Account-Events.js");  
	   $.session.set("ActiveFunction", "Register_UsersAccount");
	  
	  $("#UsersAccountForm_TxtPassword").val("");
	  $("#UsersAccountForm_TxtName").focus();
 
//------------------------------------------------------------------------------------------------------------------------------------------------------
	//Clean UsersAccountForm Function
	var UsersAccountForm_Clear = function(){
		    $("#UsersAccountForm_TxtRecordID").val("0000");
	        $("#UsersAccountForm_TxtName").val("");
	        $("#UsersAccountForm_TxtEmailAddress").val("");
			$("#UsersAccountForm_TxtUsername").val("");
			$("#UsersAccountForm_TxtPassword").val("");
	        $("#UsersAccountForm_TxtUserlevel").val("");
	        $("#UsersAccountForm_TxtStatus").val("");
		 
	        $("#UsersAccountForm_TxtName").focus();
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
				 var Fields = ["UsersAccountForm_TxtRecordID", "UsersAccountForm_TxtName", "UsersAccountForm_TxtEmailAddress", 
				               "UsersAccountForm_TxtUsername", "UsersAccountForm_TxtUsername", "UsersAccountForm_TxtPassword",
							   "UsersAccountForm_TxtUserlevel", "UsersAccountForm_TxtStatus"];

				 var InputChecker= $.check.inputs(Fields);
				 
				     if(InputChecker!="")
						 {alert("Error: There is an empty field.!!!\n\nBefore sending the form to the server, the [" + InputChecker.split("_Txt")[1] + "] field must have a value.");}
					 else{
						   var ObjData= {"RecordID": $("#UsersAccountForm_TxtRecordID").val(), 
							  "Name":  $("#UsersAccountForm_TxtName").val(), 
							  "EmailAddress": $("#UsersAccountForm_TxtEmailAddress").val(), 
							  "Username" : $("#UsersAccountForm_TxtUsername").val(),
							  "Password": $("#UsersAccountForm_TxtPassword").val(), 
							  "UserLevel": $("#UsersAccountForm_TxtUserlevel").val(), 
							  "Status":  $("#UsersAccountForm_TxtStatus").val()};  
							  
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
															      $("#UsersAccountForm_TxtName").focus();
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
	
	//User Account SEARCH Button Click
	$("#UsersAccountForm_BntSEARCH").bind("click", function (evt)
       {   
		 if(typeof($.session.get("JWToken"))== "undefined") {Show_LoginForm();}
	     else{ 
		         var SearchKey = prompt("Please search using your login, email address, or recordID. \nInput search key:", "");
                   if (SearchKey != null) {
                      var ObjData={"SearchKey" : SearchKey};
					  
					  var RequestProcess = "SEARCH";
						$.ajaxSetup({ cache: false });
						
					  async function Search_UserAccount(){
			           await $.ajax({url : Configuration.URL.Server + Configuration.URL.UserAccount + RequestProcess,
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
														{   $.session.set("JWToken", $.trim(xhr.getResponseHeader("Authorization").split("Bearer")[1]));  
											                
													        $("#UsersAccountForm_TxtRecordID").val(ResultObj.Record_ID);
															$("#UsersAccountForm_TxtName").val(ResultObj.Name);
															$("#UsersAccountForm_TxtEmailAddress").val(ResultObj.EmailAddress);
															$("#UsersAccountForm_TxtUsername").val(ResultObj.Username);
															$("#UsersAccountForm_TxtPassword").val(ResultObj.Password);
															$("#UsersAccountForm_TxtUserlevel").val(ResultObj.UserLevel);
															$("#UsersAccountForm_TxtStatus").val(ResultObj.Status);
		                                                    $("#UsersAccountForm_TxtName").focus();
													    }
													else{ if(ResultObj.Status.toUpperCase().indexOf("EXPIRED") >=0)            //Token Expired
												              {Clear_JWToken();}
														  else{ $.session.set("JWToken", $.trim(xhr.getResponseHeader("Authorization").split("Bearer")[1]));  
											                       alert(ResultObj.Status); UsersAccountForm_Clear();
															  }
													    }
									 
												} catch(e){ alert($.trim(output)); return false;  }
										},
								error: function(output) { alert("Error in API call"); }
							}); 
						} Search_UserAccount(); //Execute Asycronous Function   
					}
              } 
	        
	   });  
//------------------------------------------------------------------------------------------------------------------------------------------------------	   
 
 }   
  
// Register_UsersAccount Function End

//=====================================================================================================================================================	   
//=====================================================================================================================================================	   
//=====================================================================================================================================================	   

 