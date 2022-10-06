const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const StudentSchema = new Schema({
    roll_no: {
        type:  String,
        required: true,
        unique: true
    },
    name: {
        type:  String,
        required: true,
    }
    ,fatherName: {
        type:  String,
        required: true,
    }
    ,address: {
        type:  String,
        required: true,
    }
    ,email: {
        type:  String,
        required: true,
    }
    ,phone: {
        type:  Number,
        required: true,
    }
    ,phone2: {
        type:  Number,
        required: true,
    }
    ,course: {
        type:  String,
        required: true,
    }
    ,branch: {
        type:  String,
        required: true,
    }
    ,aadhar: {
        type:  Number,
        required: true,
        unique: true
    }
    ,correspondingAdress: {
        type:  String,
        required: true,
    }
    ,postalCode: {
        type: Number,
    }
    ,feesPaid: {
        type:  Number,
        default : 0,
    }
    ,totalFees: {
        type:  Number,
        default : 0,
    }
    ,dueFee: {
        type:  Number,
        default : 0,
    }
    ,nationality: {
        type:  String,
        default :'Indian',
    }
    ,hostel: {
        type:  Boolean,
        default :false,
    }
    ,familyIncome: {
        type:  String,
    }
    ,city: {
        type:  String,
    }
    ,password: {
        type:  String,
        required: true,
    }
});


module.exports = mongoose.model('Student',StudentSchema);