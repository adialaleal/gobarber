const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  //Define o tipo de cada campo que receberá os dados do formulário
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    avatar: DataTypes.STRING,
    password: DataTypes.VIRTUAL,
    password_hash: DataTypes.STRING,
    provider: DataTypes.BOOLEAN
  }, {
    //hook que gera uma hash da senha antes da mesma ser salva.
    hooks: {
      beforeSave: async user => {
        if (user.password) {
          user.password_hash = await bcrypt.hash(user.password, 8)
        }
      }
    }
  })
  User.prototype.checkPassword = function (password) {
    return bcrypt.compare(password, this.password_hash)
  }
  return User
}
