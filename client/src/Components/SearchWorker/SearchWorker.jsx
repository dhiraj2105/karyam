import React, { useEffect, useState } from "react";
import "./SearchWorker.css";
import WorkerCard from "../WorkerCard/WorkerCard";

const SearchWorker = ({ addToCart }) => {
  // test
  const [selectedSkill, setSelectedSkill] = useState("");
  const [workerList, setWorkerList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // fetch worker listing based on selected skill
    const fetchWorker = async () => {
      setLoading(true);
      try {
        let endpoint = "/workers";

        if (selectedSkill) {
          endpoint += `?skills=${selectedSkill}`;
        } else if (searchQuery) {
          endpoint += `?search=${searchQuery}`;
        }

        const response = await fetch(endpoint);
        const data = await response.json();

        setWorkerList(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching workers:", error);
        setLoading(false);
      }
    };

    fetchWorker();
  }, [selectedSkill]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setSelectedSkill(""); // Reset selected skill when searching
  };

  const handleSkillChange = (skill) => {
    setSelectedSkill(skill);
    setSearchQuery(""); // Reset search query when selecting skill
  };

  return (
    <div className="searchWorker">
      <div className="searchbar">
        <div className="rightSide">
          <span>Home Services </span>
          <span>at your place</span>
        </div>
        <div className="leftSide">
          {/* <div className="search-bar">
          <input
            type="text"
            placeholder="Search for a job..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div> */}
          <span>Search Funtionality Coming Soon</span>
        </div>
      </div>
      <div className="jobs ">
        <span>Popular job skills</span>
        <div className="skill-list ">
          <div className="skills">
            <button
              className="button"
              onClick={() => handleSkillChange("plumber")}
            >
              Plumber
            </button>
            <button
              className="button"
              onClick={() => handleSkillChange("cooking")}
            >
              Cooking
            </button>
            <button
              className="button"
              onClick={() => handleSkillChange("hvac")}
            >
              HVAC
            </button>
            <button
              className="button"
              onClick={() => handleSkillChange("cleaning")}
            >
              Cleaning
            </button>
            <button
              className="button"
              onClick={() => handleSkillChange("carpenter")}
            >
              Carpenter
            </button>
            <button
              className="button"
              onClick={() => handleSkillChange("welder")}
            >
              Welder
            </button>
            <button
              className="button"
              onClick={() => handleSkillChange("painter")}
            >
              Painter
            </button>
          </div>
          <div className="skills">
            <button
              className="button"
              onClick={() => handleSkillChange("electrician")}
            >
              Electrician
            </button>
            <button
              className="button"
              onClick={() => handleSkillChange("pest")}
            >
              Pest Control
            </button>
            <button className="button" onClick={() => handleSkillChange("ac")}>
              AC
            </button>
            <button
              className="button"
              onClick={() => handleSkillChange("mechanic")}
            >
              Mechanic
            </button>
            <button
              className="button"
              onClick={() => handleSkillChange("men-saloon")}
            >
              Men's Saloon
            </button>
            <button
              className="button"
              onClick={() => handleSkillChange("women-saloon")}
            >
              Women's Saloon
            </button>
          </div>
        </div>
      </div>

      {/* show workers */}
      <div className="worker-listing ">
        <h2>Available {selectedSkill} Workers</h2>
        {loading ? (
          <p>loading</p>
        ) : (
          <>
            {workerList.length > 0 ? (
              <ul className="card-container">
                {workerList.map((worker) => (
                  <li key={worker._id} className="card">
                    <WorkerCard
                      key={worker._id}
                      worker={worker}
                      addToCart={addToCart}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <p>No worker found</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchWorker;
