let data;
let graph;
let dropDown1;
let dropDown2

function preload()
{
  data = loadJSON("top-rated-indian-movies-01.json")
}

function setup() {
  createDiv(`<h1>Bollywood Connector!!</h1>`).addClass("heading")
  createP(`This program shows the connection between diffrent actors. This is based on BFS algorithm to find
  shortest path between two nodes. This shows how many people two actors should have in mutual to know 
  each other.<br>
  If it just returns the name of actor, hence they have no mutual circle according to dataset.`)
  graph = new Graph();
  dropDown1 = createSelect()
  dropDown1.addClass("dropdown1")
  dropDown2 = createSelect()
  dropDown2.addClass("dropdown2")
  dropDown1.changed(bfs)
  dropDown2.changed(bfs)
  
  
  noCanvas()
  const movies = data.movies;
  for (let i = 0; i < movies.length; i ++)
  {
    let movie = movies[i].title
    let cast = movies[i].actors
    let movieNode = new Node(movie);
    graph.addNode(movieNode);
    for (let j = 0; j < cast.length ; j++)
    {
      let actor = cast[j];
      let actorNode = graph.getNode(actor)
      if (actorNode == undefined)
      {
        actorNode = new Node(actor)
        dropDown1.option(actor)
        dropDown2.option(actor)
      }
      graph.addNode(actorNode);
      movieNode.addEdge(actorNode)
    }
  }
}

function bfs()
{
  graph.reset()
  let start = graph.setStart(dropDown1.value())
  let end = graph.setEnd(dropDown2.value())

  let queue = [];
  start.searched = true;
  queue.push(start)

  while (queue.length > 0)
  {
    let current = queue.shift()
    if (current == end)
    {
      console.log("Found the Goal!!", current.value)
      break;
    }
    else
    {
      let edges = current.children
      for (let i = 0; i< edges.length; i++)
      {
        let neighbour = edges[i]
        if (!neighbour.searched)
        {
          neighbour.searched = true;
          neighbour.parent = current;
          queue.push(neighbour);
        }
      }
    }
  }
  let path = []
  path.push(end)
  let next = end.parent
  while (next)
  {
    path.push(next)
    next = next.parent;
  }
  let text = ""
  for (let i = path.length-1; i>= 0; i--)
  {
    if (i == 0)
    {
      text += path[i].value + "<br>"
    }
    else
    {
      text += path[i].value + " ---> "
    }
  }
  createP(text)
}

function draw() {
  background(220);
}
