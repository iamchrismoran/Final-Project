README.md rev 1.0
Title: Make Pixel Art
Description:
This pixel art creator is my final project for the Web Design for Edcuators class. While I have history with HTML, CSS and Javascript, it's been a lifetime since I used it and stopped before learning and HTML5 or the addition of a LOt of really cool CSS stuff. The purpose is to be able to "draw" 8-bit pixel art. Currently, you draw block by block. The app saves your prograss and when you name your works, it saves them with their names, wher ytou can view a gallery of your work, which you can reload to edit or delete altogether.

Team Members: Just me, Chris Moran

Features and Course Concepts:
Flexbox and grid display methods that both allowed for having a grid to draw in that doesn't change when the screen size does, but navigation and interaction features that are flex/responsively layed out. Dynanic CSS is used to change styles based on various states, such as to make "buttons" and links look more interesting and to change how the navigation looks based on which page your on. 
@media is primarily use for the print feature, allowing exclusive printing of the pictures from the "Create" page. Console testing among various avialable mobile devices shoed the the flexbox design didn't need a media call to check for screen resolution.

Forms elements (inputs) and validation are used to collect user information such as how large they want the representation of their blocks to be while drawing and the dimensions of their creation, all requiring number input, and their custom title for the peice. While it will still allow for displaying dimentions that are 0 or less, functions for both width and height to autoset to 1 when anything below 1 is entered.

Javascript functions for almost everything, from changing fonts to dealing with localStorage and allowing for saving progress and allowing a gallery of art that can be returned to for further editing any time.

JSON parsing and stringifying is used to gather each pixel art object as an array of the piece's title and color for each "pixel"/block of the art to be stored on the localk machine.

localStorage is used to store all the saves creations so they can be shown in the dynamic gallery and opened for edting again. It also makes use of localStorage to track which font the user has cycled through if they choose to change the font on the site, so it's persistent across pages and return visits.

GITHUB!! While I think this was a minor part of the course, I understand it's value for revision control and collaboration/opensourcing content, but man it has a learning curve. I added and deleted this repository 3 times before figuring out how to edit changes and have them publish correctly.

Things I wanted to complete or fix that I might return to:
(This is somewhat covered on the about page)
Drawing proper, instead of clicking squares to make color. 
Adding a limited set of instructions on the "Create" page for quick reminders or access - my one test subject copmplained my instructions were too wordy and inconvenient for needing to check back for, mid creation.
Some of the gallery thumbnails show up with either/both vertical and horizontal gaps between columns and rows. I couldn't figure out how to cause it to happen to see what was differnt between items that showed the visual flaw and those that didn't.
I want to be able to allow the user to generate a shareable link that would let others start from their creation and edit/change their own remix of it. The biggest challenge could be URL length, with potentially hundreds or thousands of 3 8-bit color per pixel/block inclusions in the JSON, far surpassing URL length limits. Since their original artwork is stored locally and I don't want to store it on the server (can github even allow for that?), I'd have to find some way to compress the URL.

I spent more time on this than I'd like to actually account for, but it was fun, even when it was frustrating and counter to my son's guess, I do hope I continue to work on it even if it's just for some fun and maybe sharing with some friends. Whenever I get to teach my Computer Sceince/Programming course, it will be an example I'll use to show that even things that appear simple aren't always simple, but that with persistence, some planning and lots of openmindedness, you can make super cool things with just web based programming. They know this, since they USE interactive sites (twitch, .io gaming sites, youtube, and on and on, but building appreciation for the efforts put in will benefit them in more ways than just "knowing how to program". Critical thinking, perseverence, risk aversion-aversion, backing things up, and heavily commenting or commenting out to help bug test.
