
var dbUrl = document.location.protocol + '//' +
  document.location.host + '/db/pastes/';
var db = new PouchDB(dbUrl, {skipSetup: true, cache: false});

// I cant set an id on a select box, wtf?
var select = document.getElementById('templates');

db.request({url: 'templates'}, function(err, res) {
  res.forEach(function(tpl) {
    var option = document.createElement('option');
    option.value = tpl;
    option.textContent = tpl;
    select.appendChild(option);
  });
});

select.addEventListener('change', function() {
  if (select.value) {
    document.location.href = '/template/' + select.value;
  }
});

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

function doc() {
  return {
    _id: suid(),
    code: editor.getValue()
  };
};

function savePaste() {
  if (save.dataset.sending) return;

  save.dataset.sending = true;
  db.put(doc()).then(function (res) {
    document.location.href = '/paste/' + res.id + '/';
  }).catch(function (err) {
    // Retry on conflicts
    console.log(err);
    if (err.status === 409) {
      return savePaste();
    }
    delete save.dataset.sending;
    console.error(err);
  });
}

function suid() {
  return ("000000" + (Math.random()*Math.pow(36,6) << 0)
          .toString(36)).slice(-6);
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
