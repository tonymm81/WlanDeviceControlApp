module.exports = {
  assets: ['./assets/fonts'], // Linkkaa fontit automaattisesti
  dependencies: {
    'react-native-some-native-package': {
      platforms: {
        ios: null, // Estää linkityksen iOS:lle
      },
    },
  },
};
