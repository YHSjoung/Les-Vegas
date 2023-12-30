"use client";
// 只是用來測試 api 而已
const TestAPI = () => {
  const handleClick = async () => {
    const response = await fetch("/api/crons", {
      method: "GET",
    });
  };
  return <button onClick={handleClick}>Click</button>;
};

export default TestAPI;
