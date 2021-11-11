import { useQuery } from "react-query";
import ColorChip from "./ColorChip";
import ComplementaryColors from "./ComplementaryColors";
import { useColorSubscription } from "./hooks/useColorSubscription";
import HexInput from "./HexInput";

function App() {
  const { data } = useQuery("colors", () => [], {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchIntervalInBackground: false,
  });

  const { isSubscribing, isSubscribingSuccess } = useColorSubscription();

  return (
    <div>
      <div className="py-6">
        <h1 className="text-4xl text-gray-100">Add a Hex Color!</h1>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <HexInput />
        {isSubscribing && <p className="text-2xl text-gray-200">Loading...</p>}
        {isSubscribingSuccess &&
          data.map(({ color, complementary_colors }, key) => {
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
    </div>
  );
}

export default App;
