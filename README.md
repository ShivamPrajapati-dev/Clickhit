
# Routes

## Auth-service

| Main endpoint | http://localhost:3000 |
| --------------| :--------------------:|

* <b>POST</b> /auth/addconsumer
* <b>POST</b> /auth/loginconsumer
* <b>POST</b> /auth/logutconsumer

## Comment-service 

| Main endpoint | http://localhost:3001 |
| --------------| :--------------------:|

* <b>GET</b> /comment/getcomment
* <b>POST</b> /comment/addcomment
* <b>PATCH</b> /comment/editcomment
* <b>DELETE</b> /comment/deletecomment

## Count-service

| Main endpoint | http://localhost:3002 |
| --------------| :--------------------:|

* <b>POST</b> /count/likes
* <b>POST</b> /count/comments

## Cron-jobs

| Service             |  Main endpoint         |
| --------------------| :---------------------:|
| Follower-aggregator |  http://localhost:3003 |
| Like-aggregator     |  http://localhost:3004 |
| Score-calculator    |  http://localhost:3005 |


## Follow-service

| Main endpoint | http://localhost:3006 |
| --------------| :--------------------:|

* <b>POST</b> /follow/postfollowee
* <b>POST</b> /follow/getfollowee
* <b>POST</b> /follow/getfollower
* <b>DELETE</b> /follow/deletefollowee

## Food-post-service

| Main endpoint | http://localhost:3007 |
| --------------| :--------------------:|

* <b>POST</b> /food/post
* <b>PATCH</b> /food/update
* <b>DELETE</b> /food/delete
* <b>POST</b> /food/get

## Like-service

| Main endpoint | http://localhost:3008 |
| --------------| :--------------------:|

* <b>POST</b> /like/getlikes
* <b>POST</b> /like/addlike
* <b>DELETE</b> /like/deletelike

## Notification-service

| Main endpoint | http://localhost:3009 |
| --------------| :--------------------:|

* <b>POST</b> /notification/post

## Quote-post-service

| Main endpoint | http://localhost:3010 |
| --------------| :--------------------:|

* <b>POST</b> /quote/post
* <b>PATCH</b> /quote/update
* <b>DELETE</b> /quote/delete
* <b>POST</b> /quote/get

## Search-service

| Main endpoint | http://localhost:3011 |
| --------------| :--------------------:|

* <b>POST</b> /search/sayt/:index/:query

## Sketch-post-service

| Main endpoint | http://localhost:3012 |
| --------------| :--------------------:|

* <b>POST</b> /sketch/post
* <b>PATCH</b> /sketch/update
* <b>DELETE</b> /sketch/delete
* <b>POST</b> /sketch/get

## Tokenstore-service

| Main endpoint | http://localhost:3013 |
| --------------| :--------------------:|

* <b>POST</b> /tokenstore/post
* <b>PATCH</b> /tokenstore/update
* <b>DELETE</b> /tokenstore/delete
* <b>POST</b> /tokenstore/get

## User-service

| Main endpoint | http://localhost:3014 |
| --------------| :--------------------:|

* <b>POST</b> /user/adduser
* <b>PATCH</b> /user/updateuser
* <b>POST</b> /user/getuser

## Userfeed-service

| Main endpoint | http://localhost:3015 |
| --------------| :--------------------:|

* <b>POST</b> /userfeed/get


