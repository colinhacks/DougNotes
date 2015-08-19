// if (Meteor.isClient){
//   Template.graph.onRendered(function() {
//   cy = cytoscape({

//     container: document.getElementById('graphShower'),
//     layout: {
//       name: 'null',

//       ready: function(){alert("start")}, // on layoutready
//       stop: function(){alert("stop")} // on layoutstop
//     },

//     // so we can see the ids
//     style: [
//       {
//         selector: 'node',
//         style: {
//           'content': 'data(id)'
//         }
//       }
//     ]

//   });



// t = [ {
//     "group": "nodes",
//     "data": {
//       "name": "yoyo",
//       "type": [
//         "inverse blarg",
//         "_value"
//       ],
//       "blarg": [
//         "1",
//         "2",
//         "3"
//       ],
//       "id": "SiLbbKbXbC9ugyxgh"
//     }
//   },
//   {
//     "group": "edges",
//     "data": {
//       "name": "1",
//       "source": "SiLbbKbXbC9ugyxgh",
//       "target": "XQrehpmAQqFFkw9dG"
//     }
//   },
//   {
//     "group": "edges",
//     "data": {
//       "name": "2",
//       "source": "SiLbbKbXbC9ugyxgh",
//       "target": "Kg9WA65gNyhhYnWaB"
//     }
//   },
//   {
//     "group": "edges",
//     "data": {
//       "name": "3",
//       "source": "SiLbbKbXbC9ugyxgh",
//       "target": "yfFr9fwvKq6LJNM2Y"
//     }
//   },
//   {
//     "group": "nodes",
//     "data": {
//       "type": [
//         "_value",
//         "blarg",
//         "_value"
//       ],
//       "name": "1",
//       "createdAt": 1438132445639,
//       "inverse blarg": "yoyo",
//       "id": "XQrehpmAQqFFkw9dG"
//     }
//   },
//   {
//     "group": "nodes",
//     "data": {
//       "type": [
//         "_value",
//         "blarg",
//         "_value"
//       ],
//       "name": "2",
//       "createdAt": 1438132445660,
//       "inverse blarg": "yoyo",
//       "id": "Kg9WA65gNyhhYnWaB"
//     }
//   },
//   {
//     "group": "nodes",
//     "data": {
//       "type": [
//         "_value",
//         "blarg",
//         "_value"
//       ],
//       "name": "3",
//       "createdAt": 1438132445675,
//       "inverse blarg": "yoyo",
//       "id": "yfFr9fwvKq6LJNM2Y"
//     }
//   },
//   {
//     "group": "nodes",
//     "data": {
//       "name": "yoya",
//       "type": [
//         "inverse b",
//         "_value"
//       ],
//       "b": [
//         "a",
//         "s",
//         "d",
//         "f"
//       ],
//       "id": "rT9sT2qNdFh6CEcHa"
//     }
//   },
//   {
//     "group": "edges",
//     "data": {
//       "name": "a",
//       "source": "rT9sT2qNdFh6CEcHa",
//       "target": "57Mxcz7gb3f4uuFri"
//     }
//   },
//   {
//     "group": "edges",
//     "data": {
//       "name": "s",
//       "source": "rT9sT2qNdFh6CEcHa",
//       "target": "hKxrcwuh4oECLNJ49"
//     }
//   },
//   {
//     "group": "edges",
//     "data": {
//       "name": "d",
//       "source": "rT9sT2qNdFh6CEcHa",
//       "target": "DQCnijs2cd2P9XPcN"
//     }
//   },
//   {
//     "group": "edges",
//     "data": {
//       "name": "f",
//       "source": "rT9sT2qNdFh6CEcHa",
//       "target": "E5xwpRHj26s6cHvQk"
//     }
//   },
//   {
//     "group": "nodes",
//     "data": {
//       "type": [
//         "_value",
//         "b",
//         "_value"
//       ],
//       "name": "a",
//       "createdAt": 1438132445756,
//       "inverse b": "yoya",
//       "id": "57Mxcz7gb3f4uuFri"
//     }
//   },
//   {
//     "group": "nodes",
//     "data": {
//       "type": [
//         "_value",
//         "b",
//         "_value",
//         "letters"
//       ],
//       "name": "s",
//       "createdAt": 1438132445773,
//       "inverse b": "yoya",
//       "inverse letters": "a",
//       "id": "hKxrcwuh4oECLNJ49"
//     }
//   },
//   {
//     "group": "nodes",
//     "data": {
//       "type": [
//         "_value",
//         "b",
//         "_value",
//         "letters"
//       ],
//       "name": "d",
//       "createdAt": 1438132445789,
//       "inverse b": "yoya",
//       "inverse letters": "a",
//       "id": "DQCnijs2cd2P9XPcN"
//     }
//   },
//   {
//     "group": "nodes",
//     "data": {
//       "type": [
//         "_value",
//         "b",
//         "_value",
//         "letters"
//       ],
//       "name": "f",
//       "createdAt": 1438132445802,
//       "inverse b": "yoya",
//       "inverse letters": "a",
//       "id": "E5xwpRHj26s6cHvQk"
//     }
//   },
//   {
//     "group": "nodes",
//     "data": {
//       "name": "yoyo",
//       "type": [
//         "inverse up",
//         "_value"
//       ],
//       "up": [
//         "down",
//         "left"
//       ],
//       "id": "iJ8aDwSfMEN3mHtLt"
//     }
//   },
//   {
//     "group": "edges",
//     "data": {
//       "name": "down",
//       "source": "iJ8aDwSfMEN3mHtLt",
//       "target": "DSrPZCXYNCPE7uyR9"
//     }
//   },
//   {
//     "group": "edges",
//     "data": {
//       "name": "left",
//       "source": "iJ8aDwSfMEN3mHtLt",
//       "target": "X8M5Z98pGCX4FWJBg"
//     }
//   },
//   {
//     "group": "nodes",
//     "data": {
//       "type": [
//         "_value",
//         "up",
//         "_value"
//       ],
//       "name": "down",
//       "createdAt": 1438132445842,
//       "inverse up": "yoyo",
//       "id": "DSrPZCXYNCPE7uyR9"
//     }
//   },
//   {
//     "group": "nodes",
//     "data": {
//       "type": [
//         "_value",
//         "up",
//         "_value"
//       ],
//       "name": "left",
//       "createdAt": 1438132445855,
//       "inverse up": "yoyo",
//       "id": "X8M5Z98pGCX4FWJBg"
//     }
//   },
//   {
//     "group": "nodes",
//     "data": {
//       "name": "a",
//       "type": [
//         "inverse letters",
//         "_value"
//       ],
//       "letters": [
//         "s",
//         "d",
//         "f"
//       ],
//       "id": "2J3myPMhv3X5ZCG37"
//     }
//   },
//   {
//     "group": "edges",
//     "data": {
//       "name": "s",
//       "source": "2J3myPMhv3X5ZCG37",
//       "target": "hKxrcwuh4oECLNJ49"
//     }
//   },
//   {
//     "group": "edges",
//     "data": {
//       "name": "d",
//       "source": "2J3myPMhv3X5ZCG37",
//       "target": "DQCnijs2cd2P9XPcN"
//     }
//   },
//   {
//     "group": "edges",
//     "data": {
//       "name": "f",
//       "source": "2J3myPMhv3X5ZCG37",
//       "target": "E5xwpRHj26s6cHvQk"
//     }
//   }] ; 


//   cy.add(t);

// });
// }
