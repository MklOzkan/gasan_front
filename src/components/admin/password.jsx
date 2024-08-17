"use client";
import { Col, Container, Row } from 'react-bootstrap'
import data from "/src/json/menu.json";
import "./password.scss";
import { useState } from 'react';




const Password = () => {
  // State to manage which input is visible
  const [visibleInputId, setVisibleInputId] = useState(null);

  // Function to handle div click
  const handleDivClick = (id) => {
    setVisibleInputId(id);
  };

  // Function to handle button click
  const handleButtonClick = () => {
    setVisibleInputId(null);
  };

  return (
    <>
      <Container className="text-center m-auto">
        <Row className="menuRow">
          {data.map((item) => (
            <Col key={item.id}>
              <div 
                className="menuDiv" 
                onClick={() => handleDivClick(item.id)}
              >
                {item.text}
              </div>
              {visibleInputId === item.id && (
                <div className="inputDiv">
                  <input  className = "input" type="text" placeholder="Belirlemek Istediginiz Sifreyi Giriniz" />
                  <button onClick={handleButtonClick}>Submit</button>
                </div>
              )}
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Password;