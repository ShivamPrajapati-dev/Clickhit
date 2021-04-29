# Food Post Service

<h3>Creating service</h3>

* curl -i -X POST http://localhost:8001/services --data name='_food-post-service' --data url='http://localhost:3007'

<h3>Adding Route</h3>

* curl -i -X POST http://localhost:8001/services/_food-post-service/routes --data 'paths[]=/food' --data name=food --data methods[]=GET --data methods[]=POST --data methods[]=PATCH --data methods[]=DELETE

<h3>Enabling JWT plugin</h3>

* curl -X POST --url http://localhost:8001/services/_food-post-service/plugins --data 'name=jwt'