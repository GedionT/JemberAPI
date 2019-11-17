const mongoose   =  require('mongoose');
var Schema       = mongoose.Schema;

const userSchema = new Schema({
    username : {type: String, lowercase: true, required: true, match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
    phone    : {type: String, required: true},
    profile  : {type: Schema.Types.ObjectId, ref: 'Profile'},
    hash     : {type: String, required: false}
}, {
  timestamps : {createdAt: 'created_at', updatedAt: 'modified_at' }
});

userSchema.set('toJSON', { virtuals: true });

module.exports  = mongoose.model('User', userSchema);