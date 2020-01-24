export default class MongoService {
    constructor(mongoClient, collection) {
        this.mongoClient = mongoClient;
        this.collection = collection;
    }

    find = () => {
        return this.mongoClient.collection(this.collection).find();
    }
}
