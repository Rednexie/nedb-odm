"use strict"
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod }
}
Object.defineProperty(exports, "__esModule", { value: true })
exports.ORM = void 0
const nedb_1 = __importDefault(require("@seald-io/nedb"))
class ORM {
    static database
    _id
    static path
    static className
    constructor(t) {
        if (t && t._id)
            this._id = t._id
        ORM.className = this.constructor.name
        
    }
    async save() {
        const db = await ORM.getDatabase()
        if (this._id) {
            const { numAffected } = await db.updateAsync({ _id: this._id }, this.toDocument(), {})
            if (numAffected !== 1)
                throw Error(numAffected + ' documents updated instead of one.')
            return this.toDocument()
        }
        else {
            const inserted = await db.insertAsync(this.toDocument())
            return inserted
        }
    }
    async delete() {
        const db = await ORM.getDatabase()
        let deleted
        if (this._id) {
            deleted = await db.removeAsync({ _id: this._id }, { multi: false })
        }
        if (deleted !== 1)
            throw Error('Could not delete the document with _id=' + this._id)
    }
    toDocument() {
        return JSON.parse(JSON.stringify(this))
    }
    static async getDatabase() {
        console.log(ORM.className)
        if (!ORM.database || ORM.database.className !== ORM.className) {
            ORM.database = new nedb_1.default({
                filename: ORM.path ? (ORM.path + '/' + ORM.className + '.json') : (ORM.className + '.json'),
                autoload: true,
                onload: err => err ? console.error(err) : null
            })
            ORM.database.className = ORM.className
        }
        return ORM.database
    }
    static async find(query, projection) {
        const db = await ORM.getDatabase()
        const docs = await db.findAsync(query, projection)
        return docs
    }
    static async findOne(query, projection) {
        const db = await ORM.getDatabase()
        const doc = await db.findOneAsync(query, projection)
        return doc
    }
    static async update(query, update, options) {
        const db = await ORM.getDatabase()
        const { numAffected } = await db.updateAsync(query, { $set: update }, { multi: true, ...options })
        return numAffected
    }
    static async remove(query, options) {
        const db = await ORM.getDatabase()
        const numRemoved = await db.removeAsync(query, {
            multi: true,
            ...options
        })
        return numRemoved
    }
    static async findById(id, projection) {
        const db = await ORM.getDatabase()
        const doc = await db.findOneAsync({ _id: id }, projection)
        return doc
    }
    static async count(condition) {
        const db = await ORM.getDatabase()
        const count = await db.countAsync(condition)
        return count
    }
}
exports.ORM = ORM
//# sourceMappingURL=orm.js.map