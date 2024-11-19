'use client';

import React, { useEffect, useState } from 'react';
import styles from './infos-and-rollback.module.scss';
import { Button } from 'react-bootstrap';
import { swAlert, swConfirm } from '@/helpers/swal';
import { rollBackLastChangeAction } from '@/actions/lift_actions';

const OperationsInfo = ({ operations, order }) => {

     useEffect(() => {
     }, [operations, order]);

    const rollBack = async (operation) => {
        const answer = await swConfirm(
            `En son girilen ${operation.lastCompletedQty} adetlik üretimi geri almak istediğinize emin misiniz??`
        );
        if (!answer.isConfirmed) return;

        const res = await rollBackLastChangeAction(operation.id, order.id);

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
                            <tr className={styles.table_body}>
                                <td>{operation.operationType}</td>
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
