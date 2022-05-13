# Pavol

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.9.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Building application as .apk package
### Prerequisities
* Android SDK needs to be installed.
* ANROID_SDK_ROOT variable should be set to the correct path to SDK directory.
* Android build tools version 30.0.3 are needed to successfully build cordova `sdkmanager 'build-tools;30.0.3'`.
* Gradle needs to be installed to run cordova properly.

### Migrating Angular to cordova app
Tested on Manjaro linux with npm v8.5.5
Commands are to be run with sudo when needed

1. Navigate to wherever you want to have cordova project created and execute `cordova create pavol-bc-master-app sk.tuke.fei.pavol.bc PavolApp` 
New cordova project is created with default index file and everything needed to run this apk

2. Next navigate into the created cordova project `cd pavol-bc-master-app`

3. SDK for each targeted platform needs to be installed `cordova platform add android`

4. Copy everything from angular project into the created cordova project. For example `cp -r angular.json e2e/ karma.conf.js README.md src/ tsconfig.app.json  tsconfig.spec.json tsconfig.json tslint.json pavol-bc-master-app/`
5. Merge package.json file from original project into the cordova one. name needs to be the one from cordova project and everything there should stay as is, everything else from original project can be copied and overwritten if needed

6. Change the index file so that original base tak is in this form `<base href="./">`
7. Open tsconfig.json and update compilerOptions to have the target set to es5 instead of es2015
8. Open angular.json, find outputPath property and change it to www. This is needed for android to be able to run the app.

9. Now the project can be built: 
`ng build --config=production --aot`
if there is problem with legacy dependencies this can be run with `--legacy-peer-deps`

10. If ng build is successful now cordova can be built
`cordova build android`

11. Now everything should be ready to run. Now you can start any emulator and run the app with `cordova emulate android`

12. Everything works? Good. How about releasing it?
`cordova build --release android`
this will create unsigned .aab file you can run now, or you can sign it with pgp key if you want to have it in Google Play Store.
if you need to have .apk file you can run `cordova build --release -- --packageType=apk` instead
