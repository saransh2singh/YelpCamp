const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp", {
  //   useNewUrlParser: true,
  //   useCreateIndex: true,
  //   useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database Connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "661a960c95e84ec2aa9f5807",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident aliquid perspiciatis delectus quia fugit ducimus deserunt et laboriosam, obcaecati soluta facere neque error quos, ratione minus, tempora ad corrupti explicabo",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dojvc07ha/image/upload/v1718092665/YelpCamp/doqw3q8ivanagiuupm9z.jpg",
          filename: "YelpCamp/doqw3q8ivanagiuupm9z",
        },
        {
          url: "https://res.cloudinary.com/dojvc07ha/image/upload/v1713611616/YelpCamp/yrr0levuemslwbggupec.jpg",
          filename: "YelpCamp/yrr0levuemslwbggupec",
        },
      ],
    });
    await camp.save();
  }
};
seedDB().then(() => {
  mongoose.connection.close();
});
