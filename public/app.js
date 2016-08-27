var React = require('react');
var NavBar = require('./components/menu/NavBar.js');
var ChartCanvas = require('./components/chart/ChartCanvas.js');
var rawtoactualdataconverter = require('./components/action/data_converter.js');
var populatedashboard = require('./components/action/populateDashboard.js');

var App = React.createClass({
    getInitialState: function() {
      return {
        ip:"",
        url:"",
        lat:"",
        lng:"",
        city:"",
        data:""
      };
    },
    searchData: function(url){
      return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          data: responseJson,
        }, function(){
          rawtoactualdataconverter(responseJson);
        })
      })
    },
    handleChange: function(gURL, gCity, gLat, gLng) {
      this.setState({
        url:gURL,
        city:gCity,
        lat:gLat,
        lng:gLng
      },function () {
        this.searchData(this.state.url);
      });
    },
    myLocation: function(){
      var _this = this;
       fetch('http://freegeoip.net/json/')
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          var curURL = 'http://api.openweathermap.org/data/2.5/forecast/city?'+"lat=" + responseJson.latitude + "&" + "lon=" + responseJson.longitude +'&APPID=bfbfccb0b8cb44018d9282c12bb57409';
          console.log('my check 2222');
          _this.setState({
            ip: responseJson.query
          },function(){
            console.log('My check inside');
            _this.handleChange(curURL, responseJson.city, responseJson.latitude, responseJson.longitude );
          })
        });
      },
      updateDashboard: function(){
        var url1 = 'http://localhost:3000/getdash';
        $.post(url1,{ip:this.state.ip},function(data){
          populatedashboard(data);
        });
      },
    componentWillMount: function() {
      var _this = this;
      _this.myLocation();
      _this.updateDashboard();
    },
    render: function(){
        return (
            <div>
              <NavBar handle = {this.handleChange}/>
              <ChartCanvas update = {this.updateDashboard} handler = {this.state} loc = {this.myLocation} chartDetails = {this.state.city}/>
            </div>
        );
    }
});

module.exports = App;
