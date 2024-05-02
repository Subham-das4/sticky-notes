const onMouseMove=(event,notes,setNotes,selection)=>{
    if(!selection.selectedNoteRef)return
    let data = {...selection.selectedNotePrevData}
    let mouseX = event.clientX;
    let mouseY = event.clientY;
    setNotes(notes=>notes.map(note=>{
        if(note.id===data.id){
            let selectedX = note.selectedX;
            let selectedY = note.selectedY;
            return {
                ...note,
                x: mouseX - selectedX,
                y: mouseY - selectedY
            }
        }
        return note
    }))
}


export default onMouseMove;