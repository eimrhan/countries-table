import { useState, useEffect } from 'react';
import axios from 'axios'

import TableComp from './table';
import SearchBoxes from './searchbox';

function Filter() {
    
  const [country, setCountry] = useState([])

  const loadData = () => {
    axios
      .get('https://restcountries.com/v2/all')
      .then(response => setCountry(response.data))
      .catch(error => (console.log(error)))
  }

  useEffect(() => {
    loadData()
  }, [])

  //! capital search start
  const [capitalSearchText, setCapitalSearchText] = useState("")

  const onChangeCapital = (e) => {
    setCapitalSearchText(e.target.value)
  }

  const filterByCapital = () => {
    if (capitalSearchText) {
      axios
        .get(`https://restcountries.com/v2/capital/${capitalSearchText}`)
        .then(response => setCountry(response.data))
        .catch(error => (console.log(error)))
    } else {
      loadData()
    }
  }
  //! capital search end

  //! general search start
  const [generalSearchText, setGeneralSearchText] = useState("")

  const onChangeGeneral = (e) => {
    setGeneralSearchText(e.target.value)
  }

  const filtered = country.filter((item) => {
    return Object.keys(item).some((key) => {
      return item[key].toString().toLowerCase().includes(generalSearchText.toLowerCase())
    })
  })
  //! general search end

  return (
    <>
        <SearchBoxes
        generalSearchText={generalSearchText} 
        onChangeGeneral={onChangeGeneral} 
        capitalSearchText={capitalSearchText} 
        onChangeCapital={onChangeCapital} 
        filterByCapital={filterByCapital} />
        <TableComp 
        generalSearchText={generalSearchText} 
        country={country}
        filtered={filtered} />
    </>
        //TODO: use Context-API for props
  )
}

export default Filter