import path from 'node:path'

export function validateFilePath(filePath) {
    const extension = path.extname(filePath);
    
    if (extension !== '.json') {
      throw new Error('Invalid file extension. Only JSON files are supported.');
    }
  
    return true;
  }