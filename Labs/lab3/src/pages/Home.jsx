import { useEffect, useState } from "react";
import axios from "axios";
import ListOrchid from "../components/ListOrchid";

function Home({ searchText }) {
  const [orchids, setOrchids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrchids = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get("http://localhost:8080/orchids");
        setOrchids(Array.isArray(res.data) ? res.data : []);
      } catch (e) {
        setError("Failed to load orchids");
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchOrchids();
  }, []);

  return (
    <>
      <h2 className="text-center mt-3">Welcome to my store</h2>

      {error && (
        <div className="text-center text-danger mt-2">{error}</div>
      )}

      {loading ? (
        <div className="text-center mt-4">Loading...</div>
      ) : (
        <ListOrchid orchids={orchids} searchText={searchText} />
      )}
    </>
  );
}

export default Home;