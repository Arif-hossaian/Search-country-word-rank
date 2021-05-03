import {
  Card,
  CardContent,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableBody,
} from "@material-ui/core";
import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from "@material-ui/icons";
import Link from "next/link";
import { useState } from "react";
import styles from "./CountresTable.module.css";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  table: {
    minWidth: 900,
  },
});

const orderBy = (countries, value, direction) => {
  if (direction === "asc") {
    return [...countries].sort((a, b) => (a[value] > b[value] ? 1 : -1));
  }

  if (direction === "desc") {
    return [...countries].sort((a, b) => (a[value] > b[value] ? -1 : 1));
  }

  return countries;
};

const SortArrow = ({ direction }) => {
  if (!direction) {
    return <></>;
  }

  if (direction === "desc") {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowDownRounded color="inherit" />
      </div>
    );
  } else {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowUpRounded color="inherit" />
      </div>
    );
  }
};

const ContriesTable = ({ countries }) => {
  const classes = useStyles();

  const [direction, setDirection] = useState();
  const [value, setValue] = useState();

  const orderedCountries = orderBy(countries, value, direction);

  const switchDirection = () => {
    if (!direction) {
      setDirection("desc");
    } else if (direction === "desc") {
      setDirection("asc");
    } else {
      setDirection(null);
    }
  };

  const setValueAndDirection = (value) => {
    switchDirection();
    setValue(value);
  };

  return (
    <div className={styles.heading}>
      <Card>
        <CardContent>
          <TableContainer component={Paper}>
            <Table style={{ width: "980px" }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell
                    onClick={() => setValueAndDirection("name")}
                    style={{ cursor: "pointer" }}
                  >
                    Name{" "}
                    {value === "name" && <SortArrow direction={direction} />}
                  </TableCell>
                  <TableCell
                    align="right"
                    onClick={() => setValueAndDirection("population")}
                    style={{ cursor: "pointer" }}
                  >
                    Population{" "}
                    {value === "population" && (
                      <SortArrow direction={direction} />
                    )}
                  </TableCell>
                  <TableCell
                    align="right"
                    onClick={() => setValueAndDirection("area")}
                    style={{ cursor: "pointer" }}
                  >
                    Area{" "}
                    {value === "area" && <SortArrow direction={direction} />}
                  </TableCell>
                  <TableCell
                    align="right"
                    onClick={() => setValueAndDirection("gini")}
                    style={{ cursor: "pointer" }}
                  >
                    Gini{" "}
                    {value === "gini" && <SortArrow direction={direction} />}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderedCountries.map((country) => (
                  <Link
                    href={`/country/${country.alpha3Code}`}
                    key={country.name}
                  >
                    <TableRow className={styles.row} key={country.name}>
                      <TableCell component="th" scope="row">
                        <div style={{ display: "inline", }}>
                          <img
                            src={country.flag}
                            alt={country.name}
                            width="40px"
                            height="28px"
                          />
                        </div>
                        <span
                          style={{
                            fontSize: "24px",
                            marginLeft: "10px",
                            cursor: "pointer",
                            
                          }}
                        >
                          {country.name}
                        </span>
                      </TableCell>
                      <TableCell align="right" style={{ fontSize: "18px" }}>
                        {country.population}
                      </TableCell>
                      <TableCell align="right" style={{ fontSize: "18px" }}>
                        {country.area}
                      </TableCell>
                      <TableCell align="right" style={{ fontSize: "18px" }}>
                      {country.gini || "0%"}
                      </TableCell>
                    </TableRow>
                  </Link>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContriesTable;
