# CLAngularPlayground

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.2.

## Project Structure

The overall structure of the application can be briefly showcased:

```
│
├── public/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── atoms/
│   │   │   ├── molecules/
│   │   │   └── organisms/
│   │   ├── directives/
│   │   ├── features/
│   │   ├── app.module.ts
│   │   └── app.component.ts
│   ├── assets/
│   ├── index.html
│   ├── main.ts
│   └── styles.css
├── angular.json
├── package.json
├── tsconfig.json
└── README.md
```

The detail of each file or directory can be defined as follows:

- `app/`: Contains the main application code.
- `public/`: Contain static, public assests.
- `components/`: Directory for Angular components, which contain smaller directories of reusable component (`atoms`, `molecules`, `organisms`)
- `directives/`: Directory for Angular directives.
- `features/`: Directory for feature modules.
- `assets/`: Directory for assets like images, fonts, etc.
- `index.html`: The main HTML file that serves as the entry point of the application.
- `main.ts`: The main TypeScript file that bootstraps the Angular application.
- `styles.css`: The global styles for the application.

## Development server

To start a local development server, run:

```bash
yarn start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng g --help
```

If we were to define a component `search-bar` within the `components/modecules` sub-directory, we will input the following command to the CLI:

```bash
ng generate component components/molecules/search-bar
```

## Building

To build the project run:

```bash
yarn build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests, use the following command:

```bash
yarn test
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Git & Commit Convention

To maintain a clean and organized version history, we follow specific conventions for using Git:

### Every feature must be coded on a separate branch

Before starting work on a new feature, create a new branch using the following command:

```
git checkout -b feature-branch-name main
```

The `main` branch is the branch you're branching from. Branch names should start with `feat/`, `fix/`, or `chore/` followed by a descriptive name. For example, we can create a branch to for the creation of the component `input` with the branch name `feat/input-component`.

### Commit Message Conventions

- **feat**: for new features
- **fix**: for bug fixes
- **chore**: for maintenance tasks, such as updating dependencies or refactoring code
- **docs**: for documentation changes
- **style**: for code style changes (such as formatting)
- **refactor**: for code refactoring

Commit messages should be concise and descriptive, summarizing the changes made. For example:

```bash
git add .
git commit -m "feat: adding new theme to the button component"
```

### Opening Pull Requests

- Once you've completed your work on a feature branch, open a pull request (PR) on GitHub.
- Provide a clear title and description for your PR, detailing the changes made.
- Assign relevant reviewers and labels to your PR.
