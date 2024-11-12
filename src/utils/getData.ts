import path from 'path';
import { promises as fs } from 'fs';
import { ChannelData } from '@/types/post';

export async function getData(): Promise<ChannelData> {
  const jsonDirectory = path.join(process.cwd(), 'data');
  const fileContents = await fs.readFile(jsonDirectory + '/data.json', 'utf8');
  return JSON.parse(fileContents);
} 