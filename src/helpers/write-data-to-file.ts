import { writeFileSync } from 'node:fs'

export const writeDataToFile = (filename: string, content: any) => {
  writeFileSync(filename, JSON.stringify(content), 'utf8')
}
