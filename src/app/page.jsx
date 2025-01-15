import Menu from '@/components/common/menu/menu';
import { auth } from '@/auth';

const home = async () => {
    const session = await auth();
    return (
        <div>
            <Menu session={session } />
        </div>
    );
};

export default home;
