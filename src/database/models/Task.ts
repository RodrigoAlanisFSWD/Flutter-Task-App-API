import { Schema, Model, model, Document } from 'mongoose';

export interface TaskI extends Document {
    name: string;
    done: boolean;
    created_at: Date;
}

const TaskSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    done: {
        type: Boolean,
        default: false
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    created_at: Date,
})

export default model('Task', TaskSchema);
