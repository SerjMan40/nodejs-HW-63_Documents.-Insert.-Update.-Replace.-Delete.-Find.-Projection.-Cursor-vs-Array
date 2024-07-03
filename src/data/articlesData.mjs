import connectDB from '../config/db.mjs'
import { ObjectId } from 'mongodb'

const readArticlesFromDB = async () => {
  const client = await connectDB()
  try {
    const db = client.db('your_database_name')
    const articles = await db.collection('articles').find().toArray()
    return articles
  } catch (error) {
    console.error('Error reading articles:', error)
    return []
  }
}

const addArticleToDB = async (article) => {
  const client = await connectDB()
  try {
    const db = client.db('your_database_name')
    let result
    if (Array.isArray(article)) {
      const validArticles = article.map((item) => {
        return {
          title: item.title || 'No title',
          content: item.content || 'No content'
        }
      })
      result = await db.collection('articles').insertMany(validArticles)
      return result.insertedIds
        ? validArticles.map((item, index) => ({ ...item, _id: result.insertedIds[index] }))
        : null
    } else {
      result = await db.collection('articles').insertOne(article)
      return result.insertedId ? { ...article, _id: result.insertedId } : null
    }
  } catch (error) {
    console.error('Error adding article:', error)
    return null
  }
}

const updateArticleInDB = async (articles) => {
  const client = await connectDB();
  try {
    const db = client.db('your_database_name');
    if (Array.isArray(articles)) {
      const operations = articles.map(article => ({
        updateOne: {
          filter: { _id: new ObjectId(article.articleId) },
          update: { $set: { title: article.title, content: article.content } }
        }
      }));
      const result = await db.collection('articles').bulkWrite(operations);
      return result.modifiedCount === articles.length;
    } else {
      const { articleId, title, content } = articles;
      const result = await db.collection('articles').updateOne(
        { _id: new ObjectId(articleId) },
        { $set: { title, content } }
      );
      return result.modifiedCount > 0;
    }
  } catch (error) {
    console.error('Error updating articles:', error.message);
    return false;
  } 
};

const replaceArticleInDB = async (articleId, newArticle) => {
  const client = await connectDB()
  try {
    const db = client.db('your_database_name')
    const result = await db.collection('articles').replaceOne({ _id: new ObjectId(articleId) }, newArticle)
    return result.matchedCount > 0
  } catch (error) {
    console.error('Error replacing article:', error)
    return false
  }
}

const findArticleById = async (id) => {
  const client = await connectDB()
  try {
    const db = client.db('your_database_name')
    let article
    if (Array.isArray(id)) {
      article = await db
        .collection('articles')
        .find({ _id: { $in: id.map((item) => new ObjectId(item)) } })
        .toArray()
    } else {
      article = await db.collection('articles').findOne({ _id: new ObjectId(id) })
    }
    console.log('Article(s) from DB:', article)
    return article
  } catch (error) {
    console.error('Error finding article by ID:', error)
    return null
  }
}

const deleteArticleFromDB = async (articleIds) => {
  const client = await connectDB()
  try {
    const db = client.db('your_database_name')
    let result
    if (Array.isArray(articleIds)) {
      result = await db.collection('articles').deleteMany({ _id: { $in: articleIds.map((id) => new ObjectId(id)) } })
    } else {
      result = await db.collection('articles').deleteOne({ _id: new ObjectId(articleIds) })
    }
    return result.deletedCount > 0
  } catch (error) {
    console.error('Error deleting article:', error)
    return false
  }
}
export {
  readArticlesFromDB,
  addArticleToDB,
  updateArticleInDB,
  deleteArticleFromDB,
  findArticleById,
  replaceArticleInDB
}
