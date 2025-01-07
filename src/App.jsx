import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import {BrowserRouter,Routes,Route,Link,NavLink} from 'react-router-dom';
import { QuestionProvider } from './components/QuestionContext';
import AddNewQuestion from './components/AddNewQuestion';
import ViewAllQuestion from './components/ViewAllQuestion';
import ScheduleExam from './components/ScheduleExam';
import StartExam from './components/StartExam';
import Result from './components/Result';


function App() {
  return (
    <>
      <BrowserRouter>
     
        <header>
            <nav>
             <span><Link to="/addnewquestion">Add New Question</Link></span>
             <span><Link to="/viewallquestion">View All Question</Link></span>
             <span><Link to="/scheduleexam">Schedule Exam</Link></span>
             <span><Link to="/startexam">Start Exam</Link></span>
             <span><Link to="/result">Result</Link></span>
            </nav>

        </header>
        <QuestionProvider>
      <Routes>
            <Route  path='/'  element={<AddNewQuestion/>} />
            <Route  path='/addnewquestion' element={<AddNewQuestion/>} />
            <Route  path='/viewallquestion' element={<ViewAllQuestion/>} />
            <Route  path='/scheduleexam' element={<ScheduleExam/>} />
            <Route  path='/startexam' element={<StartExam/>} />
            <Route  path='/result' element={<Result/>} />
            <Route  path='/result/:rollNo' element={<Result/>} />
      </Routes>
      </QuestionProvider>
      </BrowserRouter>
    </>
  )
}

export default App
