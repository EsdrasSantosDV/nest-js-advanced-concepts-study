import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function generate(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    //NUMA SCHEMAATICS REPRESENTA POR UMA ARVORE
    //que contains the files and directories in the project
    //AQYU DEFUBE AS REFGRAS DA SCGENATUCS
    //CREATE,RENAME,DELETE,OVERWRITE
    //ESSAS SAO AS POSIVEIS ACTIONS DA MINHA SCHEMATIC
    return tree;
  };
}
