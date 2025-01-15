'use client';

import { downloadExcelFile } from '@/services/download-service';
import { FaDownload } from 'react-icons/fa6';
import DateSelectModal from '@/components/common/form-fields/DateSelectionModal.jsx';
import React, { useState } from 'react';
import styles from './download-button.module.scss';
import { swAlert } from '@/helpers/swal';
import { convertFormDataToJSON } from '@/helpers/form-validation';

export default function DownloadButton() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const downloadExcel = async (startDate, endDate) => {
        try {
            const res = await downloadExcelFile(startDate || '', endDate || '');
            if (res.ok) {
                swAlert('Excel dosyası başarıyla indirildi.', 'success');
            } else {
                swAlert('Excel dosyası indirilirken bir hata oluştu.', 'error');
            }
        } catch (error) {
            swAlert(error.message, 'error');
        }
    };


    return (
      <div>
         <button
          className={styles.btn}
          type="button"
          title='Excel Olarak İndir'
          onClick={handleOpenModal}
      >
          <FaDownload />
            </button> 
            <DateSelectModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onDownload={downloadExcel}
            />
      </div>
      
  );
}
