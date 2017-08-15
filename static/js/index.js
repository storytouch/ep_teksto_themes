var $ = require('ep_etherpad-lite/static/js/rjquery').$;

var theme = require('./theme');

var URL_PARAM = 'theme';
var READ_ONLY_CLASS = 'readonly';

exports.aceEditorCSS = function() {
  return [
    'ep_teksto_themes/static/css/theme-dark.css',
    'ep_teksto_themes/static/css/theme-light.css'
  ];
}

exports.postAceInit = function(hook, context) {
  // default theme to light
  var themeName = getParam(URL_PARAM) || 'light';
  theme.activateTheme(themeName);

  // keep listening for future changes on theme
  theme.listenToChangesOnTheme();

  // themes might have different styles for read-only pads.
  // Need to copy class from padCrome to padInner in order to enable CSS
  // to differentiate them
  copyReadOnlyClassFromPadChromeToPadInner();
}

var getParam = function(paramName) {
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

var copyReadOnlyClassFromPadChromeToPadInner = function() {
  if (padIsReadOnly()) {
    theme.getThemeClassesTargets().addClass(READ_ONLY_CLASS);
  }
}

var padIsReadOnly = function() {
  return $('body').hasClass(READ_ONLY_CLASS);
}
