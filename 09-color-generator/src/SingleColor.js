import React, { useState, useEffect } from 'react'
import rgbToHex from './utils'

// we are looking for four things: rgb, weight, index and hexColor
const SingleColor = ({ rgb, weight, index, hexColor }) => {
  const [alert, setAlert] = useState(false);
  // turn rgb the array into a string
  const bcg = rgb.join(',') // join items with commas
  console.log(bcg);
  // to display hex color and with #
  const hex = rgbToHex(...rgb) // or console.log(hexColor);
  const hexValue = `#${hexColor}`

  // for copied clipboard to dissapear once it changes
  useEffect(() => {
    // set up clean up function
    const timeout = setTimeout(() => {
      setAlert(false)
    }, 3000)
    return () => clearTimeout(timeout)
  }, [alert])

  return (
    <article
      // set up light and dark text colors to background
      className={`color ${index > 10 && 'color-light'}`}
      style={{ backgroundColor: `rgb(${bcg})` }}
      // rather than create buttons, add onClick to copy clipboard
      onClick={() => {
        setAlert(true) // true to display the value copied to the clipboard
        // copy value to clipboard; navigator object, clipboard method
        // and writeText method
        navigator.clipboard.writeText(hexValue)
      }}
    >
      <p className='percent-value'>
        {weight}%
      </p>
      <p className='color-value'>
        {hexValue}
      </p>
      {/* add functionality to copy hexValue to the clipboard;
      if alert is true then display the paragraph */}
      {
        alert && <p className='alert'>
          copied to clipboard
        </p>
      }
    </article >
  )
}

export default SingleColor
