import { Form, Button } from "react-bootstrap";
import "./uretimStyle.scss";

const UpdateButtonComp = ({ item, onClose }) => {
  const formFields = [
    { label: "Sipariş No", key: "siparis_no", type: "text" },
    { label: "Müşteri No", key: "musteri_adi", type: "text" },
    { label: "GASAN No", key: "gasan_no", type: "text" },
    { label: "Sipariş Onay Tarihi", key: "siparis_onay_tarihi", type: "date" },
    { label: "Teslimat Tarihi", key: "teslim_tarihi", type: "date" },
    { label: "Ürün Tipi", key: "urun_tipi", type: "text" },
    { label: "Sipariş Adedi", key: "siparis_adedi", type: "number" },
    { label: "Hazır Mil", key: "hazir_mil", type: "number" },
  ];

  return (
    <div className="updateAnaDiv">
      <div className="uretimDiv">
        <Form className="w-100 p-4">
          {formFields.map((field) => (
            <Form.Group
              className="mb-3"
              controlId={`form${field.key}`}
              key={field.key}
            >
              <Form.Label>{field.label}</Form.Label>
              <Form.Control
                type={field.type}
                defaultValue={item ? item[field.key] : ""}
              />
            </Form.Group>
          ))}
          <div className="button-group">
            <Button className="updateBtn" variant="success" type="submit">
              Kaydet
            </Button>
            <Button className="updateBtn" variant="danger" onClick={onClose}>
              Kapat
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default UpdateButtonComp;
