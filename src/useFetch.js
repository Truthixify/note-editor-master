import { useState, useEffect } from "react"
const useFetch = (url) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const abort = new AbortController()

        setTimeout(()=> {
            try {
                if(JSON.parse(localStorage.getItem(url))) {
                    setData(JSON.parse(localStorage.getItem(url)))
                }
                else {
                    localStorage.setItem(url, JSON.stringify([]))
                    setData(JSON.parse(localStorage.getItem(url)))
                }

                setLoading(false)
            }
            catch(err) {
                console.log(err)
            }
        },1000)

        return () => abort.abort()
    },[url])

    return {data, loading}
}

export default useFetch