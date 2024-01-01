"use client";
import React, { useState, useEffect, createContext, useContext } from 'react';
import { outcomeEnum } from '@/db/schema';
import { UserContext } from './useUser';

export type ContractTable = {
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

export type BetTable = {
  id: string;
  contractId: string;
  userId: string;
  option: string;
  dollar: number;
};

export type ContractContext = {
  contractId: string | null;
  setContractId: (contractId: string | null) => void;
  contractType: string | null;
  setContractType: (contractType: string | null) => void;
  contractsOfTheSameType: ContractTable[] | null;
  contract: ContractTable | null;
  setContract: (contract: ContractTable | null) => void;
  bet: BetTable | null;
  setBet: (bet: BetTable | null) => void;
  fetchBet: (userId: string, contractId: string) => Promise<BetTable | undefined>;
};

export const ContractContext = createContext<ContractContext>({
  contractId: null,
  setContractId: () => {},
  contractType: null,
  setContractType: () => {},
  contractsOfTheSameType: null,
  bet: null,
  setBet: () => {},
  contract: null,
  setContract: () => {},
  fetchBet: () => Promise.resolve(undefined),
});

type ContractProviderProps = {
  children: React.ReactNode;
};

export function ContractProvider({ children }: ContractProviderProps) {
  const [contractId, setContractId] = useState<string | null>(null); // Update the type here
  const [contractType, setContractType] = useState<string | null>(null); // Update the type here
  const [contractsOfTheSameType, setContractsOfTheSameType] = useState<ContractTable[] | null>(null);
  const [contract, setContract] = useState<ContractTable | null>(null);
  const [bet, setBet] = useState<BetTable | null>(null);
  const { userId } = useContext(UserContext);

  useEffect(() => {
    if (!contractType) {
      return;
    }
    fetchContractsByType(contractType);
    console.log('Contract Type:', contractType);
  }, [contractType]);

  useEffect(() => {
    if (!contractId) {
      return;
    }
    fetchContract(contractId);
    console.log('Contract Id:', contractId);
    fetchBet(userId!, contractId);
  }, [contractId]);


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
  
  const fetchContractsByType = async (type: string) => {
    if (!type) {
      return;
    }
    try {
      console.log('Fetching contracts:', type);
      const res = await fetch(`/api/contract/?type=${type}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          },
          });
      const data = await res.json();
      console.log('Contracts:', data.data);
      setContractsOfTheSameType(data.data);
      return data.data;
    } catch (error) {
      console.error('Error fetching contracts:', error);
      return;
    }
  }


  const fetchBet = async (userId: string, contractId: string) => {
    if (!userId) {
      return;
    }
    try {
      console.log('Fetching bet:', userId);
      const res = await fetch(`/api/bet/?userId=${userId}&forWhat=user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          },
          });
      const data = await res.json();
      const betData = data.data.filter((bet: any) => bet.contractId === contractId)[0];
      console.log('Bet:', betData);
      setBet(betData);
      return betData;
    } catch (error) {
      console.error('Error fetching bet:', error);
      return;
    }
  }
  
  return (
    <ContractContext.Provider value={{ contractId, setContractId, contractsOfTheSameType, contract, setContract, contractType, setContractType, bet, setBet, fetchBet }}>
      {children}
    </ContractContext.Provider>
  );
}