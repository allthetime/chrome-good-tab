function Background(uploadButton){

}

Background.prototype = {

}

var backgroundButton = document.querySelector('#background-button');
var backgroundUpload = document.querySelector('#background-upload');
var db;
var openDB = window.indexedDB.open("good-tab", 1)

// document.body.style.opacity = "0";


openDB.onupgradeneeded = function(e){
  console.log("initialized");
  db = e.target.result;
  var objectStore = db.createObjectStore("background-image");
}

openDB.onsuccess = function(e){
  db = e.target.result;
  var transaction = db.transaction(["background-image"]);
  var objectStore = transaction.objectStore("background-image");
  var request = objectStore.get("file");

  request.onsuccess = function(event) {
    if (request.result == undefined){
      console.log("nothing here");
    } else {
      var file = request.result
      var url = URL.createObjectURL(file);
      var invisibleImage = new Image();
      invisibleImage.src = url;
      invisibleImage.onload = function(){
        // document.body.style.transition = "1s opacity";
        document.body.style.background = "url("+url+") no-repeat center center fixed";
        document.body.style.webkitBackgroundSize = "cover";
        // document.body.style.opacity = "1";
      }
    }
  };
}

backgroundButton.addEventListener('click', function(){ backgroundUpload.click(); }, false);
backgroundUpload.addEventListener('change', function(e){
  var file = e.target.files[0];
  var store = db.transaction(['background-image'], 'readwrite').objectStore('background-image');
  var req = store.put(file, 'file');
  var url = URL.createObjectURL(file);
  // document.body.style.transition = "1s";
  document.body.style.background = "url("+url+") no-repeat center center fixed";
  document.body.style.webkitBackgroundSize = "cover";
}, false);

