var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathName = url.parse(_url, true).pathname;

    if (pathName === '/') {
      if (queryData.id === undefined) {
        // fs.readFile(`data/${queryData.id}`, 'UTF-8', (err, description) => {
          fs.readdir('./data', (error, filelist) => {
            console.log(filelist);

            var title = 'Welcome';
            var description = 'Hello, Node.js';
            var list = '<ul>';

            /*
            var list = `<ul>
              <li><a href="/?id=HTML">HTML</a></li>
              <li><a href="/?id=CSS">CSS</a></li>
              <li><a href="/?id=JavaScript">JavaScript</a></li>
            </ul>`;
            */


            for (var i = 0; i < filelist.length; i++) {
              list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
            }

            list = list + '</ul>'


            var template = `
            <!doctype html>
            <html>
            <head>
              <title>WEB1 - ${title}</title>
              <meta charset="utf-8">
            </head>
            <body>
              <h1><a href="/">WEB</a></h1>
              ${list}
              <h2>${title}</h2>
              <p>${description}</p>
            </body>
            </html>
            `;
            response.writeHead(200);
            response.end(template);
          });
        // });
      } else {
        fs.readdir('./data', (error, filelist) => {
          console.log(filelist);

          var title = 'Welcome';
          var description = 'Hello, Node.js';
          var list = '<ul>';

          /*
          var list = `<ul>
            <li><a href="/?id=HTML">HTML</a></li>
            <li><a href="/?id=CSS">CSS</a></li>
            <li><a href="/?id=JavaScript">JavaScript</a></li>
          </ul>`;
          */


          for (var i = 0; i < filelist.length; i++) {
            list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
          }

          list = list + '</ul>'

          fs.readFile(`data/${queryData.id}`, 'UTF-8', (err, description) => {
            var title = queryData.id;
            var template = `
            <!doctype html>
            <html>
            <head>
              <title>WEB1 - ${title}</title>
              <meta charset="utf-8">
            </head>
            <body>
              <h1><a href="/">WEB</a></h1>
              ${list}
              <h2>${title}</h2>
              <p>${description}</p>
            </body>
            </html>
            `;
            response.writeHead(200);
            response.end(template);
        });
      });
    }
  } else {
      response.writeHead(404);
      response.end('Not found');
    }




});
app.listen(3000);
