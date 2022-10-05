
function ApiKey_Application()
  {  $("#Body-Container").attr("include-html", "Modules/Api-Key/Api-Key-Application-Form.html");
      HTML_File_Loader.Initiate();
	     
	    $.session.set("ActivePage", "Modules/Api-Key/Api-Key-Application-Events.js");  
	    $.session.set("ActiveFunction", "ApiKey_Application");
	   
		  if(typeof($.session.get("JWToken"))== "undefined") {Show_LoginForm();}
	      else{    if(typeof($.session.get("UserAccount"))!= "undefined") 
                     {   var ObjUserAccount=  JSON.parse($.trim($.session.get("UserAccount")));  
					       $("#ApiKeyForm_TxtIdentity").val(ObjUserAccount.Identity);
		             }
	             $("#ApiKeyForm_TxtStatus").focus();
 
		       }
//------------------------------------------------------------------------------------------------------------------------------------------------------
	
	//ApiKey Application SAVE Button Click
	
	$("#ApiKeyForm_BntSAVE").bind("click", function (evt)   {  
	   if(typeof($.session.get("JWToken"))== "undefined") 
	        {  $("#ApiKeyForm_TxtIdentity").val("");
			   Show_LoginForm();}
	      else{ 
				 var Fields = ["ApiKeyForm_TxtRecordID", "ApiKeyForm_TxtIdentity", "ApiKeyForm_TxtStatus"];
                 var InputChecker= $.check.inputs(Fields);
				 
				     if(InputChecker!="")
						 {alert("Error: There is an empty field.!!!\n\nBefore sending the form to the server, the [" + InputChecker.split("_Txt")[1] + "] field must have a value.");}
					 else{
						   var ObjData= {"RecordID": $("#ApiKeyForm_TxtRecordID").val(), 
							             "Identity":  $("#ApiKeyForm_TxtIdentity").val(), 
							             "Status": $("#ApiKeyForm_TxtStatus").val() };  
							  
							  var RequestProcess = "UPDATE";
							   $.ajaxSetup({ cache: false });
							   
							  async function SaveApiApplication(){
							    await $.ajax({url : Configuration.URL.Server + Configuration.URL.ApiKey + RequestProcess,
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
											                      $("#ApiKeyForm_TxtRecordID").val(ResultObj[0].Record_ID);
													              $("#ApiKeyForm_TxtApiKey").val(ResultObj[0].API_Key_Code);
															      $("#ApiKeyForm_TxtStatus").focus();
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
							  } SaveApiApplication();  //Execute Asycronous Function
						  }
	 		  }
	
	});  
  
 //------------------------------------------------------------------------------------------------------------------------------------------------------   
 	
	//ApiKey Application SEARCH Button Click
	$("#ApiKeyForm_BntSEARCH").bind("click", function (evt)  { 
	    if(typeof($.session.get("JWToken"))== "undefined") 
	        {  $("#ApiKeyForm_TxtIdentity").val("");
			   Show_LoginForm();}
	      else{ 
				 var Fields = ["ApiKeyForm_TxtIdentity"];
                 var InputChecker= $.check.inputs(Fields);
				 
				     if(InputChecker!="")
						 {alert("Error: There is an empty field.!!!\n\nBefore sending the form to the server, the [" + InputChecker.split("_Txt")[1] + "] field must have a value.");}
					 else{
						   var ObjData= {"Identity":  $("#ApiKeyForm_TxtIdentity").val()};  
							  
							  var RequestProcess = "SEARCH";
							   $.ajaxSetup({ cache: false });
							   
							  async function SearchIdentity(){
							    await $.ajax({url : Configuration.URL.Server + Configuration.URL.ApiKey + RequestProcess,
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
											                        $("#ApiKeyForm_TxtRecordID").val(ResultObj.Record_ID);
													                $("#ApiKeyForm_TxtApiKey").val(ResultObj.API_Key_Code);
																	$("#ApiKeyForm_TxtStatus").val(ResultObj.Status);
															        $("#ApiKeyForm_TxtStatus").focus();
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
							   }  SearchIdentity();  //Execute Asycronous Function
							   
						  }
	 		  }
	
	  });  
  
//------------------------------------------------------------------------------------------------------------------------------------------------------   
 }   
  
// ApiKey_Application Function End

//=====================================================================================================================================================	   
//=====================================================================================================================================================	   
//=====================================================================================================================================================	   

  