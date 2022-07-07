import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Group } from '@mantine/core';
import styles from '../styles/table.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
