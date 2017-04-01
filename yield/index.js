

var dirSync = function(dir, filelist) {
  var fs = fs || require('fs'),
      files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(dir + file).isDirectory()) {
      filelist = dirSync(dir + file + '/', filelist);
    }
    else {
      filelist.push(file);
    }
  });
  return filelist;
};

function *fetchDirList(dir) {
  const res = dirSync(dir);
  for (item of res) {
    yield item;
  }
}
const [...result] = fetchDirList('./')

console.log(result);