const { ODM } = require('./lib/index.js')

class User extends ODM{
    constructor(user){
        super(user)
        this.name = user.name
        this.pwd = user.pwd;
    }
}

User.setModelName('Users')
User.setClassPath('data')
User.create({ username: "Rednexie", password: '0000000' })