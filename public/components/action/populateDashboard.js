function populatedashboard(jsondata){
  var json_data = JSON.parse(jsondata);   //parsing the json data from json string
  console.log("populatedashboardsize",json_data);

  //for all the json data create a button element and add in the list of navigation bar
  for(var i=0;i<json_data.length;i++){

    var newdivision = document.createElement('div');
    var btndivision = document.createElement('div');
    var spandivision = document.createElement('div');

    btndivision.setAttribute("class","col-sm-11");
    spandivision.setAttribute("class","col-sm-1");

    spandivision.style.padding =0;
    spandivision.style.textAlign="center";
    spandivision.style.background="#909090";

    var btn = document.createElement('button');
    var liDashboard = document.createElement('LI');
    var aDashboard = document.createElement("A");
    liDashboard.style.paddingLeft = "20px";
    var t = document.createTextNode(json_data[i].cityName);
    liDashboard.setAttribute("type", "button");
    aDashboard.appendChild(t);
    liDashboard.appendChild(aDashboard);

    //adding attributes to the button
    liDashboard.addEventListener("click",update_graph);
    liDashboard.setAttribute("data-lat",json_data[i].lat);
    liDashboard.setAttribute("data-lng",json_data[i].lng);
    liDashboard.setAttribute("city-name",json_data[i].cityName);


    //creating new span for deleting the dashboard
    var newspan = document.createElement('span');
    newspan.setAttribute("class","glyphicon glyphicon-remove-circle");
    newspan.addEventListener("click",deletedash);
    newspan.setAttribute("cityName",json_data[i].cityName);
    newspan.setAttribute("ip",json_data[i].ip);
    newspan.style.paddingTop="5px";
    spandivision.appendChild(newspan);

    // newdivision.appendChild(liDashboard );
    // newdivision.appendChild(spandivision);

    var element = document.getElementById('side-menu');
    element.appendChild(liDashboard);
  }
}

module.exports = populatedashboard;
