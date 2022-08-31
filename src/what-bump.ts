import * as core from '@actions/core'
import {addBangNotes} from './add-bang-notes'
import {ReleaseType} from 'semver'

export type BumpInfo = {
  releaseType: ReleaseType
  level: number
  reason: string
}

const VERSIONS: ReleaseType[] = ['major', 'minor', 'patch']

export const whatBump = (commits: any): BumpInfo => {
  let level = 2
  let breakings = 0
  let features = 0

  for (const commit of commits) {
    core.debug(`evaluating commit ${JSON.stringify(commit)}`)

    // adds additional breaking change notes
    // for the special case, test(system)!: hello world, where there is
    // a '!' but no 'BREAKING CHANGE' in body:
    addBangNotes(commit)
    if (commit.notes.length > 0) {
      core.debug(`detected breaking change ${commit.notes}`)

      breakings += commit.notes.length
      level = 0
    } else if (commit.type === 'feat' || commit.type === 'feature') {
      core.debug(`detected feature ${commit.type}`)

      features += 1
      if (level === 2) {
        level = 1
      }
    }
  }

  return {
    level,
    releaseType: VERSIONS[level],
    reason:
      breakings === 1
        ? `There is ${breakings} BREAKING CHANGE and ${features} features`
        : `There are ${breakings} BREAKING CHANGES and ${features} features`
  }
}
