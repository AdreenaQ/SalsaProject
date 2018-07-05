module.exports = class Events {
    constructor(mongoose) {
        this.mongoose = mongoose;
        this.salsaEvent = undefined;
    }

    connect() {
        this.mongoose.connect("mongodb://localhost/salsa_app");

        this.mongoose.Promise = global.Promise;

        //Get the default connection
        var db = this.mongoose.connection;

        //Bind connection to error event (to get notification of connection errors)
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));

        // Adding a new salsa event to the Database
        var salsaSchema = new this.mongoose.Schema({
            name: String,
            location: String,
            description: String,
            time: String,
            day: String
        });

        // Compile into a model
        this.salsaEvent = this.mongoose.model("salsaEvent", salsaSchema);

        var k = 1;
    }

    getAll() {
        return this.salsaEvent.find({});
    }

    saveItem(name, location, description, time, day) {
        // Create an instance of model SomeModel
        var instance = new this.salsaEvent({
            name: name,
            location: location,
            description: description,
            time: time,
            day: day
        });

        // Return promise to save the instance
        return instance.save();
    }

    saveTestItem(token) {
        return this.saveItem(
            "Test Event " + token,
            "Test Location " + token,
            "Test Description " + token,
            "Test Time " + token,
            "Test Day " + token
        );
    }
};
