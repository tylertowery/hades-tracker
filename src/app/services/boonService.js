import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase_setup/config';
import { godsData, weaponsData } from '../data/data';

const getUserData = async (userId) => {
  const docRef = doc(db, 'users', userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const userData = docSnap.data();
    return {
      boons: userData.boons || {},
      weapons: userData.weapons || {},
    }
  } else {
    return {
      boons: {},
      weapons: {},
    }
  }
}

const updateUserBoon = async (userId, godName, boonName, value) => {
  const docRef = doc(db, 'users', userId);
  await updateDoc(docRef, {
    [`boons.${godName}.${boonName}`]: value,
  });
}

const updateUserWeapon = async (userId, weaponName, upgradeName, value) => {
  const docRef = doc(db, 'users', userId);
  await updateDoc(docRef, {
    [`boons.${weaponName}.${upgradeName}`]: value,
  });
}

const createUserDoc = async (userId, email) => {
  const boons = {};
  const weapons = {};

  godsData.forEach(god => {
    boons[god.name] = {};
    god.boons.forEach(boon => {
      boons[god.name][boon] = false;
    });
  });

  weaponsData.forEach(weapon => {
    weapons[weapon.name] = {};
    weapon.upgrades.forEach(upgrade => {
      weapons[weapon.name][upgrade] = false;
    });
  });

  const docRef = doc(db, 'users', userId);
  await setDoc(docRef, {
    email,
    boons,
    weapons,
  });
}

export { getUserData, updateUserBoon, updateUserWeapon, createUserDoc }