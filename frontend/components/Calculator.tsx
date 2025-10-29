"use client";
import { log } from "console";
import React, { useEffect, useState } from "react";

const Calculator = () => {
  const numArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const operators = ["+", "-", "*", "/"];

  const [expression, setExpression] = useState("");
  const [result, setResult] = useState<string | null>(null);

  function addNum(num: string | number) {
    setExpression((prev) => prev + num);
  }

  function addOp(op: string) {
    setExpression((prev) => prev + op);
  }

  function deleteFromEnd() {
    setExpression((prev) => prev.slice(0, -1));
  }

  function clearExpr() {
    setExpression("");
  }

  const handleCalc = async () => {
    const res = await fetch("http://localhost:8000/calculate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ expr: expression }),
    });

    const data = await res.json();
    setResult(data.result ?? data.error);
  };

  useEffect(() => {
    const splittedExpr = expression.split("");
    const lastChar = splittedExpr[splittedExpr.length - 1];
    if (operators.includes(lastChar)) {
      console.log("Delete The Operator or add a Number");
    } else if (splittedExpr[0] === "0") {
      console.log("First Char Cant Be 0(Zero)");
    } else {
      handleCalc();
    }
  }, [expression]);

  return (
    <div className="px-10">
      <div className="">
        <input
          type="text"
          readOnly
          value={expression}
          placeholder="type your expression..."
          className="w-full px-4 py-6"
        />
        {/* <button
          onClick={handleCalc}
          className="px-7 py-4 text-white font-bold bg-rose-500"
        >
          Calculate
        </button> */}
        <h2 className="font-bold py-2 uppercase">
          {result && <p>Result: {result}</p>}
        </h2>
      </div>
      <div>
        <ul className="numbersUl flex flex-wrap gap-2">
          {numArr.map((num, idx) => (
            <button onClick={() => addNum(num)} className="numBtn" key={idx}>
              {num}
            </button>
          ))}
        </ul>
        <ul className="flex flex-wrap gap-2 mt-5">
          {operators.map((op, idx) => (
            <button onClick={() => addOp(op)} className="opBtn" key={idx}>
              {op}
            </button>
          ))}
        </ul>
        <button
          onClick={deleteFromEnd}
          className="my-4 px-10 py-7 rounded-2xl bg-red-600"
        >
          Delete Backwards
        </button>
        <button
          onClick={clearExpr}
          className="mx-10 px-10 py-7 rounded-2xl bg-amber-600"
        >
          Clear Expression
        </button>
      </div>
    </div>
  );
};

export default Calculator;
