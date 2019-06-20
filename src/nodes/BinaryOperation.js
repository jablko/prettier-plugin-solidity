/* eslint-disable consistent-return */
const printers = require('../binary-operator-printers');

const BinaryOperation = {
  print: ({ node, path, print, options }) => {
    for (let i = 0, len = printers.length; i < len; i += 1) {
      if (printers[i].match(node.operator))
        return printers[i].print(node, path, print, options);
    }
  }
};

module.exports = BinaryOperation;
