import fetch from 'isomorphic-unfetch';

export const fetchData = async (endPoint, query) => {
    //const res = await fetch(`lrem/search?search=${e.target.value}`);
    console.log("fetchData::", endPoint, query);
    const res = await fetch(`${endPoint}${query}`);
    try {
        const result = await res.json();
        if (result.length > 0) {
            return result;
        }
        return []
    }
    catch (e) {
        console.error(e);
    }
}
