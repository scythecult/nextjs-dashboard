import React from 'react';
import styles from './styles/layout.module.css';

export default function Layout({ children }: React.PropsWithChildren) {
  return <div className={styles.layout}>{children}</div>;
}
