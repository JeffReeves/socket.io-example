# socket.io-example
A working socket.io example with Express.js

## NOTES

Clone this project into the root directory of your web server. I'm using Nginx
as a reverse proxy, and PM2 to run the node application.

## NGINX CONF

```
upstream socketio-example {
  server localhost:5000;
}

server {

  server_name hostname_here;
  listen 80;

  root /var/www;
  index index.php index.htm index.html;

  access_log  /var/log/nginx/access_log main;

  location /socket.io-example/ {
    error_log          /var/log/nginx/socketio-example_error.log;
    proxy_pass         http://socketio-example/;
    include            conf.d/proxydef;
  }
}
```

## PM2.JSON FILE

```javascript
{
  "apps" : [{
    "name"             : "socket.io-example",
    "cwd"              : "/var/www/socket.io-example",
    "args"             : ["dev"],
    "script"           : "app.js",
    "watch"            : true,
    "ignore_watch"     : ["*.log"],
    "log_date_format"  : "YYYY-MM-DD HH:mm Z",
    "exec_interpreter" : "node",
    "exec_mode"        : "fork",
    "autorestart"      : true,
    "env"              : {
      "PORT": "5000"
    }
  }]
}
```