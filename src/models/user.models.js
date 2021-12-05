
const bcrypt = require('bcryptjs');
const {Schema , model} = require('mongoose');

const userSchema = new Schema({
    email:{type: String, required: true,unique: true},
    password:{type: String, required:true},

},{
    versionKey :false,
    timestamps:true,
});

userSchema.pre('save', function(next){
    //create and update

    if(!this.isModified('password')) return next();
     bcrypt.hash(this.password, 10, (err, hash) => {
        this.password = hash;
        return next();
     });
});


userSchema.methods.checkPassword = function(password) {
    return new promise(function(resolve, reject) {
        bycrypt.compare
    })
}


module.exports = model('user' , userSchema);