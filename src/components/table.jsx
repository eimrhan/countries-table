import { Table } from 'react-bootstrap';

function TableComp({ generalSearchText, country, filtered }) {

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

	return (
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
	)
}

export default TableComp