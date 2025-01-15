
import styles from '@/styles/common/home-button.module.scss';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IoHomeOutline } from 'react-icons/io5';
import {links} from '@/helpers/data/links';

export default function HomeButton({ username }) {
    const router = useRouter();
    const [user, setUser] = useState('');

    console.log('username', user);

    useEffect(() => {
        setUser(username || '');
    }, [username, router]);

    const handleRoute = () => {
        console.log('user', user)
        if (user) {
            router.push(links[user]);
        }

    };
  return (
      <div className={styles.container}>
          <button type='button' className={styles.button} onClick={() => {handleRoute()}}>
              <IoHomeOutline size={30} title='Ana sayfa'/>
          </button>
      </div>
  );
}
