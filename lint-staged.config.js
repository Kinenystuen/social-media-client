// lint-staged.config.js
module.exports = {
  '**/*.js': (files) => [
    `eslint ${files.join(' ')} --cache --fix`,
    'prettier --write',
  ],
};
