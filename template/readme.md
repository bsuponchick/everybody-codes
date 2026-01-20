# Setting Up
Ensure you install all node modules using Yarn or NPM

# Running the Script
This project uses ts-node to execute TypeScript commands directly from the command line.  To run a specific file via node, use the following command:

`npx ts-node ec-templater`

This will provide you with instructions on how to proceed.

To create a new year, use the command:

`npx ts-node ec-templater create-year --days NUMBER_OF_DAYS YEAR`

For example:
`npx ts-node ec-templater create-year --days 20 2024`