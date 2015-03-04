var join = require('path').join;
var fs = require('fs');
var send = require('./send');
var normalize = require('./settings').normalize;

module.exports = directory;
function directory(path, options) {
  options = normalize(options);
  return function (req, res, next) {
    var req_path = typeof(options.transformPath) == 'function' ? options.transformPath(req.path,req) : req.path;
    if (options.grep.test(req_path)) {
      fs.stat(join(path, req_path), function (err, stat) {
        if (err || !stat.isFile()) return next();
        send(join(path, req_path), options, req, res, next);
      });
    } else {
      return next();
    }
  };
}
