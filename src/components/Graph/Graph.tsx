import styled from "styled-components";
import cytoscape from "cytoscape";
import { useEffect, useRef, useState } from "react";
// import { v4 as uuid } from "uuid";
import { Button } from "react-bootstrap";

const StyledGraphWrapper = styled.div`
  height: 70%;
  width: 70%;
  background-color: lightgray;
`;

export default function Graph() {
  const [controls, setControls] = useState({
    isAddEnabled: false,
    shouldConnectEdge: false,
  });
  const [latestIDs, setLatestIDs] = useState({
    latestVertexID: 1,
    latestEdgeID: 1,
  });
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cyRef = useRef<any>(null);

  useEffect(() => {
    cyRef.current = cytoscape({
      container: wrapperRef.current,
      style: [{
        selector: 'node',
        css: {
          'label': 'data(id)',
          'text-valign': 'center',
        }
      }],
    });
  }, []);

  const onCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const position = { x: e.clientX, y: e.clientY };
    const button = e.button
    if (button === 2) {
      console.log("Right button clicked at position", position);
      // Open context menu
    }
    else if (button === 0 && controls.isAddEnabled) {
      console.log("Adding node at position", position);
      setLatestIDs({...latestIDs, latestVertexID: latestIDs.latestVertexID+1})
      cyRef.current.add([
        { group: "nodes", data: { id: "v" + latestIDs.latestVertexID }, renderedPosition: position },
      ]);
      console.log("Current nodes list: ", cyRef.current.nodes().map((ele: { id: () => any; })=>ele.id()))
    }
  };

  const onConnectClick = () => {
    const selectedNodes = cyRef.current.$(':selected');
    // If more than or less than two nodes are selected, ignore user input
    if (selectedNodes.length !== 2) {
      console.log("Invalid many nodes selected for connection, ignoring");
    }
    // If exactly two nodes are in selected state, join them via an edge
    else {
      const selectedNodesIDs = selectedNodes.jsons().map((ele: { [x: string]: { [x: string]: any; }; }) =>
          ele["data"]["id"]);
      console.log("Adding edge between vertices", selectedNodesIDs)
      setLatestIDs({...latestIDs, latestEdgeID: latestIDs.latestEdgeID + 1})
      cyRef.current.add([
        {group: "edges", data: {id: "e" + latestIDs.latestEdgeID, source: selectedNodesIDs[0], target: selectedNodesIDs[1]}}
      ])
      // Unselect after adding edge
      selectedNodes.unselect();
      setControls({
        isAddEnabled: false,
        shouldConnectEdge: false,
      });
    }
  }


  const onAddClick = () =>
    setControls((controls) => ({
      isAddEnabled: !controls.isAddEnabled,
      shouldConnectEdge: false,
    }));

  const onDeleteClick = () => {
    const selectedObjects = cyRef.current.$(':selected');
    console.log(selectedObjects);
    selectedObjects.remove();
    console.log("Deleted Objects", selectedObjects.jsons().map((ele: { [x: string]: { [x: string]: any; }; }) =>
                                                            ele["data"]["id"])
    )
  }


  return (
    <>
      <StyledGraphWrapper ref={wrapperRef} id="cy" onClick={onCanvasClick} />
      <div>
        <Button
          onClick={onAddClick}
          style={{ color: controls.isAddEnabled ? "#00F" : "#F00" }}
        >
          Add Node
        </Button>
        <Button
          onClick={onConnectClick}
          style={{ color: controls.shouldConnectEdge ? "#00F" : "#F00" }}
        >
          Connect Two Selected Nodes
        </Button>
        <Button
          onClick={onDeleteClick}
          style={{color: "#F00"}}
        >
          Delete Selected Nodes/Edges
        </Button>
      </div>
      <h1>Graph-GUI</h1>
    </>
  );
}
