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
  const [latestVertexID, setLatestVertexID] = useState<number>(1);
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
      setLatestVertexID(latestVertexID+1)
      cyRef.current.add([
        { group: "nodes", data: { id: latestVertexID }, renderedPosition: position },
      ]);
      console.log("Current nodes list: ", cyRef.current.nodes().map((e: { id: () => any; })=>e.id()))
    }
  };

  const onConnectClick = () =>
    setControls((controls) => ({
      isAddEnabled: false,
      shouldConnectEdge: !controls.shouldConnectEdge,
    }));

  const onAddClick = () =>
    setControls((controls) => ({
      isAddEnabled: !controls.isAddEnabled,
      shouldConnectEdge: false,
    }));

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
          Connect Edge
        </Button>
      </div>
      <h1>Graph-GUI</h1>
    </>
  );
}
