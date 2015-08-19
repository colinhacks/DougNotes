updateLayout = function(cy,layout,animate){
  
  layout["animate"] = animate;
  console.log(layout);
  var l = cy.makeLayout(layout);
  l.run();
  return l;

}


colaOptions = {
  name: 'cola',

  animate: true, // whether to show the layout as it's running
  refresh: 1, // number of ticks per frame; higher is faster but more jerky
  maxSimulationTime: 4000, // max length in ms to run the layout
  ungrabifyWhileSimulating: false, // so you can't drag nodes during layout
  fit: true, // on every layout reposition of nodes, fit the viewport
  padding: 30, // padding around the simulation
  boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }

  // layout event callbacks
  ready: function(){}, // on layoutready
  stop: function(){}, // on layoutstop

  // positioning options
  randomize: false, // use random node positions at beginning of layout
  avoidOverlap: true, // if true, prevents overlap of node bounding boxes
  handleDisconnected: true, // if true, avoids disconnected components from overlapping
  nodeSpacing: function( node ){ return 10; }, // extra spacing around nodes
  flow: undefined, // use DAG/tree flow layout if specified, e.g. { axis: 'y', minSeparation: 30 }
  alignment: undefined, // relative alignment constraints on nodes, e.g. function( node ){ return { x: 0, y: 1 } }

  // different methods of specifying edge length
  // each can be a constant numerical value or a function like `function( edge ){ return 2; }`
  edgeLength: undefined, // sets edge length directly in simulation
  edgeSymDiffLength: undefined, // symmetric diff edge length in simulation
  edgeJaccardLength: undefined, // jaccard edge length in simulation

  // iterations of cola algorithm; uses default values on undefined
  unconstrIter: undefined, // unconstrained initial layout iterations
  userConstIter: undefined, // initial layout iterations with user-specified constraints
  allConstIter: undefined, // initial layout iterations with all constraints including non-overlap

  // infinite layout options
  infinite: false // overrides all other options for a forces-all-the-time mode
};


nullOptions = {
  name: 'null',
  ready: function(){alert("start")}, // on layoutready
  stop: function(){alert("stop")} // on layoutstop
}

coseOptions = {
  name: 'cose',

  // Called on `layoutready`
  ready               : function() {},

  // Called on `layoutstop`
  stop                : function() {},

  // Whether to animate while running the layout
  animate             : false,

  // Number of iterations between consecutive screen positions update (0 -> only updated on the end)
  refresh             : 4,
  
  // Whether to fit the network view after when done
  fit                 : true, 

  // Padding on fit
  padding             : 30, 

  // Constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
  boundingBox         : undefined,

  // Whether to randomize node positions on the beginning
  randomize           : true,
  
  // Whether to use the JS console to print debug messages
  debug               : false,

  // Node repulsion (non overlapping) multiplier
  nodeRepulsion       : 1000000,
  
  // Node repulsion (overlapping) multiplier
  nodeOverlap         : 100,
  
  // Ideal edge (non nested) length
  idealEdgeLength     : 17,
  
  // Divisor to compute edge forces
  edgeElasticity      : 100,
  
  // Nesting factor (multiplier) to compute ideal edge length for nested edges
  nestingFactor       : 5, 
  
  // Gravity force (constant)
  gravity             : 250, 
  
  // Maximum number of iterations to perform
  numIter             : 100,
  
  // Initial temperature (maximum node displacement)
  initialTemp         : 1000,
  
  // Cooling factor (how the temperature is reduced between consecutive iterations
  coolingFactor       : 0.95, 
  
  // Lower temperature threshold (below this point thishe layout will end)
  minTemp             : 1.0
};

dagreOptions = {
  name: 'dagre',

  // dagre algo options, uses default value on undefined
  nodeSep: undefined, // the separation between adjacent nodes in the same rank
  edgeSep: undefined, // the separation between adjacent edges in the same rank
  rankSep: undefined, // the separation between adjacent nodes in the same rank
  rankDir: undefined, // 'TB' for top to bottom flow, 'LR' for left to right
  minLen: function( edge ){ return 1; }, // number of ranks to keep between the source and target of the edge
  edgeWeight: function( edge ){ return 1; }, // higher weight edges are generally made shorter and straighter than lower weight edges
  
  // general layout options
  fit: true, // whether to fit to viewport
  padding: 30, // fit padding
  animate: true, // whether to transition the node positions
  animationDuration: 500, // duration of animation in ms if enabled
  boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
  ready: function(){}, // on layoutready
  stop: function(){} // on layoutstop
};

arborOptions = {
  name: 'arbor',

  animate: true, // whether to show the layout as it's running
  maxSimulationTime: 4000, // max length in ms to run the layout
  fit: true, // on every layout reposition of nodes, fit the viewport
  padding: 30, // padding around the simulation
  boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
  ungrabifyWhileSimulating: false, // so you can't drag nodes during layout

  // callbacks on layout events
  ready: undefined, // callback on layoutready 
  stop: undefined, // callback on layoutstop

  // forces used by arbor (use arbor default on undefined)
  repulsion: undefined,
  stiffness: undefined,
  friction: undefined,
  gravity: true,
  fps: undefined,
  precision: undefined,

  // static numbers or functions that dynamically return what these
  // values should be for each element
  // e.g. nodeMass: function(n){ return n.data('weight') }
  nodeMass: undefined, 
  edgeLength: undefined,

  stepSize: 0.1, // smoothing of arbor bounding box

  // function that returns true if the system is stable to indicate
  // that the layout can be stopped
  stableEnergy: function( energy ){
    var e = energy; 
    return (e.max <= 0.5) || (e.mean <= 0.3);
  },

  // infinite layout options
  infinite: false // overrides all other options for a forces-all-the-time mode
};
