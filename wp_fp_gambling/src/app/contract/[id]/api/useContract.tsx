"use client";
import React, { useState, useEffect, createContext } from 'react';
import { outcomeEnum, typeEnum } from '@/db/schema';

type ContractTable = {
  id: string;
  type: string;
  title: string;
  description: string;
  optionA: string;
  optionB: string;
  optionC: string;
  totalDollar: number;
  optionADollar: number;
  optionBDollar: number;
  optionCDollar: number;
  attendees: number;
  blockDate: string;
  updateDate: string;
  outcome: typeof outcomeEnum;
};

export type ContractContext = {
  contractId: string | null;
  setContractId: (contractId: string | null) => void;
  contractType: typeof typeEnum | null;
  setContractType: (contractType: typeof typeEnum | null) => void;
  contracts: ContractTable[] | null;
  setContracts: (contracts: ContractTable[] | null) => void;
  contract: ContractTable | null;
  setContract: (contract: ContractTable | null) => void;
  // fetchContract: (id: string) => Promise<void | null>; // Update the return type here
  // fetchContractsByType: (type: string) => Promise<ContractTable[] | null>;
};

export const ContractContext = createContext<ContractContext>({
  contractId: null,
  setContractId: () => {},
  contractType: null,
  setContractType: () => {},
  contracts: null,
  setContracts: () => {},
  contract: null,
  setContract: () => {},
  // fetchContract: async () => {},
  // fetchContractsByType: () => Promise.resolve(null),
});

type ContractProviderProps = {
  children: React.ReactNode;
};

export function ContractProvider({ children }: ContractProviderProps) {
  const [contractId, setContractId] = useState<string | null>(null); // Update the type here
  const [contractType, setContractType] = useState<typeof typeEnum | null>(null); // Update the type here
  const [contracts, setContracts] = useState<ContractTable[] | null>(null);
  const [contract, setContract] = useState<ContractTable | null>(null);


  useEffect(() => {
    if (!contractId) {
      return;
    }
    fetchContract(contractId);
    console.log('Contract ID:', contractId);
  }, [contractId]);
  
  useEffect(() => {
    if (!contractType) {
      return;
    }
    fetchContractsByType(contractType as typeof typeEnum);
    console.log('Contract Type:', contractType);
  }, [contractType]);

  const fetchContract = async (id: string): Promise<void | null> => { // Update the return type here
    if (!id) {
      return null;
    }
    console.log('Fetching contract:', id);
    try {
      const res = await fetch(`/api/contract/?contractId=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          },
          });
      const data = await res.json();
      console.log('Contract:', data.data[0]);
      setContract(data.data[0]);
    } catch (error) {
      console.error('Error fetching contract:', error);
    }
  };
  
  const fetchContractsByType = async (type: typeof typeEnum) => {
    if (!type) {
      return;
    }
    try {
      const res = await fetch(`/api/contractsByType/?type=${type}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          },
          });
      const data = await res.json();
      console.log('Contracts:', data.data);
      return data.data;
    } catch (error) {
      console.error('Error fetching contracts:', error);
      return;
    }
  }
  
  return (
    <ContractContext.Provider value={{ contractId, setContractId, contracts, setContracts, contract, setContract, contractType, setContractType, }}>
      {children}
    </ContractContext.Provider>
  );
}