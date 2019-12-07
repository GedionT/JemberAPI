const mongoose   = require('mongoose');
const Schema     = mongoose.Schema;

const fileSchema = new Schema({
    uploadedBy :  {type: Schema.Types.ObjectId, ref: 'User', required: false}, 
    fileUrl    :  {type: String, required: true}, 
    spellCheck :  {type: Boolean, default: false},
    proofRead  :  {type: Boolean, default: false}, 
    Campus     :  {type: Schema.Types.ObjectId, ref: 'Campus', required: true},
    Department :  {type: String, required: true},
    Course     :  {type: String, ref: 'Campus', required: true}
}, {
    timestamps : { createdAt: 'created_at', updatedAt: 'modified_at' }
});

fileSchema.set('toJSON', { virtuals : true });

module.exports = mongoose.model('File', fileSchema);