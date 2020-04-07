# ShareYourProject

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.1.

## How to work

**NERVER WORK DIRECTLY ON MASTER !**

### Add a new feature
+ make sure you are on master branch : `git checkout master`
+ make sure you have the last version of master : `git pull`
+ create a new branch for the feature & move on this branch : `git checkout -b feat_NAME_OF_FEATURE`
+ edit files & commit with meaningful commit message : `git commit -m "a meaningfull message here"`
+ push your branch on remote : `git push -u origin feat_NAME_OF_FEATURE`
+ once the branch is on remote and you need to push again do simply : `git push`

**WARNING** : 1 branch = 1 feature  
don't make create a branch with multiple features or random little things.  

Test, re-test and re-re-test what you are doing and fix all issues you find.  
When the feature is completly done, go to Github.com and make a pull request to pull the branch on master.

### I find a issue
If you find a issue, **DON'T FIX IT YOURSELF**. Open a new issue ticket and give the followings :
+ expectation : what the code is suposse to do.
+ bad bahaviour : what the code do.
+ code : a minimal code to reproduce the issue (text, no screenshot).

### How to fix a issue
Follow same procedure as "Add a new feature" but name the branch `fix_#N` where N is the number of the issue ticket.

### Fetch
To remove local branches that are been deleted of remote do the following :
+ return on master : `git checkout master`
+ run fetch : `git fetch -p`

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

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
