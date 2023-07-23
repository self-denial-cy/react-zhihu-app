const { lazy } = require('react');

module.exports = (path) => lazy(() => import(`@/views/${path}.jsx`));
