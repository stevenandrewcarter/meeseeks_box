import React, {useState} from 'react';

import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import PropTypes from 'prop-types';
import './App.css';
import {
  Badge,
  Button,
  ButtonGroup,
  ButtonToolbar,
  Col,
  Form,
  ListGroup,
  Modal,
  Row,
  Table,
} from 'react-bootstrap';
import {Exclamation, Pencil, Play, Plus, Stop, Trash} from 'react-bootstrap-icons';

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

const BoxModal = ({show, handleClose, handleSave}) => {
  const [box, setBox] = useState({});
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>New Meeseeks Box</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Box Name</Form.Label>
            <Form.Control placeholder="Enter Box Name" onChange={(event) => {
              box.name = event.target.value;
              setBox(box);
            }} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control placeholder="Enter Image Name"onChange={(event) => {
              box.image = event.target.value;
              setBox(box);
            }} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Language</Form.Label>
            <Form.Control placeholder="Enter Language" onChange={(event) => {
              box.language = event.target.value;
              setBox(box);
            }} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary" onClick={() => handleSave(box)}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
};
BoxModal.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  handleSave: PropTypes.func,
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
  {name: 'NodeFlexBox', image: 'alpine', language: 'NodeJS', status: 'running'},
];

const App = () => {
  const [show, setShow] = useState(false);
  const [boxes, setBoxes] = useState(Boxes);
  const handleSave = ({name, image, language}) => {
    boxes.push({
      name, image, language, status: 'stopped',
    });
    setBoxes(boxes);
    setShow(false);
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDelete = (name) => {
    setBoxes(boxes.filter((b) => b.name !== name));
  };
  const handleStart = (name) => {
    const index = boxes.findIndex((box) => box.name === name);
    if (index !== -1) {
      const tmpBoxes = boxes.slice();
      tmpBoxes[index].status = 'running';
      setBoxes(tmpBoxes);
    }
  };
  const handleStop = (name) => {
    const index = boxes.findIndex((box) => box.name === name);
    if (index !== -1) {
      const tmpBoxes = boxes.slice();
      tmpBoxes[index].status = 'stopped';
      setBoxes(tmpBoxes);
    }
  };

  return (
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
        <Container>
          <Row>
            <Col md="auto">
            </Col>
            <Col className="d-flex justify-content-end">
              <ListGroup horizontal>
                <ListGroup.Item>
                  <ButtonGroup aria-label="Main Controls">
                    <Button size="sm" variant="primary" onClick={handleShow}><Plus/> New</Button>
                    <BoxModal show={show} handleClose={handleClose} handleSave={handleSave}></BoxModal>
                  </ButtonGroup>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Play/> Running <Badge bg="primary">
                    {Boxes.filter((b) => b.status === 'running').length}
                  </Badge>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Stop/> Stopped <Badge bg="secondary">
                    {Boxes.filter((b) => b.status === 'stopped').length}
                  </Badge>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Exclamation/> Error <Badge bg="danger">
                    {Boxes.filter((b) => b.status === 'error').length}
                  </Badge>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={{width: '20%'}}>#</th>
              <th>Name</th>
              <th>Image</th>
              <th>Language</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {
              boxes.map((box, i) => {
                return (
                  <tr key={i}>
                    <td>
                      <ButtonToolbar>
                        <ButtonGroup>
                          <Button variant="success" onClick={() => handleStart(box.name)}><Play/></Button>
                          <Button variant="danger" onClick={() => handleStop(box.name)}><Stop/></Button>
                        </ButtonGroup>
                        <ButtonGroup>
                          <Button variant="secondary"><Pencil/></Button>
                          <Button variant="danger" onClick={() => handleDelete(box.name)}><Trash/></Button>
                        </ButtonGroup>
                      </ButtonToolbar>
                    </td>
                    <td>{box.name}</td>
                    <td>{box.image}</td>
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
};

export default App;
