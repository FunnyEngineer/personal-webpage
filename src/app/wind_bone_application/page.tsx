import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import WindBonePage from './windBonePage';

export default function WindBoneApplication() {
  const filePath = path.join(process.cwd(), 'content/blog/wind_bone_application.md');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { content } = matter(fileContents);

  return <WindBonePage content={content} />;
}
