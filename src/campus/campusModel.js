const mongoose   =  require('mongoose');
var Schema       = mongoose.Schema;

const campusSchema = new Schema({
   Name        : {type: String, required: true},
   location    : {type: String, required: true},
   departments : [{type: String, required: true}],
   courses     : [{type: String, required: true}]
}, {
  timestamps : {createdAt: 'created_at', updatedAt: 'modified_at' }
});

campusSchema.set('toJSON', { virtuals: true });

module.exports  = mongoose.model('Campus', campusSchema);