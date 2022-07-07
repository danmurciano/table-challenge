import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import UsersTable from '../components/UsersTable';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Table Challenge</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <UsersTable />
      </main>
    </div>
  )
}

export default Home
