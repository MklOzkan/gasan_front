import { useEffect, useState } from 'react';
import { scrapAction } from '@/actions/bloklift_actions';
import styles from './scrap-operation.module.scss';
import { swAlert } from '@/helpers/swal';

export default function ScrapOperation({ operations, orderId }) {
    const [afterTest, setAfterTest] = useState(null);
     
    
    useEffect(() => {

        
    }, [operations, orderId]);

    const testOp = operations.find(
        (operation) => operation.operationType === 'TEST'
    );
    const {scrapCountAfterTest} = testOp;
    console.log('scrapCount', scrapCountAfterTest);

    const handleSubmit = async (e) => {
        const scrapCount = parseInt(e.target.afterTest.value, 10);
        e.preventDefault();
        if (!afterTest) {
            swAlert('Hurda miktarı bos olamaz', 'error');
            return;
        }
        console.log('afterTest', scrapCount);
        const formData = new FormData();
        formData.append('scrapCountAfterTest', scrapCount);
        formData.append('operationType', 'TEST');
        const operationId = testOp?.id;
        const orderType = 'Blok Lift';

        if (!operationId) {
            swAlert('Operation ID not found', 'error');
            return;
        }

        const response = await scrapAction(formData, operationId, orderType, orderId);

        if (response.success) {
            swAlert(response.message, 'success');
            setAfterTest('');
        } else {
            swAlert( response.message, 'error');
            setAfterTest('');
        }
    };

    console.log('testOp', testOp);

    return (
        <main className={styles.container}>
            <div className={styles.innerContainer}>
                <p>Test Sonrasi Hurda</p>
                <p>{scrapCountAfterTest}</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
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
