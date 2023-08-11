import {useState} from 'react'
import Table from './Table.js'
import Input from './Input.js'
import './App.css';

function App() {
  const [selectedCard, selectCard] = useState(null)

  return (
    <div className="app">
      <Table selectedCard={selectedCard}>
      </Table>
      <Input 
        displaySelectedCard={(num) => selectCard(num)}
      />
    </div>
  );
}

export default App;
