import React from 'react';
import styles from './operation-table.module.scss';
import { Button } from 'react-bootstrap';
import { swAlert, swConfirm } from '@/helpers/swal';
import {
    rollBackEzmeAction,
    rollBackMilTaslamaAction,
    rollBackMontajAction,
    rollBackPolisajAction
} from '@/actions/kalite-kontrol-actions';

// Array with stages, button labels, and conditions
const rollBackOperations = [
    {
        name: 'approveCount',
        label: 'Onaylandı',
        condition: (stage) => true, // Always display
        lastCountKey: 'lastApproveCount',
        countKey: 'approveCount',
        rollbackKey: 'Approve'
    },
    {
        name: 'scrapCount',
        label: 'Hurda',
        condition: (stage) => true, // Always display
        lastCountKey: 'lastScrapCount',
        countKey: 'scrapCount',
        rollbackKey: 'Scrap'
    },
    {
        name: 'returnedToMilTaslama',
        label: 'Mil Taşlama',
        condition: (stage) =>
            stage.kaliteKontrolStage === 'AFTER_POLISAJ' ||
            stage.kaliteKontrolStage === 'AFTER_MIL_TASLAMA' ||
            stage.kaliteKontrolStage === 'AFTER_EZME',
        lastCountKey: 'lastReturnedToMilTaslama',
        countKey: 'returnedToMilTaslama',
        rollbackKey: 'Mil_Taslama'
    },
    {
        name: 'returnedToIsilIslem',
        label: 'Isıl İşlem',
        condition: (stage) => stage.kaliteKontrolStage === 'AFTER_POLISAJ',
        lastCountKey: 'lastReturnedToIsilIslem',
        countKey: 'returnedToIsilIslem',
        rollbackKey: 'Isil_Islem'
    }
];

const OperationsInfo = ({ stage }) => {
    const rollBack = async (name) => {
         let message = '';
         for (const operation of rollBackOperations) {
             if (operation.rollbackKey === name) {
                 message = `En son girilen ${
                     stage[operation.lastCountKey]
                 } adetlik üretimi geri almak istediğinize emin misiniz??`;
                 break;
             }
         }

        const answer = await swConfirm(message);
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
        <div className={styles.operations_info}>
            <table className={styles.operations_table}>
                <thead>
                    <tr>
                        <th>İşlem</th>
                        <th>Biten</th>
                    </tr>
                </thead>
                <tbody>
                    <React.Fragment>
                        {rollBackOperations.map(
                            ({
                                name,
                                label,
                                condition,
                                lastCountKey,
                                countKey,
                                rollbackKey
                            }) =>
                                condition(stage) && (
                                    <tr key={name}>
                                        <td>{label}</td>
                                        <td>
                                            <Button
                                                className={styles.edit_button}
                                                disabled={
                                                    stage[lastCountKey] === 0
                                                }
                                                onClick={() =>
                                                    rollBack(rollbackKey)
                                                }
                                                name={name}
                                            >
                                                {stage[countKey]}
                                            </Button>
                                        </td>
                                    </tr>
                                )
                        )}
                    </React.Fragment>
                </tbody>
            </table>
            <table className={styles.second_table}>
                <thead>
                    <tr>
                        <th className="text-center">Kalan</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="mil">
                            {stage.milCount <= 0 ? 0 : stage.milCount}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default OperationsInfo;
