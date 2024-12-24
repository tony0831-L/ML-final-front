import { examLog } from "./examLog";
import { Types,Document } from "mongoose";

export type DBresp<T> = Document<unknown, any, T> & Omit<examLog & {
    _id: Types.ObjectId;
}, never>