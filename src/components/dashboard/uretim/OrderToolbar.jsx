'use client';
import { deleteOrderAction, finishOrderAction } from '@/actions/order-actions';
import { swAlert, swConfirm } from '@/helpers/swal';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, {  useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { TfiCheck, TfiPencil, TfiTicket, TfiTrash } from 'react-icons/tfi';
import styles from './order-toolbar.module.scss';
import { wait } from '@/utils/wait';
import { FaCheck } from 'react-icons/fa';

const OrderToolbar = ({
    order,
    currentPage,
    currentUrl,
    handlePageChange,
    totalElements,
    totalPages
}) => {
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const url = new URL(window.location.href);
            // your client-side logic here
        }
        return () => {
            
        };
    }, [order, currentPage, currentUrl]);

    const finishOrder = async () => {
        let answer;
        if (order.finalProductQuantity >= order.orderQuantity) {
            answer = await swConfirm(
            `${order.orderNumber} numaralı siparişi tamamlamak istediğinize emin misiniz?`
            );
        } else {
            swAlert(
                'Nihai üretim, Sipariş miktarından az olduğu için, Sipariş tamamlanamaz',
                'error',
                '',
                2000 // Close after 2 seconds
            );
            await wait(1000);
            answer = { isConfirmed: false };
        }
        if (!answer.isConfirmed) return;

        const res = await finishOrderAction(order.id);

        if (res.success) {
            swAlert(res.message, 'success');
        } else {
            swAlert(res.message, 'error', '', 2000);
        }


    };

    const handleDelete = async () => {
        
        const answer = await swConfirm(
            `${order.orderNumber} numaralı siparişi silmek istediğinize emin misiniz?`
        );
        if (!answer.isConfirmed) return;

        const res = await deleteOrderAction(order.orderNumber);

        if (res.success) {
            swAlert(res.message, 'success');
        } else {
            swAlert(res.message, 'error');
        }
    };

    return (
        <main className={styles.main_container}>
            <button
                variant="warning"
                className={`${styles.outer_pencil}`}
                onClick={() => router.push(`/dashboard/uretim/${order.id}`)}	
            >
                <div className={`${styles.inner_pencil}`}>
                    <TfiPencil />
                </div>
            </button>

            <Button
                className="btn-link"
                variant="danger"
                onClick={handleDelete}
            >
                <div>
                    <TfiTrash />
                </div>
            </Button>

            <button className={`${styles.outer_check}`} onClick={finishOrder}
            disabled={order.status === 'Tamamlandi'}
            >
                <div className={`${styles.inner_check}`}>
                    <FaCheck />
                </div>
            </button>
        </main>
    );
};

export default OrderToolbar;
