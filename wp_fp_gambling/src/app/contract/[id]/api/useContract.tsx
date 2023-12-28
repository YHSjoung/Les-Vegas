import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface ContractTable {
  id: string;
  title: string;
  description: string;
  optionA: string;
  optionB: string;
  optionC: string;
  totalDollar: number;
  attendees: number;
  blockDate: string;
}

interface ContractDetailServerProps {
  Id: string;
}

const ContractDetailServer: React.FC<ContractDetailServerProps> = ({ Id }) => {
  const [contract, setContract] = useState<ContractTable | null>(null);
  const params = useParams();
  let contractId = params.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams({
          contractId: contractId,
        });

        const url = `/api/contract?${queryParams.toString()}`;


        const response = await fetch(url);
        const data = await response.json();

        setContract(() => {
          console.log('Contract:', data.data[0]);
          return data.data[0];
        });
      } catch (error) {
        console.error('Error fetching contract details:', error);
      }
    };

    fetchData();
  }, [contractId]);

  return contract;
};

export { ContractDetailServer as default };
