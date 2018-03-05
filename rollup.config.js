import babel from 'rollup-plugin-babel';
import es2015Rollup from 'babel-preset-es2015-rollup';
import commonjs from 'rollup-plugin-commonjs';
import multiEntry from "rollup-plugin-multi-entry";

const plugins = [
    babel({
      babelrc: false,
      presets: ['es2015-rollup'],
      plugins: [['transform-react-jsx', {pragma: 'h'}]],
    }),
    commonjs(),
    multiEntry()
  ];

export default {
    input: 'app/components/**/*.js',
    output: {
      file: 'bundle.js',
      format: 'es'
    },
    plugins: plugins
  };