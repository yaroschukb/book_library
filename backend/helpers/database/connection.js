const { MongoClient } = require("mongodb");
const crypto = require("crypto");

class Connection {
  constructor() {
    this.db = null;
    this.options = { useUnifiedTopology: true };
    this.pool = [];
    this.appId = "my-app";
    this.dbInit = this.initConnection();
    this.collection = "books";
  }

  getDb() {
    return this.appId;
  }

  connectToMongo() {
    if (this.db) return Promise.resolve(this.db);
    if (!this.uri)
      return console.error(
        "(app) Connection initialize was not been started. URI is not defined."
      );
    if (this.mongoClientConnect) return this.mongoClientConnect;

    console.log("(app) Starting connect to DB.");

    this.mongoClient = new MongoClient(this.uri, {
      useUnifiedTopology: true,
      auth: { username: this.username, password: this.password },
    });

    return (this.mongoClientConnect = this.mongoClient
      .connect()
      .then((client) => {
        this.dbClient = client;
        this.db = client.db(this.getDb());
        return this.db;
      })
      .catch((error) => {
        this.logError(error);
      }));
  }

  initConnection() {
    return this.initFirstConnectToMongo();
  }

  async initNewConnection(uri = null) {
    await this.dbInit;
    console.log("(app) Start new DB connection");
    let connection = await MongoClient.connect(uri ? uri : this.uri, {
      ...this.options,
      ...(!uri
        ? { auth: { username: this.username, password: this.password } }
        : null),
    });
    return { conn: connection, db: connection.db(this.getDb()) };
  }

  async initFirstConnectToMongo() {
    this.uri = "mongodb://localhost:27017";
    this.mongoClient = new MongoClient(this.uri, this.options);
    this.username = "DBAdmin";
    this.password = HashFunc(this.username + this.appId, "appAdminSalt");

    /* dev-start */
    console.log("Local Admin creds:", this.username, this.password);
    /* dev-end */

    await this.mongoClient
      .connect()
      .then(async (client) => {
        this.adminDB = client.db().admin();
        await this.adminDB
          .addUser(this.username, this.password, {
            roles: [
              { role: "userAdminAnyDatabase", db: "admin" },
              "readWriteAnyDatabase",
            ],
          })
          .then((result) => {
            console.log(result);
          })
          .catch((err) => {
            this.logError(err);
          });

        await this.mongoClient.close();
      })
      .catch((err) => {
        this.logError(err);
      });

    return this.adminConnectToMongo();
  }

  async adminConnectToMongo() {
    this.uri = "mongodb://localhost:27017/admin";
    this.mongoClient = new MongoClient(this.uri, {
      ...this.options,
      auth: { username: this.username, password: this.password },
    });

    await this.mongoClient
      .connect()
      .then(async (client) => {
        let db = client.db(this.appId, { returnNonCachedInstance: true });
        await db
          .command({
            createRole: "validationAccess",
            privileges: [
              {
                resource: {
                  db: this.appId,
                  collection: "",
                },
                actions: ["collMod"],
              },
            ],
            roles: [
              {
                role: "readWrite",
                db: this.appId,
              },
            ],
          })
          .then((result) => {
            console.log(result);
          })
          .catch((err) => {
            this.logError(err);
          });

        this.username = "DBUser";
        this.password = HashFunc(this.username + this.appId, "appUserSalt");
        /* dev-start */
        console.log("Local DB creds:", this.username, this.password);
        /* dev-end */

        await db
          .addUser(this.username, this.password, {
            roles: [{ role: "validationAccess", db: this.appId }],
          })
          .then((result) => {
            console.log(result);
          })
          .catch((err) => {
            this.logError(err);
          });

        await this.mongoClient.close();
      })
      .catch((error) => {
        this.logError(error);
      });

    this.uri = `mongodb://localhost:27017/${this.appId}`;
    return this.connectToMongo();
  }

  /**
   *
   * @param {Error} error
   */
  logError(error) {
    console.error(`[mongo] ${error.message}`);
  }
}

/**
 *
 * @param {string} password
 * @param {string} salt
 */
function HashFunc(password, salt) {
  var hash = crypto.createHmac("sha1", salt); /** Hashing algorithm sha512 */
  hash.update(password);
  var value = hash.digest("hex");
  return value;
}

let basicConnection = new Connection();
module.exports = basicConnection;
