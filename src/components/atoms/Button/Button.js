import React from "react";
import styles from "./Button.module.css";

const Button = ({ disabled, onClick }) => {
    return <button disabled={disabled} className={styles.button} onClick={onClick}>
        Reset
    </button>;
};

export default Button;
