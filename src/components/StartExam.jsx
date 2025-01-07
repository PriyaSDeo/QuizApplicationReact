import React, { useEffect, useState } from 'react';
import { useQuestionContext } from './QuestionContext';
import { NavLink } from 'react-router-dom';
const StartExam =()=>{

    // taking required global variable context
     const { examSchedule,questions,submitResult,result ,rollNo,setRollNo} = useQuestionContext();

    // creating an array of length of number of questions and set it to zero
    let zeroArray = new Array(questions.length).fill(0);
    //creating a state array resultarr for caculating result
    const [resultarr,setResultarr]=useState([...zeroArray]);

    // currIndex to fetch question at that index
    const [currIndex,setCurrIndex]=useState(0);

    // to store selected answer
    const [selectedAns,setSelectedAns]=useState("");

    // store selected answer whenever i change option
    const selectAnswer =(e)=>{
        setSelectedAns(e.target.value);
    }

   
    let starttime = new Date(examSchedule.examdate +" "+ examSchedule.examstarttime);
    let endtime = new Date(examSchedule.examdate +" "+ examSchedule.examendtime);
    let timeRemain = endtime-starttime;
    const [remainingTime, setRemainingTime]=useState(timeRemain);
    const [formattedTime, setFormattedTime] = useState(''); // State to store formatted time

    // Function to format the remaining time as hh:mm:ss
    const formatTime = (timeInMs) => {
        let hours = Math.floor(timeInMs / 1000 / 60 / 60);
        let minutes = Math.floor((timeInMs % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeInMs % (1000 * 60)) / 1000);

        // Format hours, minutes, and seconds to always show two digits (e.g., 09:05:03)
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    // Format time initially
   // setFormattedTime(formatTime(remainingTime));

    // on previous button click
    const goPrevious=()=>{
        zeroArray=result;
        if(selectedAns!=""){
            if(selectedAns==questions[currIndex].correctansinput){zeroArray[currIndex]=1; }
            else{ zeroArray[currIndex]=-1;   }
        }
        setResultarr(zeroArray);
        if(currIndex>0)setCurrIndex(currIndex-1);
        selectedAns!=""
    }

    //on next button click
    const goNext=()=>{
        zeroArray=result;
        if(selectedAns!=""){
            if(selectedAns==questions[currIndex].correctansinput){ zeroArray[currIndex]=1;}
            else{ zeroArray[currIndex]=-1;}
        }
        setResultarr(zeroArray);
        if(currIndex<questions.length-1)setCurrIndex(currIndex+1);
        selectedAns!=""
    }

    //on submit button click
    const goSubmit=()=>{
        zeroArray=result;
        if(selectedAns!=""){
            if(selectedAns==questions[currIndex].correctansinput){zeroArray[currIndex]=1;}
            else{zeroArray[currIndex]=-1; }
        }
        
        setResultarr([...zeroArray]);
        // pass resultarr to global result araray
       submitResult(zeroArray);
       alert("Exam submitted successfully Check Result");
       
       document.querySelector(".gotoresult").click();
    }

    const startExam=()=>{

       //setRollNo(document.getElementById("rollno").value);
        let d = new Date();
        let examDate = new Date(examSchedule.examdate+" "+examSchedule.examstarttime);
        let examEnd = new Date(examSchedule.examdate+" "+examSchedule.examendtime);

        // check if date match
        if(examDate.toLocaleDateString() != d.toLocaleDateString()){
            alert("Exam will start on  "+ examDate.toLocaleDateString() + " at "+ examSchedule.examstarttime);
        }
        // check if hours and minutes match
        else if((d.getHours()>= examDate.getHours() && d.getHours()<= examEnd.getHours()) 
                
        ){
                if((d.getHours()>examDate.getHours()) ||(d.getHours()==examDate.getHours() && d.getMinutes()>=
            examDate.getMinutes() )){
                    document.querySelector(".startbutton").style.display="none";
                    document.querySelector(".controlButtons").style.display="block";
                    document.querySelector(".instructions").style.display="none";
        
                    const countdown = setInterval(() => {
                        setRemainingTime(prevTime => {
                            
                            if (prevTime <= 1) {
                                clearInterval(countdown); // Stop the countdown when time runs out
                                goSubmit(); // Automatically submit the exam when time is up
                                return 0;
                            }
                            return prevTime - 1000;
                        });
                        
                    }, 1000);
            }
            
            else{
                alert("Exam will start  at "+ examSchedule.examstarttime);// hours match but minutes not match
            }
        }
        else{
 
            alert("Exam can not start");// hours not match
        }
        
    }
    useEffect(()=>{
        // Update formatedTime whenever remaining time change
        setFormattedTime(formatTime(remainingTime)); 
    },[remainingTime]);
    return(<>
         <div className="startExam sectiondiv">
            <h3 className="sectiondivheading">Exam</h3>
            <button className='startbutton' onClick={startExam}>Start Exam</button>
            <div className="instructions">
                <input type="text" id='rollno' value={rollNo} onChange={e=>setRollNo(e.target.value)} />
                <p>1. Click on start Exam to start</p>
                <p>2. There will be Total {questions.length}  questions</p>
                <p>3. Total marks are {examSchedule.examtotalmarks}</p>
                <p>4. Passing marks are {examSchedule.exampassingmarks}</p>
                <p>4. Total Time for exam  &nbsp; {formattedTime}</p>
                    
            </div>
            <div className='controlButtons'>
                <p>Remaining Time : {formattedTime}</p>
            <div className="startExamQuestionDiv">
                
                <h2 className="questiontext">{questions[currIndex].addquestioninput}</h2>
                <div className='optiondiv'>
                    <input id='option1' type="radio" name='options' value={questions[currIndex].addoption1input} onChange={(e)=>selectAnswer(e)}/>
                    <label htmlFor="option1">{questions[currIndex].addoption1input}</label>
                </div>
                <div className='optiondiv'>
                    <input id='option2' type="radio" name='options' value={questions[currIndex].addoption2input} onChange={(e)=>selectAnswer(e)}/>
                    <label htmlFor="option2">{questions[currIndex].addoption2input}</label>
                </div>
                <div className='optiondiv'>
                    <input id='option3' type="radio" name='options' value={questions[currIndex].addoption3input} onChange={(e)=>selectAnswer(e)}/>
                    <label htmlFor="option3">{questions[currIndex].addoption3input}</label>
                </div>
                <div className='optiondiv'>
                    <input id='option4' type="radio" name='options' value={questions[currIndex].addoption4input} onChange={(e)=>selectAnswer(e)}/>
                    <label htmlFor="option4">{questions[currIndex].addoption4input}</label>
                </div>
            </div>
            {currIndex>0 && <button className='prevButton' onClick={goPrevious}>Previous</button>}
            
            {currIndex< questions.length-1 && <button className='nextButton' onClick={goNext}>Next</button>}
            
            {currIndex==questions.length-1 && <button className='submitButton' onClick={goSubmit}>Submit</button>}
            
        </div>
         </div>
         <NavLink to={`/result/${rollNo}`} className="gotoresult" style={{"display":"none"}}>Go to result</NavLink>

        
        
        
    </>)
}
export default StartExam;