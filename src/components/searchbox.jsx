import { InputGroup, FormControl, Button, Container, Row, Col } from 'react-bootstrap';

function SearchBoxes({ generalSearchText, onChangeGeneral, capitalSearchText, onChangeCapital, filterByCapital }) {
	return (
		<Container className='search-boxes'>
			<Row>
				<Col sm={12} md={6}>
					<InputGroup className="general-search mb-3">
						<InputGroup.Text className='bg-dark'>Dynamic Search by</InputGroup.Text>
						<FormControl aria-label="general" placeholder='General' className='bg-dark' value={generalSearchText} onChange={onChangeGeneral} />
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
	)
}

export default SearchBoxes