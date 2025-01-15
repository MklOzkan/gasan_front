
import Logout from '@/components/common/form-fields/logout-button.jsx';
import HomeButton from './HomeButton';
import styles from '@/styles/common/menu-button.module.scss';
import Link from 'next/link';
import { IoIosLogIn } from 'react-icons/io';

export default function MenuButton({ isOpen, username, session, handleMenuClick }) {
    console.log('username', username);
    const pathname = window.location.pathname;
    console.log(pathname);
  return (
      <aside
          className={`${styles.sidebar} ${
              isOpen ? styles.open : styles.closed
          }`}
      >
          <nav className={styles.links}>
              <div className={styles.close_button} onClick={handleMenuClick}>
                  x
              </div>
              <div className={styles.home_button}>
                  <HomeButton username={username} />
              </div>
              {username && (
                  <div className={styles.logout_container}>
                      <Logout />
                  </div>
              )}

              {!username && (
                  <div className={styles.home_button}>
                      <Link
                          href={`/login?username=${encodeURIComponent(
                              'Admin'
                          )}&link=${encodeURIComponent(
                              'dashboard/yonetici-menu'
                              )}&user=${encodeURIComponent('YÖNETİM')}`}
                          type='button'
                          className={styles.login}
                          title='Yönetici Girişi'
                      >
                          <IoIosLogIn size={30}/>
                      </Link>
                  </div>
              )}
          </nav>
      </aside>
  );
}
