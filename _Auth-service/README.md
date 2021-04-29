# Auth service

<h3>Creating service</h3>

* curl -i -X POST http://localhost:8001/services --data name='_Auth-service' --data url='http://localhost:3000'

<h3>Adding Route</h3>

* curl -i -X POST http://localhost:8001/services/_Auth-service/routes --data 'paths[]=/auth' --data name=consumer --data methods[]=GET --data methods[]=POST --data methods[]=PATCH --data methods[]=DELETE

