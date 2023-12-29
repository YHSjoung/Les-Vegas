const bet = async (contractId: string, selectedOption: string, betAmount: number)  => {
  try {
    // console.log('Selected Option:', selectedOption);
    // console.log('ontractId:', contractId);
    console.log('betAmount:', betAmount);

    const response = await fetch('/api/saveAnswer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contractId,
        selectedOption,
        betAmount
      }),
    });

    const data = await response.json();


    console.log('Answer saved:', data);
  } catch (error) {
    console.error('Error saving answer:', error);
  }
};

export default bet;
