import { Card, CardContent, Grid } from "@material-ui/core";
import {useState, useEffect} from "react"
import Layout from "../../components/Layout/Layout";
import styles from "./Country.module.css"

const getCountry = async (id) => {
  const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`);

  const country = await res.json();

  return country;
};

const Country = ({ country }) => {
  const [borders, setBorders] = useState([]);

  const getBorders = async () => {
    const borders = await Promise.all(
      country.borders.map((border) => getCountry(border))
    );

    setBorders(borders);
  };

  useEffect(() => {
    getBorders();
  }, []);

  console.log(borders);
  return (
    <Layout title={country.title}>
      <div>
        <Grid container spacing={3}>
          <Grid item md={4}>
            <Card>
              <CardContent>
                <img src={country.flag} alt={country.name} width="300px" />
                <h1
                  style={{
                    textAlign: "center",
                    fontSize: "28px",
                    marginBottom: "0px",
                  }}
                >
                  {country.name}
                </h1>
                <p style={{ textAlign: "center", marginTop: "0px" }}>
                  {country.region}
                </p>
                <div>
                  <Grid container spacing={8} style={{ textAlign: "center" }}>
                    <Grid item md={6}>
                      <p style={{ marginBottom: "0px" }}>
                        {country.population}
                      </p>
                      <p style={{ marginTop: "0px", color: "#bcc5cd" }}>
                        population
                      </p>
                    </Grid>
                    <Grid item md={6}>
                      <Grid item md={6}>
                        <p style={{ marginBottom: "0px" }}>{country.area}</p>
                        <p style={{ marginTop: "0px", color: "#bcc5cd" }}>
                          Area
                        </p>
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={8}>
            <Card>
              <CardContent>
                <h3>Details</h3>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h3 style={{ color: "#bcc5cd" }}>Capital</h3>
                  <h3>{country.capital}</h3>
                </div>
                <hr></hr>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h3 style={{ color: "#bcc5cd" }}>Languages</h3>
                  <h3>
                    {" "}
                    {country.languages.map(({ name }) => name).join(", ")}
                  </h3>
                </div>
                <hr></hr>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h3 style={{ color: "#bcc5cd" }}>Currencies</h3>
                  <h3>
                    {country.currencies.map(({ name }) => name).join(", ")}
                  </h3>
                </div>
                <hr></hr>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h3 style={{ color: "#bcc5cd" }}>Native name</h3>
                  <h3>{country.nativeName}</h3>
                </div>
                <hr></hr>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h3 style={{ color: "#bcc5cd" }}>Gini</h3>
                  <h3>{country.gini}</h3>
                </div>
                <hr></hr>
                <div>
                  <h3 style={{ color: "#bcc5cd" }}>Neighbouring Countries</h3>
                  <div className={styles.details_panel_borders_container}>
                      {borders.map(({flag, name}) => <div className={styles.details_panel_borders_country}>
                          <img src={flag} width="138px" height="100px"/>
                          <div className={styles.details_panel_borders_name}><p>{name}</p></div>
                      </div>)}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};

export default Country;

export const getServerSideProps = async ({ params }) => {
  const country = await getCountry(params.id);

  return {
    props: {
      country,
    },
  };
};
