
<b>Summary</b>: Goal of this project is that provided the name of movie through standard user input, map all locations on a map where it was filmed

<p>
<b>Before we delve into manual, please have a look at some of the most amazing screenshots from this applications.</b>
</p>

<p>
<b>Home Page</b>
<p>
<img src='http://jayeshkawli.com/UberChallengeScreenshots/HomePage.png'>
</p>
</p>
<p>
<b>Support for auto completion</b>
<p>
<img src='http://jayeshkawli.com/UberChallengeScreenshots/AutoSuggestions.png'>
</p>
</p>
<p>
<b>Easier representation of all possible movie locations on easily navigable map</b>
<p>
<img src='http://jayeshkawli.com/UberChallengeScreenshots/EasyRepresentation.png'>
</p>
</p>
<p>
<b>All the information about selected movie on your fingertips</b>
<p>
<img src='http://jayeshkawli.com/UberChallengeScreenshots/ExtraInfo.png'>
</p>
</p>

<p>
....And here we go! All about this application
</p>

<b>User Interaction</b> : User will be presented a simple UI with the map and input for desired movie name. This applications provides
Autocompletion support which means given the partial movie name it will retrieve all movies matching the partial value of this input string.

<b>Source code and live demonstration:</b>

1. Source code of the SF Movies locations mapping project is available online at https://github.com/jayesh15111988/UberSFMoviesChallenge
2. More information about this project can be found in README.md file included in the project folder
3. Application is hosted at http://jayeshkawli.com/SFMovieLocationsPlot/index.html

<b>Extended summary and explanation for design decisions is as follows:</b>

<b>Project</b> : SF movies <br/>
<b>Technical Track</b> : Full stack

<b>Technical Choices:</b><br/>
<b>Back end database</b> : I chose mySQL as a primary choice of back end database as this is one of the databases I have extensively worked with. Also mySQL and PHP integration offers new feature PHP data objects (PDO) which makes it difficult to get attacked
By one of the most type of of vulnerabilities which results in SQL injection attacks. It is easy to use, secure, scalable and open source. Besides it, server on which I am currently hosting this application does not support any other database architecture which was also one of my motivation behind making mySQL as first choice of preference. (Proficiency : Expert)

<b>Back End language</b> : I chose PHP as a language of choice for back end coding. It is easy to integrate with mySQL database and provides newer APIs for database integration which are significantly less vulnerable to commonly occurring database attacks. Besides it, it was fairly easy to setup back-end with integration of PHP and mySQL service. (Proficiency : Expert)

<b>Front end </b>: As specifically mentioned, I have used backbone.js as a MVC architecture for front end. As it was my first time dealing with this framework it took me little longer than expected to finish some of the key pieces of application. (Proficiency  Beginner)

<b>User Interface </b>: User interface is constructed using CSS, HTML and jQuery plugins. I have added animation and special effects at various places. Project also incorporates few external library which significantly improve the design and layout of applications. Thanks to various websites for helping with color schemes to make UI look pleasant. Also I would like to thanks to (http://findicons.com/) for making awesome set of icons publicly available.


<b>Design Decisions: </b>

<b>Back End</b>:

1. Back end is designed in such a way that it stores all movies information received from (https://data.sfgov.org/resource) in the mySQL database which will then be used to query movie names and provide metadata upon client request
2. Back-end also maintains the record of last time database was loaded. Once database gets old enough (Currently threshold is set to 1 week), it will wipe out all previous entries and load database with newer ones
3. Movie names are suggested in such a way that if any part of the query string matches with group of movie names from database, API will return all those names back


<b>Front End </b>:<br/><br/>
1. A request to get movie names from given partial string will not fire unless input string reaches particular threshold (This was decided from performance perspective)<br/><br/>
2. A provision to provide user with an error message in case movie names are mismatching or no location information is retrieved from back end for given movie name<br/><br/>
3. Applications also has standard JavaScript API to constantly check internet connectivity for an internet access and fires appropriate callbacks when connection state changes at any given moment<br/><br/>
4. In case internet is not reachable app will disable the input controls, fade the view and show error message indicating lack of internet connectivity. (Application will self resume when it detects the internet has come back to life)<br/><br/>
5. Ability to detect connectivity was added due to reason that application is virtually unusable in the absence of internet. (Unless we provide caching for previously searched locations results) This will also provide a hint to user if there is undetected loss of the connection.<br/><br/>

<b>Trade offs:</b>

1. No test case - Unfortunately I could not provide test cases with this project. The reason being the short period of time for project completion and I am still a beginner at writing test cases. But given enough time I can write test cases for appropriate scenarios for this project
2. Inability to take full advantage of backbone.js - As I mentioned earlier this is my first time working on backbone.js. Though I have worked on Angular.JS MVC framework in the past. This is quite different which makes it difficult to get hold of key concepts in the span of few days.
<br/><br/>
3.~~Inability to work with browser which do not support Promises - I have made use of standard JavaScript Promises to make multiple network requests easier. However, as noted on~~ ~~(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) Internet Explorer and Safari Browsers do not support this feature which makes it impossible for this application to run on these browsers.~~
This issue is now fixed. I have added local Promise.js library to cope up with unsupported browser configuration
<br/><br/>
<b>Future Additions:</b><br/><br/>
1. ~~Replace promises with equivalent method for older and such browsers which do not support it~~ Fixed<br/><br/>
2. Ability to search movies not only from names but also from other parameters such as actor, director and locations<br/><br/>
3. Caching previously visited locations on map. (We could use local storage to store previously received geo-coding data and movie information)<br/><br/>
4. ~~Provide more controls to user as long as map appearances are concerned~~ Already made some extra changes to improve UX<br/><br/>
5. Writing unit and integration tests<br/><br/>
6. Storing and displaying user history<br/><br/>
7. Incorporating feature for sharing this information on social platform (Such as Google+, Facebook and Twitter)<br/><br/>
 
</b>Important personal profile links:</b>

<i>Link to project Portfolio</i> : http://www.jayeshkawli.com/jayeshkawli/docs/Jayesh_Project_Portfolio.pdf<br/>
<i>Link to Resume </i>: http://www.jayeshkawli.com/jayeshkawli/docs/CV_Jayesh.pdf<br/>
<i>Link to GitHub Account </i>: https://github.com/jayesh15111988<br/>



