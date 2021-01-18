import mongoose from 'mongoose';
let count = 0;
const uri = "mongodb+srv://rigleAdmin:19GTw7fItZgozzQG@cluster0.mxfor.mongodb.net/G2I?retryWrites=true&w=majority";

const options = {
    autoIndex: false, // Don't build indexes
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    // all other approaches are now deprecated by MongoDB:
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true, // used by mongoose-fuzzy-search
};
const connectWithRetry = () => {
    mongoose.connect(uri, options).then(() => {
        console.log('MongoDB is connected');
    }).catch(err => {
        console.log('MongoDB connection unsuccessful, retry after 5 seconds. ', ++count);
        setTimeout(connectWithRetry, 5000)
    })
};

connectWithRetry();

export default mongoose;