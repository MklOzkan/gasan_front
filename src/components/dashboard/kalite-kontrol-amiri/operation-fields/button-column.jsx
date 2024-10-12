import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const buttonlist = [
    {
        title: 'Onayla',
        name: 'approveCount',
    }
]

const OperationCol = ({
    stage,
    order,
    togglePopup,
    handleQuantityChange,
    handleSubmit,
    productionQuantity
}) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false); // State to control popup visibility
    const [clickedButtonName, setClickedButtonName] = useState('');
    let txColor = ''; // Default text color
    const bgColor = 'grey';

    const handlePopupClick = (name) => {
        setIsPopupOpen(true); // Open the popup when "Onayla" button is clicked
        setClickedButtonName(name);
    };

    const handlePopupClose = () => {
        setIsPopupOpen(false); // Close the popup
    };

    return (
        <div className="d-flex flex-column">
            <Button
                onClick={() => handlePopupClick('approveCount')} // Show the popup when this button is clicked
                className="polygon-button first-button"
                name="approveCount"
                disabled={stage.milCount === 0}
            >
                <span>Onayla</span>
            </Button>
            <Button
                className="polygon-button next-button"
                name="scrapCount"
                onClick={() => handlePopupClick('scrapCount')}
                disabled={stage.milCount === 0}
            >
                <span>Hurda</span>
            </Button>
            {stage.kaliteKontrolStage === 'AFTER_POLISAJ' ||
            stage.kaliteKontrolStage === 'AFTER_MIL_TASLAMA' ||
            stage.kaliteKontrolStage === 'AFTER_EZME' ? (
                <Button
                    className="polygon-button next-button"
                    name="returnedToMilTaslama"
                    onClick={() => handlePopupClick('returnedToMilTaslama')}
                    disabled={stage.milCount === 0}
                >
                    <span>Mil Taşlamaya Geri Gidecek</span>
                </Button>
            ) : null}
            {stage.kaliteKontrolStage === 'AFTER_POLISAJ' ? (
                <Button
                    className="polygon-button next-button"
                    name="returnedToIsilIsleme"
                    onClick={() => handlePopupClick('returnedToIsilIsleme')}
                    disabled={stage.milCount === 0}
                >
                    <span>Mil Isıl İşleme Geri Gidecek</span>
                </Button>
            ) : null}

            {/* Show the popup only if isPopupOpen is true */}
            {isPopupOpen && (
                <div className="popup">
                    <div
                        className="popup-backdrop"
                        onClick={handlePopupClose} // Close the popup when clicking outside
                    ></div>
                    <div className="popup-inner">
                        <h2>Sayisi giriniz!</h2>
                        <input
                            type="number"
                            min={0}
                            value={productionQuantity}
                            onChange={handleQuantityChange}
                        />
                        {
                            <div className="popup-button">
                                <button
                                    onClick={() =>
                                        handleSubmit(
                                            stage.id,
                                            stage.kaliteKontrolStage,
                                            productionQuantity,
                                            clickedButtonName
                                        )
                                    }
                                    className="inner-button bg-success"
                                    disabled={productionQuantity === ''}
                                >
                                    Onayla
                                </button>
                                <button
                                    onClick={handlePopupClose}
                                    className="inner-button"
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
    handleQuantityChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    productionQuantity: PropTypes.string.isRequired
};

export default OperationCol;
