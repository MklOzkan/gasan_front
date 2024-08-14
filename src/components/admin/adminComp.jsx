"use client";
import { Col, Container, Row } from "react-bootstrap";
import data from "@/json/adminMenu.json";
import "../common/menu/menuDiv.scss";
import { useRouter } from "next/navigation";
import Spacer from "@/components/common/spacer.jsx";
import PageHeader from "../common/page-header";
const AdminMenu= () => {
  const router = useRouter();

  const handleClick = (param) => {
    
    router.push("/login");
  };

  return (
    <>
      <PageHeader>YÖNETİCİ EKRANI</PageHeader>
      <Spacer height={50} />
      <Container className="text-center m-auto">
        <Row className="menuRow">
          {data.map((item) => (
            <Col key={item.id}>
              <div
                style={{ backgroundColor: item.color }}
                onClick={() => handleClick(item.id)}
                className={`menuDiv`}
              >
                {item.text}
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default AdminMenu;
