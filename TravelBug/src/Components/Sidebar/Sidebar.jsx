import "./Sidebar.css";

const Sidebar = () => {
  return (
    <>
      <div className="scroller">
        <div className="components">
          <div className="component-child">
            <i class="fas fa-home"></i>

            <h3 className="component-content">Home</h3>
          </div>

          <div className="component-child">
            <i class="fas fa-play"></i>

            <h3 className="component-content">Playlist</h3>
          </div>

          <div className="component-child">
            <i class="fas fa-heart"></i>

            <h3 className="component-content">Liked</h3>
          </div>
          <div className="component-child">
            <i class="fas fa-history"></i>

            <h3 className="component-content">History</h3>
          </div>
          <div className="component-child">
            <i class="fas fa-clock"></i>

            <h3 className="component-content">Watch Later</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export { Sidebar };
