import React, {useState, useEffect} from 'react';
import {Badge, Container, Table} from 'react-bootstrap';

/**
 * Displays the Networks that can be found on the Docker Engine
 * @return {Hook}
 */
function Volumes() {
  const [volumes, setVolumes] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/volumes')
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setVolumes(data);
        })
        .catch((err) => {
          console.log(err.message);
        });
  }, []);
  const tdStyle = {
    'white-space': 'nowrap',
    'text-overflow': 'ellipsis',
    'overflow': 'hidden',
    'width': '100%',
    'max-width': '0',
  };

  return (
    <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Created</th>
            <th>Name</th>
            <th>Scope</th>
            <th>Driver</th>
            <th>Labels</th>
          </tr>
        </thead>
        <tbody>
          {
            volumes.Volumes && volumes.Volumes.map((volume, i) => {
              return (
                <tr key={i}>
                  <td>{volume.CreatedAt}</td>
                  <td style={tdStyle}>{volume.Name}</td>
                  <td>{volume.Scope}</td>
                  <td>{volume.Driver}</td>
                  <td>
                    {
                      volume.Labels && Object.entries(volume.Labels).map(([k, v]) => {
                        return (<Badge pill key={v} bg="secondary">{k}: {v}</Badge>);
                      })
                    }
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </Table>
    </Container>
  );
}

export default Volumes;
