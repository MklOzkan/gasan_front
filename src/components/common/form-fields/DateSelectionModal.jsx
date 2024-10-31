

import React, { useState, useEffect } from 'react';
import styles from './date-select-modal.module.scss';

export default function DateSelectModal({ isOpen, onClose, onDownload }) {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleDownload = () => {
        onDownload(startDate, endDate);
        onClose();
    };

    useEffect(() => {
        if (!isOpen) {
            setStartDate('');
            setEndDate('');
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className={styles.modal_overlay} onClick={onClose}>
            <div
                className={styles.modal_content}
                onClick={(e) => e.stopPropagation()}
            >
                <h2>Tarih Aralığı Seçin</h2>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    placeholder="Start Date"
                    className={styles.date_input}
                />
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    placeholder="End Date"
                    className={styles.date_input}
                />
                <button
                    type="button"
                    onClick={handleDownload}
                    className={styles.download_button}
                >
                    İndir
                </button>
                <button
                    type="button"
                    onClick={onClose}
                    className={styles.close_button}
                >
                    İptal
                </button>
            </div>
        </div>
    );
}
