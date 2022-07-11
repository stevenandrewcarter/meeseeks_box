import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
  Badge,
  Button,
  ButtonGroup,
  ButtonToolbar,
  Col,
  Container,
  Form,
  ListGroup,
  Modal,
  Row,
  Table,
} from 'react-bootstrap';
import {Exclamation, Pencil, Play, Plus, Stop, Trash} from 'react-bootstrap-icons';

const Boxes = [
  {name: 'NodeTestBox', image: 'alpine', language: 'NodeJS', status: 'running'},
  {name: 'GoTestBox', image: 'alpine', language: 'Go', status: 'stopped'},
  {name: 'PythonTestBox', image: 'alpine', language: 'Python', status: 'error'},
  {name: 'NodeFlexBox', image: 'alpine', language: 'NodeJS', status: 'running'},
];


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

/**
 * Display the Functions current running in the Meeseeks Engine
 * @return {Hook}
 */
function Functions() {
  const [show, setShow] = useState(false);
  const [boxes, setBoxes] = useState(Boxes);
  const [selectedBoxes, setSelectedBoxes] = useState([]);
  const handleSave = ({name, image, language}) => {
    boxes.push({
      name, image, language, status: 'stopped',
    });
    setBoxes(boxes);
    setShow(false);
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDelete = () => {
    let tmpBoxes = boxes.slice();
    tmpBoxes = tmpBoxes.filter((b) => !selectedBoxes.includes(b));
    setBoxes(tmpBoxes);
  };
  const handleStart = () => {
    const tmpBoxes = boxes.slice();
    selectedBoxes.forEach((box) => {
      box.status = 'running';
      // tmpBoxes[i].status = 'running';
    });
    setBoxes(tmpBoxes);
  };
  const handleStop = () => {
    const tmpBoxes = boxes.slice();
    selectedBoxes.forEach((box) => {
      box.status = 'stopped';
      // tmpBoxes[i].status = 'stopped';
    });
    setBoxes(tmpBoxes);
  };
  const handleSelectedBoxes = (selectedBox) => {
    console.log(selectedBox);
    const existing = selectedBoxes.find((b) => b === selectedBox);
    if (!existing) {
      selectedBoxes.push(selectedBox);
      setSelectedBoxes(selectedBoxes);
    } else {
      setSelectedBoxes(selectedBoxes.filter((b) => b !== selectedBox));
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <ButtonToolbar>
            <ButtonGroup className="me-2" aria-label="Main Controls">
              <Button size="sm" variant="primary" onClick={handleShow}><Plus/> New</Button>
              <BoxModal show={show} handleClose={handleClose} handleSave={handleSave}></BoxModal>
              <Button variant="secondary"><Pencil/></Button>
              <Button variant="danger" onClick={handleDelete}><Trash/></Button>
            </ButtonGroup>
            <ButtonGroup className="me-2">
              <Button variant="success" onClick={handleStart}><Play/></Button>
              <Button variant="danger" onClick={handleStop}><Stop/></Button>
            </ButtonGroup>
            <ListGroup className="me-2" horizontal>
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
          </ButtonToolbar>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th style={{width: '1%'}}>#</th>
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
                        <Form>
                          <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check checked={selectedBoxes.includes(box)} type="checkbox"
                              onChange={(event) => handleSelectedBoxes(box)} />
                          </Form.Group>
                        </Form>
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
        </Col>
      </Row>
    </Container>
  );
}

export default Functions;
