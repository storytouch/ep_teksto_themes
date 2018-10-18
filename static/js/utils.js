exports.getParam = function(paramName) {
  var params = location.search.substr(location.search.indexOf('?') + 1);
  var paramValue = '';
  params = params.split('&');
  // split param and value into individual pieces
  for (var i = 0; i < params.length; i++) {
    temp = params[i].split('=');
    if ([temp[0]] == paramName ) {
      paramValue = temp[1];
    }
  }
  return paramValue;
}
