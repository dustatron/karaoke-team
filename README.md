# _Karaoke Party Team_

#### _Feb 17th. 2020_

#### By: _**Dusty McCord, Eric Settels, K. Wicz, Josh Hellman & Todd Walraven**_
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
git clone https://github.com/dustatron/karaoke-team.git
```

4. Navigate to the new folder that was created on your desk:
```sh
cd karaoke-team
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

8. In the command line, start program with
```sh
npm start
```
a webpage should open on your computers browser 




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
* [Jest](https://jestjs.io/)

### License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

Copyright (c) 2020 **_Dusty McCord_**

