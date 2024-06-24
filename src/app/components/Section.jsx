import { useState } from 'react';


export default function Section({ title, items, renderItem }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='section'>
      <div className='section-header' onClick={toggleOpen}>
        <h2>{title}</h2>
        <span>{isOpen ? '▼' : '►'}</span>
      </div>
      <div className='section-content'>
        {isOpen && items.map((item, index) => (
          <div key={index} className='section-item'>
            {renderItem(item)}
          </div>
        ))}
      </div>
    </div>
  );
}