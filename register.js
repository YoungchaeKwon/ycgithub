  Parse.initialize("xWe3eeJ882Tqx488xN5I7GThshdRNx5wUWkRxleI", "SELANk58Gucf4HUSpnJPRv5nSmP1zvHoPIZHkpCs");


    function saveParse() {



    	


        var vehiclecode = document.getElementById("user_vc").value;
        var username = document.getElementById("user_name").value;
        var userpassword = document.getElementById("user_pw").value;
        alert("Welcome!!!!" + username);
     //   var temperature = "24";

     //   document.getElementById("user_vc").value = "";
   //     document.getElementById("user_name").value = "";
    //    document.getElementById("user_pw").value = "";


        if ( username.length.toString() > 0 && userpassword.length.toString() > 0) {

            Parse.User.logOut();
            var user = new Parse.User();
            user.set("username", username);
            user.set("password", userpassword);
            user.set("vehiclecode", vehiclecode);
            user.set("temperature", "24");
            user.set("keepingtime", "3");
            user.set("battery","100");
           
            var user = new Parse.User();
          

            user.signUp(null, {
                success: function (user) {
                    alert("Welcome!!!!");
                    
                    var vehicle_code = vehiclecode;
                    var user_name = username;
                    
                  //  alert("인증?????.   \nStatus: " + vehicle_code);
                    $.post("http://sweyoon.ivyro.net/msg.php", { "flag": "101", "user_id": user_name,"user_mac":"12:12:12:12:12" , "vehicle_code": vehicle_code },
                                    function (data, status) {
                                        
                                        var obj = JSON.parse(data);

                                        alert("받아라!!!!!!!!!!!!!!!!!!!!: " + obj.flag);


                                        if (obj.flag == "299") {//error
                                            alert("error 발생  \nStatus: " + obj.flag + " : " +obj.error);
                                        }
                                        else if (obj.flag == "200") {
                                            alert("communication server에 정보를 전송하였습니다.   \nStatus: " + obj.flag);
                                            location.href = "page1_login.html"
                                        }
                                        else if (obj.flag == "201") {
                                            // location.href = "page1_login.html";
                                            alert("사용자 인증에 성공하였습니다.   \nStatus: " + obj.flag);
                                            //register()
                                            location.href = "page1_login.html"
                                        }
                                        else if (obj.flag == "202") { //end connection 
                                            alert("연결을 해제하였습니다." + obj.flag);
                                        }
                                        else if (obj.flag == "203") { //battery // 배터리 parse에다가 추가해줘야하나???? update???
                                            alert("자동운행준비 데이터를 성공적으로 전송하여 차량의 배터리량을 받아왔습니다. \n배터리량?: " + obj.flag);
                                            currentUser.set("battery",obj.battery);
                                            
                                        }
                                        // location.href = "page1_login.html";
                                        //통신
                                    })

                    //임시
                  //  location.href = "page1_login.html";
                },
                error: function (user, error) {
                    // Show the error message somewhere and let the user try again.
                    alert("Error: " + error.code + " " + error.message);
                }
                
                
                
            });



        }
        
        function register(){
        	
        	
       	
            Parse.User.logOut();
            user.set("username", username);
            user.set("password", userpassword);
            user.set("vehiclecode", vehiclecode);
            user.set("temperature", "24");
            user.set("keepingtime", "3");
            user.set("battery","100");
       	
       	
       }
    }
    
   

