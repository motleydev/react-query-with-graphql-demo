import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";

const url = "ws://intent-shad-91.hasura.app/v1/graphql";

export const useColorSubscription = () => {
  const queryClient = useQueryClient();
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isSubscribingSuccess, setIsSubscribingSuccess] = useState(false);

  useEffect(() => {
    const ws = new WebSocket(url, "graphql-ws");
    setIsSubscribing(true);

    ws.onopen = () => {
      ws.send(JSON.stringify({ type: "connection_init", payload: {} }));
      ws.send(
        JSON.stringify({
          id: "1",
          type: "start",
          payload: {
            // variables: {},
            extensions: {},
            operationName: "GetColors",
            query: `subscription GetColors {
                color {
                  color
                  complementary_colors {
                    color
                  }
                }
              }`,
          },
        })
      );
    };

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);

      if (msg.type === "data") {
        setIsSubscribingSuccess(true);
        setIsSubscribing(false);
        const data = msg.payload.data.color;
        queryClient.setQueriesData("colors", data);
      }
    };

    return () => {
      ws.send(JSON.stringify({ id: "1", type: "stop" }));
      ws.close();
    };
  }, [queryClient]);
  return { isSubscribing, isSubscribingSuccess };
};
