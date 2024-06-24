import { createStore } from 'redux';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { devToolsEnhancer } from 'redux-devtools-extension';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';

export const setBoonsData = (boonsData) => ({
  type: 'SET_BOONS_DATA',
  payload: boonsData,
});

export const setWeaponsData = (weaponsData) => ({
  type: 'SET_WEAPONS_DATA',
  payload: weaponsData,
});

export const setBoonCompletion = (godName, boonName) => ({
  type: 'SET_BOON_COMPLETION',
  payload: { godName, boonName },
});

export const setUpgradeCompletion = (weaponName, upgradeName) => ({
  type: 'SET_UPGRADE_COMPLETION',
  payload: { weaponName, upgradeName },
});

const initialBoonsState = {
  'Athena': {
    'Divine Strike': false,
    'Divine Flourish': false,
    'Divine Dash': false,
    'Phalanx Shot': false,
    'Athena\'s Aid': false,
    'Sure Footing': false,
    'Bronze Skin': false,
    'Holy Shield': false,
    'Proud Bearing': false,
    'Blinding Flash': false,
    'Brilliant Riposte': false,
  },
  'Zeus': {
    'Lightning Strike': false,
    'Thunder Dash': false,
    'Electric Shot': false,
    'Thunder Flourish': false,
    'Zeus\' Aid': false,
    'Heaven\'s Vengeance': false,
    'Clouded Judgement': false,
    'Billowing Strength': false,
    'Lightning Reflexes': false,
    'Storm Lightning': false,
    'Static Discharge': false,
    'High Voltage': false,
    'Double Strike': false,
  },
  'Poseidon': {
    'Tempest Strike': false,
    'Tempest Flourish': false,
    'Tidal Dash': false,
    'Flood Shot': false,
    'Poseidon\'s Aid': false,
    'Hydraulic Might': false,
    'Ocean\'s Bounty': false,
    'Boiling Point': false,
    'Rip Current': false,
    'Typhoon\'s Fury': false,
    'Breaking Wave': false,
    'Razor Shoals': false,
    'Wave Pounding': false,
  },
  'Aphrodite': {
    'Heartbreak Strike': false,
    'Heartbreak Flourish': false,
    'Passion Dash': false,
    'Crush Shot': false,
    'Aphrodite\'s Aid': false,
    'Blown Kiss': false,
    'Wave of Despair': false,
    'Dying Lament': false,
    'Different League': false,
    'Life Affirmation': false,
    'Empty Inside': false,
    'Sweet Surrender': false,
    'Broken Resolve': false,
  },
  'Ares': {
    'Curse of Agony': false,
    'Curse of Pain': false,
    'Blade Dash': false,
    'Slicing Shot': false,
    'Ares\' Aid': false,
    'Curse of Vengeance': false,
    'Urge to Kill': false,
    'Battle Rage': false,
    'Blood Frenzy': false,
    'Impending Doom': false,
    'Dire Misfortune': false,
    'Black Metal': false,
    'Engulfing Vortex': false,
  },
  'Artemis': {
    'Deadly Strike': false,
    'Hunter Dash': false,
    'True Shot': false,
    'Deadly Flourish': false,
    'Artemis\' Aid': false,
    'Pressure Points': false,
    'Support Fire': false,
    'Hunter\'s Mark': false,
    'Clean Kill': false,
    'Hide Breaker': false,
    'Hunter Instict': false,
    'Exit Wounds': false,
  },
  'Dionysus': {
    'Drunken Strike': false,
    'Drunken Flourish': false,
    'Drunken Dash': false,
    'Trippy Shot': false,
    'Dionysus\' Aid': false,
    'After Party': false,
    'Positive Outlook': false,
    'Strong Drink': false,
    'Peer Pressure': false,
    'Numbing Sensation': false,
    'Bad Influence': false,
    'High Tolerance': false,
  },
  'Hermes': {
    'Second Wind': false,
    'Swift Strike': false,
    'Swift Flourish': false,
    'Quick Recovery': false,
    'Greater Haste': false,
    'Hyper Sprint': false,
    'Flurry Cast': false,
    'Greatest Reflex': false,
    'Greater Evasion': false,
    'Quick Favor': false,
    'Side Hustle': false,
    'Quick Reload': false,
    'Rush Delivery': false,
  },
  'Demeter': {
    'Frost Strike': false,
    'Mistral Dash': false,
    'Crystal Beam': false,
    'Frost Flourish': false,
    'Demeter\'s Aid': false,
    'Snow Burst': false,
    'Glacial Glare': false,
    'Frozen Touch': false,
    'Ravenous Will': false,
    'Arctic Blast': false,
    'Killing Freeze': false,
  },
  'Chaos': {
    'placeholder': false,
  }
}

const initialWeaponsState = {
  'Stygius': {
    'Flurry Slash': false,
    'Super Nova': false,
    'World Splitter': false,
    'Piercing Wave': false,
    'Double Nova': false,
    'Breaching Slash': false,
    'Double Edge': false,
    'Cruel Thrust': false,
    'Shadow Slash': false,
    'Cursed Slash': false,
    'Hoarding Slash': false,
    'Dash Nova': false,
  },
  'Coronacht': {
    'Twin Shot': false,
    'Sniper Shot': false,
    'Explosive Shot': false,
    'Flurry Shot': false,
    'Piercing Volley': false,
    'Perfect Shot': false,
    'Relentless Volley': false,
    'Triple Shot': false,
    'Charged Volley': false,
    'Chain Shot': false,
    'Point-Blank Shot': false,
    'Concentrated Volley': false,
  },
  'Aegis': {
    'Dashing Wallop': false,
    'Charged Shot': false,
    'Dread Flight': false,
    'Explosive Return': false,
    'Breaching Rush': false,
    'Sudden Rush': false,
    'Pulverizing Blow': false,
    'Minotaur Rush': false,
    'Charged Flight': false,
    'Empowering Flight': false,
    'Ferocious Guard': false,
    'Dashing Flight': false,
  },
  'Varatha': {
    'Extending Jab': false,
    'Flurry Jab': false,
    'Exploding Launcher': false,
    'Chain Skewer': false,
    'Breaching Skewer': false,
    'Vicious Skewer': false,
    'Massive Spin': false,
    'Quick Spin': false,
    'Serrated Point': false,
    'Charged Skewer': false,
    'Flaring Spin': false,
    'Triple Jab': false,
  },
  'Twin Fist of Malphon': {
    'Long Knuckle': false,
    'Rolling Knuckle': false,
    'Concentrated Knuckle': false,
    'Breaching Cross': false,
    'Explosive Upper': false,
    'Rush Kick': false,
    'Flying Cutter': false,
    'Draining Cutter': false,
    'Quake Cutter': false,
    'Kinetic Launcher': false,
    'Colossus Knuckle': false,
    'Heavy Knuckle': false,
  },
  'Exagryph': {
    'Targeting System': false,
    'Flurry Fire': false,
    'Spread Fire': false,
    'Rocket Bomb': false,
    'Triple Bomb': false,
    'Piercing Fire': false,
    'Explosive Fire': false,
    'Delta Chamber': false,
    'Hazard Bomb': false,
    'Cluster Bomb': false,
    'Ricochet Fire': false,
    'Seeking Fire': false,
  },
}

const initialState = {
  boonsData: initialBoonsState,
  weaponsData: initialWeaponsState,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    case 'SET_BOONS_DATA':
      return {
        ...state,
        boonsData: action.payload,
      };
    case 'SET_WEAPONS_DATA':
      return {
        ...state,
        weaponsData: action.payload,
      };
    case 'SET_BOON_COMPLETION':
      const { godName, boonName } = action.payload;
      const currentBoonCompletionStatus = state.boonsData[godName][boonName];
      return {
        ...state,
        boonsData: {
          ...state.boonsData,
          [godName]: {
            ...state.boonsData[godName],
            [boonName]: !currentBoonCompletionStatus,
          },
        },
      };
    case 'SET_UPGRADE_COMPLETION':
      const { weaponName, upgradeName } = action.payload;
      const currentUpgradeCompletionStatus = state.weaponsData[weaponName][upgradeName];
      return {
        ...state,
        weaponsData: {
          ...state.weaponsData,
          [weaponName]: {
            ...state.weaponsData[weaponName],
            [upgradeName]: !currentUpgradeCompletionStatus,
          },
        },
      };
    default:
      return state;
  }
}

const persistConfig = {
  key: 'nextjs',
  whitelist: ['boonsData', 'weaponsData'],
  storage,
}

export const makeStore = (context, isServer) => {
  if (isServer) {
    return createStore(reducer, devToolsEnhancer());
  } else {
    const { persistStore, persistReducer } = require('redux-persist');

    const persistedReducer = persistReducer(persistConfig, reducer);

    const store = createStore(persistedReducer, devToolsEnhancer());

    store.__persistor = persistStore(store);

    return store;
  }
}

export const wrapper = createWrapper(makeStore, { debug: true });