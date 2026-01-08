import Footer from './component/footer'
import './App.css'
import Header from './component/header';
import Orchid from './component/Orchid';

function App() {

  const orchid = {
    id: "1",
    orchidName: "Ceasar 4N",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porta lobortis ex. Morbi cursus consectetur diam, non lobortis massa gravida eu. Duis molestie purus vel ligula suscipit, sit amet iaculis justo tempus. Cras pellentesque urna in feugiat fringilla.",
    price: "20$",
    category: "Dendrobium",
    isSpecial: true,
    image: "images/4n.jpg",
  };

  return (
    <div>
      <Header></Header>
      <h2>Welcome to my store</h2>
      <Orchid orchid={orchid}></Orchid>
      <Footer avatar="/images/a.jpg" name="Tran The Luong" email="luongttde180077@fpt.edu.vn"></Footer>
    </div>
  );
}

export default App
