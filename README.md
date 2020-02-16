# _Karaoke Party Team_

#### _This site comes with the all basic parts to get you started making a single page website with webpack fast. | Feb 5th. 2020_

#### By _** Dusty McCord & Eric Settels & K. Wicz  & Josh Hellman & Todd Walraven **_
[link to demo](https://karaoke-team.web.app/)
[firebase cheatsheet](/firbase-cheatsheet.md)

## Description

This app will allow a group of friends create a Youtube karaoke playlist in realtime and then play that list from a computer for maxium karaoke party enjoyment. 

## Setup/Installation Requirements

_Make sure you have [git version control](https://git-scm.com/downloads) installed on your computer._

1. Find the green 'Clone or Download' button and copy the link
2. Open terminal and type...

**Windows**
```sh 
cd desktop
```

 Mac & linux 
 ```sh
 cd ~/Desktop
 ```

 3. In terminal, clone the project by typing:

```sh
git clone https://github.com/dustatron/recipe-wizard.git
```

4. Navigate to the new folder that was created on your desk:
```sh
cd recipe-wizard
```

5. In terminal, type:
```sh
npm install
```
6. Navigate to [Google Firebase](https://firebase.google.com/docs/web/setup?authuser=0).  Create new credentials for your project.

7. In terminal, use firebase command line to login with your Google account credentials by typing 
```sh
firebase login
```

8. Create a new Recipe Search API key and ID at [Edamam](https://developer.edamam.com/edamam-recipe-api).

9. In the root directory of your cloned folder, type 
```sh
touch .env
```

10. In your text editor, open the .env file and add
```sh
API_KEY = {your key here}
API_ID = {your ID here}
```
11. In the command line, start program with
```sh
npm run now
```
12. In the command line, start the server by running
```sh
firebase serve
```
13. Navigate to http://localhost:5000/ in your browser to see the project.



## Specs
### Behavior Driven Development Spec List

Behavoir | Input | Output
:---------|:------:|:------:
| The program will let a user create a party room or join an existing room from their phone or computer| start a room or join a room | user enters room |
| The program will let the user who created a room to give access to others to join their room | a key and room number is created to share | invited users join room |
| The program will let users in a room add songs to a playlist from a youtube search via their own device | user searches "Low Rider" finds & adds "Low Rider" to the playlist  | "Low Rider" is added to playlist |
| The program will play videos in the playlist on a central screen | queued video plays  | video plays and user sings to their song |
| The program will let users continue to add songs/videos to the end of playlist as long as room is open | user adds "freebird" to playlist | playlist is updated to include "freebird" |
| The program will live update the playlist as users add songs/videos to it and display the updated playlist on their personal device |"freebird" added to playlist | playlist display now includes "freebird"|

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

