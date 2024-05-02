import { useContext, useEffect, useState } from "react"
import Note from "../../components/Note/Note"
import mouseEvents from "../../utils/mouseEvents"
import { SelectionContext } from "../../components/Provider/Provider"
const { onMouseMove, onMouseUp} = mouseEvents
const HomePage = () => {
    const [form, setform] = useState({
        inputValue: '',
        x:0,
        y:0,
        width:0,
        height:0
    })
    const [notesLength, setNotesLength] = useState(-1)
    const [notes, setNotes] = useState([])
    const {selection, setSelection} = useContext(SelectionContext)

    const addNote = () => {
        notes.push({
            id: notes.length + 1,
            text: form.inputValue,
            x: 100,
            y: 100,
            selectedX: 0,
            selectedY: 0,
            width: 0,
            height: 0
        })
        setform({...form, inputValue: ''})
        calculateNoteDimensions(setNotes)
        console.log(notes)
    }
    useEffect(() => {
      calculateNoteFormDimensions(setform);
    }, [])
    useEffect(() => {
        if(notes.length!=notesLength){
            calculateNoteDimensions(setNotes)
            setNotesLength(notes.length)
        }
    },[notes])
    
  return (
    <div className="home" 
          onMouseMove={e=>onMouseMove(e,notes,setNotes,selection)}
        onMouseUp={e=>onMouseUp(e,notes,setNotes,selection,setSelection)}  
         >
        <section className="note-form" id="note-form">
            <input type="text" 
                   name="note-text" 
                   placeholder="Enter your note"
                   value={form.inputValue}
                   onChange={e => setform({...form, inputValue: e.target.value})}
                   onKeyDown={e => e.key === 'Enter'? addNote(): null}  />
        </section>
        {notes.map((note, index) => 
                    <Note 
                        data={note} 
                        key={index+"notes"} 
                        setNotes={setNotes}
                        />)}
    </div>
  )
}

export default HomePage

const calculateNoteFormDimensions = (setform) => {
    let input = document.getElementById('note-form')
    if(!input)return
    let inputObj={
        origin: input.getBoundingClientRect(),
        width : input.offsetWidth,
        height: input.offsetHeight,
        x:input.getBoundingClientRect().x,
        y:input.getBoundingClientRect().y
    }
    setform(val=>({...val,...inputObj}))
}

const calculateNoteDimensions = (setNotes) => {
    setNotes(notes=>notes.map(note=>{
        let noteRef = document.getElementById("note_"+note.id)
        if(!noteRef)return note
        let noteObj = {
            origin: noteRef.getBoundingClientRect(),
            width : noteRef.offsetWidth,
            height: noteRef.offsetHeight,
            x:noteRef.getBoundingClientRect().x,
            y:noteRef.getBoundingClientRect().y
        }
        return {...note,...noteObj}
    }))
}