import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import Layout from '../../components/layout';

export async function getServerSideProps({ params }) {
    const locationRes = await fetch(`https://api.openweathermap.org/geo/1.0/zip?zip=${params.zipcode},US&limit=1&appid=55c3ccdb5380c9ad2b6b15a3e6c87abf`);
    const location = await locationRes.json();
    
    const data = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&appid=55c3ccdb5380c9ad2b6b15a3e6c87abf`);
  
    return {
      props: await data.json()
    }
}

export default function Zipcode(props) {
    const { city, list } = props;
  return (
    <Layout>
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>
          {city.name}
        </h1>

        <div>
            {list.map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', margin: 10, padding: 20, border: '1px solid lightgray', borderRadius: 10 }}>
                    <div>{item.dt_txt}</div><br />
                    <div>{item.weather[0].main}</div>
                </div>
            ))}
        </div>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel" className={styles.logo} />
        </a>
      </footer>
    </div>
    </Layout>
  )
}
