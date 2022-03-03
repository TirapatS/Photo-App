

module.exports = (bookshelf) => {
	return bookshelf.model('User', {
		tableName: 'users',
		hidden: ['password','id'],	//	Hide password and id as it's uneccessary to show in res.
		photos() {
			return this.hasMany('Photo')
		},
		albums() {
			return this.hasMany('Album')
		}
	});
};
