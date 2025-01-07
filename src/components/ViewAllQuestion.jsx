import React, { useState ,useEffect} from 'react';
import { useQuestionContext } from './QuestionContext';
import 'font-awesome/css/font-awesome.min.css';

const ViewAllQuestion =()=>{
    // take question list from global context
    const { questions ,addQuestionList,setQuestions,addQuestion} = useQuestionContext();
    
    const [localQuestions ,setLocalQuestions]=useState([...questions]);
    
    const [currIndex,setCurrIndex]=useState(0);// to get current index in update form
    const [newQuestion,setNewQuestion]= useState({
            addquestioninput:"Add New Question",
            addoption1input:"Option 1",
            addoption2input:"Option 2",
            addoption3input:"Option 3",
            addoption4input:"Option 4",
            correctansinput:"correct Answer",
        });


    const updateQuestion=(e)=>{
        // Show update question form
        document.getElementById("updateQuestionForm").style.display="flex";
        // e.targer.name is actually an index of question in questions array
        let index=e.currentTarget.name; // instead of target , use currentTarget as button contains i tag
        setCurrIndex(index);// set current index so we can access it in updateQuestionToList function

        setNewQuestion({
            addquestioninput:localQuestions[index].addquestioninput,
            addoption1input:localQuestions[index].addoption1input,
            addoption2input:localQuestions[index].addoption2input,
            addoption3input:localQuestions[index].addoption3input,
            addoption4input:localQuestions[index].addoption4input,
            correctansinput:localQuestions[index].correctansinput,
        })

    }


    const deleteQuestion=(e)=>{
        // e.targer.name is actually an index of question in questions array
       let flag= confirm("Are you sure? Do you want to delete the question?");
       if(flag){
            let index=e.currentTarget.name;     // currentTarget IS BUTTON AND NOT <i></i>
            setCurrIndex(index);
            const deletedlist= localQuestions.filter((e,idex)=> idex!=index);
            setLocalQuestions([...deletedlist]);
            setQuestions([...deletedlist]);

            // delete question from local storage i.e. aasign deletedlist to local storage
            let localStorageQuestion = JSON.parse(localStorage.getItem("quizQuestions"));
            localStorageQuestion=[...deletedlist];
            localStorage.setItem("quizQuestions",JSON.stringify(localStorageQuestion));
 
       }

    }

    const modifyQuestion=(e)=>{
        setNewQuestion((prevstate)=>({
            ...prevstate,
            [e.target.name]:e.target.value
        }));
    }

    const closeUpdateForm=(e)=>{
        e.preventDefault();
         // Hide update question form
         document.getElementById("updateQuestionForm").style.display="none";
    }
    
    const updateQuestionToList=(e)=>{
        
        e.preventDefault();
        // update question at curr index in local questions array
        localQuestions[currIndex]=newQuestion;
        //Update global questions array
        setQuestions([...localQuestions]);
        // Hide update question form
        document.getElementById("updateQuestionForm").style.display="none";

        // update question from local storage i.e. aasign localQuestions to local storage
        let localStorageQuestion = JSON.parse(localStorage.getItem("quizQuestions"));
        localStorageQuestion=[...localQuestions];
        localStorage.setItem("quizQuestions",JSON.stringify(localStorageQuestion));
    }
    useEffect (()=>{
       setLocalQuestions([...questions]);
    },[questions])
    return(<>
        
        <div className=" sectiondiv viewQuestiondiv">
        <h3 className="sectiondivheading">View All Question</h3>
        <table className='showAllQuestions table table-striped'>
            <tbody>
            <tr>
                <th>Sr.No</th>
                <th>Questions</th>
                <th>Option 1</th>
                <th>Option 2</th>
                <th>Option 3</th>
                <th>Option 4</th>
                <th>Correct Answer</th>
                <th>Update</th>
                <th>Delete</th>
            </tr>

            {
                // travel questions array and display each question
                questions.map((e,index)=>{
              
                    return(
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{e.addquestioninput}</td>
                            <td>{e.addoption1input}</td>
                            <td>{e.addoption2input}</td>
                            <td>{e.addoption3input}</td>
                            <td>{e.addoption4input}</td>
                            <td>{e.correctansinput}</td>
                            <td ><button className='updatequestion' name={index} data-index={index} onClick={e=>updateQuestion(e)} title='edit question'><i className="fa fa-edit" name={index} ></i></button></td>
                            <td><button className='deletequestion' name={index} data-index={index} onClick={e=>deleteQuestion(e)} title="delete question"><i className="fa fa-trash" name={index} ></i></button></td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
         <form action="" id='updateQuestionForm'>
         <h3 className="sectiondivheading">Update Question <button className='closeForm' onClick={ e=>closeUpdateForm(e)}>&times;</button></h3>
               
         <input type="text" name='addquestioninput' value={newQuestion.addquestioninput} onChange={(e)=>modifyQuestion(e)} />
                <input type="text" name='addoption1input' value={newQuestion.addoption1input} onChange={(e)=>modifyQuestion(e)} />
                <input type="text" name='addoption2input' value={newQuestion.addoption2input} onChange={(e)=>modifyQuestion(e)} />
                <input type="text" name='addoption3input' value={newQuestion.addoption3input} onChange={(e)=>modifyQuestion(e)} />
                <input type="text" name='addoption4input' value={newQuestion.addoption4input} onChange={(e)=>modifyQuestion(e)} />
                <input type="text" name='correctansinput' value={newQuestion.correctansinput} onChange={(e)=>modifyQuestion(e)} />
                <button type="submit" className='addQuestionbtn' onClick={(e)=>updateQuestionToList(e)}>Update Question</button>

         </form>
        </div>
        
    </>)
}
export default ViewAllQuestion;