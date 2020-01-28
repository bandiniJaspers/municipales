import { useEffect, useState} from 'react'
import {fetchData} from '../../utils/fetch'


export const useFetch = (endpoint, defaultFilters = '') => {
    const [filters, setFilters] = useState(defaultFilters);
    const [searchFilter, setSearchFilter] = useState('');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        load();
    }, [filters, searchFilter])

    const load = async () => {
        setLoading(true);
        let newFilters = `${searchFilter}`;
        filters.map((f, idx) => {
            if (searchFilter) newFilters += `&${f}`
            else {
                let add = idx === 0 ? '?' : '&'
                newFilters += `${add}${f}`
            }

        })
        const result = await fetchData(endpoint, newFilters);
        setData(result);
        setLoading(false);
    }

    const updateFilters = data => {
        let newFilters = []
        for (let [key, value] of Object.entries(data)) {
            if (value)
                newFilters.push(`${key}=${value}`)
        }
        setFilters(newFilters);
    }

    const setSearchValue = async (e) => {
        if (!e.target.value) {
            setSearchFilter('')
            return;
        }
        let newFilter = `?search=${e.target.value}`
        setSearchFilter(newFilter)
    }

    return {
        filters, data, loading, searchFilter, setSearchValue, load, updateFilters
    }
}
