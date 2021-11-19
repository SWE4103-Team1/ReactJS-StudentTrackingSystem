# ReactJS-StudentTrackingSystem

This repo holds the react project that we are using within our DJango Project.

Steps to run development server:<br/>
1.) https://nodejs.org/en/download/   Download Node.js to get the node package manager.<br/>
2.) clone repo<br/>
3.) type "npm install" into terminal to install all the dependancies<br/>
4.) start the django server: python manage.py runserver<br/>
5.) start React dev serevr: npm start<br/>

Steps to integrate React into Django:
1.) npm build<br/>
2.) delete old static folder from \SWE-transcript-counts\StudentTrackingSystem\StudentTrackingSystemApp\static\build_table\build-table\static<br/>
3.) copy static folder from the build folder and paste it into SWE-transcript-counts\StudentTrackingSystem\StudentTrackingSystemApp\static\build_table\build-table\<br/>
4.) change the templates\StudentTrackingSystemApp\Dashboard\index.html<br/>
	a.)copy all the js from inside the script tags from the index.html file from the npm build folder<br/>
	b.) change the names of the referenced js and css files in templates\StudentTrackingSystemApp\Dashboard\index.html<br/>
