import { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import dataOfOrchid from "./data/ListOfOrchid";
import ListOrchid from "./components/ListOrchid";

function App() {
  const [searchText, setSearchText] = useState("");

  return (
    <div>
      <Header onSearch={setSearchText} />

      <h2 className="text-center mt-3">Welcome to my store</h2>

      <ListOrchid
        orchids={dataOfOrchid}
        searchText={searchText}
      />

      <Footer
        avatar="/images/a.jpg"
        name="Tran The Luong"
        email="luongttde180077@fpt.edu.vn"
      />
    </div>
  );
}

export default App;
