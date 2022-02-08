import React from "react";
import styles from "./Counter.module.css";

const Counter = ({ quantity }) => {
    return (
        <div className={styles.counter}>
            { quantity }
        </div>
    );
};

export default Counter;
