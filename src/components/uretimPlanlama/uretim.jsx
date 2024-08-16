"use client";
import { Button, Table } from 'react-bootstrap';
import data from "./siparis.json";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import UpdateButtonComp from './updateButtonComp';

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

  return (
    <>
      {show && <UpdateButtonComp item={selectedItem} onClose={handleClose} />}
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
            <th>Buttons</th>     
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
                <Button variant="primary" onClick={() => handleClick(item)}>
                  Düzenle
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default Uretim;
