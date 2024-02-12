import Datastore from '@seald-io/nedb';
export interface IID {
    _id?: string;
}
interface IORM extends IID {
    save(): void;
}
export declare class ORM<T extends IID> implements IORM {
    private static database;
    _id?: string;
    constructor(t: T);
    save(): Promise<T>;
    delete(): Promise<void>;
    toDocument(): T;
    static getDatabase<T>(): Promise<Datastore<T>>;
    static find<T>(query?: Partial<T>, projection?: Partial<T>): Promise<T[]>;
    static findOne<T>(query: Partial<T>, projection?: Partial<T>): Promise<T | null>;
    static update<T>(query: Partial<T>, update: Partial<T>, options?: Datastore.UpdateOptions): Promise<number>;
    static remove<T>(query: Partial<T>, options?: Datastore.RemoveOptions): Promise<number>;
    static findById<T>(id: string, projection?: Partial<T>): Promise<T | null>;
    static count<T>(condition?: Partial<T>): Promise<number>;
}
export {};
//# sourceMappingURL=orm.d.ts.map