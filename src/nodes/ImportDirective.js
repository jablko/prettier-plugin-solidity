const {
  doc: {
    builders: { concat, group, indent, join, line, softline }
  }
} = require('prettier');

const ImportDirective = {
  print: ({ node, options }) => {
    // @TODO: handle proper escaping
    let doc = concat(['"', node.path, '"']);

    if (node.unitAlias) {
      doc = concat([doc, ' as ', node.unitAlias]);
    } else if (node.symbolAliases) {
      doc = concat([
        '{',
        indent(
          concat([
            options.bracketSpacing ? line : softline,
            join(
              concat([',', line]),
              node.symbolAliases.map(([a, b]) => (b ? `${a} as ${b}` : a))
            )
          ])
        ),
        options.bracketSpacing ? line : softline,
        '} from ',
        doc
      ]);
    }
    return group(concat(['import ', doc, ';']));
  }
};

module.exports = ImportDirective;
