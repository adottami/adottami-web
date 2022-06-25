## Recommended tools

- [Visual Studio Code](https://code.visualstudio.com/)
  - [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
  - [DotENV](https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv)
  - [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
  - [.editorconfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  - [Prettier](https://marketplace.visualstudio.com/items?itemName=flowtype.flow-for-vscode)
  - [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)

## Conventions

### Files

Filenames must follow the `kebab-case`.

### Commit messages

This project follows [conventional commits](https://www.conventionalcommits.org/) to standardize commit messages.
Therefore, all commit messages should be formatted using the following scheme:

```txt
type(optional scope): subject
```

The available types are:

- `feat`: a new feature
- `fix`: a bug fix
- `refactor`: changes that neither fix a bug nor add a feature
- `test`: adding or fixing tests
- `perf`: changes improving performance
- `build`: changes affecting the build system
- `ci`: changes to CI configuration files and scripts
- `docs`: documentation changes
- `style`: a linting or formatting commit
- `revert`: a reversion of a previous commit
- `release`: a commit that updates the version of the project, preparing it to a new release
- `chore`: a commit that does not fit any of the types above

### Pull requests

Pull requests must target `canary`. As with commit messages, pull request titles must follow the [conventional commits](https://www.conventionalcommits.org/) convention:

`type(optional scope): subject (#<task-id>)`

> Example: `feat(parser): add ability to parse arrays (#47)`

- After creating a pull request, the [CI action](./.github/workflows/ci.yml) will configure a remote testing environment
  and run unit and integration tests. It's a good practice to wait until all checks have passed before requesting a
  review.

- After your pull request is reviewed and you've made the necessary changes, click "Mark as resolved" on the resolved
  discussions and ask the reviewer(s) to re-review your pull request.

### Branch organization

- `main` as the production branch, containing the production version of the project
- `canary` as the default and development branch, containing the latest version of the project

### Branch development

`<task-id>-<subject-in-kebab-case>`

> Example: `82-session-persistence`

- Before adding a commit, [Husky](https://typicode.github.io/husky/) is configured to automatically format your code.

- Before pushing to GitHub, [Husky](https://typicode.github.io/husky/) will automatically perform a static analysis and
  run unit and integration tests.

### Folders

The recommended file structure is as follows, to keep local resources and tests closer to the main file:

```
{filename}
 ├─ {filename}.ts(x?)
 ├─ constants.ts
 ├─ types.ts
 ├─ __tests__
 │   ├─ {filename}.test.ts(x?)
 │   └─ **/*.test.ts(x?)
 └─ **/*.ts(x?)                // local components, hooks and other utilities and abstractions
```
