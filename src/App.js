import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Table, InputGroup, FormControl, Button, Container, Row, Col } from 'react-bootstrap';

import { useState, useEffect } from 'react';
import axios from 'axios'

function App() {

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

  //* capital search start
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
  //* capital search end

  //* general search start
  const [generalSearchText, setGeneralSearchText] = useState("")

  const onChangeGeneral = (e) => {
    setGeneralSearchText(e.target.value)
  }

  const filtered = country.filter((item) => {
    return Object.keys(item).some((key) => {
      return item[key].toString().toLowerCase().includes(generalSearchText.toLowerCase())
    })
  })

  const filterByGeneral = () => {
    return (
      <tbody>
        {filtered.map((ctry) => (
          <tr key={ctry.numericCode}>
            <td id='img'><img alt={"flag"} src={ctry.flag}></img></td>
            <td>{ctry.name}</td>
            <td>{ctry.capital}</td>
            <td>{ctry.region}</td>
          </tr>
        ))}
      </tbody>)
  }
  //* general search end

  return (
    <div className="App">
      <Container className='search-boxes'>
        <Row>
          <Col sm={12} md={6}>
            <InputGroup className="general-search mb-3">
              <InputGroup.Text className='bg-dark'>Dynamic Search by</InputGroup.Text>
              <FormControl aria-label="general" placeholder='General' className='bg-dark' value={generalSearchText} onChange={onChangeGeneral} />
              {/* <Button variant="outline-primary" id="search-button" onClick={filterByGeneral}>Search</Button> */}
            </InputGroup>
          </Col>
          <Col sm={12} md={6}>
            <InputGroup className="capital-search mb-3">
              <InputGroup.Text className='bg-dark'>Search by</InputGroup.Text>
              <FormControl aria-label="capital" placeholder='Capital' className='bg-dark' value={capitalSearchText} onChange={onChangeCapital} />
              <Button variant="outline-primary" id="search-button" onClick={filterByCapital}>
                Search
              </Button>
            </InputGroup>
          </Col>
        </Row>
      </Container>

      <Table striped bordered hover responsive variant="dark">
        <thead>
          <tr>
            <th>Flag</th>
            <th>Country</th>
            <th>Capital</th>
            <th>Region</th>
          </tr>
        </thead>
        {generalSearchText
          ? filterByGeneral()
          : (
            <tbody>
              {country.map(c => {
                return (
                  <tr key={c.numericCode}>
                    <td id='img'><img alt={"flag"} src={c.flag}></img></td>
                    <td>{c.name}</td>
                    <td>{c.capital}</td>
                    <td>{c.region}</td>
                  </tr>
                )
              })}
            </tbody>)}
      </Table>
    </div>
  )
}
export default App;
