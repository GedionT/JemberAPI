const mongoose   =  require('mongoose');
var Schema       = mongoose.Schema;

const profileSchema = new Schema({
    user       : {type: Schema.Types.ObjectId, ref: 'User', required: true},
    firstName  : {type: String, required: false},
    lastName   : {type: String, required: false},
    gender     : {type: String, maxlength: 1, required: false},
    email      : {type: String, required: false},
    campus     : {type: mongoose.SchemaTypes.ObjectId, ref: 'Campus', required: false},
    department : {type: mongoose.SchemaTypes.ObjectId, ref: 'Campus', required: false},
    courses    : [{type: mongoose.SchemaTypes.ObjectId, ref: 'Campus', required: false}],
    schoolId   : {type: String, required: false},
    DoB        : {type: Date, required: false},
    interest   : [{type: String, required: false}],
    voucher    : {type: mongoose.SchemaTypes.ObjectId, ref: 'Voucher', required: false},
    image      : {type: String, required: false}
}, {
  timestamps : { createdAt: 'created_at', updatedAt: 'modified_at' }
});

profileSchema.set('toJSON', { virtuals: true });

module.exports  = mongoose.model('Profile', profileSchema);