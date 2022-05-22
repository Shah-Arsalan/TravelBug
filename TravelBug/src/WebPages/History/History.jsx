import { Sidebar, VerticalCard } from "../../Components";
import { useData } from "../../Contexts/Datacontext";
import "./History.css";

const History = () => {
  const { state } = useData();
  const { history } = state;
  return (
    <>
      <div className="product-listing-body">
        <div class="filter-and-category megaContainer">
          <Sidebar />
        </div>
        <div className="liked-vid-container">
          {history.map((ele) => {
            return <VerticalCard key={ele._id} vid={ele} text={"history"} />;
          })}
        </div>
      </div>
    </>
  );
};

export { History };
