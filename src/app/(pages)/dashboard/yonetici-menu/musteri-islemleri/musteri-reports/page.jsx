import PageHeader from '@/components/common/page-header';
import Reports from '@/components/dashboard/yonetici/reports/Reports';
import { getAllReports } from '@/services/yonetici-service';

const ReportsPAge = async () => {
  
  try {
    const data = await getAllReports(); 
    return (
        <>
            <Reports data={data} />
        </>
    );
  } catch (error) {
    return <div>Error: {error.message}</div>;
  }
    
};

export default ReportsPAge;
