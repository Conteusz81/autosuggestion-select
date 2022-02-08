import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { removeDuplicate } from "../utils/parsers";

const useFetchData = () => {
    const [searchedValue, setSearchedValue] = useState('');
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [noResult, setNoResult] = useState(false);
    const fetchTimeout = useRef(null);

    const handleChange = (event) => {
        const value = event.target.value.replaceAll(' ', '%20');
        setSearchedValue(value);
    };

    useEffect(() => {
        clearTimeout(fetchTimeout.current);
        fetchTimeout.current = setTimeout(() => {
            if (searchedValue) {
                setIsLoading(true);
                axios.get(`http://universities.hipolabs.com/search?name=${searchedValue}`)
                    .then(res => {
                        if (res.data.length) {
                            const filteredList = removeDuplicate(res.data);
                            const list = filteredList.map(el => ({ name: el.name, selected: false, used: false }));
                            setData(list);
                            setNoResult(false);
                        } else {
                            setNoResult(true);
                        }
                        setIsLoading(false);
                    })
                    .catch(err => console.log(err));
            } else {
               setNoResult(false);
               setData([]);
            }

        }, 1000);

    }, [searchedValue]);

    return { data, isLoading, noResult, handleChange };
};

export default useFetchData;
