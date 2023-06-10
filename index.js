import fs from 'node:fs';
import createPdf from './src/pdf-gen.js';
import {program} from 'commander'
import { getJSON } from './src/read-spec.js';


async function generate(spec, outputPath) {
  const localize = {
    index: 'INDEX',
    api: 'API',
    apiList: 'API List',
    apiReference: 'API Reference',
    apiVersion: 'API Version',
    contact: 'CONTACT',
    name: 'NAME',
    email: 'EMAIL',
    url: 'URL',
    termsOfService: 'Terms of service',
    securityAndAuthentication: 'Security and Authentication',
    securitySchemes: 'SECURITY SCHEMES',
    key: 'KEY',
    type: 'TYPE',
    example: 'EXAMPLE',
    description: 'DESCRIPTION',
    request: 'REQUEST',
    requestBody: 'REQUEST BODY',
    response: 'RESPONSE',
    responseModel: 'RESPONSE MODEL',
    statusCode: 'STATUS CODE',
    deprecated: 'DEPRECATED',
    allowed: 'ALLOWED',
    default: 'DEFAULT',
    readOnly: 'READ ONLY',
    writeOnly: 'WRITE ONLY',
    enumValues: 'ENUM',
    pattern: 'PATTERN',
    parameters: 'Parameters',
    noRequestParameters: 'No request parameters',
    method: 'METHOD',
  };

  const pdfSortTags = true;
  const pdfTitle = 'API Reference';
  const pdfCoverText = '';
  const pdfSecurityText = '';
  const pdfApiText = '';
  const pdfSchemaStyle = 'table';
  const pdfFooterText = '';
  const includeInfo = true;
  const includeToc = true;
  const includeSecurity = true;
  const includeExample = false;
  const includeApiDetails = true;
  const includeApiList = false;

  const options = {
    pdfSortTags,
    pdfPrimaryColor: '#000000',
    pdfAlternateColor: '#222222',
    pdfTitle,
    pdfCoverText,
    pdfSecurityText,
    pdfApiText,
    pdfSchemaStyle,
    pdfFooterText,
    includeInfo,
    includeToc,
    includeSecurity,
    includeExample,
    includeApiDetails,
    includeApiList,
    localize,
  };

  const doc = await createPdf(spec, options);

  doc.getBuffer((buffer) => {
    fs.writeFileSync(outputPath, buffer);
  });
}

program
  .option('-i, --input <inputPath>', 'Specify the input file path')
  .option('-o, --output <outputPath>', 'Specify the output file path')
  
  program.parse();
  const options = program.opts();
  const inputSource = options.input
  const outputPath = options.output

  const defaultOutputPath = `${new Date().toISOString()}.pdf`

  if(!inputSource){
    console.error('Please provide input file path or url');
    process.exit(1);
  }else{
    try {
        const jsonspec = await getJSON(inputSource);
        generate(jsonspec, outputPath || defaultOutputPath);
    } catch (error) {
        console.log("Failed to generate pdf", error)
    }
  }

