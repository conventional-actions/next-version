import * as core from '@actions/core'
import * as semver from 'semver'

export const outputVariables = (
  releaseType: string,
  prefix: string,
  currentVersion: string,
  nextVersion: string
): void => {
  core.debug(`current version = ${currentVersion}`)
  core.debug(`nextVersion = ${nextVersion}`)

  const bumped = nextVersion !== currentVersion
  core.debug(`bumped = ${bumped}`)
  core.setOutput('bumped', bumped)
  core.exportVariable('VERSION_BUMPED', bumped)

  core.debug(`release-type = ${releaseType}`)
  core.setOutput('release-type', releaseType)
  core.exportVariable('VERSION_RELEASE_TYPE', releaseType)

  core.debug(`current-version = ${prefix}${currentVersion}`)
  outputVersion('current-version', prefix, currentVersion)

  core.debug(`version = ${prefix}${nextVersion}`)
  outputVersion('version', prefix, nextVersion)
  return
}

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

  name = name.toUpperCase().replaceAll('-', '_')
  core.exportVariable(name, `${prefix}${version}`)
  core.exportVariable(`${name}_MAJOR`, `${prefix}${semver.major(version)}`)
  core.exportVariable(
    `${name}_MINOR`,
    `${prefix}${semver.major(version)}.${semver.minor(version)}`
  )
  core.exportVariable(
    `${name}_PATCH`,
    `${prefix}${semver.major(version)}.${semver.minor(version)}.${semver.patch(
      version
    )}`
  )
  core.exportVariable(`${name}_MAJOR_ONLY`, semver.major(version))
  core.exportVariable(`${name}_MINOR_ONLY`, semver.minor(version))
  core.exportVariable(`${name}_PATCH_ONLY`, semver.patch(version))
  core.exportVariable(`${name}_PRERELEASE_ONLY`, semver.prerelease(version))
}
