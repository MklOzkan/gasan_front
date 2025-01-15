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

    console.log(order)

    const finishOrder = async () => {
        let answer;
        if (order.finalProductQuantity >= order.orderQuantity) {
            answer = await swConfirm(
            `${order.orderNumber} numaralı siparişi tamamlamak istediğinize emin misiniz?`
            );
        } else if (order.finalProductQuantity >= order.orderQuantity*0.5 && order.finalProductQuantity < order.orderQuantity) {
            answer = await swConfirm(
                `Sipariş adedi ${order.orderQuantity} ve üretim adedi ${order.finalProductQuantity}. Yinede siparişi tamamlamak istediğinize emin misiniz?`
            );
        } else {
            swAlert('Üretimin tamamlanması için en az sipariş miktarının yarısı kada üretim yapılmalıdır!', 'error', '', 4000);
            return;
        }
        if (!answer.isConfirmed) return;

        const res = await finishOrderAction(order.id);

        if (res.success) {
            swAlert(res.message, 'success', '', 4000);
        } else {
            swAlert(res.message, 'error', '', 4000);
        }


    };

    const handleDelete = async () => {

        let message = '';
        if (order.orderStatus === 'Tamamlandı') {
            message = `${order.orderNumber} numaralı sipariş, tamamlanmış siparişler arasında yer almaktadır. Silmek istediğinize emin misiniz?`;
        } else if (order.orderStatus === 'İşlenmekte') {
            message = `${order.orderNumber} numaralı sipariş, halen işlenmekte olan siparişler arasında yer almaktadır. Silmek istediğinize emin misiniz?`;
        } else {
            message = `${order.orderNumber} numaralı siparişi silmek istediğinize emin misiniz?`;
        }
        
        const answer = await swConfirm(
            message
        );
        if (!answer.isConfirmed) return;

        const res = await deleteOrderAction(order.orderNumber);

        if (res.success) {
            swAlert(res.message, 'success', '', 4000);
        } else {
            swAlert(res.message, 'error', '', 4000);
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

            <button
                className={`${styles.outer_check}`}
                onClick={finishOrder}
            >
                <div className={`${styles.inner_check}`}>
                    <FaCheck />
                </div>
            </button>
        </main>
    );
};

export default OrderToolbar;
