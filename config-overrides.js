const { override, addBabelPlugin, addWebpackPlugin } = require('customize-cra');
const ContextReplacementPlugin = require('webpack').ContextReplacementPlugin;

const supportedLocales = [
  'de',
  'fr',
  'hu',
  'ja',
  'it',
  'es',
  'nl',
  'cs',
  'da',
  'el',
  'hr',
  'pl',
  'ru',
  'sk',
  'pt-br',
  'zh-cn',
];

module.exports = override(
  // Remove moment locales opt out:
  // https://github.com/facebook/create-react-app/blob/64df135c29208f08a175c941a0e94d9a56d9e4af/packages/react-scripts/config/webpack.config.js#L728
  (config) => {
    config.plugins = config.plugins.filter(
      (plugin) => 'IgnorePlugin' !== plugin.constructor.name
    );
    return config;
  },
  addWebpackPlugin(
    new ContextReplacementPlugin(
      /moment[\/\\]locale/,
      new RegExp(
        `[/\\\\](${supportedLocales
          .map((locale) => `${locale}(\\.js)?`)
          .join('|')})$`
      )
    )
  ),
  process.env.NODE_ENV !== 'production' &&
    addBabelPlugin('babel-plugin-transform-react-qa-classes')
);
