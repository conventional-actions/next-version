import * as core from '@actions/core'
import concat from 'concat-stream'
import conventionalCommitsParser from 'conventional-commits-parser'
import gitSemverTags from 'git-semver-tags'
import gitRawCommits from 'git-raw-commits'
import {whatBump} from './what-bump'
import {outputVersion} from './output-version'
import * as semver from 'semver'

async function run(): Promise<void> {
  try {
    const path = core.getInput('path')
    const prefix = core.getInput('prefix') || 'v'
    const tagPrefix = core.getInput('tag-prefix') || 'v'
    const skipUnstable = core.getInput('skip-unstable') === 'true'

    gitSemverTags(
      {
        tagPrefix,
        skipUnstable
      },
      (err, tags) => {
        if (!tags || !tags.length) {
          const currentVersion = '0.0.0'
          const nextVersion = '0.0.1'

          core.warning('No tags')
          core.debug('release-type = patch')
          core.setOutput('release-type', 'patch')
          core.debug('bumped = true')
          core.setOutput('bumped', true)
          core.debug(`current-version = ${prefix}, ${currentVersion}`)
          outputVersion('current-version', prefix, currentVersion)
          core.debug(`version = ${prefix}, ${nextVersion}`)
          outputVersion('version', prefix, nextVersion)
          core.info(
            `patch release ${prefix}${currentVersion} -> ${prefix}${nextVersion}`
          )
          return
        }

        core.debug(`last tag = ${tags[0]}`)

        gitRawCommits({
          format: '%B%n-hash-%n%H',
          from: tags[0].toString() || '',
          path
        })
          .pipe(conventionalCommitsParser())
          .pipe(
            concat(data => {
              const commits = data

              const currentVersion = semver.clean(tags[0].toString()) || '0.0.0'
              core.debug(`current version = ${currentVersion}`)

              if (!commits || !commits.length) {
                core.warning('No commits since last release')
                core.debug('release-type = none')
                core.setOutput('release-type', 'none')
                core.debug('bumped = false')
                core.setOutput('bumped', false)
                core.debug(`current-version = ${prefix}, ${currentVersion}`)
                outputVersion('current-version', prefix, currentVersion)
                core.debug(`version = ${prefix}, ${currentVersion}`)
                outputVersion('version', prefix, currentVersion)
                core.info(`no release ${prefix}${currentVersion}`)
                return
              }

              const result = whatBump(commits)
              core.debug(`whatBump = ${result}`)
              const nextVersion =
                semver.inc(currentVersion, result.releaseType) || '0.0.1'

              core.debug(`nextVersion = ${nextVersion}`)
              core.debug(`release-type = result.releaseType`)
              core.setOutput('release-type', result.releaseType)
              core.debug('bumped = true')
              core.setOutput('bumped', true)
              core.debug(`current-version = ${prefix}, ${currentVersion}`)
              outputVersion('current-version', prefix, currentVersion)
              core.debug(`version = ${prefix}, ${nextVersion}`)
              outputVersion('version', prefix, nextVersion)
              core.info(
                `${result.releaseType} release ${prefix}${currentVersion} -> ${prefix}${nextVersion}`
              )
            })
          )
      }
    )
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
