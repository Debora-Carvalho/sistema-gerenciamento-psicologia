const { GridFSBucket } = require("mongodb");
const connectToDatabase = require("../config/mongodb");

let bucket;

async function getGridFSBucket() {
    if (bucket) return bucket;

    const db = await connectToDatabase();
    bucket = new GridFSBucket(db, {
        bucketName: "fotoPerfil" 
    });

    return bucket;
}

module.exports = getGridFSBucket;

