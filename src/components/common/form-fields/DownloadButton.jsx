'use client';

import { downloadExcelFile } from '@/services/uretimplanlama-service';
import { FaDownload } from 'react-icons/fa6';
import DateSelectModal from '@/components/common/form-fields/DateSelectionModal.jsx';
import React, { useState } from 'react';
import styles from './download-button.module.scss';

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
            await downloadExcelFile(startDate || '', endDate || '');
        } catch (error) {
            console.error('Error downloading file:', error);
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
