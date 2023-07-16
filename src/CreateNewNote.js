import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import uuid from 'react-uuid';
import useFetch from "./useFetch";


const CreateNewNote = () => {
    let time = new Date()
    time = `${time.getDate()}/${time.getMonth()+1}/${time.getFullYear()}`

    const {data: notes} = useFetch("notes")

    const id = uuid()
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [category, setCategory] = useState("personal")
    const [loading, setLoading] = useState(false)
    const history = useHistory()


    const addNewNote = (e) => {
        e.preventDefault()
        const note = {id, title, content, category, date: time}

        notes.push(note)

        console.log(JSON.parse(localStorage.getItem("note")))

        setLoading(true)

        setTimeout(() => {
            localStorage.setItem("notes", JSON.stringify(notes))
            setLoading(false)
            history.push("/")
        }, 1000)
    }

    return ( 
        <div className="create">
            <form onSubmit={addNewNote}>
                <div className="title">
                <label>Note Title</label>
                <input type="text"
                    required
                    value={title}
                    onChange={ (e) => setTitle(e.target.value)}
                />
                </div>
                <div className="note-content">
                <label>Note Content</label>
                <textarea
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                </div>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="personal">personal</option>
                    <option value="work">work</option>
                    <option value="study">study</option>
                    <option value="other">other</option>
                </select>
                {!loading && <button>Add Note</button>}
                {loading && <button disabled>Adding Note...</button>}
            </form>
        </div>
     );
}
 
export default CreateNewNote;