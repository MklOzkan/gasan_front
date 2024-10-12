import React, { useEffect, useState } from 'react';
import './operation-table.scss';
import EditPopup from './edit-biten-popup.jsx'; // Import the popup component
import { Button } from 'react-bootstrap';
import { swAlert, swConfirm } from '@/helpers/swal';
import {
    rollBackEzmeAction,
    rollBackMilTaslamaAction,
    rollBackMontajAction,
    rollBackPolisajAction
} from '@/actions/kalite-kontrol-actions';

const rollBackOperations =[
    {
        stage: 'AFTER_POLISAJ',
        approveCount:'approveCount',
        scrapCount:'scrapCount',
        returnedToMilTaslama:'returnedToMilTaslama',
        returnedToIsilIslem:'returnedToIsilIslem',

    },
    {
        stage: 'AFTER_MONTAJ',
        approveCount:'approveCount',
        scrapCount:'scrapCount',
        returnedToMilTaslama:'returnedToMilTaslama',
        returnedToIsilIslem:'returnedToIsilIslem',
    },
    {
        stage: 'AFTER_EZME',
        approveCount:'approveCount',
        scrapCount:'scrapCount',
        returnedToMilTaslama:'returnedToMilTaslama',
        returnedToIsilIslem:'returnedToIsilIslem',
    },
    {
        stage: 'AFTER_MIL_TASLAMA',
        approveCount:'approveCount',
        scrapCount:'scrapCount',
        returnedToMilTaslama:'returnedToMilTaslama',
        returnedToIsilIslem:'returnedToIsilIslem',
    }
]

const OperationsInfo = ({stage}) => {



    const rollBack = async (name) => {
        let message = '';
        if (name === 'Approve') {
            message = `En son girilen ${stage.lastApproveCount} adetlik üretimi geri almak istediğinize emin misiniz??`;
        } else if (name === 'Scrap') {
            message = `En son girilen ${stage.lastScrapCount} adetlik hurda üretimi geri almak istediğinize emin misiniz??`;
        } else if (name === 'Mil_Taslama') {
            message = `En son girilen ${stage.lastReturnedToMilTaslama} adeti geri almak istediğinize emin misiniz??`;
        } else if (name === 'Isil_Islem') {
            message = `En son girilen ${stage.lastReturnedToIsilIslem} adetlik üretimi geri almak istediğinize emin misiniz??`;
        }
            
        const answer = await swConfirm(
            message
        );
        if (!answer.isConfirmed) return;
        const formData = new FormData();
        formData.append('operationField', name);
        let response;

        switch (stage.kaliteKontrolStage) {
            case 'AFTER_POLISAJ':
                response = await rollBackPolisajAction(formData, stage.id);
                break;
            case 'AFTER_MONTAJ':
                response = await rollBackMontajAction(formData, stage.id);
                break;
            case 'AFTER_EZME':
                response = await rollBackEzmeAction(formData, stage.id);
                break;
            case 'AFTER_MIL_TASLAMA':
                response = await rollBackMilTaslamaAction(formData, stage.id);
                break;
            default:
                break;
        }

        if (response.success) {
            
                swAlert(response.message, 'success');

            setTimeout(() => {
                window.location.reload();
            }, 1000);
            
        } else {
            swAlert(response.message, 'error');
        }
    };

    return (
        <div className="operations-info d-flex">
            <table className="operations-table">
                <thead>
                    <tr>
                        <th>İşlem</th>
                        <th>Biten</th>
                    </tr>
                </thead>
                <tbody>
                    <React.Fragment>
                        <tr>
                            <td>Onaylandı</td>
                            <td>
                                <Button
                                    className="edit-button"
                                    disabled={stage.lastApproveCount === 0}
                                    onClick={() => rollBack('Approve')}
                                    name="approveCount"
                                >
                                    {stage.approveCount}
                                </Button>
                            </td>
                        </tr>
                        <tr>
                            <td>Hurda</td>
                            <td>
                                <Button
                                    className="edit-button"
                                    disabled={stage.lastScrapCount === 0}
                                    onClick={() => rollBack('Scrap')}
                                    name="scrapCount"
                                >
                                    {stage.scrapCount}
                                </Button>
                            </td>
                        </tr>
                        {stage.kaliteKontrolStage === 'AFTER_POLISAJ' ||
                        stage.kaliteKontrolStage === 'AFTER_MIL_TASLAMA' ||
                        stage.kaliteKontrolStage === 'AFTER_EZME' ? (
                            <tr>
                                <td>Mil Taşlama</td>
                                <td>
                                    <Button
                                        className="edit-button"
                                        disabled={
                                            stage.lastReturnedToMilTaslama === 0
                                        }
                                        onClick={() => rollBack('Mil_Taslama')}
                                        name="returnedToMilTaslama"
                                    >
                                        {stage.returnedToMilTaslama}
                                    </Button>
                                </td>
                            </tr>
                        ) : null}
                        {stage.kaliteKontrolStage === 'AFTER_POLISAJ' ? (
                            <tr>
                                <td>Isıl İşlem</td>
                                <td>
                                    <Button
                                        className="edit-button"
                                        disabled={
                                            stage.lastReturnedToIsilIslem === 0
                                        }
                                        onClick={() => rollBack('Isil_Islem')}
                                        name="returnedToIsilIslem"
                                    >
                                        {stage.scrapCount}
                                    </Button>
                                </td>
                            </tr>
                        ) : null}
                    </React.Fragment>
                </tbody>
            </table>
            <table className="operations-table text-center">
                <thead>
                    <tr>
                        <th className="text-center">Kalan</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {
                            <td className="mil">
                                {stage.milCount <= 0 ? 0 : stage.milCount}
                            </td>
                        }
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default OperationsInfo;
