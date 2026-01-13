import ListOrchid from "../components/ListOrchid";
import dataOfOrchid from "../data/ListOfOrchid";

function Home({ searchText }) {
  return (
    <>
      <h2 className="text-center mt-3">Welcome to my store</h2>
      <ListOrchid orchids={dataOfOrchid} searchText={searchText} />
    </>
  );
}

export default Home;
