import styled from "styled-components";
import cytoscape from "cytoscape";
import { useEffect, useRef } from "react";
import { v4 as uuid } from "uuid";

const StyledGraphWrapper = styled.div`
  height: 100%;
  width: 100%;
  background-color: grey;
`;

export default function Graph() {
  const cyRef = useRef<any>(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    cyRef.current = cytoscape({ container: wrapperRef.current });
  }, []);

  const onCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const position = { x: e.clientX, y: e.clientY };

    console.log("Adding node at position", position);

    cyRef.current.add([
      { group: "nodes", data: { id: uuid() }, renderedPosition: position },
    ]);
  };

  return (
    <StyledGraphWrapper id="cy" ref={wrapperRef} onClick={onCanvasClick}>
      <h1>hello world</h1>
    </StyledGraphWrapper>
  );
}
