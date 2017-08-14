var $ = require('ep_etherpad-lite/static/js/rjquery').$;

var MESSAGE_TYPE = 'ep_teksto_themes-set_theme';

exports.activateTheme = function(theme) {
  clearTheme();

  var themeName = 'theme-' + theme;
  getThemeClassesTargets().addClass(themeName);
}

var clearTheme = function() {
  var $body = getThemeClassesTargets();
  var originalClasses = $body.attr('class');

  var theme = /(?:^| )(theme-[_a-z]*)/.exec(originalClasses);
  if (theme && theme[1]) {
    $body.removeClass(theme[1]);
  }
}

/*
  e.data: {
    type: 'ep_teksto_themes-set_theme',
    theme: 'dark'
  }
*/
exports.listenToChangesOnTheme = function() {
  window.addEventListener('message', function(e) {
    if (e.data && e.data.type === MESSAGE_TYPE) {
      exports.activateTheme(e.data.theme);
    }
  });
}

exports.getThemeClassesTargets = function() {
  var $padOuter = $('iframe[name="ace_outer"]').contents();
  var $padInner = $padOuter.find('iframe[name="ace_inner"]').contents();

  // get body on all frames, so theme can be configured on all levels
  return $padInner.add($padOuter).add(document).find('body');
}
var getThemeClassesTargets = exports.getThemeClassesTargets;
