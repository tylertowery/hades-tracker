import Section from './Section';
import WeaponsList from './WeaponsList';
import { weaponsData } from '../data/data.js';
import { useState } from 'react';

export default function WeaponsSection() {
  const [openWeapons, setOpenWeapons] = useState({});

  const toggleOpen = (weaponName) => {
    setOpenWeapons((prevState) => ({
      ...prevState,
      [weaponName]: !prevState[weaponName],
    }));
  };

  return (
    <Section
      title='Weapons'
      items={weaponsData}
      renderItem={weapon => (
        <div className='weapons-section'>
          <div className='weapons-header' onClick={() => toggleOpen(weapon.name)}>
            <h3>{weapon.name} - {weapon.descriptor}</h3>
            <span>{openWeapons[weapon.name] ? '▼' : '►'}</span>
          </div>
          {openWeapons[weapon.name] && <WeaponsList weaponName={weapon.name} upgrades={weapon.upgrades} />}
        </div>
      )}
    />
  )
}
