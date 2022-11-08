import React, { useEffect } from 'react'

// pass in props from alert state value, etc
const Alert = ({ type, msg, removeAlert, list }) => {
  // once the component renders, then we want to call our useEffect
  useEffect(() => {
    // invoke the removeAlert function to remove the alert after 3seg
    const timeout = setTimeout(() => {
      removeAlert()
    }, 3000)
    // set up clean up function
    return () => clearTimeout(timeout)
  }, [list]) // list added for better user experience once the list changes

  return (
    // set up template string where all of them will have by default an alert
    // class but then depending on that type, we will have the second class;
    // the options will be danger or success; check up classes on index.css
    <p className={`alert alert-${type}`}>{msg}</p>
  )
}

export default Alert
