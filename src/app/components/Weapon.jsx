import { useDispatch, useSelector } from 'react-redux';
import { setUpgradeCompletion } from '../../store/store';
import { db, auth } from '../../lib/firebase_setup/config.js';
import { doc, collection, updateDoc } from 'firebase/firestore';

export default function Weapon({ weaponName, upgrade }) {
  const dispatch = useDispatch();
  const upgradeState = useSelector((state) => state.weaponsData[weaponName][upgrade]);
  const weaponsData = useSelector((state) => state.weaponsData);

  const handleClick = async () => {
    dispatch(setUpgradeCompletion(weaponName, upgrade));
    try {
      const currentUser = auth.currentUser;
      const userDocRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userDocRef, {
        weapons: {
          ...weaponsData,
          [weaponName]: {
            ...weaponsData[weaponName],
            [upgrade]: !upgradeState,
          },
        },
      });
      console.log('weaponsData uploaded to database successfully');
    } catch (error) {
      console.error('error updating database: ', error);
    }
  }

  return (
    <div onClick={handleClick}>
      <li>{upgrade}</li>
      <p>{upgradeState ? 'Acquired' : 'Not Acquired'}</p>
    </div>
  )
}