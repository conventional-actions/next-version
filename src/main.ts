import * as core from '@actions/core'
import * as semver from 'semver'
import concat from 'concat-stream'
import conventionalCommitsParser from 'conventional-commits-parser'
import gitSemverTags from 'git-semver-tags'
import gitRawCommits from 'git-raw-commits'
import {whatBump} from './what-bump'
import {outputVariables} from './output-version'
import {getConfig} from './config'

async function run(): Promise<void> {
  try {
    const config = await getConfig()

    gitSemverTags(
      {
        tagPrefix: config.noTagPrefix ? '' : config.tagPrefix,
        skipUnstable: config.skipUnstable
      },
      (err, tags) => {
        const prefix = config.noPrefix ? '' : config.prefix

        if (!tags || !tags.length) {
          outputVariables('patch', prefix, '0.0.0', '0.0.1')
          return
        }

        core.debug(`last tag = ${tags[0]}`)

        gitRawCommits({
          format: '%B%n-hash-%n%H',
          from: tags[0].toString() || '',
          path: config.path
        })
          .pipe(conventionalCommitsParser())
          .pipe(
            concat(data => {
              const commits = data

              const currentVersion = semver.clean(tags[0].toString()) || '0.0.0'

              if (commits && commits.length) {
                const result = whatBump(commits)
                const releaseType = result.releaseType
                const nextVersion =
                  semver.inc(currentVersion, result.releaseType) || '0.0.1'

                core.debug(`whatBump = ${JSON.stringify(result)}`)
                core.info(
                  `${releaseType} release ${prefix}${currentVersion} -> ${prefix}${nextVersion}`
                )

                outputVariables(
                  releaseType,
                  prefix,
                  currentVersion,
                  nextVersion
                )
              } else {
                core.warning('No commits since last release')

                outputVariables('none', prefix, currentVersion, currentVersion)
              }
            })
          )
      }
    )
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
