# nedb-odm

Object Document Model for [@seald-io/nedb](https://github.com/seald/nedb) written in TypeScript

[![E2E Tests](https://github.com/levg34/typescript-nedb-orm/actions/workflows/e2e-tests.yml/badge.svg)](https://github.com/levg34/typescript-nedb-orm/actions/workflows/e2e-tests.yml)
[![Node.js CI](https://github.com/levg34/typescript-nedb-orm/actions/workflows/node.js.yml/badge.svg)](https://github.com/levg34/typescript-nedb-orm/actions/workflows/node.js.yml)
[![codecov](https://codecov.io/gh/levg34/typescript-nedb-orm/graph/badge.svg?token=MDFK0S9ZBB)](https://codecov.io/gh/levg34/typescript-nedb-orm)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
![linter: ESLint](https://img.shields.io/badge/linter-ESLint-purple?logo=ESLint)

## How to install

```bash
npm install nedb-odm
```

or

```bash
yarn add nedb-odm
```

or

```bash
pnpm add nedb-odm
```

## How to use

Create an objet extending ORM, parametrised with your class fields interface

Example:

```javascript
const { ODM } = require('nedb-odm');
class User extends ODM {
    constructor(user){
        super(user)
        this.username = user.username
        this.password = user.password
    }
}
```

Then, you can use it.

Create an instance of the class to get an object:

```javascript
const rednexie = new ODM({
    name: "Rednexie",
    username: "rednexie",
    password: "******" 
});
```

Save the object to the database to make it persistent:

```javascript
await rednexie.save()
```

Fetch objects from database:

```javascript
await User.find({ username: "rednexie" })
```

Delete the object:

```javascript
await rednexie.delete()
```

Update your objects in database:

```javascript
await rednexie.delete()
```

Remove objects from database:

```javascript
await User.remove({ name: "Rednexie" })
```

Find one object in database:

```javascript
await User.find({ username: "rednexie" })
// returns: { name: "Rednexie", username: "rednexie", password: "******" })
```

Find an object by id in database:

```javascript
await User.findById("kpOBxczJlr2R5S68")
// returns: { name: "Rednexie", username: "rednexie", password: "******" })
```

Count the number of objects in database:

```javascript
await User.count()
// returns: 1
```
## License

This project is a fork of [typescript-nedb-orm](https://github.com/levg34/typescript-nedb-orm) which is licensed under the [GNU General Public License v3.0 (GPLv3)](https://www.gnu.org/licenses/gpl-3.0.en.html) - see the [LICENSE](LICENSE) file for details.
