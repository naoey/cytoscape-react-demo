import styled from "styled-components";
import cytoscape from "cytoscape";
import { useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import { Button } from "react-bootstrap";

const StyledGraphWrapper = styled.div`
  height: 70%;
  width: 70%;
  background-color: grey;
`;

export default function Graph() {
  const [controls, setControls] = useState({
    isAddEnabled: false,
    shouldConnectEdge: false,
  });
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cyRef = useRef<any>(null);

  useEffect(() => {
    cyRef.current = cytoscape({ container: wrapperRef.current });
  }, []);

  const onCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const position = { x: e.clientX, y: e.clientY };
    // const button = e.button
    if (controls.isAddEnabled) {
      console.log("Adding node at position", position);

      cyRef.current.add([
        { group: "nodes", data: { id: uuid() }, renderedPosition: position },
      ]);
    }
  };

  const onConnectClick = () =>
    setControls((controls) => ({
      isAddEnabled: false,
      shouldConnectEdge: !controls.shouldConnectEdge,
    }));

  const onAddClick = () =>
    setControls((controls) => ({
      ...controls,
      isAddEnabled: !controls.isAddEnabled,
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
