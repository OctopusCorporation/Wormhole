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
### Sending message from Hydra to Koh.js
```js
  socket.on('command.Hy.KohJS', function(data){
      io.sockets.emit('command.KohJS', {Command: data.Command, Values:  data.Values });
  });
```
### Sending message from Koh.js to Hydra
```js
  socket.on('command.KohJS.Hy', function(data){
      io.sockets.emit('command.Hydra', {Command: data.Command, Values:  data.Values });
  });
```
