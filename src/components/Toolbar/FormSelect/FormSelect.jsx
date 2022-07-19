import './FormSelect.css'

export function FormSelect({ label, value, setValue }) {
	function handleInput(event, setValue) {
		event.preventDefault()
		const { value } = event.target
		setValue(value)
	}
	return (
		<div className={`FormSelect`}>
			<label>{label}</label>
			<select
				value={value}
				onChange={(event) => {
					handleInput(event, setValue)
				}}
			>
				<option defaultValue value='dijkstra'>
					Dijkstra
				</option>
				<option value='greedy'>Greedy</option>
				<option value='aStar'>A*</option>
			</select>
		</div>
	)
}
