module.exports = {
  List: function(filelist) {
    var list = '<ul>';

    for (var i = 0; i < filelist.length; i++) {
      list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
    }
    list += '</ul>';
    return list;
  },
  HTML: function(title, list, body, control) {
    return `
    <!doctype html>
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      ${list}
      <a href="/create">create</a>
      ${control}
      ${body}
    </body>
    </html>
    `;
  }
}
