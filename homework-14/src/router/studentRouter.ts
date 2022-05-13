import { Router } from 'express';

import { studentModel } from '../models'
// import {teacherModel} from "../models/teacher";

const router = Router();

router.post('/', async (req,res,next) =>{
    try{
        const createdStudent = await studentModel.create(req.body);

        res.json(createdStudent);
    }catch (e) {
      next(e);
    }
})

router.get('/',async (req,res,next) => {
    try {
        let students = await studentModel.findOne({}).populate('teacher')
        // let students = await studentModel.findOne({}, undefined, { populate: { path: 'teacher', model: 'teachers'} });
        // let students = await studentModel.findOne({});
        // const students = await studentModel.find({});
        // await teacherModel.create({
        //     name: 'Viktor',
        //     age: 26,
        //     email: 'Viktor26@gmail.com     '
        // });

        console.log(students);

        res.json(students);
    }catch (e) {
       next(e);
    }
})

router.patch('/:studentId', async(req,res,next) =>{
    try{
        const updatedStudent = await studentModel.findByIdAndUpdate(
            req.params.studentId,
            {teacher: "627a51b704c25cf98257b6c3"},
            {new: true}
        );
        res.json(updatedStudent);
    }catch (e) {
      next(e);
    }
})

export const studentRouter = router;