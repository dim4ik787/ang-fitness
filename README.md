# AngFitness

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1KWqrNo6DX-UL6H9pI6KkrxFIrc0qVdQ",
  authDomain: "ang-fintess-1.firebaseapp.com",
  databaseURL: "https://ang-fintess-1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ang-fintess-1",
  storageBucket: "ang-fintess-1.appspot.com",
  messagingSenderId: "1018824253747",
  appId: "1:1018824253747:web:dd2af7249155e8d4a1de46"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
