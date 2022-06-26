# Calendly

## Images

-   Live Site URL: [Add live site URL here]()

## Overview

Calendly is a scheduling calender application where users can create, edit and also delete events created by them.

## My process

I got inspiration to create from ubuntus notification calender and also google calender, first of i started by genrating the days of the present month i was in, i used javascript Date Api to get them, then i rendered each day i.e(1-30/31) by using monday as my starting day and sunday as the last day of the week, the next step step was to get the next months or the previous months days so i added an increase button and reduce button and also a state to keep track of the present month and its days, after i was done with that, i added the creating of event functionality which had a modal form for the users to create events and also edit or delete them, i mapped each events to their corresponding month, then i stored them in the browser using localstorage, also i added a functionality to check if a particular month already had data stored so i could render that instead, after completing all the functionality i proceeded to style the application.

### The challenge

-   Generation of dates was a bit challenging couldnt wrap my head around how to get the dates and their corrresponding days of the week example like (what day of the week is the 3rd of august, 2022). with some google searches i found the solution.
-   Battled with a bug when i was rendering the days of each month was using keys from the map function, caused a lot of unexpected results, solved it by using uuid to create unique ids.
-   Had challenges in the structuring the date and events to storage for easy crud operations , kept bumping into problems of storing it properly, had a lot of overriding issues instead of it appending to previous data. solved it by a lot of console logging and patience lol ;);

### Built with

-   Javascript Date Api
-   React
-   Styled Components

### What I learned

-   I learnt about the javscript date api.

### Continued development

-   I would like to implement a proper backend for it and add some functionalities like notification.
