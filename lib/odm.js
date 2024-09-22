"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.ODM = void 0;
const nedb_1 = __importDefault(require("@seald-io/nedb"));
class ODM {
  static database;
  _id;
  static path;
  static className;
  constructor(t) {
    if (t && t._id) this._id = t._id;
    ODM.className = this.constructor.name;
  }
  async save() {
    const db = await ODM.getDatabase();
    if (this._id) {
      const { numAffected } = await db.updateAsync(
        { _id: typeof this._id !== "undefined" ? this._id : undefined },
        this.toDocument(),
        {},
      );
      if (numAffected !== 1)
        throw Error(numAffected + " documents updated instead of one.");
      return this.toDocument();
    } else {
      const inserted = await db.insertAsync(this.toDocument());
      return inserted;
    }
  }
  async delete() {
    const db = await ODM.getDatabase();

    //console.log(await db.findAsync(this))
    let deleted;
    if (typeof this._id === "string") {
      deleted = await db.removeAsync({ _id: this._id }, { multi: false });
    } else {
      const _id = this._id;
      delete this._id;
      deleted = await db.removeAsync(this);
      this._id = _id;
    }
    if (deleted !== 1)
      throw Error("Could not delete the document with _id=" + this._id);
  }
  toDocument() {
    return JSON.parse(JSON.stringify(this));
  }
  static async getDatabase() {
    if (!ODM.database || ODM.database.className !== ODM.className) {
      ODM.database = new nedb_1.default({
        filename: ODM.path
          ? ODM.path + "/" + ODM.className + ".json"
          : ODM.className + ".json",
        autoload: true,
        onload: (err) => (err ? console.error(err) : null),
      });
      ODM.database.className = ODM.className;
    }
    return ODM.database;
  }
  static async find(query, projection) {
    const db = await ODM.getDatabase();
    const docs = await db.findAsync(query, projection);
    return docs;
  }
  static async findOne(query, projection) {
    const db = await ODM.getDatabase();
    const doc = await db.findOneAsync(query, projection);
    return doc;
  }
  static async update(query, update, options) {
    const db = await ODM.getDatabase();
    const { numAffected } = await db.updateAsync(
      query,
      { $set: update },
      { multi: true, ...options },
    );
    return numAffected;
  }
  static async remove(query, options) {
    const db = await ODM.getDatabase();
    const numRemoved = await db.removeAsync(query, {
      multi: true,
      ...options,
    });
    return numRemoved;
  }
  static async delete() {
    const db = await ODM.getDatabase();
    const numRemoved = await db.removeAsync(query, {
      multi: true,
      ...options,
    });
    return numRemoved;
  }
  static async findById(id, projection) {
    const db = await ODM.getDatabase();
    const doc = await db.findOneAsync({ _id: id }, projection);
    return doc;
  }
  static async count(condition) {
    const db = await ODM.getDatabase();
    const count = await db.countAsync(condition);
    return count;
  }
  static async create(t) {

      const db = await ODM.getDatabase();
      if (t._id) {
        const { numAffected } = await db.updateAsync(
          { _id: typeof t._id !== "undefined" ? t._id : undefined },
          JSON.parse(JSON.stringify(t)),
          {},
        );
        if (numAffected !== 1)
          throw Error(numAffected + " documents updated instead of one.");
        return JSON.parse(JSON.stringify(t));
      } else {
        const inserted = await db.insertAsync(JSON.parse(JSON.stringify(t)));
        return inserted;
      }

  }


  static setModelName(name){
    ODM.className = name
  }
  static setClassPath(path){
    ODM.path = path
  }

}
exports.ODM = ODM;
//# sourceMappingURL=ODM.js.map
