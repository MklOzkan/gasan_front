import React, { useEffect, useState } from 'react';
import styles from './infos-and-rollback.module.scss';
import { Button } from 'react-bootstrap';
import { swAlert, swConfirm } from '@/helpers/swal';
import { rollBackLastChangeAction } from '@/actions/talasli-actions';
import { config } from '@/helpers/config';

const OperationsInfo = ({ operations, order }) => {
    const [completedQty, setCompletedQty] = useState(0);
    const [remainingQty, setRemainingQty] = useState(0);

    useEffect(() => {
        const operation = operations.find(
            (operation) =>
                operation.operationType === 'ISIL_ISLEM' ||
                operation.operationType === 'EZME'
        );

        if (operation) {
            setCompletedQty(operation.completedQuantity);
        }
        setRemainingQty(order.orderQuantity-order.readyMilCount);
    }, [operations, order]);



    const rollBack = async (operation) => {
        const answer = await swConfirm(
            `En son girilen ${operation.lastCompletedQty} adetlik üretimi geri almak istediğinize emin misiniz??`
        );
        if (!answer.isConfirmed) return;

        const res = await rollBackLastChangeAction(operation.id);

        if (res.success) {
                swAlert(res.message, 'success', '', 4000);
            
        } else {
            swAlert(res.message, 'error', '', 4000);
        }
    };

    return (
        <div className={styles.operations_info}>
            <table className={styles.operations_table}>
                <thead>
                    <tr className={styles.table_head}>
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
                                <tr className={styles.total_row}>
                                    <th>Toplam Üretilen Mil</th>

                                    <th>{completedQty}</th>
                                    <th></th>
                                </tr>
                            )}
                            <tr className={styles.table_body}>
                                <td>{config.talasliList[operation.operationType]}</td>
                                <td>
                                    <Button
                                        className={styles.edit_button}
                                        disabled={
                                            operation.completedQuantity === 0 ||
                                            operation.lastCompletedQty === 0
                                        }
                                        onClick={() => rollBack(operation)}
                                    >
                                        {operation.completedQuantity}
                                    </Button>
                                </td>
                                <td>
                                    {operation.remainingQuantity <= 0
                                        ? 0
                                        : operation.remainingQuantity}
                                </td>
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OperationsInfo;
