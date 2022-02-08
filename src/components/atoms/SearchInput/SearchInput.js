import React from "react";
import styles from "./SearchInput.module.css";

const SearchInput = ({ isLoading, onChange }) => {
    return (
        <div className={styles['input-container']}>
            <input className={styles['text-input']} placeholder="Search" onChange={onChange} autoComplete="false"/>
            { isLoading && <div className={styles.spinner} /> }
        </div>
    );
};

export default SearchInput;
