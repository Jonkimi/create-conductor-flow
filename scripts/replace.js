import fs from 'fs';

// read the arguments from command line
// --input: path to the input file
// --output: path to the output file

const args = process.argv.slice(2);
const inputFilePath = args[args.indexOf('--input') + 1];
const outputFilePath = args[args.indexOf('--output') + 1];
const searchString = "~/.gemini/extensions/conductor";
const replaceString = "__$$CODE_AGENT_INSTALL_PATH$$__";

// read the input file

const fileContent = fs.readFileSync(inputFilePath, 'utf8');

// replace all occurrences of the search string with the replace string
const updatedContent = fileContent.split(searchString).join(replaceString);

// write the updated content to the output file
fs.writeFileSync(outputFilePath, updatedContent, 'utf8');

console.log(`Replaced all occurrences of "${searchString}" with "${replaceString}" in ${inputFilePath} and saved to ${outputFilePath}.`);