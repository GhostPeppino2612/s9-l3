import { Container, Form, Row } from "react-bootstrap";
import SingleBook from "./SingleBook";
import { Component } from "react";

class Booklist extends Component {
  state = {
    film: "",
  };
  render() {
    return (
      <>
        <Container className="w-25 text-center">
          <Form.Label htmlFor="name">Nome del Film:</Form.Label>
          <Form.Control
            type="text"
            id="name"
            placeholder="Inserisci il Nome del Film"
            onChange={(e) => this.setState({ film: e.target.value })}
            value={this.state.film}
            required
          />
        </Container>
        <Container lg className="my-5">
          <Row lg={{ col: 4 }}>
            {this.props.array.filter(e => e.title.toLowerCase().includes(this.state.film.toLowerCase())).map((element) => {
              return <SingleBook element={element} key={element.asin} />;
            })}
          </Row>
        </Container>
      </>
    );
  }
}

export default Booklist;
