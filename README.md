# Milford Bible Companion
Create your own Bible Word Study using your own predefined list: definition, context, opposites.

[<img src="https://raw.githubusercontent.com/MilfordIndBaptistChurch/MilfordBibleCompanion/main/src/assets/screenshot.png">](https://milfordbiblecompanion.netlify.app)

## Update JSON file
You can update data.json file under `./src/common/data.json`.

## Recommended Text Editor Setup
[Sublime](https://www.sublimetext.com/)

## Type Support for `.vue` Imports in TS
TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration
See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup
```sh
npm install
```

### Compile and Hot-Reload for Development
```sh
npm run dev
```

### Type-Check, Compile and Minify for Production
```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)
```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)
```sh
npm run lint
```
### License
Distributed under the MIT License.

### Contact
Email: jamess.developer+mibc@gmail.com

Project URL: https://github.com/MilfordIndBaptistChurch/MilfordBibleCompanion

Demo URL: https://milfordbiblecompanion.netlify.app
