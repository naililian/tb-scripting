/*
/ 
/ Script to find all sub nodes, by node type,  until three 
/ sub-levels on Toon Boom Harmony. 
/ The script was created with Harmony 20 by Lilian Penzo.
/ v.01
/
*/

/**
 * Function to get all selected nodes by types. 
 * @param   {String} type 
 * @returns {Array} 
 */
function getAllNodesByType(type) {

    //Inserts Undo in the script:
    scene.beginUndoRedoAccum("getNodesByType");

    //Delete the MessageLog from Toom Boom:
    MessageLog.clearLog();
    //Create a Variable of "MessageLog.trace":
    var log = MessageLog.trace;

    //Message Begin the Script:
    log("............................Script getNodesByType starts.........................");

    //Create a empty list:
    var list = [];
    //Select Nodes list on scene (level 1):
    var selectedNodes = selection.selectedNodes();

    //If there is not selection:
    if (selectedNodes == 0) {
        MessageBox.information("You don't have selected anything.");
    }

    //If there is selection:
    else {
        //Make a bucle for each node, to find more nodes inside, if it's a group node:
        for (var i = 0; i < selectedNodes.length; i++) {
            var selectedNode = selectedNodes[i];
            //Level 2:
            //Get subnodes of selected nodes:
            var subNodes = getSubNodes(selectedNode);

            if (node.isGroup(selectedNode)) {

                log('\n' + JSON.stringify(subNodes, null, 4))
                var listNodoType = getNodesByType(subNodes, type);
                var list = list.concat(listNodoType);

            }

            else if ((node.type(selectedNode)) == type) {

                var listNodoTypeAlone = getNodesByType(selectedNodes, type);
                var list = list.concat(listNodoTypeAlone);
            }


        }

        log("The nodos types are....");
        log('\n' + JSON.stringify(list, null, 4))

        return list;
    }
    log("............................Script getNodesByType ends.........................");

    scene.endUndoRedoAccum();


}


/**
 * Function to get Subnodes in a selection with group nodes:
 * @param   {String} selectedNode path of selected node.
 * @returns {Array}  list of subnodes from selected node. 
 */

function getSubNodes(selectedNode) {
    //if (selectedNodes ==="undefined") selectedNodes = false;

    var subNodos = node.subNodes(selectedNode);
    var listSubnodes = [];

    for (var i = 0; i < subNodos.length; i++) {

        var subNode = subNodos[i];
        listSubnodes.push(subNode);

        //Search inside of group inside of selected node:
        if (node.isGroup(subNode)) {

            var subSubNodes = node.subNodes(subNode);

            listSubnodes.push(subSubNodes);

        }

    }

    //MessageLog.trace("list nodes ARE............" + listSubnodes);

    return listSubnodes;

}


function getAllNodesCurrentScene() {

}

/**
 * Function to get the nodes of a list the selected nodes
 * @param   {Array}    listNodes 
 * @param   {String}   type 
 * @returns {Array}    list of a type of nodes. 
 */

function getNodesByType(listNodes, type) {

    listNodeTypes = []
    for (var i = 0; i < listNodes.length; i++) {

        var nodo = listNodes[i];
        //If the nodes are in a group:
        if (node.isGroup(nodo)) {
            //Get subnodes:
            var listSubnodes = getSubNodes(nodo);

            for (var h = 0; h < listSubnodes.length; h++) {
                //Filter the type of node:
                if (node.type(listSubnodes[h]) == type) {
                    //Join the first list result with the new result --->Concat. 
                    var listNodeTypes = listNodeTypes.concat(listSubnodes[h])
                }
            }
        }

        //If the nodes are not in a group, filter the type:
        else if (node.type(nodo) == type) {
            //Join the first list result with the new result --->Concat. 
            var listNodeTypes = listNodeTypes.concat(nodo)
        }

        //MessageLog.trace("The LIST type of nodes are....");
        //MessageLog.trace('\n' + JSON.stringify(listNodeTypes, null, 4))

    }

    return listNodeTypes;

}


/**
 * Function to allow to know the type of selected node. 
 * @returns {String} type of selected Node.
 */
function getSelectedNodeType() {

    var nodosSeleccionados = selection.selectedNodes();
    MessageLog.trace("Qué nodos son....");
    MessageLog.trace('\n' + JSON.stringify(nodosSeleccionados, null, 4));


    for (i = 0; i < nodosSeleccionados.length; i++) {

        var nodoSeleccionado = nodosSeleccionados[i];
        //MessageLog.trace("Qué nodos son...."+nodoSeleccionado);

        var nodeType = node.type(nodoSeleccionado);

        MessageLog.trace("EL tipo de nodo es....." + nodeType);

    }
    return nodeType;

}


/**
 * Function to add a drawing node, creating its column and link them. 
 * @param {String}  nodeName name of future node.
 * @param {Int}     posX     position on X on virtual node view coordinates. 
 * @param {Int}     posY     position on Y on virtual node view coordinates. 
 */
function addDrawingNode(nodeName, posX, posY) {

    var nodeName;
    var elemID = element.add(nodeName, "COLOR", 12, "SCAN", "TVG");
    column.add(nodeName, "DRAWING");
    column.setElementIdOfDrawing(nodeName, elemID);

    var createdNode = node.add((node.root()), nodeName, "READ", posX, posY, 0);
    node.linkAttr(createdNode, "DRAWING.ELEMENT", nodeName);

    return createdNode;


}