
import Link from 'next/link';
import styles from '@/styles/pages/uretim/raporlar/raporlar.module.scss';
import Spacer from '@/components/common/spacer';

export default function Raporlar() {
  return (
      <>
          <Spacer height={100} />
          <div className={styles.raporlar}>
              <Link
                  className={styles.genel_raporlar}
                  href={`/dashboard/uretim/raporlar/genel-raporlar`}
              >
                  Genel Raporlar
              </Link>
              <Link
                  className={styles.musteri_raporlari}
                  href={`/dashboard/uretim/raporlar/musteri-raporlari`}
              >
                  Müşteri Raporları
              </Link>
          </div>
      </>
  );
}
