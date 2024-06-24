import { useDispatch, useSelector } from 'react-redux';
import { setBoonCompletion } from '../../store/store';
import { db, auth } from '../../lib/firebase_setup/config';
import { doc, collection, updateDoc } from 'firebase/firestore';

export default function Boon({ godName, boon }) {
  const dispatch = useDispatch();
  const currentBoonState = useSelector((state) => state.boonsData[godName][boon]);
  const boonsData = useSelector((state) => state.boonsData);

  const handleClick = async () => {
    dispatch(setBoonCompletion(godName, boon));

    try {
      const currentUser = auth.currentUser;
      const userDocRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userDocRef, {
        boons: {
          ...boonsData,
          [godName]: {
            ...boonsData[godName],
            [boon]: !currentBoonState,
          },
        },
      });
      console.log('successfully updated boon data');
    } catch (error) {
      console.error('error updating database: ', error);
    }
  }

  return (
    <div onClick={handleClick}>
      <li>{boon}</li>
      <p>{currentBoonState ? 'Acquired' : 'Not Acquired'}</p>
    </div>
  )
}