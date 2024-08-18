"use client";
import { Col, Container, Row } from 'react-bootstrap'
import data from "/src/json/menu.json";
import "./password.scss";
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import PageHeader from '../common/page-header';




const Password = () => {
  const pathname = usePathname()

  const [visibleInputId, setVisibleInputId] = useState(null);


  const handleDivClick = (id) => {
    setVisibleInputId(id);
   if(visibleInputId) {
    setVisibleInputId(null);
   }
    
  };

  
  const handleButtonClick = () => {
    setVisibleInputId(null);
  };

  return (
    <>
    {pathname === "/deneme1" && <PageHeader>ASD</PageHeader>}
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
                  <input  className = "input" name = "password" type="text" placeholder="Belirlemek Istediginiz Sifreyi Giriniz" />
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