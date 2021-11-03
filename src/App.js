import { useQuery } from "react-query";
import "./App.css";

function App() {
  const { isSuccess, data } = useQuery("data", () =>
    fetch("https://intent-shad-91.hasura.app/v1/graphql", {
      method: "POST",
      body: JSON.stringify({
        query: `
      {
        color {
          color
          complementary_colors {
            color
          }
        }
      }
      `,
      }),
    })
      .then((res) => res.json())
      .then((res) => res.data)
  );

  console.log(data);

  return (
    <div className="App">
      {isSuccess && (
        <div>
          {data.color.map((color, key) => {
            return (
              <div
                style={{
                  width: 100,
                  height: 150,
                  backgroundColor: color.color,
                }}
                key={key}
              >
                {color.color}
                <div style={{ display: "flex" }}>
                  {color.complementary_colors.map((color, key) => {
                    return (
                      <div
                        key={key}
                        style={{
                          width: 33,
                          height: 50,
                          backgroundColor: color.color,
                        }}
                      >
                        {color.color}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
