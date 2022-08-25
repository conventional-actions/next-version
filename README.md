# next-version

A GitHub Action for calculating the next version based on [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/).

## Usage

To use the GitHub Action, add the following to your job:

```yaml
- id: version
  uses: conventional-actions/next-version@v1
```

### Inputs

| Name            | Default | Description                                                             |
|-----------------|---------|-------------------------------------------------------------------------|
| `prefix`        | `v`     | prefix to prepend to versions                                           |
| `tag-prefix`    | `v`     | specify a prefix for the git tag to be ignored from the semver checks   |
| `path`          | `.`     | filter commits to the path provided                                     |
| `skip-unstable` | `false` | if true, unstable tags (e.g. x.x.x-alpha.1, x.x.x-rc.2) will be skipped |

### Outputs

| Name                              | Example                                         | Description                         |
|-----------------------------------|-------------------------------------------------|-------------------------------------|
| `release-type`                    | `none`, `major`, `minor`, `patch`, `prerelease` | type of release                     |
| `current-version`                 | `v1.2.3rc2`                                     | the current version                 |
| `current-version-major`           | `v1`                                            | the major version                   |
| `current-version-minor`           | `v1.2`                                          | the major and minor version         |
| `current-version-patch`           | `v1.2.3`                                        | the major, minor and patch version  |
| `current-version-major-only`      | `1`                                             | the major version component         |
| `current-version-minor-only`      | `2`                                             | the minor version component         |
| `current-version-patch-only`      | `3`                                             | the patch version component         |                        
| `current-version-prerelease-only` | `rc2`                                           | the prerelease version only         |                      
| `version`                         | `v1.2.4`                                        | the new version                     |
| `version-major`                   | `v1`                                            | the major version                   |                                 
| `version-minor`                   | `v1.2`                                          | the major and minor version         |                     
| `version-patch`                   | `v1.2.4`                                        | the major, minor and patch version  |
| `version-major-only`              | `1`                                             | the major version component         |
| `version-minor-only`              | `2`                                             | the minor version component         |
| `version-patch-only`              | `4`                                             | the patch version component         |
| `version-prerelease-only`         | `rc2`                                           | the prerelease version only         |
| `bumped`                          | `true`, `false`                                 | true if the version has been bumped |

### Example

```yaml
on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - id: version
        uses: conventional-actions/next-version@v1
      - id: ${{steps.version.bumped}} == true
        run: |
          echo ${{steps.version.version}} > VERSION
```

## License

The scripts and documentation in this project are released under the [MIT License](LICENSE).
