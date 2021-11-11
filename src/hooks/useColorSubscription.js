import {
  NewProductsDocument,
  Product,
  ProductsQuery,
} from "../../generated/graphql";
import { useEffect } from "react";
import { useQueryClient } from "react-query";

const url = "ws://intent-shad-91.hasura.app/v1/graphql";

export const useNewProductsSubscription = ({ welderId }) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const ws = new WebSocket(url, "graphql-ws");

    ws.onopen = () => {
      ws.send(JSON.stringify({ type: "connection_init", payload: {} }));
      ws.send(
        JSON.stringify({
          id: "1",
          type: "start",
          payload: {
            variables: { welderId: welderId },
            extensions: {},
            operationName: "NewProducts",
            query: NewProductsDocument,
          },
        })
      );
    };

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);

      if (msg.type == "data") {
        const data = msg.payload.data.productAdded;
        queryClient.setQueriesData <
          ProductsQuery >
          ("Products",
          (oldData: ProductsQuery) => {
            return {
              ...oldData,
              getLastProducts: [...oldData.getLastProducts, data],
            };
          });
      }
    };

    return () => {
      // Unsubscribe before exit
      ws.send(JSON.stringify({ id: "1", type: "stop" }));
      ws.close();
    };
  }, []);
};
