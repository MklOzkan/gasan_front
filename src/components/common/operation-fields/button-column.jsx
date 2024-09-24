import React from 'react';
import PropTypes from 'prop-types';

const OperationCol = ({
    operation,
    index,
    togglePopup,
    isPopupOpen,
    handleQuantityChange,
    handleSubmit,
    productionQuantity
}) => {
    const isDisabled = operation.remainingQuantity === 0;
    const bgColor =
        operation.remainingQuantity === 0
            ? 'green'
            : operation.completedQuantity > 0
            ? 'yellow'
            : 'rgb(158, 156, 156)';

    const color =
        operation.remainingQuantity === 0
            ? 'white'
            : operation.completedQuantity > 0
            ? 'black'
            : 'white';


    return (
        <div>
            <button
                onClick={() => togglePopup(operation.id)} // **Highlight: Pass the specific operation ID to togglePopup**
                className={`polygon-button index-${index}`}
                style={{ backgroundColor: bgColor, color: color }}
                disabled={operation.remainingQuantity === 0}
                data-operation-type={operation.operationType}
            >
                <span>{operation.operationType}</span>
            </button>
            {isPopupOpen === operation.id && ( // **Highlight: Ensure the popup is open only for the specific operation**
                <div className="popup">
                    <div
                        className="popup-backdrop"
                        onClick={() => togglePopup(null)}
                    ></div>
                    <div className="popup-inner">
                        <h2>Üretilen Adedi Giriniz</h2>
                        <input
                            type="number"
                            value={productionQuantity}
                            onChange={handleQuantityChange}
                        />
                        <div className="popup-button">
                            <button
                                onClick={() =>
                                    // Log entire operation object
                                    handleSubmit(
                                        operation.id,
                                        operation.operationType,
                                        productionQuantity
                                    )
                                }
                                className="inner-button bg-success"
                                disabled={productionQuantity === ''}
                            >
                                Onayla
                            </button>
                            <button
                                onClick={togglePopup}
                                className="inner-button"
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
