import React, { useEffect, useState } from "react";
import styles from "./Dropdown.module.css";
import ListItem from "../../atoms/ListItem/ListItem";
import SearchInput from "../../atoms/SearchInput/SearchInput";
import Button from "../../atoms/Button/Button";
import useFetchData from "../../../hooks/useFetchData";
import { enableResetButton } from "../../../utils/parsers";
import { useUsedItems } from "../../../store/context/UsedItemsContext";

const Dropdown = () => {
    const { data, isLoading, noResult, handleChange } = useFetchData();
    const { store, dispatch } = useUsedItems();
    const [list, setList] = useState([]);

    useEffect(() => {
        data.length ? setList(compareWithStore(data, store)) : setList(store);
    }, [data, store]);

    const compareWithStore = (data, store) => {
        if (store.length) {
            return data.map(item => {
                let storeItem = store.find(sItem => sItem.name === item.name);
                return storeItem ? { ...item, selected: storeItem.selected, used: storeItem.used } : item;
            });
        }
        return data;
    }

    const handleClick = (index) => {
        const newList = [...list];
        newList[index].selected = !newList[index].selected;
        newList[index].used = true;
        setList(newList);
        const payload = { name: list[index].name, selected: list[index].selected, used: true };
        dispatch({ type: 'ADD_ITEM', payload});
    }

    const resetButtonClick = () => {
        data.forEach(el => {
            el.selected = false;
            el.used = false;
        });
        dispatch({ type: 'REMOVE_ITEMS' });
    }

    return (
        <div className={styles.dropdown}>
            <div className={styles['dropdown-search']}>
                <SearchInput isLoading={isLoading} onChange={handleChange} />
            </div>
            <div className={styles['dropdown-list']}>
                { noResult ? <div className={styles['no-result']}>No result</div> :
                    list?.map(({name, selected, used}, index) => (
                    <ListItem key={index} name={name} selected={selected} used={used} onClick={() => handleClick(index)}/>
                ))}
            </div>
            <Button disabled={!enableResetButton(list, store)} onClick={resetButtonClick} />
        </div>
    );
};

export default Dropdown;
