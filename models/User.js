

module.exports = (bookshelf) => {
	return bookshelf.model('User', {
		tableName: 'users',
		hidden: ['password','id'],	//	Hide password and id as it's uneccessary.
		photo() {
			return this.hasMany('photos')
		},
		album() {
			return this.hasMany('albums')
		}
	});
};
