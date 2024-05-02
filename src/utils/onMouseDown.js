const onMouseDown=(event,data,setNotes,selection,setSelection,noteRef)=>{
    if(selection.selectedNoteIndex===data.id)return
    setSelection(val=>({...val,selectedNoteRef: event.target, selectedNoteIndex: data.id, selectedNotePrevData: {...data}}))
    let mouseX = event.clientX;
    let mouseY = event.clientY;
    setNotes(notes=>notes.map(note=>{
        if(note.id===data.id){
            return {
                ...note,
                selectedX: mouseX - noteRef.current.getBoundingClientRect().x,
                selectedY: mouseY - noteRef.current.getBoundingClientRect().y
            }
        }
        return note
    }))
}

export default onMouseDown;