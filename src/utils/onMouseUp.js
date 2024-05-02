const onMouseUp=(event,notes,setNotes,selection,setSelection)=>{
    if(!selection.selectedNoteRef)return
    let data = {...selection.selectedNotePrevData}
    let isOverlapped = checkOverlap(data['id'],notes);
    if(isOverlapped){
        console.log(isOverlapped)
        restorePreviousCoordinates(setNotes,selection)
    }
    setSelection(val=>({...val,selectedNoteRef: null, selectedNoteIndex: null, selectedNotePrevData: {}}))

}

export default onMouseUp;

const checkOverlap=(id, notes)=>{
    let isOverlapped=false
    let data = notes.find(note=>note.id === id)
    notes.forEach(note => {
        if(note.id == id)return;
        if(isOverlapped)return        
        let currX = note.x
        let currY = note.y
        let currWidth = note.width
        let currHeight = note.height
        
        let selectedX = data.x
        let selectedY = data.y
        let selectedWidth = data.width
        let selectedHeight = data.height

        if(Math.abs(currX - selectedX) < (currX<selectedX?currWidth:selectedWidth)  
            && Math.abs(currY - selectedY) < (currX<selectedX?currHeight:selectedHeight) ){
            console.log('overlap')
            isOverlapped = true
        }
    });
    return isOverlapped;
}

const restorePreviousCoordinates=(setNotes,selection)=>{
    let {id} = selection.selectedNotePrevData
    setNotes(notes=>notes.map(note=>{
        if(note.id===id){
            return {
                ...note,
                x: selection.selectedNotePrevData.x,
                y: selection.selectedNotePrevData.y
            }
        }
        return note
    }))
}

export {checkOverlap}