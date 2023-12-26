"use client";
// 只是用來測試 api 而已
const TestAPI = async () => {
  const handleClick = async () => {
    const response = await fetch("/api/crons", {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
  };
  return <button onClick={handleClick}>Click</button>;
};

export default TestAPI;
