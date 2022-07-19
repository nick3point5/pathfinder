import './Toolbar.css'

export function Toolbar({
	runSearch,
	resetGrid,
	rows,
	setRows,
	columns,
	setColumns,
	algorithmType,
	setAlgorithmType,
}) {

	function handleApply(event) {
		event.preventDefault()
		resetGrid()
	}
	function handleInput(event, setValue) {
		event.preventDefault()
		const {value} = event.target
		setValue(value)
	}
	return (
		<div className={`Toolbar`}>
			<button onClick={runSearch}>Run</button>
			<button onClick={resetGrid}>Reset</button>
			<form>
				<label>rows</label>
				<input type='number'  value={rows} onChange={(event)=> {handleInput(event, setRows)}}/>
				<label>columns</label>
				<input type='number'  value={columns} onChange={(event)=> {handleInput(event, setColumns)}}/>
				<select value={algorithmType} onChange={(event)=> {handleInput(event, setAlgorithmType)}}>
					<option selected value="dijkstra">Dijkstra</option>
					<option value="greedy">Greedy</option>
					<option value="aStar">A*</option>
				</select>
				<button onClick={handleApply}>apply</button>

			</form>
		</div>
	)
}
