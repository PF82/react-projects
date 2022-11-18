import React, { useState } from 'react'
import data from './data'

function App() {
  // set up state values
  const [count, setCount] = useState(0); // how many data paragraphs we want to generate
  const [text, setText] = useState([]); // array of those data paragraphs

  // avoid react issues; call onSubmit event with event object (e)
  const handleSubmit = (e) => {
    e.preventDefault(); // avoid unnecessary page refreshes
    let amount = parseInt(count); // convert string into number

    if (count <= 0) {
      amount = 1 // show only one paragraph
    }
    if (count > 8) {
      amount = 8 // show last paragraph
    }

    setText(data.slice(0, amount)); // call setText to set up array text and display only number requested by user

    console.log(count) // number
    console.log(typeof count) // string
  }

  return (
    <section className='section-center'>
      <h3>tired of boring lorem ipsum?</h3>
      <form className='lorem-form' onSubmit={handleSubmit} action="">
        <label htmlFor="amount">
          paragraphs:
        </label>
        <input
          type="number"
          name="amount"
          id="amount"
          value={count}
          onChange={(e) => setCount(e.target.value)} />
        <button type='submit' className='btn'>generate</button>
      </form>
      <article className='lorem-text'>
        {/* add data paragraphs dynamically by iterating over text array */}
        {text.map((item, index) => {
          return <p key={index}>{item}</p>
        })}
      </article>
    </section>
  )
}

export default App
