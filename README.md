# ep_teksto_themes
Handles themes to change editor styles. Provide theme name on the URL, or by posting a message to `window`.

## Usage

URL param:

```
http://localhost/p/myPad?theme=dark
```

Message post to Etherpad window:

This is useful when Etherpad is displayed on an iframe, so you cannot manually set styles or classes according to the theme you want to use.

```
var message = {
  type: 'ep_teksto_themes-set_theme',
  theme: 'dark'
};

this.editorIFrame.contentWindow.postMessage(message, '*');
```
