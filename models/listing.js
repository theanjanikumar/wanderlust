 const mongoose = require("mongoose"); /* Importing and Schema Setup */
const Schema = mongoose.Schema;
const Review = require("./review.js");

/* Defining the Schema */
const listingSchema = new Schema({
  title: {
    type: String,
    required: true,     /* title must be given, cannot be empty*/
  },
  description: {
    type: String,
  },
  image: {
    url: String,
    filename: String,
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    }
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if(listing) {
    await Review.deleteMany({_id: { $in: listing.reviews} });
  }
});

/* Creating a Model */
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing; /* Exporting the Model */
