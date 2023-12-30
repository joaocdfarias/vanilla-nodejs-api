import { writeFileSync } from 'node:fs'

export const writeDataToFile = (filename, content) => {
  writeFileSync(
    filename,
    JSON.stringify(content),
    'utf8',
    (error) => error && console.log(error)
  )
}
