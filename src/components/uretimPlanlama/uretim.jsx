"use client";
import { Button, Table } from 'react-bootstrap';
import data from "./siparis.json";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import UpdateButtonComp from './updateButtonComp';
import "./uretimStyle.scss";
import PageHeader from '../common/page-header';

const Uretim = () => {
  const router = useRouter();
  const [update, setUpdate] = useState(data);
  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClick = (item) => {
    setShow(true);
    setSelectedItem(item);
  };

  const handleClose = () => {
    setShow(false);
    setSelectedItem(null);
  };

  const handleUpdateSubmit = (updatedItem) => {
    if (selectedItem) {
     
      setUpdate((prevData) =>
        prevData.map((item) =>
          item.siparis_no === updatedItem.siparis_no ? { ...item, ...updatedItem } : item
        )
      );
    } else {
     
      setUpdate((prevData) => [...prevData, { ...updatedItem, id: prevData.length + 1 }]);
    }
    handleClose();
  };

  const handleNewOrderClick = () => {
    setShow(true);
    setSelectedItem(null); 
  };

  const handleDelete = (siparisNo) => {
    setUpdate((prevData) => prevData.filter(item => item.siparis_no !== siparisNo));
  };

  return (
    <>
      {show && (
        <UpdateButtonComp
          item={selectedItem}
          onClose={handleClose}
          onSubmit={handleUpdateSubmit}
        />
      )}
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Siparis No</th>
            <th>Musteri No</th>
            <th>GASAN No</th>
            <th>Siparis Onay Tarihi</th>
            <th>Teslimat Tarihi</th>
            <th>Ürün Tipi</th>
            <th>Siparis Adedi</th>
            <th>Hazir Mil</th>     
            <th>Duzenle Buttons</th>     
            <th>Sil Buttons</th>
          </tr>
        </thead>
        <tbody>
          {update.map((item) => (
            <tr key={item.id}>
              <td>{item.siparis_no}</td>
              <td>{item.musteri_adi}</td>
              <td>{item.gasan_no}</td>
              <td>{item.siparis_onay_tarihi}</td>
              <td>{item.teslim_tarihi}</td>
              <td>{item.urun_tipi}</td>
              <td>{item.siparis_adedi}</td>
              <td>{item.hazir_mil}</td>
              <td>
                <Button variant="info" onClick={() => handleClick(item)} className="updatedBtn">
                  Düzenle
                </Button>
              </td>
              <td>
                <Button 
                  variant="danger" 
                  onClick={() => handleDelete(item.siparis_no)} 
                  className="deleteBtn">
                  Sil
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-grid gap-2">
        <Button size="lg" onClick={handleNewOrderClick} className="newOrderBtn">
          Yeni Siparis Giriniz
        </Button>
      </div>
    </>
  );
}

export default Uretim;