import React, {useState, useEffect} from 'react';
import {Badge, Container, Table} from 'react-bootstrap';
import moment from 'moment';

/**
 * Displays the Containers that can be found on the Docker Engine
 * @return {Hook}
 */
function Containers() {
  const [containers, setContainers] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/containers')
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setContainers(data);
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
            <th>Names</th>
            <th>State</th>
            <th>Status</th>
            <th>Labels</th>
          </tr>
        </thead>
        <tbody>
          {
            containers.map((container, i) => {
              return (
                <tr key={i}>
                  <td>{container.Id.substring(7, 19)}</td>
                  <td>{moment(new Date(container.Created * 1000)).format('YYYY/MM/DD HH:mm:SS')}</td>
                  <td>{container.Names.join(',')}</td>
                  <td>{container.State}</td>
                  <td>{container.Status}</td>
                  <td>
                    {Object.entries(container.Labels).map(([k, v]) => {
                      return (<Badge pill key={v} bg="secondary">{k}: {v}</Badge>);
                    })}
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

export default Containers;
