import express, { json } from 'express'
import { config } from 'dotenv'
import router from './router'
import errorHandler from './middlewares/errorHandler'
import { join } from 'path'
import { errors } from 'celebrate'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import connect from './connect'

export const argv = yargs(hideBin(process.argv)).options({
  port: { type: 'number', default: 4000, number: true },
  mode: { type: 'string', default: 'development', string: true, choices: ['production', 'development'] }
}).parseSync()

config({ path: join(process.cwd(), '.env.' + argv.mode) })
const { PORT = argv.port, PGCL = '' } = process.env

export const db = connect(PGCL)

function main() {
  const app = express()

  app.use(json())
  app.use('/api', router)
  app.use(errors())
  app.use(errorHandler)

  app.listen(PORT, () => {
    console.log(`[express]: Server is running at ${PORT} port`)
  })
}

try {
  main()
} catch (e) {
  console.log((e as Error).message)
  process.exit(0)
}
