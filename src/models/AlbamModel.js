import mongoose from "mongoose";

const albamScheme = new mongoose.Schema({
    name: {type: String, require: true},
    desc: {type: String, require: true},
    bgColor: {type: String, require: true},
    image: {type: String, require: true}
})
const albamModel = mongoose.models.albam || mongoose.model("albam", albamScheme);
export default albamModel;