import mongoose from 'mongoose';

export default async function Open() {
    try {
        await mongoose.connect('mongodb://localhost:27017/f-tasks', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Database Connected");
    } catch (error) {
        console.error("Error By Connecting The Database")
        console.error(error);
    }
}