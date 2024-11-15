import React from 'react'
import { Col, Form, Button, Pagination } from 'react-bootstrap'
import styles from './order-list.module.scss'
import OrderToolbar from '@/components/dashboard/uretim/OrderToolbar';

const OrderList = ({
    currentUrl,
    orders,
    totalPages,
    currentPage,
    sortBy,
    sortOrder,
    handleReset,
    handleSortChange,
    handleToolbar,
    handlePageChange
}) => {

    return (
        <main className={styles.main_container}>
            <div className={styles.row_container}>
                <Col className={styles.colum_inner}>
                    <Form.Group controlId="sortBy">
                        <Form.Label>Sırala</Form.Label>
                        <Form.Control
                            as="select"
                            name="sortBy"
                            value={sortBy}
                            onChange={(e) => handleSortChange(e)}
                            className={styles.select}
                        >
                            <option value="orderDate">Sipariş Tarihi</option>
                            <option value="deliveryDate">Teslim Tarihi</option>
                            <option value="orderNumber">Sipariş No</option>
                            <option value="customerName">Müşteri Adı</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col className={styles.colum_inner}>
                    <Form.Group controlId="sortOrder">
                        <Form.Label>Siparişi Sırala</Form.Label>
                        <Form.Control
                            as="select"
                            name="sortOrder"
                            value={sortOrder}
                            onChange={(e) => handleSortChange(e)}
                            className={styles.select}
                        >
                            <option value="asc">Artan</option>
                            <option value="desc">Azalan</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col className={`${styles.colum_inner} ${styles.outer_reset}`}>
                    <Button
                        className={styles.inner_reset}
                        onClick={handleReset} // Reset sorting and pagination
                    >
                        Reset
                    </Button>
                </Col>
            </div>
            <div className={styles.table_responsive}>
                <table>
                    <thead className={styles.table_head}>
                        <tr>
                            <th>Müşter Adı</th>
                            <th>Gasan No</th>
                            <th>Sipariş No</th>
                            <th>Sipariş Tarihi</th>
                            <th>Teslim Tarihi</th>
                            <th>Sipariş Türü</th>
                            <th>Miktar</th>
                            <th>Durum</th>
                            <th>Hazır Mil </th>
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
                                            number={index}
                                            currentUrl={currentUrl}
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
                        active={page === currentPage-1}
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