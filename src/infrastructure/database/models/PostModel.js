const { Schema, model } = require('mongoose');

const PostSchema = new Schema(
  {
    _id: { type: String },
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false },
);

const PostModel = model('Post', PostSchema);

module.exports = { PostModel };