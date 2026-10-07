const { PostRepository } = require('../../../domain/posts/repositories/PostRepository');
const { Post } = require('../../../domain/posts/entities/Post');
const { PostModel } = require('../models/PostModel');

class MongoPostRepository extends PostRepository {
  async save(post) {
    const doc = await PostModel.create({
      _id: post.id,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt,
    });
    return this._toDomain(doc);
  }

  async findById(id) {
    const doc = await PostModel.findById(id).lean();
    return doc ? this._toDomain(doc) : null;
  }

  async findAll() {
    const docs = await PostModel.find().sort({ createdAt: -1 }).lean();
    return docs.map((doc) => this._toDomain(doc));
  }

  _toDomain(doc) {
    return new Post({
      id: doc._id,
      title: doc.title,
      content: doc.content,
      createdAt: doc.createdAt,
    });
  }
}

module.exports = { MongoPostRepository };