module.exports = {
  'src/**/*.js': (files) => [
    `eslint "${files.join('" "')}" --cache --fix`,
    'prettier --write',
  ],
};
