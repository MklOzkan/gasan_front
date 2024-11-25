import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import styles from './buttons-for-each-operation.module.scss';


const OperationCol = ({
    operation,
    order,
    index,
    togglePopup,
    isPopupOpen,
    handleQuantityChange,
    handleSubmit,
    productionQuantity
}) => {
    let txColor = ''; // Default text color
    const bgColor =
        
            operation.completedQuantity === 0 &&
              operation.remainingQuantity === 0
            ? (() => {
                  txColor = 'white'; // Set text txColor to gray
                  return 'rgb(158, 156, 156)'; // Background txColor for this condition
              })()
            : operation.completedQuantity >=
                  (order.orderQuantity - order.readyMilCount) &&
              (operation.remainingQuantity) <= 0
            ? (() => {
                  txColor = 'white'; // Set text txColor to white for fully completed
                  return 'green'; // Background txColor for fully completed
              })()
            : operation.remainingQuantity > 0
            ? (() => {
                  txColor = 'black'; // Set text txColor to black for partially completed
                  return 'yellow'; // Background txColor for partially completed
              })()
            : 'rgb(158, 156, 156)' // Default background color)
    return (
        <div>
            <Button
                onClick={() => togglePopup(operation.id)} // **Highlight: Pass the specific operation ID to togglePopup**
                className={`${styles.polygon_button} 
                }`}
                style={{ backgroundColor: bgColor, color: txColor }}
                disabled={operation.remainingQuantity === 0}
                data-operation-type={operation.operationType}
            >
                <span>{operation.operationType}</span>
            </Button>
            {isPopupOpen === operation.id && ( // **Highlight: Ensure the popup is open only for the specific operation**
                <div className={styles.popup}>
                    <div
                        className={styles.popup_backdrop}
                        onClick={() => togglePopup(null)}
                    ></div>
                    <div className={styles.popup_inner}>
                        <h2 className={styles.input_label}>
                            Üretilen Adedi Giriniz
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
                        <div className={styles.popup_button}>
                            <button
                                onClick={() =>
                                    // Log entire operation object
                                    handleSubmit(
                                        operation.id,
                                        operation.operationType,
                                        productionQuantity
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
                    </div>
                </div>
            )}
        </div>
    );
};

OperationCol.propTypes = {
    order: PropTypes.object.isRequired,
    operation: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    togglePopup: PropTypes.func.isRequired,
    isPopupOpen: PropTypes.oneOfType([PropTypes.bool, PropTypes.number])
        .isRequired, // **Highlight: Changed prop type to handle operation ID**
    handleQuantityChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    productionQuantity: PropTypes.string.isRequired
};

export default OperationCol;
