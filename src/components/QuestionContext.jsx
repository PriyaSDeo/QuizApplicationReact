import React, { createContext, useState, useContext,useEffect } from 'react';

// Create the context
export const QuestionContext = createContext();

// Create the provider component
export const QuestionProvider = ({ children }) => {
    let d = new Date();
    let futureDate = new Date(d);  // Create a copy of the current date
    futureDate.setHours(d.getHours() + 2);  // Add 2 hours
  const [questions, setQuestions] = useState([]);
  const [examSchedule,setExamSchedule]=useState({
    examdate:d.toLocaleDateString(),
    examstarttime:d.toLocaleTimeString(),
    examendtime:futureDate.toLocaleTimeString(),
    examtotalmarks:100,
    exampassingmarks:40
  })
  const [result, setResult] = useState([]);
  const [rollNo,setRollNo]=useState("roll no");
 
  const modifyLocalStorage=(list)=>{
    setQuestions([...list]);
  }
  const  addQuestionList = (list)=>{
    setQuestions([...questions,...list]); 
  }
  const addQuestion = (question) => {
    setQuestions([...questions, question]);
  };
  const addSchedule = (inputschedule)=>{
    setExamSchedule(inputschedule);
  }
 const submitResult=(finalresult)=>{
    setResult(finalresult);
 }
 useEffect(()=>{

  // FOR THE FIRST TIME TAKE ALL QUESTION FROM LOCAL STORAGE
  if(!localStorage.getItem("quizQuestions")){
    localStorage.setItem("quizQuestions",JSON.stringify([]));
  }
  let localStorageQuestion = JSON.parse(localStorage.getItem("quizQuestions"));
  if(questions.length==0 && localStorageQuestion.length!=0){
    modifyLocalStorage(localStorageQuestion);
}
 },[questions])
 //// Pass everything you want to use globally
  return (
    <QuestionContext.Provider value={{ questions, setQuestions , addQuestion, addQuestionList,examSchedule,addSchedule,result,submitResult,rollNo,setRollNo }}>
      {children}
    </QuestionContext.Provider>
  );
};

// Custom hook to use the  easily
export const useQuestionContext = () => useContext(QuestionContext);
