# User Service

<h3>Creating service</h3>

* curl -i -X POST http://localhost:8001/services --data name='_User-service' --data url='http://localhost:3014'

<h3>Adding Route</h3>

* curl -i -X POST http://localhost:8001/services/_User-service/routes --data 'paths[]=/user' --data name=user --data methods[]=GET --data methods[]=POST --data methods[]=PATCH --data methods[]=DELETE

<h3>Enabling JWT plugin</h3>

* curl -X POST --url http://localhost:8001/services/_User-service/plugins --data 'name=jwt'