import logo from './logo.svg';
import Table from './Table.js'
import Name from './Name.js'
import './App.css';

function App() {
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
      <Table>
        {names()}
      </Table>
    </div>
  );
}

export default App;
