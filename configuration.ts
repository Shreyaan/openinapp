const configuration = {
  firebase: {
    apiKey: "AIzaSyCDMXIeODhGixVtgUsXBxuJmW-_pf6naks",
    authDomain: "openinappdemo.firebaseapp.com",
    projectId: "openinappdemo",
    storageBucket: "openinappdemo.appspot.com",
    messagingSenderId: "781515267827",
    appId: "1:781515267827:web:a23ad06c9da87f8188a186"
  },
  emulatorHost: process.env.NEXT_PUBLIC_EMULATOR_HOST,
  emulator: process.env.NEXT_PUBLIC_EMULATOR === 'true',
  paths: {
    signIn: '/',
    signUp: '/',
    appHome: '/dashboard',
  },
};

export default configuration;
