import React, { useState,useEffect } from 'react';
import { useQuestionContext } from './QuestionContext';

const AddNewQuestion =()=>{
   
    const { addQuestion,questions,addQuestionList} = useQuestionContext();
    // create state variable for each question
    const [newQuestion,setNewQuestion]= useState({
        addquestioninput:"Add New Question",
        addoption1input:"Option 1",
        addoption2input:"Option 2",
        addoption3input:"Option 3",
        addoption4input:"Option 4",
        correctansinput:"correct Answer",
    });
   
    const modifyQuestion=(e)=>{
        setNewQuestion((prevstate)=>({
            ...prevstate,
            [e.target.name]:e.target.value
        }));
    }
    const addNewQuestionToList=(e)=>{
            e.preventDefault();

            
            addQuestion(newQuestion);       // add question to global questions list

            // STORE NEWLY ADDED QUESTION INTO LOCAL STORAGE
            let localStorageQuestion = JSON.parse(localStorage.getItem("quizQuestions"));
            localStorageQuestion=[...localStorageQuestion,newQuestion];
            localStorage.setItem("quizQuestions",JSON.stringify(localStorageQuestion));
           
            setNewQuestion({
                addquestioninput:"Add New Question",
                addoption1input:"Option 1",
                addoption2input:"Option 2",
                addoption3input:"Option 3",
                addoption4input:"Option 4",
                correctansinput:"correct Answer",
            })
            
    }

    // If you want to apply changes on questions update
    useEffect (()=>{
    },[questions])

    return(<>
        
       <div className="addnewquestion sectiondiv">
                <h3 className="sectiondivheading">Add New Question</h3>
                <form action="">
                <input type="text" name='addquestioninput' value={newQuestion.addquestioninput} onChange={(e)=>modifyQuestion(e)} />
                <input type="text" name='addoption1input' value={newQuestion.addoption1input} onChange={(e)=>modifyQuestion(e)} />
                <input type="text" name='addoption2input' value={newQuestion.addoption2input} onChange={(e)=>modifyQuestion(e)} />
                <input type="text" name='addoption3input' value={newQuestion.addoption3input} onChange={(e)=>modifyQuestion(e)} />
                <input type="text" name='addoption4input' value={newQuestion.addoption4input} onChange={(e)=>modifyQuestion(e)} />
                <input type="text" name='correctansinput' value={newQuestion.correctansinput} onChange={(e)=>modifyQuestion(e)} />
                <button type="submit" className='addQuestionbtn' onClick={(e)=>addNewQuestionToList(e)}>Add New Question</button>
                </form>
       </div>
      
    </>)
}
export default AddNewQuestion;