'use client';

import React from 'react';
import {
    Container,
    Row,
    Col,
    Table,
    Pagination,
    Form,
    Button
} from 'react-bootstrap';
import PageHeader from '@/components/common/page-header';
import './talasli.scss';

const Order = ({ data, currentPage, sortBy, sortOrder }) => {
    const { content, totalPages } = data;

    // Kısa değişiklikleri hallederken, URL'deki sıralama ve sayfa bilgilerini güncellemek için kullanılır.
    const handleSortChange = (e) => {
        const { name, value } = e.target;
        const url = new URL(window.location);
        if (name === 'sortBy') {
            url.searchParams.set('sortBy', value);
        } else if (name === 'sortOrder') {
            url.searchParams.set('sortOrder', value);
        }
        window.location.href = url.toString();
    };

    // Handle reset
    const handleReset = () => {
        const url = new URL(window.location);
        url.searchParams.set('sortBy', 'orderDate');
        url.searchParams.set('sortOrder', 'desc');
        url.searchParams.delete('currentPage'); // Optional: reset to first page
        window.location.href = url.toString();
    };

    // Handle page change
    const handlePageChange = (page) => {
        const url = new URL(window.location);
        url.searchParams.set('currentPage', page);
        window.location.href = url.toString();
    };

    return (
        <>
            <PageHeader>Talasli Imalat Amiri</PageHeader>
            <Container>
                <Row className="my-3">
                    <div className="d-flex gap-3">
                        <Col md={2}>
                            <Form.Group controlId="sortBy">
                                <Form.Label>Sort By</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="sortBy"
                                    value={sortBy}
                                    onChange={handleSortChange}
                                >
                                    <option value="orderDate">
                                        Order Date
                                    </option>
                                    <option value="deliveryDate">
                                        Delivery Date
                                    </option>
                                    <option value="orderNumber">
                                        Order Number
                                    </option>
                                    <option value="customerName">
                                        Customer Name
                                    </option>
                                    {/* Add more options as needed */}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md={2}>
                            <Form.Group controlId="sortOrder">
                                <Form.Label>Sort Order</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="sortOrder"
                                    value={sortOrder}
                                    onChange={handleSortChange}
                                >
                                    <option value="asc">Ascending</option>
                                    <option value="desc">Descending</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md={2}>
                            <Button
                                className="p-1"
                                variant="secondary"
                                onClick={handleReset}
                            >
                                Reset
                            </Button>
                        </Col>
                    </div>
                </Row>
                <div className="table-responsive">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Customer Name</th>
                                <th>Gasan No</th>
                                <th>Order Number</th>
                                <th>Order Date</th>
                                <th>Delivery Date</th>
                                <th>Order Type</th>
                                <th>Order Quantity</th>
                                <th>Order Status</th>
                                <th>Ready Mil Count</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {content.map((order, index) => (
                                <tr key={index} className="eachRow">
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
                                        {order.orderStatus ===
                                        'İşlenmeyi Bekliyor' ? (
                                            <Button variant="primary">
                                                Basla
                                            </Button>
                                        ) : order.orderStatus ===
                                          'İşlenmekte' ? (
                                            <Button variant="danger">
                                                Durdur
                                            </Button>
                                        ) : null}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
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
            </Container>
        </>
    );
};

export default Order;
