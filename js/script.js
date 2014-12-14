// Drag center box

var center = document.querySelector('#center');
dragCenterBar = new Draggable(center, center);
dragCenterBar.addListener();

// TODO list

var list = document.querySelector('#list');
var addToList = document.querySelector('#add_to_list');

todoList = new TODO(list, addToList);
todoList.init();

dragList = new Draggable(list, list);
dragList.addListener();



var backgroundButton = document.querySelector('#background-button');
var backgroundUpload = document.querySelector('#background-upload');

backgroundButton.addEventListener('click', function(){ backgroundUpload.click(); }, false);
backgroundUpload.addEventListener('change', function(e){

  var file = e.target.files[0];

  var openDB = window.indexedDB.open("good-tab", 1)

  openDB.onsuccess = function(e){
    console.log("opened");
    db = e.target.result;
    var store = db.transaction(['background-image'], 'readwrite').objectStore('background-image');
    var req = store.put(file, 'file');
    var url = URL.createObjectURL(file);
    document.body.style.background = "url("+url+") no-repeat center center fixed";
    document.body.style.webkitBackgroundSize = "cover";
  }

    // var store = db.transaction(['background-image'], 'readwrite').objectStore('background-image');
    // var req = store.put(file, 'file');
    // console.log(req);



    // var store = db.transaction(['good-tab'], 'readwrite').objectStore('good-tab');
    // var req = store.put(file, 'background-image');

    // console.log(req);

  // var reader = new FileReader();
  // reader.readAsDataURL(e.target.files[0]);
  // reader.onloadend = function(e){
  //   localStorage["good-tab-background-image"] = e.target.result
  //   document.body.style.background = "url("+localStorage["good-tab-background-image"]+") no-repeat center center fixed";
  //   document.body.style.webkitBackgroundSize = "cover";
  // }
}, false);

var openDB = window.indexedDB.open("good-tab", 1)

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
      document.body.style.background = "url("+url+") no-repeat center center fixed";
      document.body.style.webkitBackgroundSize = "cover";
    }
  };

}
