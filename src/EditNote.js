import { useState } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "./useFetch";

const EditNote = () => {
    const { id } = useParams()
    const [save, setSave] = useState(false)
    const [content, setContent] = useState("")
    const history = useHistory()
    let [date, setDate] = useState("")

    let { data: notes } = useFetch("notes")

    const handleCancel = () => {
        history.go("-1")
    }
    const handleSave = (e) => {
        e.preventDefault()
        setSave(true)

        setTimeout(() => {
            notes.forEach(note => {
                if(note.id === id) {
                    let time = new Date()
                    time = `${time.getDate()}/${time.getMonth()+1}/${time.getFullYear()}`
                    setDate(time)
    
                    note.content = content
                    note.time = time
                }
            })

            localStorage.setItem("notes", JSON.stringify(notes))
            history.go(-1)
        },1000)
    }
    return ( 
        <div className="edit-note">
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <footer>
                <button onClick={handleCancel}>Cancel</button>
                {!save && <button onClick={handleSave}>Save</button>}
                {save && <button disabled>Saving</button>}
            </footer>
        </div>
     );
}
 
export default EditNote;