const mongoose   =  require('mongoose');
var Schema       = mongoose.Schema;

const profileSchema = new Schema({
    firstName  : {type: String, required: true},
    lastName   : {type: String, required: true},
    gender     : {type: String, maxlength: 1, required: true},
    email      : {type: String, required: true},
    campus     : {type: mongoose.SchemaTypes.id, ref: 'Campus', required: true},
    department : {type: mongoose.SchemaTypes.String, ref: 'Campus', required: true},
    course     : {type: mongoose.SchemaTypes.String, ref: 'Campus', required: true},
    DoB        : {type: Date, required: true},
    interest   : [{type: String, required: false}],
    image      : {type: String, required: false}
}, {
  timestamps : { createdAt: 'created_at', updatedAt: 'modified_at' }
});

profileSchema.set('toJSON', { virtuals: true });

module.exports  = mongoose.model('Profile', profileSchema);