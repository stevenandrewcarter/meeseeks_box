import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Form, Modal} from 'react-bootstrap';

/**
 * @param {Object} param0
 * @return {Object}
 */
export default function BoxModal({show, images, handleSave, handleClose}) {
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
            <Form.Select aria-label='Select Image Name' onChange={(event) => {
              box.imageId = event.target.value;
              setBox(box);
            }}>
              {images.map((image) => {
                return (
                  <option key={image.Id} value={image.Id}>{image.RepoTags[0].substring(0, 60)}</option>
                );
              })}
            </Form.Select>
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
}
BoxModal.propTypes = {
  show: PropTypes.bool,
  images: PropTypes.arrayOf(PropTypes.object),
  handleClose: PropTypes.func,
  handleSave: PropTypes.func,
};
