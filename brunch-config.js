exports.files = {
  javascripts: {
    joinTo: {
      'app.js': /\.js$/,
    }
  },
  stylesheets: {
    joinTo: 'hyperappComponents.css'
  }
}

exports.plugins = {
  babel: { presets: ['latest'], plugins: ['es6-promise', ['transform-react-jsx', { "pragma": "h" }]] }
};
