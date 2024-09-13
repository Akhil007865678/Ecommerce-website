import React, { useState } from 'react';
import './index.css';
 
const Dropdown = () => {
  const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
  const [isDropdownOpen3, setIsDropdownOpen3] = useState(false);
  const [isDropdownOpen4, setIsDropdownOpen4] = useState(false);

  const Wearcategories = ["Mens Wear", "Kids Wear", "Womens Wear"];
  const ElectronicsCategories = ["mobiles", "laptops", "TV"];

  const handleClick = () => {
    
  }


  return (
    <>
    <div className='container2'>
      <div className="dropdown1">
        <button onClick={() => setIsDropdownOpen1(!isDropdownOpen1)} className="dropdown-toggle">
          Fashion
        </button>
        {isDropdownOpen1 && (
          <div className="dropdown-menu">
            {Wearcategories.map((category, index) => (
              <div
                key={category}
                className="dropdown-item"
              >
                {category}
              </div>
            ))}
          </div>
        )}
      </div>

    <div className="dropdown">
      <button onClick={() => setIsDropdownOpen2(!isDropdownOpen2)} className="dropdown-toggle">
        Electronics
      </button>
      {isDropdownOpen2 && (
        <div className="dropdown-menu">
          {ElectronicsCategories.map((category, index) => (
            <div
              key={category}
              className="dropdown-item"
            >
              {category}
            </div>
          ))}
        </div>
      )}
    </div>

    <div className="dropdown">
      <button onClick={() => setIsDropdownOpen3(!isDropdownOpen3)} className="dropdown-toggle">
        Home & Furniture
      </button>
      {isDropdownOpen3 && (
        <div className="dropdown-menu">
          {ElectronicsCategories.map((category, index) => (
            <div
              key={category}
              className="dropdown-item"
              onClick={handleClick}
            >
              {category}
            </div>
          ))}
        </div>
      )}
    </div>

    <div className="dropdown">
      <button onClick={() => setIsDropdownOpen4(!isDropdownOpen4)} className="dropdown-toggle">
        Beauty & Toy
      </button>
      {isDropdownOpen4 && (
        <div className="dropdown-menu">
          {ElectronicsCategories.map((category, index) => (
            <div
              key={category}
              className="dropdown-item"
            >
              {category}
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
    </>
  );
};

export default Dropdown;

