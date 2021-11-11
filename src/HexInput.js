import React from "react";
import { useMutation, useQueryClient } from "react-query";
import ColorChip from "./ColorChip";
import lightOrDark from "./utils/lightOrdark";

const VALIDATION_ERROR = {
  WRONG_LENGTH: "Invalid length. HEX must be in format #000000",
  WRONG_FORMAT: "Invalid format. HEX must start with '#'",
  INVALID_COLOR: "Invalid color. Color does not exist.",
};

const STATES = {
  EDIT_MODE: "edit-mode",
  STATIC_MODE: "static-mode",
};

const hexReg = /^[0-9a-fA-F]+$/;

export default function HextInput() {
  const [hex, setHex] = React.useState("");
  const [mode, setMode] = React.useState(STATES.STATIC_MODE);
  const [error, setError] = React.useState("");
  const [brightness, setBrightness] = React.useState("");

  const queryClient = useQueryClient();
  const { isLoading, isError, isSuccess, data, mutate } = useMutation(
    (hex) =>
      fetch("https://intent-shad-91.hasura.app/v1/graphql", {
        method: "POST",
        body: JSON.stringify({
          query: `
        mutation InsertColorOne( $hex: String ){
          insert_color_one(object: {color: $hex}) {
            color
            complementary_colors {
               color
            }
          }
        }
      `,
          variables: {
            hex,
          },
        }),
      })
        .then((res) => res.json())
        .then((res) => res.data),
    {
      onSuccess: (data) => {
        queryClient.setQueryData(["data"], (oldData) => {
          return { color: [...oldData.color, data.insert_color_one] };
        });
      },
    }
  );

  const inputEl = React.useRef(null);

  React.useEffect(() => {
    if (mode === STATES.EDIT_MODE && !isLoading) {
      inputEl.current.focus();
    }
    setBrightness(lightOrDark(hex));
  }, [inputEl, mode, hex, setBrightness, isLoading]);

  React.useEffect(() => {
    if (isSuccess) {
      setMode(STATES.STATIC_MODE);
      setHex("");
      setBrightness("");
    }
  }, [isSuccess]);

  const update = (e) => {
    e.preventDefault();
    setError("");
    setHex(e.target.value);
  };
  const addColor = () => {
    setMode(STATES.EDIT_MODE);
  };

  const validate = () => {
    if (hex.length === 0) {
      setMode(STATES.STATIC_MODE);
      return;
    }
    if (hex.length !== 7) {
      setError(VALIDATION_ERROR.WRONG_LENGTH);
      setMode(STATES.EDIT_MODE);
      inputEl.current.focus();
      return;
    }
    if (hex[0] !== "#") {
      setError(VALIDATION_ERROR.WRONG_FORMAT);
      setMode(STATES.EDIT_MODE);
      inputEl.current.focus();
      return;
    }

    if (!hexReg.test(hex.slice(1, -1))) {
      setError(VALIDATION_ERROR.INVALID_COLOR);
      setMode(STATES.EDIT_MODE);
      inputEl.current.focus();
      return;
    }

    setMode(STATES.STATIC_MODE);
    return;
  };

  return (
    <div
      className="w-full h-64 rounded-sm flex flex-wrap space-between"
      style={{
        backgroundColor: hex || "rgba(0,0,0,0.20)",
        color: brightness === "light" ? "black" : "white",
      }}
      onClick={addColor}
    >
      {/* Empty State */}
      {!isLoading && !hex.length > 0 && mode === STATES.STATIC_MODE && (
        <div className="flex items-center w-full justify-center flex-wrap p-4">
          <p className="text-5xl font-bold text-inherit">+</p>
        </div>
      )}
      {/* Valid Hex */}
      {hex.length > 0 && mode === STATES.STATIC_MODE && (
        <>
          <ColorChip color={hex} />
          <div className="text-center w-full">
            {!isLoading && (
              <button
                className="rounded bg-gray-900 h-12 align-center text-gray-200 px-10"
                onClick={() => {
                  mutate(hex);
                }}
              >
                Submit
              </button>
            )}
            {isLoading && <p>...</p>}
          </div>
        </>
      )}
      {/* Edit Mode */}
      {!isLoading && mode === STATES.EDIT_MODE && (
        <div className="flex items-center w-full justify-center flex-wrap p-4">
          <input
            ref={inputEl}
            className="appearance-none border-b-2 border-gray-200 py-3 px-4 mb-3 leading-tight focus:outline-none w-full font-bold text-center focus:bg-gray-900 text-inherit"
            style={{ backgroundColor: hex || "rgba(0,0,0,0.20)" }}
            type="text"
            value={hex}
            onChange={update}
            onBlur={validate}
          />
          {hex.length !== 0 && error.length !== 0 && (
            <div className="rounded bg-gray-800 text-white p-4">
              <p>{error}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
