# dadolhay-ssg

Static site generator for OSD600-NSA

## Requirements

- `Node` V16 or V18
- `Yarn` V1

## Usage

- Run `yarn install` first
- execute `./ssg.js [options]`

## Options

| Long | Short | Description |
| --help | -h | Displays usage information |
| --input | -i | Input file or folder. In case of folder will generate recursively, keeping file structure |
| --output | -o | Puts generated file(s) into directory **Original directory is destroyed** |
| --version | -v | Print version info and exit |

## Examples

- `./ssg.js --input ./inputs/`
- `./ssg.js --input ./inputs/Sherlock-Holmes-Selected-Stories/`
- `./ssg.js --input ./inputs/Sherlock-Holmes-Selected-Stories/ -o ./outputFolder`

## Optional features developed:

- No. 1, Parsing title
- No. 2, specify output directory
- No. 4, handle recursive structure
