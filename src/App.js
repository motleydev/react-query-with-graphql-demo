import { useQuery } from "react-query";
import ColorChip from "./ColorChip";
import ComplementaryColors from "./ComplementaryColors";
import HexInput from "./HexInput";

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

  return (
    <div>
      <div className="py-6">
        <h1 className="text-4xl text-gray-100">Add a Hex Color!</h1>
      </div>
      {isSuccess && (
        <div className="grid grid-cols-4 gap-4">
          <HexInput />
          {data.color.map(({ color, complementary_colors }, key) => {
            return (
              <div
                className="w-full h-64 rounded-sm flex flex-wrap space-between"
                key={key}
                style={{ backgroundColor: color }}
              >
                <ColorChip color={color} />
                {complementary_colors && (
                  <ComplementaryColors colors={complementary_colors} />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
