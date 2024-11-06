import { initializeApp, getApps, getApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

interface IConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

const firebaseConfig: IConfig = {
  apiKey: 'AIzaSyDheC8e9lXziM_WeiGIhpwkChdEmcTEOG8',
  authDomain: 'mynovel01.firebaseapp.com',
  projectId: 'mynovel01',
  storageBucket: 'images.mynovel.co',
  messagingSenderId: '95599015403',
  appId: '1:95599015403:web:e1bc2807c7f27e0d3055ae',
  measurementId: 'G-074HLH3TCP',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const storage = getStorage(app);

export { storage, app as default };
