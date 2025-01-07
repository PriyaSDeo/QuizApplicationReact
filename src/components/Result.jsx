import React, { useState } from 'react';
import { useQuestionContext } from './QuestionContext';
import { useParams } from 'react-router-dom';
const Result =()=>{
    let {rollNo} = useParams();

    // get result,question and examSchedule from global context
    const { questions,result,examSchedule } = useQuestionContext();
    let que=0;
    let cor=0;
    let wro=0;

    // travel result to calculate correct and wrong answers
    for(let i=0;i<result.length;i++){
        
       if(result[i]!=0){
            que++;
            if(result[i]==-1){
                wro++
            }
            else{
                cor++;
            }
       }
    }
    let totalMarks=0;
    totalMarks = (parseInt(cor)*parseInt(examSchedule.examtotalmarks))/parseInt(questions.length);
    let pass = (totalMarks>=examSchedule.exampassingmarks)?"Pass":"Fail";
    return(<>
        <div className="result">
        <h2>Result</h2>
        <h4>Roll No : {rollNo}</h4>
        <div className="resultsumm">
            <p>Total Questions : {questions.length}</p>
            <p>Attempted Questions : {que}</p>
            <p>Correct Questions : {cor}</p>
            <p>Wrong Questions : {wro}</p>
            <p>Total Marks : {examSchedule.examtotalmarks}</p>
            <p>passingMarks : {examSchedule.exampassingmarks}</p>
            <p>Marks Obtain : {totalMarks.toFixed(2)} %</p>
            <p>Result : <span className={`${pass === 'Pass' ? 'text-success' : 'text-danger'} text-uppercase`}>{pass}</span> </p>
        </div>
        </div>
    </>)
}
export default Result;