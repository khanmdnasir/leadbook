How to run this project?
at first open the project in git bash or cmd and make a database in pgadmin name leadbook or something then change your database settings in settings.py 
then run -> npm install
-> npm run build
-> source venv/Scripts/activate
-> pip install (installed django,djangorestframework,django-cors-headers,psycopg2)
-> python manage.py createsuperuser
then create admin username and password.
->python manage.py runserver
then go to admin panel localhost:8000/admin then create some company
then go to home page localhost:8000
then create a user then login