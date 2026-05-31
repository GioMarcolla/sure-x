import { MongoClient, ServerApiVersion } from 'mongodb';

const MONGO_DB_URI = process.env.MONGO_DB_URI!;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME || 'sure-db';

let SureMongoClient: MongoClient | undefined = undefined;

const GetSureMongoClient = (): MongoClient => {
    if (SureMongoClient) return SureMongoClient;

    try {
        SureMongoClient = new MongoClient(MONGO_DB_URI, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            },
        });
    } catch (err) {
        throw new Error(`Failed to create MongoClient: ${err}`);
    }

    return SureMongoClient;
};

const runConnectionTest = async () => {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await GetSureMongoClient().connect();

        // Send a ping to confirm a successful connection
        await GetSureMongoClient().db('admin').command({ ping: 1 });

        console.log(
            'Pinged your deployment. You successfully connected to MongoDB!'
        );
    } catch (err) {
        console.error(err);
    } finally {
        // Ensures that the client will close when you finish/error
        await GetSureMongoClient().close();
    }
};

export default GetSureMongoClient;
export { runConnectionTest, MONGO_DB_URI, MONGO_DB_NAME };
