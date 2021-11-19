# ReactJS-StudentTrackingSystem

This repo holds the react project that we are using within our DJango Project.

Steps to run development server:
1.) https://nodejs.org/en/download/   Download Node.js to get the node package manager.
2.) clone repo
3.) type "npm install" into terminal to install all the dependancies
4.) start the django server: python manage.py runserver
5.) start React dev serevr: npm start

Steps to integrate React into Django:
1.) npm build
2.) delete old static folder from \SWE-transcript-counts\StudentTrackingSystem\StudentTrackingSystemApp\static\build_table\build-table\static
3.) copy static folder from the build folder and paste it into SWE-transcript-counts\StudentTrackingSystem\StudentTrackingSystemApp\static\build_table\build-table\
4.) change the templates\StudentTrackingSystemApp\Dashboard\index.html
	a.)copy all the js from inside the script tags from the index.html file from the npm build folder
	b.) change the names of the referenced js and css files in templates\StudentTrackingSystemApp\Dashboard\index.html
