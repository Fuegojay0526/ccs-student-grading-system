 
function ApiKey_Validate()
  {  $("#Body-Container").attr("include-html", "Modules/Api-Key/Api-Key-Validate-Form.html");
      HTML_File_Loader.Initiate();
	   $("#ApiKeyValidateForm_TxtIdentity").focus();

        $.session.set("ActivePage", "Modules/Api-Key/Api-Key-Validate-Events.js");  
	    $.session.set("ActiveFunction", "ApiKey_Validate");
//------------------------------------------------------------------------------------------------------------------------------------------------------
	
	//Api Key NEW Button Click
	$("#ApiKeyValidateForm_BtnNEW").bind("click", function (evt)  
	  { 
	    $("#ApiKeyValidateForm_TxtIdentity").val("");
		$("#ApiKeyValidateForm_TxtApiKey").val("");
	    $("#ApiKeyValidateForm_TxtStatus").val("");
	    $("#ApiKeyValidateForm_TxtIdentity").focus();
	 });  
  
//------------------------------------------------------------------------------------------------------------------------------------------------------   
 

 //Api Key Validate Button Click
	$("#ApiKeyValidateForm_BtnVALIDATE").bind("click", function (evt)
       {     
	      if(typeof($.session.get("JWToken"))== "undefined") {Show_LoginForm();}
	      else{ 
				 var Fields = ["ApiKeyValidateForm_TxtApiKey", "ApiKeyValidateForm_TxtIdentity"];

				 var InputChecker= $.check.inputs(Fields);
				     if(InputChecker!="")
						 {alert("Error: There is an empty field.!!!\n\nBefore sending the form to the server, the [" + InputChecker.split("_Txt")[1] + "] field must have a value.");}
					 else{
						   var ObjData= {"Identity": $("#ApiKeyValidateForm_TxtIdentity").val(),
						                 "ApiKey": $("#ApiKeyValidateForm_TxtApiKey").val() 
										};  
							  
							  var RequestProcess = "CHECK-STATUS";
							   $.ajaxSetup({ cache: false });
							   
							   async function ValidateApiKey(){
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
											                       $("#ApiKeyValidateForm_TxtStatus").val($.trim(ResultObj.Status));
																}
															else{ if(ResultObj.Status.toUpperCase().indexOf("EXPIRED") >=0)            //Token Expired
																	 { Clear_JWToken(); }
																  else{ $.session.set("JWToken", $.trim(xhr.getResponseHeader("Authorization").split("Bearer")[1]));  
																		$("#ApiKeyValidateForm_TxtStatus").val("ERROR");
																		 alert($.trim(ResultObj.Status));
																	  }
																}
									 
													} catch(e){ alert($.trim(output)); return false;  }
												},
										error: function(output) { alert("Error in API call"); }
								   }); 
							   } ValidateApiKey();  //Execute Asycronous Function
						  }
	 		  }
	   });  
	   
//------------------------------------------------------------------------------------------------------------------------------------------------------   
 }   
  
// ApiKey_Validate Function End

//=====================================================================================================================================================	   
//=====================================================================================================================================================	   
//=====================================================================================================================================================	   

  