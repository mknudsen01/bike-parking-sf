SF Bike Parking
===============

This app allows you to search for the nearest bicycle parking in San Francisco.

Find it on [Heroku](http://sf-bike-parking.herokuapp.com/)

[Matthew Knudsen](http://mknudsen01.tumblr.com/)

##Stack
###Back-end
[Flask](http://flask.pocoo.org/)
[Requests](http://docs.python-requests.org/en/latest/)
[San Francisco Data](https://data.sfgov.org/Other/SF-data/y55j-7d7d)

I used a minimal backend. I only have two routes for my Flask app--one for the home route, and one for the call to SF Data for bicycle parking locations. At Dev Bootcamp, we learned to code with [Sinatra](http://www.sinatrarb.com/), which is a light-weight framework, before we jumped into Rails. Since I've never used Python before, I wanted my first experience with the language to be with a lighter framework. I had heard about Flask before, and after some research, I saw that it was indeed light-weight.

I also used Requests in order to make simpler HTTPrequests with Python. This made it possible for me to obtain my data from the SF Data API.

###Front-end
[Backbone.js](http://backbonejs.org/)
[Google Maps JavaScript API v3](https://developers.google.com/maps/documentation/javascript/)

We've had some short discussions about JavaScript front-end frameworks like Angular, Ember and Backbone, but I had never used them. It was new for me to have controller logic go into the view, so that took some getting used to. It still feels a bit clumsy, but I look forward to using Backbone for my future projects.

I was pleasantly pleased at how smoothly implementing the Google Maps API went. I could typically find a code example that was rather close to what I wanted to do, so I was able to add some cool features to the app that I didn't know were possible before.

###Overall

This project is being submitted with an asterisk. There's a lot that I still want to do with this project. I'm currently at Dev Bootcamp, which is a fairly intensive program that has us working somewhere in the ballpark of 70-90 hours per week. I got as much done as I could in my free time, but there is a great deal to add.

I want to submit the project now because we will be diving into our final projects for the next week and a half, and I want to be 100% focused on that project.

I will outline below the functionality that I would like to add once I graduate from the program.

####Functionality
My application displays a map of San Francisco with a button to find bicycle parking. When the button is clicked, it first obtains 1,000 bicycle parking locations in San Francisco (1,000 is the maximum amount available per request).

Once the locations are obtained, a few things happen:
* The user's current position is found
* The distance between the user's current location and each bicycle parking spot is calculated
* The spots are sorted by distance from the user, and the closest handful are displayed on the map
* The user is then able to click one of the pins, which displays an information window
* The user may then click on a 'Get Directions' link, which displays the route on the map as well as a list with the step-by-step instructions

#### Testing
I have not completed any testing as of yet. I would like to implement some testing with Jasmine, Nose and Sinon once I graduate from Dev Bootcamp.

###Future Functionality
I was not able to get as far as I wanted to with this project. I was able to complete an MVP, but there is quite a bit lacking. I would like to come back to this project once I am done with Dev Bootcamp so that I may fix the following issues:

* There's no testing. There needs to be testing. I have used Jasmine a bit, and I would like to explore Nose and Sinon.
* The app does not have any reset functionality. As of now, unless you reload, you can only search once and get directions for a single pin. I would like to display a button once a user searches for directions that will clear the route and display the closest pins again. That way, a user could check the routes and pick which one sounds the best.
* The map does not set its bounds dynamically. I would like to implement fitBounds() to ensure that all of the pins are always on the map.
* The app isn't mobile-friendly. Someone would use this application while on their bicycles. They would not be looking at it on a laptop, so I would like to make the application display well on a smaller screen.
* Obtain more data. SF Data's data points seem to populate from west to east. Since there are more than 1000 parking spaces, I am not able to display them all across the map. The limitation makes it appear as though there is no bicycle parking east of Hyde St.
* Styling. Pretty much everything could look more polished.
* Overall refactoring. I had trouble knowing exactly how the views, collections and models could interact, especially with event triggering, so I did not know where to put all of my code. As a result, most of it ended up in my views, so I feel that some of them are pretty fat. Classes could free up the views focus on the views. Logic for finding the closest spots, finding the user's current location, and calculating the routes could be extracted.

#### Conclusion

Though the app is far from finished, I'm proud of what I was able to make. Eight weeks ago, I only knew the very basics of Ruby, and now I am able to make something like this. I'm excited to see what I can do with it a couple more weeks.