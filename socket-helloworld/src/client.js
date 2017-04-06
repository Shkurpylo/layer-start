var WebSocketClient = require('websocket').client;

var client = new WebSocketClient();

client.on('connectFailed', function (error) {
  console.log('Connect Error: ' + error.toString());
});

client.on('connect', function (connection) {
      console.log('WebSocket Client Connected');
      connection.on('error', function (error) {
        console.log("Connection Error: " + error.toString());
      });
      connection.on('close', function () {
        console.log('Connection Closed');
      });
      connection.on('message', function (message) {
        if (message.type === 'utf8') {
          console.log("Received: '" + message.utf8Data + "'");
        }
      });


      function sendMessage() {
        if (connection.connected) {
          var message = {
            "method": "Message.create",
            "object_id": "layer:///conversations/45379b29-0e9a-4fb3-8027-42e48d441b38",
            "data": {
              "parts": [{
                "mime_type": "text/plain",
                "body": "this is message!"
              }],
              "id": "layer:///messages/d4c2070f-4def-44b1-9938-d001bdf7cd19"
            }
          }

            connection.send(message)
            // connection.sendUTF(message);
            setTimeout(sendMessage, 3000);
          }
        }
        sendMessage();
      });



    client.connect('wss://websockets.layer.com/?session_token=jrJ4Z-KUqotuitsG8IoEKr9QNoc4tq2xFhqj7t_7sFSxCmCYvTvt23DF7E0eI-ejfC6gAu7V8fYCZCJMuLhwvQ.8-1', 'layer-2.0');