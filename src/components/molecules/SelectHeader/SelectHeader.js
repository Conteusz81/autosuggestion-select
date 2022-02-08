import React from "react";
import cx from "classnames";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import styles from "./SelectHeader.module.css";
import Counter from "../../atoms/Counter/Counter";
import { useUsedItems } from "../../../store/context/UsedItemsContext";

const SelectHeader = ({ isOpen }) => {
    const { store } = useUsedItems();

    const selectBoxClasses = cx(styles['select-header'], {
        [styles['select-header-opened']]: isOpen,
    });

    const getSelectedItems = () => {
        return store?.filter(item => item.selected);
    };

    return (
    <div className={selectBoxClasses}>
        <div className={styles['select-header-content']}>
            <div className={styles['select-header-box']}>
                <div className={styles['select-header-title']}>Universities</div>
                { getSelectedItems().length > 0 && <Counter quantity={getSelectedItems().length} /> }
            </div>
            { isOpen ? <FiChevronUp /> : <FiChevronDown /> }
        </div>
    </div>
    );
};

export default SelectHeader;
