import Weapon from './Weapon';

export default function WeaponsList({ weaponName, upgrades }) {

  return (
    <div className='weapons-list'>
      <div className='weapons-header'>
        <h4>Available Upgrades</h4>
      </div>
      <ul>
        {upgrades.map((upgrade, index) => (
          <Weapon key={index} weaponName={weaponName} upgrade={upgrade} />
        ))}
      </ul>
    </div>
  )
}