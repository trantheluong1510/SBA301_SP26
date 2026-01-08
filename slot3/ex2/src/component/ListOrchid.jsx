import Orchid from "./Orchid";

function ListOrchid({ orchids }) {
  return (
    <div className="container mt-4">
      <div className="row">
        {orchids.map((orchid) => (
          <div key={orchid.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <Orchid orchid={orchid} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListOrchid;
