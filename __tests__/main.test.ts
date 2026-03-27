import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import {test} from '@jest/globals'

test('test runs', () => {
  process.env['INPUT_PREFIX'] = 'v'
  const np = process.execPath
  const ip = path.join(__dirname, '..', 'dist', 'index.cjs')
  const options: cp.ExecFileSyncOptions = {
    env: process.env
  }
  console.log(cp.execFileSync(np, [ip], options).toString())
})
