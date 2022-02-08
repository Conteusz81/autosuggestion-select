import React from "react";
import cx from "classnames";
import { FaCheck } from "react-icons/fa";
import { BsClockHistory } from "react-icons/bs";
import styles from "./ListItem.module.css";

const ListItem = ({ name, selected, used, onClick }) => {
    const listItemClasses = cx(styles['list-item'], {
        [styles.selected]: selected,
        [styles.used]: used,
    });
    return (
        <div className={listItemClasses} onClick={onClick}>
            <div className={styles['list-item-name']}>{ name }</div>
            <div className={styles['list-item-icon']}>
                { selected && <FaCheck /> }
                { (used && !selected) && <BsClockHistory size="12" /> }
            </div>
        </div>
    );
};

export default ListItem;
