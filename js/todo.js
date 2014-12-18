function TODO(listBox, listInput){
  localStorage["list"] = localStorage["list"] || JSON.stringify([]);
  this.listBox = listBox;
  this.listInput = listInput;
  this.previousState
}

TODO.prototype = {

  init: function(){
    this.listInput.addEventListener('keydown', this.addValueToList.bind(this), false);
    this.listBox.addEventListener('click', this.handleClick.bind(this), false);
    window.addEventListener("storage", this.handleStorage.bind(this), false);
    this.parseLocalStorage("list").forEach(function(item){
      this.appendItemToList(item);
    }.bind(this));
  },

  addValueToList: function(e){
    if (e.keyCode === 13) {
      if (e.target.value !== "") this.appendToLocalStorage("list", e.target.value);
      e.target.value = "";
    }
  },

  appendToLocalStorage: function(storageKey, newValue) {
    var dataArray = JSON.parse(localStorage[storageKey]);
    dataArray.push(newValue);
    localStorage[storageKey] = JSON.stringify(dataArray);
    this.appendItemToList(newValue);
  },

  appendItemToList: function(stringToAdd){
    var li = document.createElement("li");
    var x = document.createElement("button");
    li.innerHTML = stringToAdd;
    x.innerHTML = "X"
    x.classList.add('x');
    li.appendChild(x);
    this.listBox.appendChild(li);
  },

  handleClick: function(e){
    if (e.target.className == "x"){
      this.removeItemFromList(e.target.parentElement);
    } else if (e.toElement.nodeName == "LI") {
      // IMPLEMENT REORDERING OR HIGH-LIGHTING
      e.target.style.color != "red" ? e.target.style.color = "red" : e.target.style.color = "white"
    }
  },

  removeItemFromList: function(li){
    var listData = this.parseLocalStorage("list")
    var string = li.innerHTML.replace(/(.*)\<button class\=\"x\"\>X\<\/button\>/,'$1');
    var index = listData.indexOf(string);
    listData.splice(index,1);
    localStorage["list"] = JSON.stringify(listData);
    this.listBox.removeChild(li);
  },

  handleStorage: function(e){
    var key = e.key;
    var newValue = e.newValue;
    var oldValue = e.oldValue;
    var listData = this.parseLocalStorage(key);
    // When there is an adittion
    if (newValue.length > oldValue.length) appendItemToList(listData[listData.length - 1]);
    // When there is a subtraction
    if (newValue.length < oldValue.length) {
      this.listBox.innerHTML = ""
      this.parseLocalStorage("list").forEach(function(item){
        this.appendItemToList(item);
      }.bind(this));
    };
  },

  parseLocalStorage: function(storageKey){
    return JSON.parse(localStorage[storageKey]);
  },

}

