# _Webpack Boilerplate_

#### _This site comes with the all basic parts to get you started making a single page website with webpack fast. | Feb 5th. 2020_

#### By _** Dusty McCord**_
[link to demo site coming](https://dustatron.github.io/webpack-boilerplate/)

## Description

There is a pre-built two input form with a submit button. There is also a simple jQuery function that will console.log when the submit button is clicked.

The .gitignore file is a template for mac osx but a link is provided to get a template for any operating system. 

[create a .gitignore template for your os here](https://www.gitignore.io/)

## Setup/Installation Requirements

_Make sure you have [git version control](https://git-scm.com/downloads) installed on your computer._

1. find the green 'Clone or Download' button and copy the link
2. open terminal and type...

**Windows**
```sh 
cd desktop
```

 Mac & linux 
 ```sh
 cd ~/Desktop
 ```

 3. in terminal type '_git clone {link to repository}_ '

```sh
git clone Link-Here
```

4. navigate to the new folder that was created on your desk
```sh
cd folder name
```

5. run npm install
```sh
npm install
```
6. run development server
```sh
npm run start
```

7. edit files in '/src' to make changes to the project.

8. remove .git delete this projects commit history
```sh
rm -rf .git
```
9. start your new git repository 
```sh
git init
```



## Specs
### Behavior Driven Development Spec List

Behavoir | Input | Output
:---------|:------:|:------:
|1 - The program will take in a simple input and return the input | 'hello' | 'hello' |


## Support 

_The software is provided as is. It might work as expected - or not. Use at your own risk._


## Built With

* [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) - Simple Scaffolding
* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - Used for interactivity in the page
* [jQuery](https://jquery.com/) - Used to interact with the DOM
* [Bootstrap 4.4](https://getbootstrap.com/) - Used for styling
* [webpack](https://webpack.js.org/)
* [Sass](https://sass-lang.com/)
* [ESLint](https://eslint.org/)
* [Node.js](https://nodejs.org/en/)
* [Uglifyjs](https://www.uglifyjs.net/)
* [Jest](https://jestjs.io/)
* [dotenv](#)

## Environmental Variables

save a file name '.env'
store  in the file 
```sh
API_KEY = YOUR UNIQUE API KEY GOES HERE
OTHER_API_KEY = OTHER UNIQUE API KEY GOES HERE
```
use 'process.env.API_KEY'.

Example:

```javascript
const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`
```

## Useful tools

* [Jest Cheat Sheets](https://devhints.io/jest)
* [Cheat Sheets](https://devhints.io/)

* [free icons @ icons8](https://icons8.com/)
* [free  icons @ fontawesome](https://fontawesome.com/)
---
* [Old School Gifs Search](https://gifcities.org/)
* [free images @ unsplash](https://unsplash.com/)
    * **_source.unsplash.com_ will return a random image at a desired size by simply calling the size after the url followed by a '?' and a keyword. Example below**

    * _https://source.unsplash.com/400x400/?cat_
    * http://unsplash.it/500/500 - This will just return a random image the size of 500x500
---
* [Flex-box Cheat Sheet](http://yoksel.github.io/flex-cheatsheet/)
* [CSS Grid Cheat Sheet](http://grid.malven.co/)
---
* [CSS Gradient BG Generator](https://mycolor.space/gradient)
* [CSS Basic Gradient Generator](https://cssgradient.io/)
---
* [CSS Dropshadow Generator](https://cssgenerator.org/box-shadow-css-generator.html)

* [git worktree](http://sangsoonam.github.io/2019/02/08/using-git-worktree-to-deploy-github-pages.html) 

### License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

Copyright (c) 2020 **_Dusty McCord_**

