function Draggable(clickTarget,moveTarget){
  this.clickTarget = clickTarget;
  this.moveTarget = moveTarget || clickTarget;
  this.lastMarginTop = 0;
  this.lastMarginLeft = 0;
  this.lastY;
  this.lastX;
}

Draggable.prototype = {
  addListener: function(e){
    this.clickTarget.addEventListener('mousedown', this.startDrag.bind(this), false);
  },
  startDrag: function(e){
    this.stop = this.stopDrag.bind(this);
    this.drag = this.dragging.bind(this);
    document.addEventListener('mouseup', this.stop , false);
    document.addEventListener('mousemove', this.drag, false);
    this.lastY = e.y;
    this.lastX = e.x;
  },
  stopDrag: function(e){
    document.removeEventListener('mousemove', this.drag, false);
    document.removeEventListener('mouseup', this.stop, false);
    this.lastMarginTop = parseInt(this.moveTarget.style.marginTop);
    this.lastMarginLeft = parseInt(this.moveTarget.style.marginLeft);
  },
  dragging: function(e){
    this.moveTarget.style.marginTop = this.lastMarginTop - (this.lastY - e.y);
    this.moveTarget.style.marginLeft = this.lastMarginLeft - (this.lastX - e.x);
  },
}

