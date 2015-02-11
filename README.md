# Wormhole
----------
## Communication Protocol
### Basic usage
```js
  {
    Command: "NameOfCommand", 
    Values:  
      [
        {
          Key: "Value"
        },
        ...
      ]
  }
```
#### Sending message from Hydra to Koh.js
```js
  socket.on('command.Hy.KohJS', function(data){
      io.sockets.emit('command.KohJS', {Command: data.Command, Values:  data.Values });
  });
```
#### Sending message from Koh.js to Hydra
```js
  socket.on('command.KohJS.Hy', function(data){
      io.sockets.emit('command.Hydra', {Command: data.Command, Values:  data.Values });
  });
```
## Always run Wormhole
```bash
> forever start index.js
```
## Internet connection
Wormhole App verify every 5 seconds if has Internet connection, true if has or false if hasn't. But every 5 seconds send a message for broadcast channel
```js
  if (isOnline) {
      io.sockets.emit('message.Wormhole', {Command: 'hasInternet', Values: [{isOnline : true}]});
  }
  else{
      io.sockets.emit('message.Wormhole', {Command: 'hasNoInternet', Values: [{isOnline : false}]});
  }
```
