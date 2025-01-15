import PageHeader from '@/components/common/page-header'
import { auth } from '@/auth';
import { pageNames } from '@/helpers/data/page-names';
import Spacer from '@/components/common/spacer';

export default async function layout({ children }) {

    const session = await auth();

    console.log('session', session);

  return (
      <>
      <PageHeader session={session}>{pageNames[session?.user?.username]}</PageHeader>
      <Spacer height={20} />
          
          {children}
      </>
  )
}
