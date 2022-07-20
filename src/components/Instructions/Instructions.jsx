import './Instructions.css';

export function Instructions(props) {
	
  return (
    <div className={`Instructions`}>
      <p>Click and drag to create/remove walls</p>
      <p>Click and drag the start or end node to move it</p>
      <p>The source code can be found on <a href="https://github.com/nick3point5/pathfinder">here</a></p>
    </div>
  )
}
