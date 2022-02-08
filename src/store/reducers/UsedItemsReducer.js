import { itemExists } from "../../utils/parsers";

const initialState = [];

export const usedItemsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_ITEM": {
            if(itemExists(state, action.payload)) {
                return state.map((item, index) => {
                    if(item.name === action.payload.name) {
                        return {
                            ...item,
                            selected: action.payload.selected,
                        }
                    }
                    return item;
                });
            } else {
                return [...state, action.payload];
            }
        }
        case "REMOVE_ITEMS": {
            return [];
        }
        default: return state;
    }
};
