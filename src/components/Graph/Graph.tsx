import styled from "styled-components";
import cytoscape from "cytoscape";
import {Component, Fragment} from "react";
import {v4 as uuid} from "uuid";
import {Button} from "react-bootstrap";

const StyledGraphWrapper = styled.div`{
  height: 70%;
  width: 70%;
  background-color: grey;
}`;

class Graph extends Component<{},{addNode: boolean, connectEdge: boolean, cy: cytoscape.Core}>{
  constructor(props: any) {
    super(props);
    this.state = {
      addNode: false,
      connectEdge: false,
      cy: cytoscape(),
    };
  }

  onCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const position = { x: e.clientX, y: e.clientY };
    // const button = e.button
    if(this.state.addNode) {
      console.log("Adding node at position", position);

      this.state.cy.add([
        {group: "nodes", data: {id: uuid()}, renderedPosition: position},
      ]);
    }
  };

  onAddNodeClick = () => {
    console.log("Button Add Node Clicked!");
    this.setState({addNode: !this.state.addNode});
  }

  onConnectEdgeClick = () => {
    console.log("Button Connect Edge Clicked!");
    this.setState({addNode: false, connectEdge: !this.state.connectEdge});
  }

  render() {
    return (
        <Fragment>
          <StyledGraphWrapper id="cy" onClick={this.onCanvasClick}/>
          <div>
          <Button onClick={this.onAddNodeClick} style={{color: this.state.addNode ? "#00F" : "#F00"}}>
            Add Node
          </Button>
          <Button onClick={this.onConnectEdgeClick} style={{color: this.state.connectEdge ? "#00F" : "#F00"}}>
            Connect Edge
          </Button>
          </div>
          <h1>Graph-GUI</h1>
        </Fragment>
    );
  }

}
export default Graph
