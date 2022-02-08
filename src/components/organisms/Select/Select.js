import React, { useEffect, useRef, useState } from "react";
import cx from "classnames";
import styles from "./Select.module.css";
import SelectHeader from "../../molecules/SelectHeader/SelectHeader";
import Dropdown from "../../molecules/Dropdown/Dropdown";
import { UsedItemsProvider } from "../../../store/context/UsedItemsContext";

const Select = () => {
    const [isOpen, setIsOpen] = useState(false);
    const select = useRef(null);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('mousedown', handleClickOutside);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('mousedown', handleClickOutside);
        }
    }, []);

    const dropdownClasses = cx(styles['dropdown-list'], {
        [styles['dropdown-list-opened']]: isOpen,
    });

    const handleKeyDown = (event) => {
        const escapeKey = 27;
        if (event.keyCode === escapeKey) {
            setIsOpen(false);
        }
    };

    const handleClickOutside = (event) => {
        const target = select.current;
        const withinBoundaries = event.composedPath().includes(target);
        if (!withinBoundaries) {
            setIsOpen(false);
        }
    };

    return (
        <UsedItemsProvider>
            <div ref={select} className={styles['select-container']}>
                <div onClick={() => setIsOpen(prevState => !prevState)}>
                    <SelectHeader isOpen={isOpen} />
                </div>
                <div className={dropdownClasses}>
                    <Dropdown />
                </div>
            </div>
        </UsedItemsProvider>
    );
};

export default Select;
