import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import styles from './operation-button.module.scss';

const OperationCol = ({
    stage,
    order,
    togglePopup,
    isPopupOpen,
    handleQuantityChange,
    handleSubmit,
    productionQuantity
}) => {
    const [clickedButtonName, setClickedButtonName] = useState('');
    const buttons = [
        {
            name: 'approveCount',
            label: 'Onayla',
            condition: true // Always show this button
        },
        {
            name: 'scrapCount',
            label: 'Hurda',
            condition: true // Always show this button
        },
        {
            name: 'returnedToMilTaslama',
            label: 'Mil Taşlamaya Geri Gidecek',
            condition:
                stage.kaliteKontrolStage === 'AFTER_POLISAJ' ||
                stage.kaliteKontrolStage === 'AFTER_MIL_TASLAMA' ||
                stage.kaliteKontrolStage === 'AFTER_EZME' // Show based on kaliteKontrolStage
        },
        {
            name: 'returnedToIsilIslem',
            label: 'Isıl İşleme Geri Gidecek',
            condition: stage.kaliteKontrolStage === 'AFTER_POLISAJ' // Only for AFTER_POLISAJ
        }
    ];

    const handlePopupClick = (name) => {
        setClickedButtonName(name);
    };


    return (
        <div className={styles.outer_container}>
            {buttons.map((item, index) =>
                item.condition ? (
                    <Button
                        key={index}
                        className={`${styles.polygon_button} ${
                            styles[`index_${index}`]
                        }`}
                        name={item.name}
                        onClick={() => {
                            handlePopupClick(item.name);
                            togglePopup(stage.id);
                        }}
                        disabled={stage.milCount === 0}
                    >
                        <span>{item.label}</span>
                    </Button>
                ) : null
            )}

            {/* Show the popup only if isPopupOpen is true */}
            {isPopupOpen === stage.id && (
                <div className={styles.popup}>
                    <div
                        className={styles.popup_backdrop}
                        onClick={() => togglePopup(null)}
                    ></div>
                    <div className={styles.popup_inner}>
                        <h2 className={styles.input_label}>
                            Lütfen Adedi Girin
                        </h2>
                        <input
                            type="number"
                            min={0}
                            value={productionQuantity}
                            onChange={handleQuantityChange}
                            className={styles.input}
                            onKeyDown={(e) => {
                                if (
                                    !/^\d$|Backspace|ArrowLeft|ArrowRight|Delete|Tab/.test(
                                        e.key
                                    )
                                ) {
                                    e.preventDefault();
                                }
                            }}
                            onPaste={(e) => {
                                if (
                                    !/^\d+$/.test(
                                        e.clipboardData.getData('Text')
                                    )
                                ) {
                                    e.preventDefault();
                                }
                            }}
                        />
                        {
                            <div className={styles.popup_button}>
                                <button
                                    onClick={() =>
                                        handleSubmit(
                                            stage.id,
                                            stage.kaliteKontrolStage,
                                            productionQuantity,
                                            clickedButtonName
                                        )
                                    }
                                    className={`${styles.onay_button}`}
                                    disabled={productionQuantity === ''}
                                >
                                    Onayla
                                </button>
                                <button
                                    onClick={togglePopup}
                                    className={styles.iptal_button}
                                >
                                    İptal
                                </button>
                            </div>
                        }
                    </div>
                </div>
            )}
        </div>
    );
};

OperationCol.propTypes = {
    order: PropTypes.object.isRequired,
    stage: PropTypes.object.isRequired,
    togglePopup: PropTypes.func.isRequired,
    isPopupOpen: PropTypes.oneOfType([PropTypes.bool, PropTypes.number])
        .isRequired,
    handleQuantityChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    productionQuantity: PropTypes.string.isRequired
};

export default OperationCol;
