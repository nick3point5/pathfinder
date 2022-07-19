import './FormInput.css';

export function FormInput({label, value, setValue}) {
	function handleInput(event, setValue) {
		event.preventDefault()
		const { value } = event.target
		setValue(value)
	}
  return (
    <div className={`FormInput`}>
      	<label>{label}</label>
				<input
					type='number'
					value={value}
					onChange={(event) => {
						handleInput(event, setValue)
					}}
				/>
    </div>
  )
}
