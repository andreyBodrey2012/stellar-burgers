import { FC, PropsWithChildren } from 'react';

import styles from '@ui/pages/common.module.css';

type DetailsPageProps = PropsWithChildren<{
  title: string;
}>;

export const DetailsPage: FC<DetailsPageProps> = ({ title, children }) => (
  <main className={styles.container}>
    <div className={`pt-6 ${styles.wrapCenter}`}>
      <h3
        className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
      >
        {title}
      </h3>
      <div className={`${styles.main} pl-5 pr-5`}>{children}</div>
    </div>
  </main>
);
