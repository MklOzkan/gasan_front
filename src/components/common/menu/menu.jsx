"use client";
import { Col, Container, Row } from "react-bootstrap";
import data from "./menu.json";
import "./menuDiv.scss";
import PageHeader from "../page-header";
import { useRouter } from "next/navigation";
import Spacer from "@/components/common/spacer.jsx";
const Menu = ({ menu = "MENU", jsonData = data }) => {
  const router = useRouter();

  const handleClick = (param) => {
    if (param === "8") {
      router.push("/adminLogin");
      return;
    }
    router.push("/login");
  };

  return (
    <>
      <PageHeader>{menu}</PageHeader>
      {jsonData[7].text === "YÖNETIM" ? null : <Spacer height={250} />}
      <Spacer height={50} />
      <Container className="text-center m-auto">
        <Row className="menuRow">
          {jsonData.map((item) => (
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

export default Menu;
