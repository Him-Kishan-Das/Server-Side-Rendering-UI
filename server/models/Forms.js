import mongoose from 'mongoose';

const FormSchema = new mongoose.Schema({
    service_id: {type: Number, required: true, index: true},
    formName: {type: String, required: true, unique: true, trim: true}
}, {
    timestamps: true
});

export default mongoose.model('forms', FormSchema);