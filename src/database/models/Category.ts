import { Schema, Model, model, Document } from 'mongoose';

export interface CategoryI extends Document {
    name: string;
    done: boolean;
    created_at: Date;
}

const CategorySchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
    created_at: Date,
})

export default model('Category', CategorySchema);
