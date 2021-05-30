## commitme

> Based on [this gist](https://gist.github.com/gustavopch/506a0651657b48e38a014a067e6bd221) by @gustavopch

# Installation

You can install this on your package using `npm i -D commitme` or run it once using `npx commitme`

# Configuration

Create a `.commitrc` on the root of your project to customize the choices.

## VSCode Support

Add this to your VSCode config file in order to get autocomplete for the config file:

```json
"files.associations": {
    ".commitrc": "jsonc"
  },
  "json.schemas": [
    {
      "fileMatch": [".commitrc"],
      "url": "https://raw.githubusercontent.com/roziscoding/commit-me/main/config-schema.json"
    }
  ]
```

## Options

- `choices`:

  - The list of commit types
  - Type: Array of [inquirer](https://www.npmjs.com/package/inquirer) choices for the `list` prompt type
    The `name` must be the commit type description, and the `value` must be an emoji

- `replaceDefaultChoices`:
  - If true, the default choices will not be used
  - Type: boolean

### Command line

- `-a`: Runs `git add --all` before commiting

- `--print`: Prints the commit message, instead of caling git (will ignore the `-a` flag)

# Contributor

- @roziscoding: Creator of this package
- @gustavopch: Creator of [the gist that allowed this package to exist](https://gist.github.com/gustavopch/506a0651657b48e38a014a067e6bd221)