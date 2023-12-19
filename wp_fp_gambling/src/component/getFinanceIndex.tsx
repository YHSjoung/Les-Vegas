"use client";
// 只是用來測試可否拿到台灣證券交易所的資料而已
const GetFinanceIndex = async () => {
    const handleClick = async () => {
        const response = await fetch('/api/finance',{
            method: "GET",
        });
        const data = await response.json();
        console.log(data);
      };
    return (
            <button onClick={handleClick}>
                Click
            </button>
    )
}

export default GetFinanceIndex;