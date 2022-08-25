import * as core from '@actions/core'
import * as semver from 'semver'

export const outputVersion = (
  name: string,
  prefix: string,
  version: string
): void => {
  core.setOutput(name, `${prefix}${version}`)
  core.setOutput(`${name}-major`, `${prefix}${semver.major(version)}`)
  core.setOutput(
    `${name}-minor`,
    `${prefix}${semver.major(version)}.${semver.minor(version)}`
  )
  core.setOutput(
    `${name}-patch`,
    `${prefix}${semver.major(version)}.${semver.minor(version)}.${semver.patch(
      version
    )}`
  )
  core.setOutput(`${name}-major-only`, semver.major(version))
  core.setOutput(`${name}-minor-only`, semver.minor(version))
  core.setOutput(`${name}-patch-only`, semver.patch(version))
  core.setOutput(`${name}-prerelease-only`, semver.prerelease(version))
}
