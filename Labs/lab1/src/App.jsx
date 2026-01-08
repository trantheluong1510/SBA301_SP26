import Footer from './component/footer'
import './App.css'
import Header from './component/header';
import dataOfOrchid from './data/ListOfOrchid';
import ListOrchid from './component/ListOrchid';

function App() {

  return (
    <div>
      <Header></Header>
      <h2>Welcome to my store</h2>
      <ListOrchid orchids={dataOfOrchid}></ListOrchid>
      <Footer avatar="/images/a.jpg" name="Tran The Luong" email="luongttde180077@fpt.edu.vn"></Footer>
    </div>
  );
}

export default App
