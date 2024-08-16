"use client";
import { Button, Table } from 'react-bootstrap';
import data from "./siparis.json";
import { useRouter } from 'next/navigation';

const Uretim = () => {

  const router = useRouter();

  const handleEdit = (id) => {
   
    router.push(`/update/${id}`)//duzenle sayfasi yazilacak deneme icin login yaptik.
  };

  return (
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
      </tr>
    </thead>
   
    <tbody>
     { data.map((item) => (
        <tr key = {item.id}>
          <td>{item.siparis_no}</td>
          <td>{item.musteri_adi}</td>
          <td>{item.gasan_no}</td>
          <td>{item.siparis_onay_tarihi}</td>
          <td>{item.teslim_tarihi}</td>
          <td>{item.urun_tipi}</td>
          <td>{item.siparis_adedi}</td>
          <td>{item.hazir_mil}</td>

          <td>
              <Button variant="primary" onClick={() => handleEdit(item.id)}>
                Düzenle
              </Button>
            </td>
        </tr>
      ))}

   
      
    </tbody>
  </Table>
);
}
  


export default Uretim
