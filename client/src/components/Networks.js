import React, {useState, useEffect} from 'react';
import {Badge, Container, Table} from 'react-bootstrap';

/**
 * Displays the Networks that can be found on the Docker Engine
 * @return {Hook}
 */
function Networks() {
  const [networks, setNetworks] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/networks')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setNetworks(data);
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
            <th>Name</th>
            <th>Scope</th>
            <th>Driver</th>
            <th>Labels</th>
          </tr>
        </thead>
        <tbody>
          {
            networks.map((network, i) => {
              return (
                <tr key={i}>
                  <td>{network.Id.substring(0, 12)}</td>
                  <td>{network.Created}</td>
                  <td>{network.Name}</td>
                  <td>{network.Scope}</td>
                  <td>{network.Driver}</td>
                  <td>{Object.entries(network.Labels).map(([k, v]) => {
                    return (<Badge pill key={v} bg="secondary">{k}: {v}</Badge>);
                  })}</td>
                </tr>
              );
            })
          }
        </tbody>
      </Table>
    </Container>
  );
}

export default Networks;
