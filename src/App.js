import {useState} from 'react'
import Table from './Table.js'
import Name from './Name.js'
import Input from './Input.js'
import './App.css';

function App() {
  const [selectedCard, selectCard] = useState(null)
  const names = () => {
    return [...Array(10).keys()].map(num => {
      return  <Name
                index={num + 1}
                name={"Benji"}
              />
    })
  }
  return (
    <div className="app">
      <Table selectedCard={selectedCard}>
        {names()}
      </Table>
      <Input 
        displaySelectedCard={(num) => selectCard(num)}
      />
    </div>
  );
}

export default App;
