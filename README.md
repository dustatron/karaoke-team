# _Karaoke Party Team_

![Alt text](src/imges/splashscreen.png?raw=true "Optional Title")

#### _Feb 17th. 2020_

#### By: _**Dusty McCord, Eric Settels, K. Wicz, Josh Hellman & Todd Walraven**_
[link to demo](https://karaoke-team.web.app/)

[firebase cheatsheet](/firbase-cheatsheet.md)

## Description

This app will allow a group of friends create a Youtube karaoke playlist in realtime and then play that list from a computer for maxium karaoke party enjoyment. 

## Setup/Installation Requirements

Prerequisite that are needed:
* text editor of your choice (atom, VSCode, etc.)
* terminal application such as git bash
* Node package manager

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
git clone https://github.com/dustatron/karaoke-team.git
```

4. Navigate to the new folder that was created on your desk:
```sh
cd karaoke-team
```

### Firebase Setup 

5. Creat a database using Google Firebase, follow along with the instructions [Firebase Setup](https://firebase.google.com/docs/database/web/start) follow steps starting at create a database

6. once your database is created login to your dashboard and click start a new project then name your project a name of your choice in step 2 allow for google analitics and click continue finally select default account for firebase in the dropdown menu and then click create a project.

7. once in your project you'll need to setup the database click the database tab on the left side then click create database

![Alt text](src/imges/Screen-Shot-create-database.png?raw=true "Optional Title")

8. select start in production mode then click next, then select the closest region to you and click done

9. once in your project's dashboard click on the settings wheel in the left hand corner

![Alt text](src/imges/screenshot-firebase-setup.png?raw=true "Optional Title")

10. at the bottom of the page under your apps push the </> button (screen shot bellow)

![Alt text](src/imges/Screen-Shot-setting-up-project.png?raw=true "Optional Title")

11. name your app a name of your choice and check the box to allow Firebase Hosting then click Register app.

![Alt text](src/imges/Screen-Shot-web-app.png?raw=true "Optional Title")

12. click through the setup steps that follow but ignore instructions on setup steps in terminal until it brings you back to your settings dashboard. from there navigate to your apps and select the radio button that says Config then copy the text by clicking the copy icon in the corner.

![Alt text](src/imges/Screen-Shot-sdk-snippit.png?raw=true "Optional Title")

13. navigate to root directory of project and open up project with text editor of your choice. then navigate to src/main.js then replace lines 12 through 21 with copied text from step 13, then save the document.

### YouTube API setup

14. go to [YouTube API setup page](https://developers.google.com/youtube/v3/getting-started), follow along with the steps on the page to obtain an API key.

15. once you have the API key copy and paste it at the end of line 8 in src/youtube-search-service.js then save document

![Alt text](src/imges/Screen-Shot-API-key.png?raw=true "Optional Title")

16. In terminal, type:
```sh
npm install
```
17. after all packages have been installed run the command npm start and this will open the app in your web browser, have fun singing some Karaoke singing with friends.

```sh
npm start
```





## Specs
### Behavior Driven Development Spec List

Behavoir | Input | Output
:---------|:------:|:------:
| The program will let a user create a party room or join an existing room from their phone or computer| start a room or join a room | user enters room |
| The program will let the user who created a room to give access to others to join their room with a sharable link| a key and room number is created with a link to share | invited users join room |
| The program will let users in a room add songs to a playlist from a youtube search via their own mobile device | user searches "Low Rider" finds & adds "Low Rider" to the playlist  | "Low Rider" is added to playlist |
| The program will play videos in the playlist on a central screen | queued video plays  | video plays and user sings to their song |
| The program will let users continue to add songs/videos to the end of playlist as long as room is open | user adds "freebird" to playlist | playlist is updated to include "freebird" |
| The program will live update the playlist as users add songs/videos to it and display the updated playlist on their personal device |"freebird" added to playlist | playlist display now includes "freebird"|
| The program will live update the playlist as users edit the playlist order |"Don't Stop Believin" added to playlist and moved to top of playlist  | playlist display now shows: 1."Don't Stop Believin" 2."freebird" |
| The program will que up the next video to be played and start it after current video is finished |"Don't Stop Believin" is qued up and played once "Low Rider" has finished  | "Don't Stop Believin" starts to play on the big screen |

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


### License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

Copyright (c) 2020 **_Dusty McCord_**

