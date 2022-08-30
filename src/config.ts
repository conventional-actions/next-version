import * as core from '@actions/core'

type Config = {
  path: string
  prefix: string
  tagPrefix: string
  skipUnstable: boolean
}

export async function getConfig(): Promise<Config> {
  return {
    path: core.getInput('path'),
    prefix: core.getInput('prefix') || 'v',
    tagPrefix: core.getInput('tag-prefix') || 'v',
    skipUnstable: core.getInput('skip-unstable') === 'true'
  }
}
