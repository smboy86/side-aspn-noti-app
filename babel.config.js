module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      '@babel/plugin-proposal-export-namespace-from',
      'react-native-reanimated/plugin',
      require.resolve('expo-router/babel'),
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@assets': './src/assets',
            '@auth': './src/auth',
            '@components': './src/components',
            '@constants': './src/constants',
            '@screens': './src/context',
            '@utils': './src/hooks',
            '@store': './src/store',
          },
        },
      ],
    ],
  };
};
