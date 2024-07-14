import { useEffect, useState } from 'react'
import Header from '../components/Header';



const Home = ({setpubkey}) => {
    const [ques,setqs]=useState([]);
    const [addans,setaddans]=useState(true)
    const [content,setcontent]=useState("")

const questions = [
    
    {
        id: 1,
        content: "What is Stellar?",
        comments: [
            { user: "Alice", content: "It's a blockchain network.", likes: 0, dislikes: 0, userAction: null },
            { user: "Bob", content: "It's used for cross-border payments.", likes: 0, dislikes: 0, userAction: null }
        ]
    },
    {
        id: 2,
        content: "How to integrate Stellar with JavaScript?",
        comments: [
            { user: "Charlie", content: "Use the Stellar SDK.", likes: 0, dislikes: 0, userAction: null },
            { user: "Dave", content: "Check the official documentation.", likes: 0, dislikes: 0, userAction: null }
        ]
    },
    {
        id: 3,
        content: "What are the benefits of using Stellar?",
        comments: [
            { user: "Eve", content: "Low fees.", likes: 0, dislikes: 0, userAction: null },
            { user: "Frank", content: "Fast transactions.", likes: 0, dislikes: 0, userAction: null }
        ]
    }
];
const handleSave = () => {
    const id = questions.comments.length ? questions.comments[questions.comments.length-1].id+1 : 1;
  const addnewans= {id,content:content,likes:0,dislikes:0,userAction:null};
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
                        <p>{comment.likes}</p>
                        <p>{comment.dislikes}</p>

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