import * as core from '@actions/core'

type Config = {
  path: string
  prefix: string
  noPrefix: boolean
  tagPrefix: string
  noTagPrefix: boolean
  skipUnstable: boolean
}

export async function getConfig(): Promise<Config> {
  return {
    path: core.getInput('path'),
    prefix: core.getInput('prefix') || 'v',
    noPrefix: core.getInput('no-prefix') === 'true',
    tagPrefix: core.getInput('tag-prefix') || 'v',
    noTagPrefix: core.getInput('no-tag-prefix') === 'true',
    skipUnstable: core.getInput('skip-unstable') === 'true'
  }
}
