import Boon from './Boon';

export default function BoonsList({ godName, boons }) {

  return (
    <div className='boons-list'>
      <div className='boons-header'>
        <h4>Available Boons</h4>
      </div>
      <ul>
        {boons.map((boon, index) => (
          <Boon key={index} godName={godName} boon={boon} />
        ))}
      </ul>
    </div>
  );
}