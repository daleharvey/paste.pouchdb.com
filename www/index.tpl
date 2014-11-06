<html>
  <head>
    <title>paste.pouchdb.com</title>
    <link rel="stylesheet" href="/codemirror/codemirror.css" />
    <link rel="stylesheet" href="/codemirror/solarized.css" />
    <link rel="stylesheet" href="/style/pppaste.css" />
  </head>
  <body>

    <a target="_blank" href="https://github.com/daleharvey/paste.pouchdb.com">
      <div class="ribbon">Github</div>
    </a>

    <section id="code-wrapper">

      <div id="frame-wrapper"></div>

      <textarea id="code">{{code}}</textarea>
    </section>

    <section id="sidebar">

      <h1>paste.pouchdb.com</h1>

      <div id="view-buttons">
        <a href="#edit" class="view-code">Edit Code</a>
        <a href="#output" class="view-output">View Output</a>
      </div>
      <button id="save">Share Code</button>
      <div id="select-wrapper">
        <select id="templates">
          <option>Templates</option>
        </select>
      </div>
    </section>

    <script src="/codemirror/codemirror.js"></script>
    <script src="/codemirror/javascript/javascript.js"></script>
    <script src="/codemirror/css/css.js"></script>
    <script src="/codemirror/xml/xml.js"></script>
    <script src="/codemirror/htmlmixed/htmlmixed.js"></script>
    <script src="//cdn.jsdelivr.net/pouchdb/3.0.6/pouchdb.js"></script>
    <script src="/js/pppaste.js"></script>
  </body>
</html>
