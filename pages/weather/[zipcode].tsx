import Head from 'next/head';
import styles from '../../styles/zipcode.module.css';
import Layout from '../../components/Layout';
import { GetServerSideProps } from 'next';
import { City, client, ForecastItem } from '../../lib/openWeatherApi';
import DateText from '../../components/DateText';

interface Props {
  city?: City,
  list?: Array<ForecastItem>,
  error?: string | undefined;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { getLocationFromZipcode, getForecastFromLocation } = client();
  const location = await getLocationFromZipcode(String(params?.zipcode));

  if (!location)
    return { props: { error: 'Invalid zipcode' } };

  const forecast = await getForecastFromLocation(location.lat, location.lon);

  return {
    props: forecast
  }
}

export default function Zipcode({ city, list, error }: Props) {

  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>Builder FE Assessment</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <h1 className={styles.title}>
            {city?.name}
          </h1>

          {error && (
            <span>{error}</span>
          )}

          {list?.length ? (
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {list.map((item, i) => (
                <div key={i} className={styles.weatherItem} >
                  <div><b><DateText value={item.dt_txt} /></b></div>
                  <div>{item.weather[0].main}</div>
                </div>
              ))}
            </div>
          ) : null}
        </main>
      </div>
    </Layout>
  )
}
