import './FormInputNumber.css'

export function FormInputNumber({ label, value, setValue }) {
	function handleInput(event, setValue) {
		event.preventDefault()
		const { value } = event.target
		setValue(value)
	}
	return (
		<div className={`FormInputNumber`}>
			<label>
				{label}
			</label>
			<input
				min='1'
				max='100'
				type='range'
				value={value}
				onChange={(event) => {
					handleInput(event, setValue)
				}}
			/>
			<input
				min='1'
				max='100'
				type='number'
				value={value}
				onChange={(event) => {
					handleInput(event, setValue)
				}}
			/>
		</div>
	)
}
