import { useState, useCallback, useEffect, useRef } from "react";

const App = () => {
  const [length, setlength] = useState(8);
  const [numAllowed, setnumAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [password, setpassword] = useState("");
  const passwordRef = useRef(null);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);       //This is how we do make copy button work//
  }, [password]);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "!@#$%^&*+|{}[]~'";
    }
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setpassword(pass);
  }, [length, numAllowed, charAllowed, setpassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-slate-900 to-zinc-900 flex items-center justify-center p-4">
      <div className="w-full max-w-xl rounded-2xl bg-slate-900/80 backdrop-blur border border-slate-800 shadow-2xl">
        <div className="px-6 pt-6">
          <h1 className="text-center text-2xl md:text-3xl font-semibold tracking-tight text-white">
            Password generator
          </h1>
          <p className="mt-2 text-center text-sm text-slate-400">
            Create secure passwords with custom options.
          </p>
        </div>

        <div className="px-6 mt-6">
          <div className="group flex items-stretch rounded-xl bg-slate-800/70 border border-slate-700 shadow-inner focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-slate-900 transition">
            <input
              type="text"
              value={password}
              ref={passwordRef}
              readOnly
              placeholder="Password"
              className="w-full bg-transparent px-4 py-3 text-slate-100 placeholder-slate-400 outline-none"
            />
            <button
              onClick={copyPasswordToClipboard}
              className="px-4 py-2.5 text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-500 active:bg-indigo-700 transition rounded-r-xl focus:outline-none"
            >
              Copy
            </button>
          </div>
        </div>

        <div className="px-6 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-slate-200">
            <div className="rounded-xl border border-slate-800 bg-slate-800/50 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">Length</span>
                <span className="text-base font-semibold">{length}</span>
              </div>
              <input
                type="range"
                min={6}
                max={50}
                value={length}
                className="w-full cursor-pointer accent-indigo-600"
                onChange={(e) => {
                  setlength(e.target.value);
                }}
              />
            </div>

            <label
              htmlFor="numberinput"
              className="rounded-xl border border-slate-800 bg-slate-800/50 p-4 flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <input
                  id="numberinput"
                  type="checkbox"
                  defaultChecked={numAllowed}
                  onChange={() => {
                    setnumAllowed((prev) => !prev);
                  }}
                  className="h-5 w-5 accent-indigo-600"
                />
                <span className="text-base">Include numbers</span>
              </div>
              <span className="text-xs text-slate-400">0,1,2,...9</span>
            </label>

            <label
              htmlFor="charinput"
              className="rounded-xl border border-slate-800 bg-slate-800/50 p-4 flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <input
                  id="charinput"
                  type="checkbox"
                  defaultChecked={charAllowed}
                  onChange={() => {
                    setcharAllowed((prev) => !prev);
                  }}
                  className="h-5 w-5 accent-indigo-600"
                />
                <span className="text-base">Include symbols</span>
              </div>
              <span className="text-xs text-slate-400">! @ # $ % …</span>
            </label>
          </div>
        </div>

        <div className="px-6 pb-6">
          <div className="text-center text-xs text-slate-500">
            Tip: click <span className="text-slate-300">Copy</span> to place the
            password on your clipboard.
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
