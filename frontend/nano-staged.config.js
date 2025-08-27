module.exports = {
  // Run ESLint on staged JS/TS files
  "*.js": ["eslint --fix", "prettier --write"],
  "*.ts": ["eslint --fix", "prettier --write"],
  "*.tsx": ["eslint --fix", "prettier --write"],

  // Run Prettier only on staged styles & config files
  "*.{json,css,scss,md}": ["prettier --write"],
};
