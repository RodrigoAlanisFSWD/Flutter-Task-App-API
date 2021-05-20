import { Schema, Model, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface UserI extends Document {
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
    avatar: {
        type: String
    },
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
    created_at: {
        type: Date
    }
});

UserSchema.pre("save", async function (this: UserI, next: Function) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 5);
    }
})

export default model('User', UserSchema);