# infoScreen

Технологии

  - SASS
  - HTML 5
  - WEBPACK 4
  - React 16

### Project architecture

- /assets
    - /typography
        fontsName.*
    - /images
        imageName.*
- /src
  - /components
    - /UI
        - /UIComponentName
            - style.css
            - constants.js
            - UIComponentName.jsx
    - /ModuleName
        - /ComponentName
            - style.css
            - ComponentName.jsx
            - constants.js
  - /utils
     - utilsName.js
  - /pages
     - /routerName
         - routerName.js
     - rootRouter.js
  - /styles
     - globalStyleName.css
  - index.jsx
  - index.html

### Installation

infoScreen requires [Node.js](https://nodejs.org/) v6+ to run.

Install the dependencies and devDependencies and start the server.

```sh
$ npm i
```

### Development

Open your favorite Terminal and run these commands.

```sh
$ npm start
```

Run eslint:
```sh
$ npm run lint
```
#### Building for source
For production release:
```sh
$ npm run build
```
