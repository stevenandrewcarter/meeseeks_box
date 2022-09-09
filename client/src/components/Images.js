import React, {useState, useEffect} from 'react';
import {Container, Table} from 'react-bootstrap';
import moment from 'moment';

/**
 * Displays the Images that can be found on the Docker Engine
 * @return {Hook}
 */
function Images() {
  const [images, setImages] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/images')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setImages(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Created</th>
            <th>Tags</th>
            <th>Size (GB)</th>
            <th>VirtualSize (GB)</th>
            <th>Labels</th>
          </tr>
        </thead>
        <tbody>
          {
            images.map((image, i) => {
              return (
                <tr key={i}>
                  <td>{image.Id.substring(7, 19)}</td>
                  <td>{moment(new Date(image.Created * 1000)).format('YYYY/MM/DD HH:mm:SS')}</td>
                  <td>{image.RepoTags.join(',')}</td>
                  <td>{(image.Size / (1000 * 1000 * 1000)).toFixed(2)} GB</td>
                  <td>{(image.VirtualSize / (1000 * 1000 * 1000)).toFixed(2)} GB</td>
                  <td>{image.Labels}</td>
                </tr>
              );
            })
          }
        </tbody>
      </Table>
    </Container>
  );
}

export default Images;
