import './FormInputNumber.css'

export function FormInputNumber({ label, value, setValue }) {
	function handleInput(event, setValue) {
		event.preventDefault()
		const { value } = event.target
		if (value > 100) {
			setValue(100)
		} else if(value < 1){
			setValue(1)
		} else {
			setValue(value)
		}
	}
	return (
		<div className={`FormInputNumber`}>
			<label>{label}</label>
			<div className='input-container'>
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
					className='number-input'
					min='1'
					max='100'
					type='number'
					value={value}
					onChange={(event) => {
						handleInput(event, setValue)
					}}
				/>
			</div>
		</div>
	)
}
