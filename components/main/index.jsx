import { useRef, useEffect } from "react";
import { useRouter } from "next/router";

import Container from "react-bootstrap/Container";

function Main() {
  const inputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const getId = (event) => {
    event.preventDefault();
    if (!inputRef.current.value) return;

    const input = inputRef.current.value;
    const regexed = input.match(/([a-z\d]{4}-?[a-z\d]{4}-?[a-z\d]{4})/);

    if (regexed) {
      const id = regexed[0].replace(/-/g, "").match(/.{4}/g).join("-");
      router.push(`/go/${id}`);
    }

    inputRef.current.value = "";
  };

  return (
    <Container className="flex flex-grow">
      <div className="flex flex-grow flex-col items-center justify-center">
        <h1 className="text-4xl text-gray-300">SHOTLY</h1>
        <p className="text-xl text-gray-300">URL Shortener</p>
        <p className="text-xl text-gray-100">&darr; code here &darr;</p>
        <form>
          <input
            className="flex ml-2 items-center bg-transparent outline-none text-gray-300 placeholder-gray-400 flex-shrink text-center"
            type="text"
            ref={inputRef}
            placeholder="abcd-efgh-ijkl"
          />
          <button hidden type="submit" onClick={getId}>
            Submit
          </button>
        </form>
      </div>
    </Container>
  );
}

export default Main;
