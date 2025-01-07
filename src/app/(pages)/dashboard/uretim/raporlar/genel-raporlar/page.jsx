import PageHeader from '@/components/common/page-header';
import Reports from '@/components/dashboard/uretim/reports/Reports';
import { getAllReports } from '@/services/yonetici-service';


export default async function GenelRaporlar() {
  try {
      const data = await getAllReports(); 
      return (
        <>  
              <Reports data={data} />
          </>
      );
  } catch (error) {

    return <>
      <PageHeader>Genel Raporlar</PageHeader>
      <div >Error: {error.message}</div>
      </>;
    }
     
}
