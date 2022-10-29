# dadolhay-ssg

Static site generator for OSD600-NSA

## Requirements

- `Node` V18

## Usage

- Package can be run through `npx`

## Options

| Long      | Short | Description                                                                               |
| --------- | ----- | ----------------------------------------------------------------------------------------- |
| --help    | -h    | Displays usage information                                                                |
| --input   | -i    | Input file or folder. In case of folder will generate recursively, keeping file structure |
| --lang    | -l    | Language to put into the html element                                                     |
| --output  | -o    | Puts generated file(s) into directory **Original directory is destroyed**                 |
| --version | -v    | Print version info and exit                                                               |
| --config  | -c    | Run ssg using configuration file                                                          |

## Examples

- `npx @dadolhay/ssg --input ./inputs/`
- `npx @dadolhay/ssg --input ./inputs/Sherlock-Holmes-Selected-Stories/`
- `npx @dadolhay/ssg --input ./inputs/Sherlock-Holmes-Selected-Stories/ -o ./outputFolder`
- `npx @dadolhay/ssg --input ./inputs/Sherlock-Holmes-Selected-Stories/ -o ./outputFolder -l en-US`
- `npx @dadolhay/ssg --config ./src/config/default_config.json`
