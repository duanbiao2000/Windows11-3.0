import React, { useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserProfile } from "./UserProfile";

const initialState = {
  name: "",
  password: "",
  error: "",
  loading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    default:
      throw new Error();
  }
}

function Login({ toggleLogin }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("name", state.name);
  }, [state.name]);

  async function login(e) {
    e.preventDefault();
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      // 模拟登录请求
      await new Promise((resolve) => setTimeout(resolve, 3000));
      navigate(`/${state.name}`);
    } catch (err) {
      console.error(err);
      dispatch({ type: "SET_ERROR", payload: "Failed to log in. Please try again later." });
      setTimeout(() => {
        dispatch({ type: "SET_ERROR", payload: "" });
      }, 2000);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }

  return (
    <>
      {state.loading && (
        <div className="fixed inset-0 flex items-center justify-center z-50 top-36">
          <div className="inline-block animate-spin rounded-full border-4 border-solid border-current border-e-transparent h-8 w-8">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
      {!state.loading && state.error && (
        <div
          role="alert"
          className="absolute top-0 left-0 w-full bg-red-500 text-white text-center py-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="inline-block mr-2 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <div>{state.error}</div>
        </div>
      )}
      <form onSubmit={login}>
        <div className="relative left-0 top-72 h-screen w-full flex flex-col items-center z-10">
          <div className="aspect-square w-32 h-36">
            <UserProfile name={state.name} />
          </div>
          <input
            className="my-5 text-3xl text-white bg-transparent text-center outline-none"
            type="name"
            value={state.name}
            onChange={(e) => dispatch({ type: "SET_NAME", payload: e.target.value })}
            placeholder="Enter your name"
            style={{ caretColor: "transparent" }}
            required
          />

          {!state.loading && (
            <>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className="input bg-opacity-30 w-full max-w-xs focus:outline-none border-[0.5px] border-b-white mt-4 placeholder-white opacity-100::placeholder"
                onChange={(e) => dispatch({ type: "SET_PASSWORD", payload: e.target.value })}
                value={state.password}
                required
                autoComplete="current-password"
              />
              <div
                className="text-white mt-3 text-sm btn btn-ghost hover:text-black tooltip tooltip-bottom flex w-auto"
                onClick={toggleLogin}
                data-tip="You can log in by typing anything into the input fields and pressing enter—no credentials needed!"
              >
                I forgot my PIN
              </div>
            </>
          )}

          <button
            type="submit"
            className="hidden btn bg-blue-500 text-white mt-4 px-4 py-2 rounded-md"
          >
            Login
          </button>
        </div>
      </form>
      <div className="absolute flex gap-9 text-white bottom-5 right-12 select-none">
        <span className="material-symbols-outlined text-3xl">wifi</span>
        <span className="material-symbols-outlined text-3xl">
          accessibility
        </span>
        <span className="material-symbols-outlined text-3xl">
          power_settings_new
        </span>
      </div>
    </>
  );
}

export default Login;