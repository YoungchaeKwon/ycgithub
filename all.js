
      //  $(document).ready(function () {
            //send data to php server


            var myVar = setInterval(function () { myTimer() }, 5000);


            function myTimer() {


                Parse.initialize("xWe3eeJ882Tqx488xN5I7GThshdRNx5wUWkRxleI", "SELANk58Gucf4HUSpnJPRv5nSmP1zvHoPIZHkpCs");
                var currentUser = Parse.User.current();

                if (currentUser) {
                	//alert("성공했냐???ㅠㅠㅠ:  "+currentUser.id);
                    var userID = currentUser.get("username");
                    var vehicle_code = currentUser.get("vehiclecode");
                    var user_name = currentUser.get("username");
                    var temperature = currentUser.get("temperature");
                    var keeping_time = currentUser.get("keepingtime");

                  
                    $.post("http://sweyoon.ivyro.net/msg.php", {
                        "flag": "100", "user_id": userID, "vehicle_code": vehicle_code,
                    },
                                  function (data, status) {


                                      var obj = JSON.parse(data);

                                     
                                      if (obj.flag == "299") {//error
                                          alert("flag 100:: error 발생  \nStatus: " + obj.flag);
                                      }
                                      else if (obj.flag == "200") {
                                          //alert("flag 100:: communication server에 정보를 전송하였습니다.   \nStatus: " + obj.flags);
                                      }
                                      else if (obj.flag == "201") {
                                          alert("flag 100:: 자동운행준비 데이터를 전송하였습니다.   \nStatus: " + obj.flag);
                                      }
                                      else if (obj.flag == "202") { //end connection 
                                          alert("flag 100:: end connection." + obj.flag);
                                      }
                                      else if (obj.flag == "203") { //battery // 배터리 parse에다가 추가해줘야하나???? update???
                                        // alert("flag 102:: 배터리량?: "+obj.battery +"차량내부온도" +obj.target_temperature);
                                          currentUser.set("battery",obj.battery);
                                         // document.getElementById("h3battery").innerHTML = "battery of vehicle: " + obj.battery
                                          										//+ " temperature: "; 
                                          										}

                                  });

               

                    
                    


                    var d = new Date();
                    var t = d.toLocaleTimeString();
                    //document.getElementById("demo").innerHTML = t;

                    var d = new Date();

                    var c_year = d.getFullYear();
                    var c_month = d.getMonth() + 1;
                    var c_day = d.getDate();
                    if(c_day < 10 ){  c_day="0"+d.getDate();}
                       
                    var c_hour = d.getHours();
                         if(c_hour < 10 ){  c_hour="0"+d.getHours();}
                         else  { c_hour = d.getHours();}
                   
               
                    var c_min = d.getMinutes()+2;
                     if(c_min < 10 ){ c_min="0"+(c_min()+10); alert(c_min); }
                      
                    
                    
                 //   alert("current min:" + c_min);

                    var c_day = c_year + "-" + c_month + "-" + c_day;
                    var c_time = c_hour + ":" + c_min;
                    // appendPre("c_day: " + c_day);
                    // appendPre("c_day: " + c_time);
                    var c_schedule = c_day + "-" + c_time;
                    /*    appendPre("year: " + c_year);
                        appendPre("month: " + c_month);
                        appendPre("day: " + c_day);
                        appendPre("hour: " + c_hour);
                        appendPre("min: " + c_min);
                        */

                    Parse.initialize("xWe3eeJ882Tqx488xN5I7GThshdRNx5wUWkRxleI", "SELANk58Gucf4HUSpnJPRv5nSmP1zvHoPIZHkpCs");
                    var currentUser = Parse.User.current();

                    var Schedule = Parse.Object.extend("Schedule");

                    var query = new Parse.Query("Schedule");
                    query.equalTo("a_userID", currentUser.id);
                    
                    query.find().then(function (results) {

                        for (var i = 0; i < results.length; i++) {
                            var result = results[i];
                            var p_day = result.get("d_scheduleStartDay");
                            var p_time = result.get("e_scheduleStartTime");
                            var p_destination = result.get("h_destination"); 
                            var userID = currentUser.get("username");
		//	var vehicle_code = currentUser.get("vehiclecode");
		//	var userID = currentUser.get("username");
		//	var temperature = currentUser.get("temperature");
		//var keeping_time = currentUser.get("keepingtime");
		//	
                            
                           
			

                            var p_schedule = p_day + "-" + p_time;
                            var postflag=result.get("flag");
                        //    alert("flag: "+ postflag);
//10분전??

						//	alert("c?: "+c_schedule+" p_schedule: "+ p_schedule);
                            if ((c_schedule == p_schedule)&& postflag=="true" ) {
								result.set("flag","false");
                                appendPre("일치합니다!!!!!!!!!!!!!!!!!!!!!!???" + vehicle_code);


	 $.post("http://sweyoon.ivyro.net/msg.php", {
                        "flag": "102", "user_id": userID, "vehicle_code": vehicle_code,"departure_time" : p_schedule,
					"destination" : p_destination,
					"target_temperature" : temperature,
					"keeping_time" : keeping_time
                    },
                                  function (data, status) {


                                      var obj = JSON.parse(data);

                                     
                                      if (obj.flag == "299") {//error
                                          alert("right now flag 123:: error 발생  \nStatus: " + obj.error);
                                      }
                                      else if (obj.flag == "200") {
                                          alert("right now flag 123:: communication server에 정보를 전송하였습니다.   \nStatus: " + obj.flags);
                                      }
                                      else if (obj.flag == "201") {
                                          alert("right now flag 123:: 자동운행준비 데이터를 전송하였습니다.   \nStatus: " + obj.flag);
                                      }
                                      else if (obj.flag == "202") { //end connection 
                                          alert("right now flag 123:: 연결을 해제하였습니다." + obj.flag);
                                      }
                                      else if (obj.flag == "203") { //battery // 배터리 parse에다가 추가해줘야하나???? update???
                                           alert("flag 102:: 배터리량?: "+obj.battery +"차량내부온도" +obj.target_temperature);
                                          currentUser.set("battery",obj.battery);
                                          document.getElementById("h3battery").innerHTML = "battery of vehicle: " + obj.battery
                                          										+ " temperature: " +obj.target_temperature; 
                                          										 }

                                  });


                       /*         $.post("http://sweyoon.ivyro.net/index.php", {
                                    "flag": "102", "user_id": userID, "vehicle_code": vehicle_code, "departure_time": p_schedule,
                                    "destination": p_destination, "target_temperature": temperature, "keeping_time": keeping_time
                                },
                                 function (data, status) {

                                     var obj = JSON.parse(data);
                                     //시간이 1분단위이면 같은 데이터가 6번 보내짐
                                     //임시
                                   if (obj.flag == "299") {//error
                                          alert("flag 102:: error 발생  \nStatus: " + obj.flag);
                                      }
                                      else if (obj.flag == "200") {
                                          alert("flag 102:: communication server에 정보를 전송하였습니다.   \nStatus: " + obj.flags);
                                      }
                                      else if (obj.flag == "201") {
                                          alert("flag 102:: 자동운행준비 데이터를 전송하였습니다.   \nStatus: " + obj.flag);
                                      }
                                      else if (obj.flag == "202") { //end connection 
                                           alert("flag 102:: end connection." + obj.flag);
                                      }
                                      else if (obj.flag == "203") { //battery // 배터리 parse에다가 추가해줘야하나???? update???
                                    alert("flag 102:: 배터리량?: "+obj.battery +"차량내부온도" +obj.target_temperature);
                                          currentUser.set("battery",obj.battery);
                                          document.getElementById("h3battery").innerHTML = "battery of vehicle: " + obj.battery
                                          										+ " temperature: " +obj.target_temperature; 
                                      }


                                 });
                              */
                            }

                            // appendPre("::::::::::c_schedule: " + c_schedule);
                            // appendPre("::::::::::p_schedule: " + p_schedule);



                        }







                    }); //parse query



                }





            }//if currentUser


            function appendPre(message) {
                var pre = document.getElementById('output');
                var textContent = document.createTextNode(message + '\n');
                pre.appendChild(textContent);
            }
     //   });


  