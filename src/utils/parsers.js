export const removeDuplicate = (list) => {
    if (list.length > 1) {
        const names = list.map(el => el.name);
        return list.filter(({ name }, index) => !names.includes(name, index + 1));
    }
    return list;
}

export const enableResetButton = (list, store) => {
    if (list.length && list.some(({ selected }) => selected)) {
        return true;
    }
    return !!store.length;
}

export const itemExists = (store, newItem) => {
    return store.some(item => item.name === newItem.name);
}
