import { Schema, models, model } from "mongoose";

const userSchema = new Schema({
    name: String,
    email: String,
    misId: String,
    attendance: String,
    cgpa: String,
});

const Users = models.user || model('user', userSchema)

export default Users;