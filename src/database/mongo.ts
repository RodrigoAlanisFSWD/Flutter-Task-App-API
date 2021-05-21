import mongoose from 'mongoose';

export default async function Open() {
    try {
        await mongoose.connect('mongodb://mongo/task-app-flutter', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Database Connected");
    } catch (error) {
        console.error("Error By Connecting The Database")
        console.error(error);
    }
}