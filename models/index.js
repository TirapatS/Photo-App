// Setting up the database connection
const knex = require('knex')({
	debug: true,
	client: 'mysql',
	connection: {
		host: process.env.DB_HOST || 'localhost',
		port: process.env.DB_PORT || 8889,
		database: process.env.DB_NAME || 'photo_app',
		user: process.env.DB_USER || 'root',
		password: process.env.DB_PASSWORD || '',
	}
});

const bookshelf = require('bookshelf')(knex);

const models = {};
models.User = require('./User')(bookshelf);
models.Album = require('./User')(bookshelf);
models.Photo = require('./User')(bookshelf);

module.exports = {
	bookshelf,
	...models,
};
