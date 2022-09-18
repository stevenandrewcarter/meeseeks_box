import React, {useEffect, useState} from 'react';
import {
  Badge,
  Button,
  ButtonGroup,
  ButtonToolbar,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
  Table,
} from 'react-bootstrap';
import {Exclamation, Pencil, Play, Plus, Stop, Trash} from 'react-bootstrap-icons';
import {FunctionService, ImageService} from '../services';
import BoxModal from './BoxModal';

/**
 * Display the Functions current running in the Meeseeks Engine
 * @return {Hook}
 */
function Functions() {
  const [show, setShow] = useState(false);
  const [boxes, setBoxes] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const functionService = new FunctionService();
  const imageService = new ImageService();

  useEffect(() => {
    console.log('....loading....');
    setLoading(true);
    (async function() {
      try {
        setBoxes(await functionService.getAll());
      } catch (err) {
        console.error(err);
      }
    })();
    (async () => setImages(await imageService.getAll()))();
    setLoading(false);
  }, []);

  const [selectedBoxes, setSelectedBoxes] = useState([]);
  const handleSave = async ({name, imageId, language}) => {
    const response = await functionService.create({name, imageId, language, status: 'stopped'});
    boxes.push(response);
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
    const existing = selectedBoxes.find((b) => b === selectedBox);
    if (!existing) {
      selectedBoxes.push(selectedBox);
      setSelectedBoxes(selectedBoxes);
    } else {
      setSelectedBoxes(selectedBoxes.filter((b) => b !== selectedBox));
    }
  };

  return (
    <>
      {loading && <div>...Data Loading...</div>}
      {!loading &&
      <Container>
        <Row>
          <Col>
            <ButtonToolbar>
              <ButtonGroup className="me-2" aria-label="Main Controls">
                <Button size="sm" variant="primary" onClick={handleShow}><Plus/> New</Button>
                <BoxModal show={show} images={images} handleClose={handleClose} handleSave={handleSave}></BoxModal>
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
                    {boxes.filter((b) => b.status === 'running').length}
                  </Badge>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Stop/> Stopped <Badge bg="secondary">
                    {boxes.filter((b) => b.status === 'stopped').length}
                  </Badge>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Exclamation/> Error <Badge bg="danger">
                    {boxes.filter((b) => b.status === 'error').length}
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
                    if (images.length === 0) {
                      return;
                    }
                    const image = images.find((img) => img.Id === box.imageId);
                    console.log(image);
                    return (
                      <tr key={i}>
                        <td>
                          <Form>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                              <Form.Check checked={selectedBoxes.includes(box)} type="checkbox"
                                onChange={() => handleSelectedBoxes(box)} />
                            </Form.Group>
                          </Form>
                        </td>
                        <td>{box.name}</td>
                        <td>{image.RepoTags[0]}</td>
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
      }
    </>
  );
}

export default Functions;
