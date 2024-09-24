import React, { useState } from 'react';
import './operation-table.scss';
import EditPopup from './edit-biten-popup.jsx'; // Import the popup component

const OperationsInfo = ({ operations, productionProcess }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedOperation, setSelectedOperation] = useState(null);
    const [newValue, setNewValue] = useState('');

    const handleEditClick = (operation) => {
        setSelectedOperation(operation);
        setNewValue(operation.biten); // Set current value in the input
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
        setSelectedOperation(null);
    };

    const handleSave = () => {
        // Update the "Biten" value of the selected operation
        selectedOperation.biten = newValue;
        handleClosePopup();
    };

    const handleInputChange = (e) => {
        setNewValue(e.target.value);
    };

    return (
        <div className="operations-info">
            <table className="operations-table">
                <thead>
                    <tr>
                        <th>İşlem</th>
                        <th>Biten</th>
                        <th>Kalan</th>
                    </tr>
                </thead>
                <tbody>
                    {operations.map((operation, index) => (
                        <React.Fragment key={index}>
                            {/* Insert total produced MIL row before BORU_KESME_HAVSA */}
                            {operation.operationType === 'BORU_KESME_HAVSA' && (
                                <tr className="total-row">
                                    <td>Toplam Üretilen Mil</td>
                                    <td>{productionProcess.completedQuantity}</td>
                                    <td>{productionProcess.remainingQuantity}</td>
                                </tr>
                            )}
                            <tr>
                                <td>{operation.operationType}</td>
                                <td>
                                    <button
                                        className="edit-button"
                                        onClick={() =>
                                            handleEditClick(operation)
                                        }
                                    >
                                        {operation.completedQuantity}
                                    </button>
                                </td>
                                <td>{operation.remainingQuantity}</td>
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
            {isPopupOpen && (
                <EditPopup
                    value={newValue}
                    onClose={handleClosePopup}
                    onSave={handleSave}
                    onInputChange={handleInputChange}
                />
            )}
        </div>
    );
};

export default OperationsInfo;
