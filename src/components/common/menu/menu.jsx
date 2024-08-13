"use client"
import { Col, Container, Row } from 'react-bootstrap'
import data from "./menu.json"
import "./menuDiv.scss"
import PageHeader from '../page-header'
import { useRouter } from 'next/navigation'
const Menu = () => {

 
  const router = useRouter();

  const handleClick = () => {
    router.push("/login");
  };


  return (
    <>
    <PageHeader>MENU</PageHeader>
    <Container className='text-center m-auto'>
        <Row className='menuRow'>
        {data.map((item) => (
            <Col  key={item.id}>
            <div
             style={{ backgroundColor: item.color }}
            onClick={handleClick} className={`menuDiv`}>{item.text}</div>
            </Col>
        ))}
       {/*  <div className='deneme'>asd</div> */}
        </Row>
    </Container>
    </>
  )
}

export default Menu