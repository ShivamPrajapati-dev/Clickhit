docker run -p 9092:9092 --name kafka  -e KAFKA_ZOOKEEPER_CONNECT=shivam:2181 -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://shivam:9092 -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 confluentinc/cp-kafka

docker run --name zookeeper  -p 2181:2181  zookeeper