const rules = {
  curly: 'error'
};

const config = {};
const overrides = [];

overrides.push({
  files: ['.eslintrc.js', '*.js'],
  rules: {
    ...rules
  }
});

config.env = {
  es6: true,
  node: true
};
config.extends = ['eslint:recommended', 'prettier'];
config.overrides = overrides;
config.parserOptions = {
  ecmaVersion: 'latest',
  sourceType: 'script'
};
config.root = true;

module.exports = config;
