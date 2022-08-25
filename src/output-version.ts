import * as core from '@actions/core'
import * as semver from 'semver'

export const outputVersion = (
  name: string,
  prefix: string,
  currentVersion: string
): void => {
  core.setOutput(name, currentVersion)
  core.setOutput(`${name}-major`, `${prefix}${semver.major(currentVersion)}`)
  core.setOutput(
    `${name}-minor`,
    `${prefix}${semver.major(currentVersion)}.${semver.minor(currentVersion)}`
  )
  core.setOutput(
    `${name}-patch`,
    `${prefix}${semver.major(currentVersion)}.${semver.minor(
      currentVersion
    )}.${semver.patch(currentVersion)}`
  )
  core.setOutput(`${name}-major-only`, semver.major(currentVersion))
  core.setOutput(`${name}-minor-only`, semver.minor(currentVersion))
  core.setOutput(`${name}-patch-only`, semver.patch(currentVersion))
  core.setOutput(`${name}-prerelease-only`, semver.prerelease(currentVersion))
}
