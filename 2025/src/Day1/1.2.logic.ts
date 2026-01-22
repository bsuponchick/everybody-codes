export class Node {
    value: string;
    left: Node;
    right: Node;

    constructor(value: string) {
        this.value = value;
    }

    setLeft(node: Node) {
        this.left = node;
    }

    setRight(node: Node) {
        this.right = node;
    }

    getLeft() {
        return this.left;
    }

    getRight() {
        return this.right;
    }

    getValue() {
        return this.value;
    }
}

export class CircularLinkedList {
    head: Node;
    tail: Node;

    constructor(values: string[]) {
        this.head = null;
        this.tail = null;

        for (const value of values) {
            this.add(value);
        }
    }

    add(value: string) {
        const node = new Node(value);
        if (this.head === null) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.setRight(node);
            node.setLeft(this.tail);
        }
        this.tail = node;
        this.tail.setRight(this.head);
        this.head.setLeft(this.tail);
    }

    remove(node: Node) {
        if (node === this.head) {
            this.head = this.head.getRight();
        } else if (node === this.tail) {
            this.tail = this.tail.getLeft();
        }
    }
}