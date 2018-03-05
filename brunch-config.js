exports.files = {
  javascripts: {
    joinTo: {
      'app.js': /\.js$/,
      'hyperappComponents.js': /^app\/components/
    }
  },
  stylesheets: {
    joinTo: 'hyperappComponents.css'
  }
};

exports.modules = {
  nameCleaner: path => path.replace(/^app\/components\/.*?\//, ''),
  wrapper: false
}

exports.plugins = {
  babel: { presets: ['latest'], plugins: ['es6-promise', ['transform-react-jsx', { "pragma": "h" }]] }
};
