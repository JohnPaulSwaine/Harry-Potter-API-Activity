import { useState, useEffect } from 'react'
import './App.css'
import Modal from 'react-modal'

Modal.setAppElement('#root');
const App = () => {
  const [allCharacters, setAllCharacters] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState({})

  const openModal = (character) => {
    setIsOpen(true);
    setSelectedCharacter(character)
  }

  const closeModal = () => {
    setIsOpen(false);
  }
  const fetchData = async () => {

    try {
      const response = await fetch("https://hp-api.onrender.com/api/characters")

      if (!response.ok) {
        throw new Error("Something has gone wrong!")
      }

      const filmsData = await response.json()

      setAllCharacters(filmsData.slice(0, 12))
      setErrorMsg("")
    } catch (error) {

      console.log(error.message)
      setErrorMsg(error.message)
    }

  }

  useEffect(() => {

    fetchData()
  }, [])

  return (
    <div>
      <h1> John's Harry Potter API Activity </h1>

      {errorMsg !== "" && (
        <p>{errorMsg}</p>
      )}

      {allCharacters.map((character, index) => {
        return (
          <h3 key={index} onClick={()=>openModal(character)}> {character.name} </h3>
        )
      })}
      <div>
        <Modal className='modal' isOpen={modalIsOpen} onRequestClose={closeModal}>
          <img className='image' src={selectedCharacter.image} />
          <h1> Name: {selectedCharacter.name} </h1>
          <h3> House: {selectedCharacter.house} </h3>
          <h3> Patronus: {selectedCharacter.patronus} </h3>
          <h3> Portrayed By: {selectedCharacter.actor} </h3>
          <h3> Date of Birth: {selectedCharacter.dateOfBirth} </h3>
          {/* <h3> Blood Status: {selectedCharacter.ancestry} </h3> */}
          {/* <h3> Also Known As: {selectedCharacter.alternate_names} </h3> */}

          {/*Can either have the image or the blood status and also known as. currently unable to get the modal to include all of it at once properly so had to pick and choose.*/}
          
        </Modal>
      </div>
    </div>
  )
}

export default App