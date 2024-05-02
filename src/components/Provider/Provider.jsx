import { createContext, useState } from "react"

const Provider = ({children}) => {
    const [selection, setSelection] = useState({
        selectedNoteRef: null,
        selectedNoteIndex: null,
        selectedNotePrevData:{

        }
    })
  return (
    <SelectionContext.Provider value={{selection, setSelection}}>
        {children}
    </SelectionContext.Provider>
  )
}

export default Provider

const SelectionContext = createContext()

export { SelectionContext }