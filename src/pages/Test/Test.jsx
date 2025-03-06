import testStore from "@/store/testStore";

import $ from "./Test.module.scss";

function Test() {
  const { count, increment, decrement } = testStore();
  return (
    <main className={$.wrap}>
      <h1>Test</h1>

      <ul>
        <li className='title'>타이틀</li>
        <li className='subtitle'>타이틀</li>
        <li className='body'>타이틀</li>
        <li className='caption'>타이틀</li>
      </ul>

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

      <ul className={$.colors}>
        <li>red</li>
        <li>orange</li>
        <li>yellow</li>
        <li>green</li>
        <li>mint</li>
        <li>teal</li>
        <li>cyan</li>
        <li>blue</li>
        <li>indigo</li>
        <li>purple</li>
        <li>pink</li>
        <li>brown</li>
      </ul>
    </main>
  );
}

export default Test;
