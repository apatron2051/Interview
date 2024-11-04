# Interview

Two directories. One for API and One for front end. Could have been two reps,but wanted to make it easy.

Project Overview:
Run the project with npm start dev. 

Prject Settings:
Review the .env file for project settings.
DB_URI=Path to database of mongodb
COLLECTION_NAME=name of the collection
PORT=port for NodeJS express to listen to
DATA_LANG=Language of the data in the db the is being searched on
DATA_TRANSLATE=should search string be translated
MAX_HOMESCREEN_PRODUCTS=maximum products on home screen. Max is 9
CONSOLE_LOG=Log to console
DB_LOG = Log to db (not implemented)

Database:
The mongodb collection "garments" where the data was imported into was installed under the "local" database
A combined text index was created on product_description and product_title to allow for text searches. 
At this time other fields cannot be searched as implemented but doing so is very straight forward.

Network:
Project implements CORS but for testing, but best on the same machine.

Node Modules:
I added the node modules into git to make it easier to test.


