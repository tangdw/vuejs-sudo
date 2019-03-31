var ghpages = require('gh-pages');

// https://tangdw.github.io/vuejs-sudo/
ghpages.publish('./dist', {
  repo: 'git@github.com:tangdw/vuejs-sudo.git',
  branch: 'gh-pages',
  dest: '.',
}, function(err) {
  console.log(err || 'success')
});
