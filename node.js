class Node{
    constructor(value)
    {
        this.value = value;
        this.children = [];
        this.searched = false;
        this.parent = null;
    }

    addEdge(node)
    {
        this.children.push(node)
        node.children.push(this)
    }
}
