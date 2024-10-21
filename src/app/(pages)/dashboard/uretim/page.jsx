import UretimList from "@/components/dashboard/uretim/UretimList";
import { getOrders } from "@/services/uretimplanlama-service";
import React from "react";

const UretimPage = async ({searchParams}) => {
    const currentPage = parseInt(searchParams.currentPage, 10) || 0;
    const sortBy = searchParams.sortBy || 'orderDate';
    const sortOrder = searchParams.sortOrder || 'desc';
    

    const res = await getOrders(currentPage, 10, sortBy, sortOrder);
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