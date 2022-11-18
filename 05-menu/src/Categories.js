import React from 'react';

const Categories = ({ categories, filterItems }) => {
  return (
    <div className='btn-container'>
      {categories.map((category, index) => {
        return (
          <button
            type='button'
            className='filter-btn'
            key={index}
            onClick={() => filterItems(category)}
          >
            {/* pass in the category; whatever it is the string value then pass it in */}
            {category}
          </button>
        );
      })}
    </div>
  );
};

export default Categories;
