/**
 * User model
 */

module.exports = (bookshelf) => {
	return bookshelf.model('User', {
		tableName: 'users',
		hidden: ['password','id'],	//	Hide password(test this code)
		photos() {
			return this.belongsToMany('Photo')
		},
		album() {
			return this.belongsToMany('Album')
		}
	});
};
