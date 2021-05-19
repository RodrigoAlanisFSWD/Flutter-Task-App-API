import { Schema, Model, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

interface IUser extends Document {
    username: string;
    password: string;
    created_at: Date;
}

const UserSchema: Schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
    created_at: {
        type: Date
    }
});

export default model('User', UserSchema);