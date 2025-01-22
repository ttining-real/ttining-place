import testStore from "@/store/testStore";

import $ from "./Test.module.scss";

function Test() {
  const { count, increment, decrement } = testStore();
  return (
    <main className={$.wrap}>
      <h1>Test</h1>

      <h3>{count}</h3>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>

      <ul className={$.gray}>
        <li>gray-10</li>
        <li>gray-20</li>
        <li>gray-30</li>
        <li>gray-40</li>
        <li>gray-50</li>
        <li>gray-60</li>
      </ul>
    </main>
  );
}

export default Test;
