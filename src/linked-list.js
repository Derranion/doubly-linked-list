const Node = require('./node');

class LinkedList {
    constructor() {
        this.length = 0;
        this._head = null;
        this._tail = null;
    }

    append(data) {
        var currentNode = new Node(data);

        if (this._head == null){
            this._head = currentNode;
            this._tail = currentNode;
            this.length++;

            return this;
        }

        this._tail.next = currentNode;
        currentNode.prev = this._tail;
        this._tail = currentNode;
        this.length++;

        return this;
    }

    head() {
        if (this._head != null){
            return this._head.data
        } else {
            return null;
        }
    }

    tail() {
        if (this._tail != null){
            return this._tail.data
        } else {
            return null;
        }
    }

    nodeAt(index){
        if (index < 0 || index > this.length){
            return null;
        }

        var currentNode, i;
        if (index > this.length / 2){
            currentNode = this._tail;
            i = this.length - 1;
            while (i-- != index ){
                currentNode = currentNode.prev;
            }

        } else {
            currentNode = this._head;
            i=0;
            while (i++ != index){
                currentNode = currentNode.next;
            }
        }
            return currentNode;
    }

    at(index) {
        return this.nodeAt(index).data;
    }

    insertAt(index, data) {
        if (index < 0){
            return null;
        }
        if (index >= this.length){
            return this.append(data);
        }

        var currentNode = this.nodeAt(index);
        var insertedNode = new Node(data, currentNode.prev, currentNode);
        currentNode.prev = insertedNode;

        if (index == 0){
            this._head = insertedNode;
        } else {
            insertedNode.prev.next = insertedNode;
        }
        this.length++;

        return this;
    }

    isEmpty() {
        if (this.length == 0){
            return true;
        }
        return false;
    }

    clear() {

        this.length = 0;
        this._head = null;
        this._tail = null;

        return this;
    }

    deleteAt(index) {
        var nodeToDelete = this.nodeAt(index);

        if (index < 0 || index > this.length){
            return null;
        }
        if(this.length == 1){
            this.clear();
        }

        if(nodeToDelete.next != null){
            nodeToDelete.next.prev = nodeToDelete.prev;
        }
        if(nodeToDelete.prev != null){
            nodeToDelete.prev.next = nodeToDelete.next;
        }
        this.length--;

        return this;
    }

    reverse() {
        if (this.length==1){
            return this;
        }
        var easyData = this._head,
            score = 0,
            onePunch = [];

        while(easyData != null){
            onePunch.push(easyData.data);
            easyData = easyData.next;
        }

        easyData = this._tail;

        while(easyData != null){
            easyData.data = onePunch[score++];
            easyData = easyData.prev;
        }
        return this;
    }

    indexOf(data) {
        var index = 0;
        var currentNode = this._head;

        while(index++ < this.length){
            if(currentNode.data == data){
                return index -1;
            } else {
                currentNode = currentNode.next;
            }
        }

        return -1;
    }
}

module.exports = LinkedList;
