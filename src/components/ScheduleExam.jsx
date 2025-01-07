import React, { useState ,useEffect} from 'react';
import { useQuestionContext } from './QuestionContext';

const ScheduleExam =()=>{
    const { examSchedule,addSchedule } = useQuestionContext();
    let d = new Date();
    let futureDate = new Date(d);  // Create a copy of the current date
    futureDate.setHours(d.getHours() + 2);  // Add 2 hours
    const [examSchedulelocal , setExamSchedulelocal]=useState({
        examdate:d.toLocaleDateString(),
        examstarttime:d.toLocaleTimeString(),
        examendtime:futureDate.toLocaleTimeString(),
        examtotalmarks:100,
        exampassingmarks:40
    })
    const modifyExamSchedule=(e)=>{
        
        setExamSchedulelocal(prev=>({
            ...prev,
            [e.target.name]:e.target.value
        }))
    }
    const sheceduleExamToApp=(e)=>{
        e.preventDefault();
            // apply validations
            if(new Date(examSchedulelocal.examdate)=="Invalid Date" ){
                alert("Invalid exam date");
                return;
            }
            else if(new Date(examSchedulelocal.examdate+" "+"23:59:59") <new Date()){
                alert("Please Enter today or future date");
                return;
            }
            else if(new Date(examSchedulelocal.examdate+" "+examSchedulelocal.examstarttime)=="Invalid Date") {
                alert("Invalid exam START Time");
                return;
            }
            else if(new Date(examSchedulelocal.examdate+" "+examSchedulelocal.examstarttime)<d){
                alert("Start time should be ahead of current time");
                 return;
            }
            else if(new Date(examSchedulelocal.examdate+" "+examSchedulelocal.examstarttime)=="Invalid Date") {
                 alert("Invalid exam END Time");
                 return;
             }
             else if (new Date(examSchedulelocal.examdate+" "+examSchedulelocal.examendtime)<
             new Date(examSchedulelocal.examdate+" "+examSchedulelocal.examstarttime)){
                alert("End Time should be Greater than Start Time");
                 return;
             }
             else if(examSchedulelocal.examtotalmarks<=0){
                alert("Total marks should be greater than one");
             }
             else if(examSchedulelocal.exampassingmarks<=0 || examSchedulelocal.exampassingmarks>examSchedulelocal.examtotalmarks){
                alert("passing marks should be greater than zero and should not exceed total marks")
                return;
             }

        // add this schedule to global state
        addSchedule(examSchedulelocal);
        alert("Exam Set Successfully");
    }
    useEffect (()=>{  
        },[examSchedule])
    return(<>
        
        <div className=" sectiondiv">
                <h3 className="sectiondivheading">Scehdule Exam</h3>
                <form action="">
                <label >Exam Date</label>
                <input type="date" name='examdate' value={examSchedulelocal.examdate} onChange={(e)=>modifyExamSchedule(e)} />
                <label >Exam Start Time</label>
                <input type="time" name='examstarttime' value={examSchedulelocal.examstarttime} onChange={(e)=>modifyExamSchedule(e)} />
                <label >Exam End Time</label>
                <input type="time" name='examendtime' value={examSchedulelocal.examendtime} onChange={(e)=>modifyExamSchedule(e)} />
                <label >Total matks in exam</label>
                <input type="text" name='examtotalmarks' value={examSchedulelocal.examtotalmarks} onChange={(e)=>modifyExamSchedule(e)} />
                <label >Passing marks for exam</label>
                <input type="text" name='exampassingmarks' value={examSchedulelocal.exampassingmarks} onChange={(e)=>modifyExamSchedule(e)} />

                <button type="submit" className='scheduleExambtn' onClick={(e)=>sheceduleExamToApp(e)}>Schedule Exam</button>
                
                </form>
                
       </div>
        
    </>)
}
export default ScheduleExam;