import { SearchRounded } from "@material-ui/icons";
import TextField from '@material-ui/core/TextField';
import styles from "./SearchInput.module.css";

const SearchInput = ({ ...rest }) => {
  return (
    <div className={styles.wrapper}>
      <SearchRounded color="inherit"/>
      <TextField className={styles.input} {...rest}/>
    </div>
  );
};

export default SearchInput;
