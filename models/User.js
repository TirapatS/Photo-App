/**
 * User model
 */

module.exports = (bookshelf) => {
	return bookshelf.model('User', {
		tableName: 'users',
		photos() {
			return this.belongsToMany('Photo')
		},
		album() {
			return this.belongsToMany('Album')
		}
	});
};
