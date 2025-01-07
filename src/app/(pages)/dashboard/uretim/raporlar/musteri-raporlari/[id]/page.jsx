import ErrorPage from "@/components/common/errors/ErrorPage";
import PageHeader from "@/components/common/page-header";
import Spacer from "@/components/common/spacer";
import CustomerReports from "@/components/dashboard/uretim/raporlar/CustomerReports";
import { getReports } from "@/services/yonetici-service";


export default async function page({ params, searchParams }) {
  try {
       if (!params.id) throw new Error('id is required', params.id);

    const res = await getReports(params.id);

    return (
        <>
            <CustomerReports data={res}
            searchParams={searchParams}
            />
        </>
    ); 
    }catch (error) {
        return (
            <>
                <PageHeader>MÜsterİ Raporlari</PageHeader>
                <Spacer height={150} />
                <ErrorPage message={error.message} />
            </>
        ); 
    }
    
};
