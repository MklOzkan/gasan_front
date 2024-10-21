'use client';
import { deleteOrderAction } from '@/actions/order-actions';
import { swAlert, swConfirm } from '@/helpers/swal';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, {  useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { TfiPencil, TfiTrash } from 'react-icons/tfi';
import styles from './order-toolbar.module.scss';
import { wait } from '@/utils/wait';

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
            console.log('cleanup');
        };
    }, [order, currentPage, currentUrl]);

    const handleDelete = async () => {
        const answer = await swConfirm(
            `${order.orderNumber} numaralı siparişi silmek istediğinize emin misiniz?`
        );
        if (!answer.isConfirmed) return;
        console.log('row.id', order.id);

        const res = await deleteOrderAction(order.orderNumber);

        if (res.success) {
            // After successful deletion, check if the page needs to be changed

            let page;

            
            if (totalElements % 10 === 1 && totalPages > 1) {
                swAlert(res.message, 'success');
                await wait(2000);
                page = currentPage - 1;
                handlePageChange(page);
            } else {
                swAlert(res.message, 'success');
                window.location.reload();
            }
        } else {
            swAlert(res.message, 'error');
        }
    };

    return (
        <main className={styles.main_container}>
            <Button
                as={Link}
                variant="warning"
                className="btn-link text-info"
                href={`/dashboard/uretim/${order.id}`}
            >
                <TfiPencil />
            </Button>

            <Button
                className="btn-link"
                variant="danger"
                onClick={handleDelete}
            >
                <TfiTrash />
            </Button>
        </main>
    );
};

export default OrderToolbar;
