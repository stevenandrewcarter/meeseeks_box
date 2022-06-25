import React, {useState} from 'react';

import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import PropTypes from 'prop-types';
import './App.css';
import {Badge, Button, ButtonGroup, ListGroup, Table} from 'react-bootstrap';

const ExampleToast = ({children}) => {
  const [show, toggleShow] = useState(true);

  return (
    <Toast show={show} onClose={() => toggleShow(!show)}>
      <Toast.Header>
        <strong className="mr-auto">React-Bootstrap</strong>
      </Toast.Header>
      <Toast.Body>{children}</Toast.Body>
    </Toast>
  );
};
ExampleToast.propTypes = {
  children: PropTypes.array,
};

const NavBar = () => {
  return (
    <Nav defaultActiveKey="/home" as="ul">
      <Nav.Item as="li">
        <Nav.Link href="/home">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link eventKey="link-1">Link</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link eventKey="link-2">Link</Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

const Boxes = [
  {name: 'NodeTestBox', image: 'alpine', language: 'NodeJS', status: 'running'},
  {name: 'GoTestBox', image: 'alpine', language: 'Go', status: 'stopped'},
  {name: 'PythonTestBox', image: 'alpine', language: 'Python', status: 'error'},
];

const App = () => (
  <Container className="p-3">
    <Container className="p-5 mb-4 bg-light rounded-3">
      <NavBar />
      <h1 className="header">Meeseeks Box</h1>
      <ExampleToast>
        We now have Toasts
        <span role="img" aria-label="tada">
          🎉
        </span>
      </ExampleToast>
      <ListGroup horizontal>
        <ListGroup.Item>Running <Badge>0</Badge></ListGroup.Item>
        <ListGroup.Item>Stopped <Badge>0</Badge></ListGroup.Item>
        <ListGroup.Item>Error <Badge>0</Badge></ListGroup.Item>
      </ListGroup>
      <ButtonGroup aria-label="Main Controls">
        <Button variant="primary">Add</Button>
        <Button variant="secondary">Edit</Button>
      </ButtonGroup>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Language</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {
            Boxes.map((box, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{box.name}</td>
                  <td>{box.language}</td>
                  <td>{box.status}</td>
                </tr>
              );
            })
          }
        </tbody>
      </Table>
    </Container>
  </Container>
);

export default App;
