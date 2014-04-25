<html>
  <head>
    <link rel="stylesheet" href="/codemirror/codemirror.css" />
    <link rel="stylesheet" href="/codemirror/solarized.css" />
    <link rel="stylesheet" href="/style/pppaste.css" />
  </head>
  <body>

    <section id="code-wrapper">

      <div id="frame-wrapper"></div>

      <textarea id="code">{{code}}</textarea>
    </section>

    <section id="sidebar">
      <h1>pppaste</h1>
      <div id="view-buttons">
        <a href="#edit" class="view-code">Edit Code</a>
        <a href="#output" class="view-output">View Output</a>
      </div>
      <button id="save">Share Code</button>
    </section>

    <script src="/codemirror/codemirror.js"></script>
    <script src="/codemirror/javascript/javascript.js"></script>
    <script src="/codemirror/css/css.js"></script>
    <script src="/codemirror/xml/xml.js"></script>
    <script src="/codemirror/htmlmixed/htmlmixed.js"></script>
    <script src="http://cdn.jsdelivr.net/pouchdb/2.1.2/pouchdb.min.js"></script>
    <script src="/js/pppaste.js"></script>

    <script>
    </script>
  </body>
</html>
