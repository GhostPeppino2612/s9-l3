import { Component } from "react";
import { Card, Col, ListGroup } from "react-bootstrap";

class SingleBook extends Component {
  state = {
    selected: false,
  };
  render() {
    return (
      <>
        <Col>
          <Card
            data-testid={`book-card-${this.props.element.asin}`}
            border={this.state.selected ? "danger" : "border"}
            onClick={(e) =>
              this.state.selected
                ? this.setState({ selected: false })
                : this.setState({ selected: true })
            }
            style={{ width: "18rem" }}
          >
            <Card.Img variant="top" src={this.props.element.img} />
            <Card.Body>
              <Card.Title>{this.props.element.title}</Card.Title>
              <Card.Text>
                Categoria:
                {this.props.element.category}
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>Prezzo: {this.props.element.price}$</ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </>
    );
  }
}

export default SingleBook;
