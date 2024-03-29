import React, {useState, useEffect} from 'react';
import {Alert, Badge, Container, Table} from 'react-bootstrap';
import moment from 'moment';
import {ContainerService} from '../services';

/**
 * Displays the Containers that can be found on the Docker Engine
 * @return {Hook}
 */
function Containers() {
  const [containers, setContainers] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const service = new ContainerService();

  useEffect(() => {
    try {
      setContainers(service.getAll());
    } catch (err) {
      console.log(`Error! ${err.message}`);
      setErrorMsg(err.message);
    }
  }, []);

  return (
    <Container>
      {errorMsg && <Alert variant='danger'>{errorMsg}</Alert>}
      {!errorMsg && (
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
      )}
    </Container>
  );
}

export default Containers;
