class Graph{
    constructor()
    {
        this.nodes = [];
        this.graph = {};
        this.start = null;
        this.end = null;
    }

    addNode(node)
    {
        this.nodes.push(node)
        let title = node.value;
        this.graph[title] = node;
    }

    getNode(node)
    {
        return this.graph[node]
    }
    setStart(actor)
    {
        this.start = this.graph[actor]
        return this.start;
    }
    setEnd(actor)
    {
        this.end = this.graph[actor]
        return this.end
    }

    reset()
    {
        for (let i = 0 ; i< this.nodes.length ; i++)
        {
            this.nodes[i].searched = false;
            this.nodes[i].parent = null;
        }
    }

}
