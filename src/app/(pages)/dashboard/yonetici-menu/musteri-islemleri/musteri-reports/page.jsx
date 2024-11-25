import PageHeader from '@/components/common/page-header';
import Reports from '@/components/dashboard/yonetici/reports/Reports';
import { getAllReports } from '@/services/yonetici-service';

const ReportsPAge = async () => {

  const response = await getAllReports(); 
  if (!response.ok) { throw new Error(`Error fetching reports: ${response.statusText}`); }
  const data = await response.json(); 
    return (
      <>
      
          <Reports data={data} />
        </>
    );
};

export default ReportsPAge;
