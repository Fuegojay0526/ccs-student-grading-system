
//=====================================================================================================================================================	   
//=====================================================================================================================================================	   
     
 function Users_List()
   { 
      //Show Users-List-Form
      $("#Body-Container").attr("include-html", "Modules/Users-Account/Users-List-Form.html");
         HTML_File_Loader.Initiate();
		 
		  $.session.set("ActivePage", "Modules/Users-Account/Users-List-Event.js");  
	      $.session.set("ActiveFunction", "Users_List");
		
	     if(typeof($.session.get("JWToken"))== "undefined") {
			  Show_LoginForm();
			  }
	     else{  
		      var RequestProcess = "USERS-LIST";	
		      $.ajaxSetup({ cache: false });
			  
			 async function Load_UserList(){
				 await $.ajax({ url : Configuration.URL.Server + Configuration.URL.UserAccount + RequestProcess,
                       type: "POST",
			           cache: false,
                       data: "",
                       headers: {  "Authorization": "Bearer " + $.session.get("JWToken"),
                                   "Identity"     :  Configuration.API.Identity,
								   "API-Key"      :  Configuration.API.Key,
			                       "Content-Type" : "application/json" },
                       success: function(output, status, xhr) { 
                                  try { //alert(output.trim());
								       var ResultObj= JSON.parse($.trim(output));
									         if($.trim(output).toUpperCase().indexOf("ERROR:") <= -1)
										      { $.session.set("JWToken", $.trim(xhr.getResponseHeader("Authorization").split("Bearer")[1]));  
											    var TableBody="";
											   for(var Cnt=0; Cnt < ResultObj.length; Cnt++)
												  {
													  TableBody +="<tr>";
													   TableBody +="<td class='text-start'>" + (Cnt+1) + "</td>";
													   TableBody +="<td class='text-start'>" + ResultObj[Cnt].Users_Info.Username + "</td>";
													   TableBody +="<td class='text-start'>" + ResultObj[Cnt].Users_Info.Name + "</td>";
													   TableBody +="<td class='text-start'>" + ResultObj[Cnt].Users_Info.EmailAddress + "</td>";
													   TableBody +="<td class='text-start'>" + ResultObj[Cnt].Users_Info.Status + "</td>";
													  TableBody +="</tr>";
												  }
												   $("#UsersList-Form-Table").html(TableBody);   
											   }
										 else{
										          if(ResultObj.Status.toUpperCase().indexOf("EXPIRED") >=0)            //Token Expired
												     {Clear_JWToken();}
												  else{alert(ResultObj.Status);}
										     }
									 
                                      } catch(e){ alert($.trim(output)); return false;}
								  },
                       error: function(output) { alert("Error in API call"); }
                   });
			   } Load_UserList(); //Execute Asycronous Function
			 
	      }
   }
