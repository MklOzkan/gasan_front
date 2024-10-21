import React from 'react'
import { Col, Form, Button, Pagination } from 'react-bootstrap'
import styles from './order-list.module.scss'
import OrderToolbar from '@/components/dashboard/uretim/OrderToolbar';

const OrderList = ({
    currentUrl,
    orders,
    totalPages,
    currentPage,
    totalElements,
    sortBy,
    sortOrder,
    handleReset,
    handleSortChange,
    handleToolbar,
    handlePageChange,
    handleSorting
}) => {
    console.log(currentUrl);

    console.log('totalPages :>> ', totalPages);

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
                            <th>Gasan No</th>
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
                            <th
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleSorting('orderStatus')}
                            >
                                Durumu
                                {sortBy === 'orderStatus' &&
                                    (sortOrder === 'asc' ? ' 🔼' : ' 🔽')}
                            </th>
                            <th>Hazır Mil Adedi</th>
                            <th>Düzenle/Sil</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr
                                key={index}
                                className={
                                    index % 2 === 0
                                        ? `${styles.table_body} ${styles.index}`
                                        : styles.table_body
                                }
                                onClick={() =>
                                    order.orderStatus === 'İşlenmekte' &&
                                    currentUrl !== '/dashboard/uretim'
                                        ? handleRowClick(order)
                                        : null
                                } // satırı tıklanabilir yapar sadece işlenmekte olan siparişler için ve üretim sayfasında değilse
                                style={{
                                    cursor:
                                        order.orderStatus === 'İşlenmekte'
                                            ? 'pointer'
                                            : 'default'
                                }} // Change cursor style for clickable rows
                            >
                                <td>{order.customerName}</td>
                                <td>{order.gasanNo}</td>
                                <td>{order.orderNumber}</td>
                                <td>{order.orderDate}</td>
                                <td>{order.deliveryDate}</td>
                                <td>{order.orderType}</td>
                                <td>{order.orderQuantity}</td>
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
            <Pagination>
                {[...Array(totalPages).keys()].map((page) => (
                    <Pagination.Item
                        key={page}
                        active={page === currentPage}
                        onClick={() => handlePageChange(page)}
                    >
                        {page + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        </main>
    );
};

export default OrderList