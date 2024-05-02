import { useContext, useRef, useState } from 'react'
import '../../styles/Note.css'
import { SelectionContext } from '../Provider/Provider'
import mouseEvents from '../../utils/mouseEvents'
const {onMouseDown} = mouseEvents
const Note = ({data, setNotes}) => {
    const {text, x, y, id} = data
    const noteRef = useRef(null)
    const {selection,setSelection}= useContext(SelectionContext)
    const [deleteOption, setDeleteOption] = useState(false)
    const mouseInteraction = (event) => {
        event.stopPropagation();
        let mouseButton = event.button
        if(mouseButton===0)
            onMouseDown(event,data,setNotes,selection,setSelection,noteRef)
        else if(mouseButton===2){
            setDeleteOption(true)
            setTimeout(() => {
                setDeleteOption(false)
            }, 1500);
        }
    }
    const deleteNote= ()=>{
        setNotes(notes=>notes.filter(note=>note.id!==id))
    }
  return (
    <div 
        className="note" 
        ref={noteRef}
        style={{
            top: y, 
            left: x,
            cursor: selection.selectedNoteIndex===id?"grabbing":"grab"
            }} 
        id={"note_"+id}
        onMouseDown={e=>mouseInteraction(e)}
        onContextMenu={e=> e.preventDefault()}
        
        >    
            {text}
            <div className="delete" show={deleteOption?"true":"false"} 
                onClick={deleteNote}
            > 
                Delete
            </div>
        </div>
  )
}

export default Note

