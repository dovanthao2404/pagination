import './App.css';
import Pagination from './components/pagination/index';

const App = () => {
  return (
    <div>
      <Pagination total={200} currentPage={1} pageSize={10} onClickNext={(item) => {
      }}/>
    </div>
  )
}

export default App;
