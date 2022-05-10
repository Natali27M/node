import mongoose from 'mongoose';

// @ts-ignore
import {teacherModel} from "./teacher";

const {Schema, model} = mongoose;

const studentSchema = new Schema({
    name: {
        type: String,
        trim: true
        // default: 'Ivan'
    },

    email: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true
    },

    age: {
        type: Number,
        default: 0
    },

    teacher: {
       type: mongoose.Schema.Types.ObjectId,
       ref: teacherModel
        // default:null
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true}
});

studentSchema.virtual('fullName').get(function () {
    // @ts-ignore
    return this.name + ' ' + 'Zelenskiy'
})

// studentSchema.pre('findOne', function () {
//     this.populate('teacher');
// })

export const studentModel = model('student', studentSchema);