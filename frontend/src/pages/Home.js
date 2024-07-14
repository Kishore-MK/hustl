import { useEffect, useState } from 'react'
import Header from '../components/Header';
import { upVote } from '../components/contract';

const Home = ({setpubkey}) => {
    const [ques,setqs]=useState([]);
    const [addans,setaddans]=useState(true)
    const [content,setcontent]=useState("")

const questions = fetch
const handleSave = () => {
    const id = questions.comments.length ? questions.comments[questions.comments.length-1].id+1 : 1;
  const addnewans = {id,content:content,likes:0,dislikes:0,userAction:null};
  const listcomments = [...questions.comments,addnewans];
  setcontent(listcomments)
  };

// useEffect(()=>{
//     setqs(questions);
//   },[])
return(
    <div>
    <Header setpubkey={setpubkey}/>
    {questions.map((question)=>{
        return(
            <div>
            <div class="question-content">{question.content}
        <div class="comments-section">
            <h3>Comments</h3>
            {question.comments.map((comment) => 
                <div class="comment">
                    <p>{comment.user}</p>
                    <p>{comment.content}</p>
                    <div class="vote-buttons">
                        <button onClick={upVote()}>{comment.likes}</button>
                        <button>{comment.dislikes}</button>
                    </div>
                </div>
            )}
            </div>
            
            <div>
            <input
            type="text"
            value={content}
            onChange={(e) => setcontent(e.target.value)}
            placeholder="Enter content"
        />
        <button onClick={()=>handleSave()}>Save</button>
        </div>
        </div>
        
        </div>
        )})}
    </div>
)
}

export default Home