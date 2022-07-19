import './Toolbar.css';

export function Toolbar({runSearch, resetGrid}) {
	
  return (
    <div className={`Toolbar`}>
      <button onClick={runSearch}>Run</button>
			<button onClick={resetGrid}>Reset</button>
    </div>
  )
}
