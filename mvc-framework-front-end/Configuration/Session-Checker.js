let stor = localStorage.getItem("User")
        function CheckSession()
            {

        
				if (stor == "LOGOUT") 
				{
					console.log(stor)
					$("#LoginMenu").html("<button id='LoginMenu' class='align-middle rounded-full focus:shadow-outline-purple focus:outline-none'aria-haspopup='true'> <img class='object-cover w-8 h-8 rounded-full' src='Images/favicon.ico' aria-hidden='true'/></button><p type='hidden'Logout</p>");
				}
				 else if (stor != "LOGOUT")
				 {
					$("#LoginMenu").html("<i id='LoginMenu' class='fa fa-user-lock padding-4'></i>Login");
                    Show_LoginForm();
				 }
            }