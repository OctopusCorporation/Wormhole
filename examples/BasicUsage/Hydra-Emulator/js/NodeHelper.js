var NodeServerIP = 'http://104.46.97.27:3000/';


var NodeHelper = (function(){
      var URLSocket = 'Error';
      var socket = io.connect(NodeServerIP);

      this.init = function (){
        URLSocket = NodeServerIP;
      }

      socket.on('Welcome', function(data){
      	console.log(data.Message);
      });

      socket.on('command.Hydra', function(data){
        
        if (data.Command === 'command.LedChanged') {
          var imgSrc = "";
          if (data.Values[0].isOn) {
            imgSrc = "img/ledOn.png";
          }
          else{
            imgSrc = "img/ledOff.png";
          }
          document.getElementById('led').src = imgSrc;
        }
        
      })

      socket.on('connect', function(){
        console.log('Raspberry is connected.');
        
      });
      socket.on('error', function(data){
        console.log('Error del servidor: ' + data);
      });
      socket.on('disconnect', function(){
        console.log('Disconnected to server.');
      });
      socket.on('reconnect', function(data ){
        console.log('Reconnected is ok with ' + data + ' attempts.');
      });
      socket.on('reconnect_attempt', function(){
        
        console.log('Trying to connect...');
      });
      socket.on('reconnecting', function(data){
        console.log('Reconnecting with server...'+data);
      });
      socket.on('reconnect_error', function(data){
        console.log('Error to reconnect: ' + data);
      });
      socket.on('reconnect_failed', function(){
        console.log('Reconnect failed.');
      });

      this.sendTemperature = function(value){
        socket.emit('command.Hy.KohJS', {Command: 'command.TemperatureChanged', Values: [ {temperatureCentigrades: value} ]});
      };

      this.sendMessage2WinJS = function(value){
        socket.emit('command.Hy.KohJS', {Command: 'command.Message2WinJS', Values: [ {Message: value} ]});
      }

  		this.template = function (){        
  			return (true);
  		};

       return( this );
 }).call( {} );