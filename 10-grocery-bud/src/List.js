import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
// destructuring by passing in {list} into here as a prop plus other two
const List = ({ items, removeItem, editItem }) => {
  return (
    <div className='grocery-list'>
      {/* iterate through our grocery-list; we call our object item; we 
      have two things in our object: id and title which are destructured
      below */}
      {items.map((item) => {
        const { id, title } = item
        return (
          <article key={id} className='grocery-item'>
            <p className='title'>{title}</p>
            <div className='btn-container'>
              <button
                type='button'
                className='edit-btn'
                onClick={() => editItem(id)}>
                <FaEdit />
              </button>
              <button
                type='button'
                className='delete-btn'
                onClick={() => removeItem(id)}>
                <FaTrash />
              </button>
            </div>
          </article>
        )
      })}
    </div>
  )
}

export default List
