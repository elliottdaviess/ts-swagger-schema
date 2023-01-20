const fetch = require('node-fetch');
const { generateSchema } = require('ts-json-schema-generator');
const { execSync } = require('child_process');

// Fetch JSON schema from remote server - Tibco API layer?
fetch('https://example.com/schema.json')
  .then(res => res.json())
  .then(json => {
    // Generate TypeScript interfaces
    const schema = generateSchema(json, { topRef: true });
    // Write interfaces to file
    require('fs').writeFileSync('schemas.d.ts', schema);
    try {
      // Publish package to npm with alignment to the Tibco API layer version
      const version = json.version;
      execSync(`npm version ${version}`);
      execSync(`npm publish`);
    } catch (error) {
      console.error('Error publishing package:', error);
    }
  })
  .catch(error => {
    console.error('Error fetching schema:', error);
  });
