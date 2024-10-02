import mongoose from "mongoose";

const albamScheme = new mongoose.Schema({
    Albam_name: {type: String, require: true},
    Albam_desc: {type: String, require: true},
    bgColor: {type: String, require: true},
    Albam_image: {type: String, require: true}
})
const albamModel = mongoose.models.albam || mongoose.model("albam", albamScheme);
export default albamModel;