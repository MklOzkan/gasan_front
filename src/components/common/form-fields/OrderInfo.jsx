
import styles from './order-info.module.scss';

const OrderForOperation = ({ order }) => {
    return (
        <>
                <div className={styles.table_responsive}>
                    <table >
                        <thead>
                            <tr className={styles.table_head}>
                                    <th >Müşter Adı</th>
                                    <th >Gasan No</th>
                                    <th >Teslim Tarihi</th>
                                    <th >Sipariş Türü</th>
                                    <th >Sipariş Adedi</th>
                                    <th >Sipariş Durumu</th>
                                    {order.orderType === 'LIFT' ? (
                                        <th>Hazır Mil Adedi</th>
                                    ) : null}
                                </tr>
                            </thead>
                            <tbody>
                                <tr className={styles.table_body}>
                                    <th>{order.customerName}</th>
                                    <th>{order.gasanNo}</th>
                                    <th>{order.deliveryDate}</th>
                                    <th>{order.orderType}</th>
                                    <th>{order.orderQuantity}</th>
                                    <th>{order.orderStatus}</th>
                                    {order.orderType === 'LIFT' ? (
                                    <th>{order.readyMilCount}</th>
                                    ) : null}
                                </tr>
                            </tbody>
                    </table>
                </div>
            
        </>
    );
};

export default OrderForOperation;
