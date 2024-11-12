import React from 'react'
import { Col, Form, Button, Pagination } from 'react-bootstrap'

import OrderToolbar from '@/components/dashboard/uretim/OrderToolbar';
import { Paginations } from '@/components/common/Paginations';
import styles from './order-list.module.scss';

const OrderList = ({
    currentUrl,
    orders,
    totalPages,
    currentPage,
    totalElements,
    sortBy,
    sortOrder,
    handlePageChange,
    handleSorting,
    size
}) => {

    return (
        <main className={styles.main_container}>
            <div className={styles.table_responsive}>
                <table>
                    <thead className={styles.table_head}>
                        <tr>
                            <th
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleSorting('customerName')}
                            >
                                Müşter Adı
                                {sortBy === 'customerName' &&
                                    (sortOrder === 'asc' ? ' 🔼' : ' 🔽')}
                            </th>
                            <th
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleSorting('gasanNo')}
                            >
                                Gasan No{' '}
                                {sortBy === 'gasanNo' &&
                                    (sortOrder === 'asc' ? ' 🔼' : ' 🔽')}
                            </th>
                            <th>Sipariş No</th>
                            <th
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleSorting('orderDate')}
                            >
                                Sipariş Tarihi
                                {sortBy === 'orderDate' &&
                                    (sortOrder === 'asc' ? ' 🔼' : ' 🔽')}
                            </th>
                            <th
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleSorting('deliveryDate')}
                            >
                                Teslim Tarihi
                                {sortBy === 'deliveryDate' &&
                                    (sortOrder === 'asc' ? ' 🔼' : ' 🔽')}
                            </th>
                            <th
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleSorting('orderType')}
                            >
                                Sipariş Türü
                                {sortBy === 'orderType' &&
                                    (sortOrder === 'asc' ? ' 🔼' : ' 🔽')}
                            </th>
                            <th>Sipariş Adedi</th>
                            <th>Nihai Üretim</th>
                            <th
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleSorting('orderStatus')}
                            >
                                Durumu
                                {sortBy === 'orderStatus' &&
                                    (sortOrder === 'asc' ? ' 🔼' : ' 🔽')}
                            </th>
                            <th>Hazır Mil Adedi</th>
                            <th>Düzenle/Sil/Tamamla</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr
                                key={index}
                                className={
                                    order.orderStatus === 'İşlenmekte' ||
                                    order.orderStatus === 'Beklemede'
                                        ? `${styles.table_body} ${styles.islenmekte}`
                                        : order.orderStatus === 'Tamamlandı'
                                        ? `${styles.table_body} ${styles.tamamlandi}`
                                        : order.orderStatus === 'İptal Edildi'
                                        ? `${styles.table_body} ${styles.iptal}`
                                        : `${styles.table_body}`
                                }
                                style={{
                                    cursor:
                                        order.orderStatus === 'İşlenmekte'
                                            ? 'pointer'
                                            : 'default'
                                }}
                            >
                                <td>{order.customerName}</td>
                                <td>{order.gasanNo}</td>
                                <td>{order.orderNumber}</td>
                                <td>{order.orderDate}</td>
                                <td>{order.deliveryDate}</td>
                                <td>{order.orderType}</td>
                                <td>{order.orderQuantity}</td>
                                <td>{order.finalProductQuantity}</td>
                                <td>{order.orderStatus}</td>
                                <td>{order.readyMilCount}</td>

                                <td>
                                    <OrderToolbar
                                        order={order}
                                        ordersCount={orders.length}
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        totalElements={totalElements}
                                        number={index}
                                        handlePageChange={handlePageChange}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Paginations
                baseUrl={currentUrl}
                currentPage={currentPage}
                size={size}
                totalPages={totalPages}
            />
        </main>
    );
};

export default OrderList