<!doctype html>
<html lang="en">
  <meta charset="utf-8">
  <title>My Paste</title>
  <script src="http://cdn.jsdelivr.net/pouchdb/2.1.2/pouchdb.min.js"></script>
  <script>
    var db = new PouchDB('testing');
    db.post({a: 'doc'}, function(err, doc) {
      console.log('I POSTED!', doc);
    });
  </script>
</html>