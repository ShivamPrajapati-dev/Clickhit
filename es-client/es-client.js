const AWS = require('aws-sdk');
const elasticsearch = require('elasticsearch');
require('dotenv').config();

AWS.config.region = 'us-east-1';
const client = new elasticsearch.Client({
    host:'https://search-community-kitchen-xgzmas46cnub6kabvc5bg5rtzu.us-east-1.es.amazonaws.com/',
    connectionClass:require('http-aws-es'),
    amazonES:{
        credentials: new AWS.Credentials(process.env.ID, process.env.SECRET)
    }
   });

   module.exports = client;