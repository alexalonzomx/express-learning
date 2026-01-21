import mongoose from "mongoose";
const { Schema } = mongoose;

const postSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  Age: {
    type: Number,
    required: true,
  },

},
 {timestamps: true}
);

export const Post = mongoose.model("Post", postSchema);
