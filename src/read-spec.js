import fs from "node:fs";
import axios from 'axios';

export async function getJSON(input) {
  try {
    if (input.startsWith('http')) {
      // Input is a web URL
      const response = await axios.get(input);
      return response.data;
    } else {
      // Input is a local file path
      const fileContent = await fs.promises.readFile(input, 'utf8');
      return JSON.parse(fileContent);
    }
  } catch (error) {
    console.error('Error retrieving and parsing JSON:', error);
    throw error;
  }
}
