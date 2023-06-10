# openapi2pdf-cli

Converts a openapi spec file to pdf. Based on [RapiPDF](https://github.com/mrin9/RapiPdf)

## Features

- Supports Swagger 2.0 and OpenAPI 3.0
- Supports weburl or local file path for spec

## Usage

```bash

npx openapi2pdf-cli -i path/to/spec.json -ou path/to/doc.pdf

// OR

npm install -g openapi2pdf-cli

openapi2pdf -i ~/home/openapi-spec.json -o ~/home/pdf-spec.pdf

```
