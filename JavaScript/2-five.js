'use strict';

function Tree(data) {
  this.count = 1;
  this.root = new Node(null, data);
  this.root.tree = this;
}

function Node(parent, data) {

  this.prev = null;//parent
  this.next = null;//parent
  this.first = null;//child
  this.last = null;//child

  this.data = data;//content
  this.parent = parent;
  this.count = 0;//child amount
  if (parent) {
    this.tree = parent.tree;
    this.tree.count++;
    if (parent.count < 1) {
      parent.first = this;
    }
    if (parent.last) {
      parent.last.next = this;
      this.prev = parent.last;
    }
    parent.last = this;
    parent.count++;
  }
  

  this.setParent = function(node /*new parent node*/) {
    //1
    if(this.parent.count ===1) {
      this.parent.first = null;
      this.parent.last = null;
    } else {
  	  if(this === this.parent.first)
  	    this.parent.first = this.prev;
  	  else if(this === this.parent.last)
  	  this.parent.last = this.next;
  	}

  	//2
    if(this.parent.count !== 1) {
      this.prev.next = this.next;
      this.next.prev = this.prev;
    }
    this.parent.count--;

    //3
    if(node.count === 0) {
  	  node.first = this;
  	  node.last = this;
  	} else {
  	  node.last.next = this;
  	  node.last = this;
  	}

  	node.count++;
  	this.parent = node;
  }
}

let tree = new Tree({ name: 'root' });
let n1 = new Node(tree.root, { name: 'n1' });
let n2 = new Node(tree.root, { name: 'n2' });
let n3 = new Node(tree.root, { name: 'n3' });

console.dir(tree, { depth: null });
