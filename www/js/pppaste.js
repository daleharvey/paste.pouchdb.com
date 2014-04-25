
var dbUrl = document.location.protocol + '//' +
  document.location.host + '/db/pastes/';
var db = new PouchDB(dbUrl, {skipSetup: true});

function hashChanged() {
  var hash = document.location.hash.slice(1) || 'edit';
  document.body.dataset.view = hash;
  if (hash === 'output') {
    setIframeContent();
  }
  editor.refresh();
}

function setIframeContent() {
  var content = editor.getValue();
  var iframe = document.createElement('iframe');
  frameWrapper.innerHTML = '';
  frameWrapper.appendChild(iframe);
  var frameWin = iframe.contentWindow;
  frameWin.document.write(content);
  frameWin.document.close();

  var check_loaded = function() {
    if (!frameWin.document) {
      window.clearInterval(timer);
    } else if (frameWin.document.body) {
      window.clearInterval(timer);
      if (typeof frameWin.onload == 'function') {
        frameWin.onload();
      }
    }
  };
  var timer = window.setInterval(check_loaded, 20);
}

function savePaste() {
  db.post({code: editor.getValue()}).then(function(res) {
    document.location.href = '/paste/' + res.id + '/';
  });
}

var code = document.getElementById('code');
var save = document.getElementById('save');

var codeWrapper = document.getElementById('code-wrapper');
var frameWrapper = document.getElementById('frame-wrapper');

var editor = CodeMirror.fromTextArea(code, {
  lineNumbers: true,
  theme: 'solarized dark',
  mode: 'htmlmixed'
});

editor.on("blur", function(){
  editor.save();
});

save.addEventListener('click', savePaste);

window.addEventListener('hashchange', hashChanged);
hashChanged();
