// CRUD SQL语句
var user = {
	insert:'INSERT INTO user(id, username, email) VALUES(0,?,?)',
	update:'update user set name=?, email=? where id=?',
	delete: 'delete from user where id=?',
	queryById: 'select * from user where id=?',
	queryByUsername: 'select * from user where username=?',
	queryAll: 'select * from user'
};
module.exports = user;