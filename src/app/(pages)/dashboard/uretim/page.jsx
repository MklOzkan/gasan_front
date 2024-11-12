import UretimList from "@/components/dashboard/uretim/UretimList";
import { getOrders } from "@/services/uretimplanlama-service";
import React from "react";

const UretimPage = async (props) => {
    const searchParams = await props.searchParams;
    const currentPage = Math.max(parseInt(searchParams.page, 10) || 1, 1);
    const sortBy = searchParams.sortBy || 'orderDate';
    const sortOrder = searchParams.sortOrder || 'desc';
    const searchTerm = searchParams.searchTerm || '';
    const startDate = searchParams.startDate || '';
    const endDate = searchParams.endDate || '';

    const res = await getOrders(currentPage-1, 10, sortBy, sortOrder, searchTerm, startDate, endDate);
    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    return (
        <>
            <UretimList
                data={data}
                currentPage={currentPage}
                sortBy={sortBy}
                sortOrder={sortOrder}
            />
        </>
    );
};

export default UretimPage;