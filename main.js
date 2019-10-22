var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

var template = require('./lib/template.js')


var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathName = url.parse(_url, true).pathname;

    if (pathName === '/') {
      if (queryData.id === undefined) {
          fs.readdir('./data', (error, filelist) => {
            var title = 'Welcome';
            var description = 'Hello, Node.js';
            var list = template.List(filelist);
            var html = template.HTML(title, list, `<h2>${title}</h2><p>${description}</p>`, '');
            response.writeHead(200);
            response.end(html);
          });
      } else {
        fs.readdir('./data', (error, filelist) => {
          fs.readFile(`data/${queryData.id}`, 'UTF-8', (err, description) => {
            var title = queryData.id;
            var list = template.List(filelist);
            var html = template.HTML(title, list, `<h2>${title}</h2><p>${description}</p>`,
              `
              <a href="/update?id=${title}">update</a>
              <form action="delete_process" method="post">
                <input type="hidden" name="id" value="${title}"/>
                <input type="submit" value="delete"/>
              </form>
              `);
            response.writeHead(200);
            response.end(html);
        });
      });
    }
  } else if (pathName === '/create') {
    fs.readdir('./data', (error, filelist) => {
      var title = 'Welcome - create';
      var list = (filelist);
      var html = template.HTML(title, list, `
        <form action="/create_process" method="post">
          <p><input type="text" name="title" placeholder="title"/></p>
          <p>
            <textarea name="description" placeholder="description"></textarea>
          </p>
          <p>
            <input type="submit"/>
          </p>
        </form>
        `, '');
      response.writeHead(200);
      response.end(html);
    });
  } else if (pathName === '/create_process') {
    var body = '';
    request.on('data', function(data) {
      body += data;
    });
    request.on('end', function() {
      var post = qs.parse(body);
      var title = post.title;
      var description = post.description;
      fs.writeFile(`data/${title}`, description, 'UTF-8', function(err) {
        if (err) throw err;
        response.writeHead(302, {Location: `/?id=${title}`}); // 왜 한글로하면 오류나는지 모르겠다.
        response.end();
      });
    });
  } else if (pathName === '/update') {
    fs.readdir('./data', (error, filelist) => {
      fs.readFile(`data/${queryData.id}`, 'UTF-8', (err, description) => {
        var title = queryData.id;
        var list = template.List(filelist);
        var html = template.HTML(title, list,
          `
          <form action="/update_process" method="post">
          <input type="hidden" name="id" value="${title}"/>
            <p><input type="text" name="title" placeholder="title" value="${title}"/></p>
            <p>
              <textarea name="description" placeholder="description">${description}</textarea>
            </p>
            <p>
              <input type="submit"/>
            </p>
          </form>
          `, '');
        response.writeHead(200);
        response.end(html);
       });
     });
   } else if (pathName === '/update_process') {
     var body = '';
     request.on('data', function(data) {
       body += data;
     });
     request.on('end', function() {
       var post = qs.parse(body);
       var id = post.id;
       var title = post.title;
       var description = post.description;
       fs.rename(`data/${id}`, `data/${title}`, function(error) {
         fs.writeFile(`data/${title}`, description, 'UTF-8', function(err) {
           if (err) throw err;
           response.writeHead(302, {Location: `/?id=${title}`}); // 왜 한글로하면 오류나는지 모르겠다.
           response.end();
        });
       });
       /*

       */
     });
   } else if (pathName === '/delete_process') {
     var body = '';
     request.on('data', function(data) {
       body += data;
     });
     request.on('end', function() {
       var post = qs.parse(body);
       var id = post.id;
       console.log(id);
       fs.unlink(`./data/${id}`, function() {
         response.writeHead(302, {Location: `/`}); // 왜 한글로하면 오류나는지 모르겠다.
         response.end();
       });
     });
   } else {
      response.writeHead(404);
      response.end('Not found');
  }
});
app.listen(3000);

// https://www.youtube.com/watch?v=yn5VtLGbyAE&list=PLuHgQVnccGMA9QQX5wqj6ThK7t2tsGxjm&index=47
