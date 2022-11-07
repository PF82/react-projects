import React, { useState } from 'react'
import SingleColor from './SingleColor'

import Values from 'values.js'

function App() {
  // set up state values
  const [color, setColor] = useState('');
  const [error, setError] = useState(false);
  const [list, setList] = useState(new Values('#f15025').all(10)); // 10 to divide by 100%

  // avoid react issues; call onSubmit event with event object (e)
  const handleSubmit = (e) => {
    e.preventDefault();

    // try statement defines a code block to run (to try)
    // colors variable wrapped up with try statement in order 
    // to avoid errors (eg if user input is empty or with wrong values)
    try {
      // pass in color getting back from the state
      // and add in all method to generate tints and shades
      let colors = new Values(color).all(10)
      setList(colors)
      console.log(colors);

      // catch statement defines a code block to handle any error
    } catch (error) {
      setError(true)
      console.log(error);
    }
  }

  return (
    // place fragment as we are gonna have two sections 
    <>
      <section className='container'>
        <h3>color generator</h3>
        <form onSubmit={handleSubmit} action="">
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="#f15025"
            // if there is an error on input, its border turns red
            // ternary operator (setError in catch statement set to true)
            // 'error' from css classes (input.error{})
            className={`${error ? 'error' : null}`} />
          <button className='btn' type='submit'>
            submit
          </button>
        </form>
      </section>
      <section className='colors'>
        {/* iterate over colors; look for two things: get color and we 
        will need an index */}
        {list.map((color, index) => {
          console.log(color);
          return <SingleColor
            key={index}
            {...color}
            index={index}
            hexColor={color.hex} />
        })}
      </section>
    </>
  )
}

export default App
