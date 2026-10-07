class Post {
  constructor({ id, title, content, createdAt }) {
    if (!id) throw new Error('Post requires an id');
    if (!title) throw new Error('Post requires a title');
    if (!content) throw new Error('Post requires content');

    this.id = id;
    this.title = title;
    this.content = content;
    this.createdAt = createdAt || new Date();
  }
}

module.exports = { Post };