
include("TB_FindAndReplaceNodeName.js");


function ungroupRigParts() {

    MessageLog.trace("Starting Script....")

    //Create UI interface:
    var ui = new QWidget();
    //Creating Layout:
    var principalLayout = new QVBoxLayout();
    principalLayout.objectName = "principalLayout";

    var interfacehorizontalLayout = new QHBoxLayout();
    interfacehorizontalLayout.objectName = "interfacehorizontalLayout";

    var column01Layout = new QVBoxLayout();
    column01Layout.objectName = "column01Layout";

    var column02Layout = new QVBoxLayout();
    column02Layout.objectName = "column02Layout";

    var buttonsLayout = new QHBoxLayout();
    buttonsLayout.objectName = "buttonsLayout";

    principalLayout.addLayout(interfacehorizontalLayout);
    principalLayout.addLayout(buttonsLayout);
    interfacehorizontalLayout.addLayout(column01Layout);
    interfacehorizontalLayout.addLayout(column02Layout);

    //Setting layout:
    ui.setLayout(principalLayout);

    ui.windowTitle = "Ungroup Rig Parts";
    ui.minimumWidth = 500;

    //Resume names dialog UI:

    var layoutPpal = ui.principalLayout;
    var columnOldNameUI = layoutPpal.interfacehorizontalLayout.column01Layout;
    var columnNewNameUI = layoutPpal.interfacehorizontalLayout.column02Layout;
    var buttonsUI = layoutPpal.buttonsLayout;


    //Add buttons:

    var okButtonUI = new QToolButton();
    okButtonUI.text = "OK";
    buttonsUI.addWidget(okButtonUI, 1, 1);

    var cancelButtonUI = new QToolButton();
    cancelButtonUI.text = "Cancel";
    buttonsUI.addWidget(cancelButtonUI, 1, 1);


    //Create and add lists:

    //List Old Names:
    var titleOldListUI = new QLabel();
    titleOldListUI.text = "OLD NODE NAMES";
    columnOldNameUI.addWidget(titleOldListUI, 0, 1);
    var listOldNamesUI = new QListWidget();
    columnOldNameUI.addWidget(listOldNamesUI, 1, 1);


    //List New Names
    var titleNewListUI = new QLabel();
    titleNewListUI.text = "CHANGE TO NEW NODE NAMES";
    columnNewNameUI.addWidget(titleNewListUI, 0, 1);
    var listNewNamesUI = new QListWidget();
    columnNewNameUI.addWidget(listNewNamesUI, 1, 1);
 



    //Display contents in first list:

    displayListContent(listOldNamesUI, listNewNamesUI);

    var test = listNewNamesUI.currentItem();

    MessageLog.trace("THE NAME OS SELECTED ITEM IS..."+test)


        ui.show();


        var test = listNewNamesUI.currentItem();

        MessageLog.trace("THE NAME OS SELECTED ITEM IS..."+test.text())


}





ungroupRigParts();

 var test = listNewNamesUI.currentItem();

    MessageLog.trace("THE NAME OS SELECTED ITEM IS..."+test)



function displayListContent(listOldWidget, listNewWidget) {

    var selectNodes = selection.selectedNodes();
    var selectedNode = selectNodes[0];

    var allNodesInside = node.subNodes(selectedNode);

    var listDrawingNodes = [];

    for (var i = 0; i < allNodesInside.length; i++) {

        var nodeDrawing = allNodesInside[i];
        var nodeDrawingName = node.getName(nodeDrawing);


        if (node.type(nodeDrawing) == "READ") { listOldWidget.addItem(nodeDrawingName) }

        if (node.type(nodeDrawing) == "READ") {
            listNewWidget.addItem(nodeDrawingName);
            

        }

        MessageLog.trace("Add Items Old Names");

    }


}











