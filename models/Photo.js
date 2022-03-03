/**
 * Photo model
 */


 module.exports = (bookshelf) => {
	return bookshelf.model('Photo', {
		tableName: 'photos',
        hidden: ['album_id'],
        albums() {
            return this.belongsToMany('Album');
        },
        users() {
            return this.belongsTo('User');
        },
	});
};