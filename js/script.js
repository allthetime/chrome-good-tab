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