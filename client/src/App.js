import React, {useState} from 'react';

import './App.css';
import {
  Container,
  Nav,
  Navbar,
} from 'react-bootstrap';
import Containers from './components/Containers';
import Images from './components/Images';
import Functions from './components/Functions';

const App = () => {
  const [selectedPage, setSelectedPage] = useState(0);

  return (
    <Container className="p-3">
      <Container className="p-5 mb-4 bg-light rounded-3">
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="#home">Meeseeks Box</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav fill variant="tabs" className="me-auto" defaultActiveKey="#home">
                <Nav.Link href="#home" onClick={() => setSelectedPage(0)}>Home</Nav.Link>
                <Nav.Link href="#containers" onClick={() => setSelectedPage(1)}>Containers</Nav.Link>
                <Nav.Link href="#images" onClick={() => setSelectedPage(2)}>Images</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        {selectedPage === 0 && <Functions></Functions>}
        {selectedPage === 1 && <Containers></Containers>}
        {selectedPage === 2 && <Images></Images>}
      </Container>
    </Container>
  );
};

export default App;
