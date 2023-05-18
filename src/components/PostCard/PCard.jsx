import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function PCard() {
  return (
    <Card
      style={{
        flexDirection: "row",
      }}
    >
      <Card.Img
        src="https://picsum.photos/200/300"
        style={{ width: "200px", height: "240px" }}
      />
      <Card.Body>
        <Card.Title>Title Text</Card.Title>
        <Card.Text>Here's some fillllllller text</Card.Text>
        <div className="d-flex justify-content-between">
          <Button className="ms-3">Add</Button>
          <Button className="me-3">Remove</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default PCard;
