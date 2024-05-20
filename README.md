# ${{values.name}}

## Tech Stack

Here's a curated list of packages that you should be at least familiar with before starting your project. However, the best way to see a complete list of the dependencies is to check [package.json](https://github.com/react-boilerplate/react-boilerplate/blob/master/package.json).

### Core

- [ ] [React](https://facebook.github.io/react/)
- [ ] [React Router](https://github.com/ReactTraining/react-router)
- [ ] [Redux](http://redux.js.org/) with [Redux Toolkit](https://redux-toolkit.js.org/) and [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- [ ] [Webpack](https://webpack.js.org/concepts/)
- [ ] [Fe Components](https://github.com/DTSL/fe_components)
- [ ] [Pattern Library](https://github.com/DTSL/pattern-library)

### Unit Testing

- [ ] [Jest](http://facebook.github.io/jest/)
- [ ] [react-testing-library](https://github.com/kentcdodds/react-testing-library)

### Linting

- [ ] [ESLint](http://eslint.org/)
- [ ] [Prettier](https://prettier.io/)
- [ ] [stylelint](https://stylelint.io/)

## Project Structure

```
   - app
     - api // Folder where fetch configuration resides
     - components
       - Welcome // Example Component
         - __tests__ // Test files reated to component
         - Welcome.jsx // Main file
         - Welcome.module.less // Style file related to component
         - index.js // Export your compoent from here
     - store // All logic related to redux resides here
       - store.js // Basic configuration of redux
       - slices // Contains initial state, reducers functions, actions
     - translations
     - utils
    App.js
    AppProvider.js
    index.html
    svgGraphics.js
```

- You will write your app in the `app` folder. This is the folder you will spend most, if not all, of your time in.
- Webpack Configuration are in the `webpack` folder.
- Jest Configuration are in the `tests` folder.

### `webpack/`

You can call this area the "engine" of your app. Your source code cannot be executed as-is in the web browser. It needs to pass through webpack to get converted into a version of Javascript that web browsers understand. While it's certainly helpful to understand what's happening here, for real world usage, you won't have to mess around with this folder much.

- `webpack`: You'll most probably use ECMAScript 6 or ECMAScript 7 to write the source code of your app. webpack takes care of making it compatible with a majority of browsers.

> ([ECMAScript](http://stackoverflow.com/a/33748400/5241520) is the standard for JavaScript. Most people are still using browsers which understand ECMAScript 5. So your code must be [transpiled](https://scotch.io/tutorials/javascript-transpilers-what-they-are-why-we-need-them) into browser-understandable code. To apply the transpiler to your source code, you will use webpack. Feeling the jitters already?

### `Tests/`

- `mocks`: This folder contains mocks which Jest uses when testing your app, e.g. for images.
- `jest.config.js`: Configuration file for jest

The other folders are mostly for the maintainers and/or the setup, and you should absolutely never need to touch them so we are going skip them for the sake of brevity.

### How does the application boot up?

Like any other webpage your app starts with the [`app/index.html`](/blob/feature_react-boilerplate-setup/app/index.html) file. React will render your application into `div#root` .

But how do we include all of your react components into a single HTML file? That's where webpack comes into the picture. webpack will literally pack your application into small javascript files. These files will be injected into the `index.html` as `<script>` tags.

When your application is deployed on a server, browsers will load this HTML file. The Javascript files that webpack has included will be executed by the browser, thereby booting up your React application! It's magic really! No, not really, though it can certainly seem that way. Let's dissect this phenomenon to better know what's really going on.

## Example App: Behind the scenes

The react-boilerplate building blocks interoperate to produce a seamless application. Let's join these pieces together.

<img src="app/assets/images/workflow.png" alt="boilerplate workflow" align="center" />

### Submitting pull requests

Pull requests are the greatest contributions, so be sure they are focused in scope, and do avoid unrelated commits.

- Fork it!
- Clone your fork: `git clone git@github.com:DTSL/react-boilerplate.git`
- Navigate to the newly cloned directory: `cd react-boilerplate`
- Create a new branch for the new feature: `git checkout -b my-new-feature`
- Install the tools necessary for development: `yarn or npm`
- Make your changes.
- Commit your changes: `git commit -am 'Add some feature'`
- Push to the branch: `git push origin my-new-feature`
- Submit a pull request with full remarks documenting your changes

# Dockerize application setup

Must Have

- Make sure any application/service is not running on port **8093** on your local system, if so please stop that application/service
- Make following changes in etc/hosts:
  ```
  127.0.0.1	localhost project-alias
  ```
- Add entry of project-alias in webpack/index.js allowed_hosts array.
- Change the server-name to project-alias in **nginx_proxy.conf**

\*Below Configuration is is you want to access Staging API from local env.

- Run `brew install mkcert`
- Run `mkcert --install project-alias.sendinblue.com` - in the following folder (.docker/compose/nginx/certs)
- Change the following volume mounting in docker.compose.yml file

```
 - './.docker/compose/nginx/certs/project-alias.com.pem:/usr/local/etc/nginx/project-alias.com.pem'

  - './.docker/compose/nginx/certs/project-alias.com-key.pem: usr/local/etc/nginx/project-alias.com-key.pem'
```

and change the server name to project-alias in nginx_proxy.conf.

### Initialize docker containers

Open terminal and go to your application path, lets say your project path is `/home/project/react-boilerplate` then use:

```
$ cd /home/project/react-boilerplate
```

Now run init command for initial setup of the react-boilerplate

```
$ make init
```

Once you have successfully finished this command you need to check logs to confirm that the node service has been started correctly. So for that run following command:

```
$ make logs-front
```

This will display the npm service logs. Once it says:

> frontend*1 | \_i* ｢wdm｣: Compiled successfully.

Now browse http://localhost:8093

### Post initialization

#### Once you have done the initialization of the frontend application then, from next time onwards you will use following commanes

1. To start the application

```
$ make start
```

2. To stop the application

```
$ make stop
```

3. To do `yarn` use

```
$ make install-front
```

4. To do `yarn build` use

```
$ make build-front
```

5. To do both npm install and build along, use

```
$ make front
```

6. View docker process list to know running services

```
$ make ps
```

7. If you want to rebuild docker containers, use

```
$ make build
```

This command only builds the docker container, to reflect the build changes, you need to start the application using `make start` command
