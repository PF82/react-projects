import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return JSON.parse(localStorage.getItem('list'))
  } else {
    return []
  }
}

function App() {
  // set up state values
  const [name, setName] = useState(''); // for the form
  const [list, setList] = useState(getLocalStorage()); // local storage used
  const [isEditing, setIsEditing] = useState(false); // flag in the state to whether we are editing or not
  const [editID, setEditID] = useState(null); // it will reflect which item we are editing 
  const [alert, setAlert] = useState({
    show: false,
    msg: '',
    type: '',
  }); // to display diferent colors for the values

  const handleSubmit = (e) => {
    e.preventDefault()
    // if the name value is empty, display alert
    if (!name) {
      // use showAlert function and pass in the values
      showAlert(true, 'danger', 'please enter value')
      // if there is something in the name value or isEditing value, deal with edit
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name }
          }
          return item
        }))
      setName('')
      setEditID(null)
      setIsEditing(false)
      showAlert(true, 'success', 'value changed')
      // if everything is correct and we have some kind of value in the 
      // name and we are not editing, then we want to create a newItem with
      // two properties (id & title) and add it to our list where we grab the
      // old values (...list) and then we add the newItem. setName to be an
      // empty string cause when we add an item to our list we would want to
      // clear the input field after clicking on submit button
    } else {
      showAlert(true, 'success', 'item added to the list')
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName('')
    }
  }

  // set up alert functionality; it is gonna be looking for three things (
  // show, msg and type)
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg })
  }

  // set up clear list functionality; and then add it to clear items button
  const clearList = () => {
    showAlert(true, 'danger', 'empty list');
    // to wipe out all the values
    setList([])
  }

  // set up functionality where we can remove individual items from the list
  // function looking for id and once we got it, set our list of new values
  // and also, show the alert
  const removeItem = (id) => {
    showAlert(true, 'danger', 'item removed');
    setList(list.filter((item) => item.id !== id))
  }

  // set up functionality where we can edit individual items from the list
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id)
    setIsEditing(true)
    setEditID(id)
    setName(specificItem.title)
  }

  // set up functionality for when there are items on the list and we refresh
  // the webpage the existing items on the list won't be deleted
  useEffect(() => {
    // everytime we do something with the list, wipe out the old values
    // and save the latest values on the list
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])

  return (
    <section className='section-center'>
      <form
        className='grocery-form'
        onSubmit={handleSubmit}>
        {/* pass in all the properties from our state alert value to Alert 
        component and then call the prop removeAlert and to be equal to our
        function showAlert; after this destructure the prop in Alert compo-
        nent */}
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}

        <h3>grocery bud</h3>
        <div className='form-control'>
          <input
            type="text"
            className='grocery'
            placeholder='e.g. eggs'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type='submit' className='submit-btn'>
            {/* to change button name */}
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      {/* set up conditional rendering; to only showcase the list as well 
      as the clear items button if there are some items in the div below */}
      {list.length > 0 && (
        <div className='grocery-container'>
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className='clear-btn' onClick={clearList}>clear items</button>
        </div>
      )}
    </section>
  )
}

export default App
