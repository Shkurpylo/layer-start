var W3CWebSocket = require('websocket').w3cwebsocket;

var client = new W3CWebSocket('wss://websockets.layer.com/?session_token=jrJ4Z-KUqotuitsG8IoEKr9QNoc4tq2xFhqj7t_7sFSxCmCYvTvt23DF7E0eI-ejfC6gAu7V8fYCZCJMuLhwvQ.8-1', 'layer-2.0');

client.onerror = function () {
  console.log('Connection Error');
};

client.onopen = function () {
  console.log('WebSocket Client Connected');

  function sendMessage() {
    if (client.readyState === client.OPEN) {
      var message = {
        "parts": [{
          "mime_type": "text/plain",
          "body": "this is message!"
        }],
        "id": "layer:///messages/d4c2070f-4def-44b1-9938-d001bdf7cd19"
      }

      client.send(message);
      setTimeout(sendMessage, 3000);
    }
  }
  sendMessage();
};

client.onclose = function () {
  console.log('echo-protocol Client Closed');
};

client.onmessage = function (e) {
  if (typeof e.data === 'string') {
    console.log("Received: '" + e.data + "'");
  }
};