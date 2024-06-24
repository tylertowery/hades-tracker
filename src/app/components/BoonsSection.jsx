import Section from './Section';
import BoonsList from './BoonsList';
import { godsData } from '../data/data.js';
import { useState } from 'react';

export default function BoonsSection() {
  const [openGods, setOpenGods] = useState({});

  const toggleOpen = (godName) => {
    setOpenGods((prevState) => ({
      ...prevState,
      [godName]: !prevState[godName],
    }));
  };

  return (
    <Section
      title='Boons'
      items={godsData}
      renderItem={god => (
        <div className='boons-section' key={god.name}>
          <div className='boons-header' onClick={() => toggleOpen(god.name)}>
            <h3>{god.name}</h3>
            <span>{openGods[god.name] ? '▼' : '►'}</span>
          </div>
          {openGods[god.name] && <BoonsList godName={god.name} boons={god.boons} />}
        </div>
      )}
    />
  )
}