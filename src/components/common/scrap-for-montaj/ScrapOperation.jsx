'use client';

import { useEffect, useState } from 'react';
import { scrapAction, rollBackAction } from '@/actions/bloklift_actions';
import { swAlert, swConfirm } from '@/helpers/swal';
import { config } from '@/helpers/config';
import styles from './scrap-operation.module.scss';
const blOperation = config.blOperationsForBL;
const damperOperation =config.blOperationsForDamper;

export default function ScrapOperation({ operations, order }) {
    const [afterTest, setAfterTest] = useState(null);
    const [scrapField, setScrapField] = useState(null);

    const testOp = operations.find(
        (operation) => operation.operationType === scrapField
    );
    console.log('operations', operations);
     
    
    useEffect(() => {

        
    }, [operations, order, testOp]);


    const handleSubmit = async (e) => {
        
        e.preventDefault();
        if (!afterTest) {
            swAlert('Hurda miktarı bos olamaz', 'error');
            return;
        }
        const formData = new FormData();
        console.log('scrapField', scrapField);
        if (scrapField === null) {
            swAlert('Islem tipi seciniz', 'error');
            return;
        }
            
        formData.append('scrapCountAfterTest', parseInt(afterTest, 10));
        const operationId = testOp?.id;
        const orderType = 'Blok Lift';

        if (!operationId) {
            swAlert('Operation ID not found', 'error');
            return;
        }

        const response = await scrapAction(formData, operationId, orderType, order.id);

        if (response.success) {
            swAlert(response.message, 'success');
            setAfterTest('');
            setScrapField('');
        } else {
            swAlert( response.message, 'error');
            setAfterTest('');
            setScrapField('');
        }
    };

    const rollBack = async (operation) => {
        const answer = await swConfirm(
            `En son girilen ${operation.lastCompletedScrapCount} adetlik üretimi geri almak istediğinize emin misiniz??`
        );
        if (!answer.isConfirmed) return;
        const res = await rollBackAction(operation.id, order.id);
        if (res.success) {
            swAlert(res.message, 'success');
        } else {
            swAlert(res.message, 'error');
        }
    };


    return (
        <main className={styles.container}>
            {operations.map((operation, index) => (
                <div key={index} className={styles.innerContainer}>
                    <p>{config.talasliList[operation.operationType]}</p>
                    <button
                        type="button"
                        disabled={
                            operation.lastCompletedScrapCount === 0 ||
                            operation.scrapCountAfterTest === 0
                        }
                        onClick={() => rollBack(operation)}
                    >
                        {operation.scrapCountAfterTest}
                    </button>
                </div>
            ))}

            <form onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                    <select
                        name="scrapField"
                        id="scrapField"
                        onChange={(e) => setScrapField(e.target.value)}
                        value={scrapField || ''}
                    >
                        <option value="">Seçiniz</option>
                        {order.orderType === 'BLOKLIFT'
                            ? blOperation.map((operation) => (
                                  <option key={operation} value={operation}>
                                      {config.talasliList[operation]}
                                  </option>
                              ))
                            : damperOperation.map((operation) => (
                                  <option key={operation} value={operation}>
                                      {config.talasliList[operation]}
                                  </option>
                              ))}
                    </select>

                    <input
                        className={styles.input}
                        type="number"
                        id="afterTest"
                        name="afterTest"
                        min="0"
                        value={afterTest}
                        onChange={(e) => setAfterTest(e.target.value)}
                    />
                    <button type="submit" className={styles.button}>
                        Onayla
                    </button>
                </div>
            </form>
        </main>
    );
}
