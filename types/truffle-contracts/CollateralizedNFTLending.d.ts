/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface CollateralizedNFTLendingContract
  extends Truffle.Contract<CollateralizedNFTLendingInstance> {
  "new"(
    _token: string,
    _nftToken: string,
    meta?: Truffle.TransactionDetails
  ): Promise<CollateralizedNFTLendingInstance>;
}

export interface LoanCreated {
  name: "LoanCreated";
  args: {
    loanId: BN;
    borrower: string;
    nftId: BN;
    loanAmount: BN;
    0: BN;
    1: string;
    2: BN;
    3: BN;
  };
}

export interface LoanRepaid {
  name: "LoanRepaid";
  args: {
    loanId: BN;
    borrower: string;
    loanAmount: BN;
    0: BN;
    1: string;
    2: BN;
  };
}

export interface OwnershipTransferred {
  name: "OwnershipTransferred";
  args: {
    previousOwner: string;
    newOwner: string;
    0: string;
    1: string;
  };
}

type AllEvents = LoanCreated | LoanRepaid | OwnershipTransferred;

export interface CollateralizedNFTLendingInstance
  extends Truffle.ContractInstance {
  loans(
    arg0: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<{ 0: string; 1: BN; 2: BN; 3: BN; 4: BN }>;

  nftToken(txDetails?: Truffle.TransactionDetails): Promise<string>;

  /**
   * Returns the address of the current owner.
   */
  owner(txDetails?: Truffle.TransactionDetails): Promise<string>;

  /**
   * Leaves the contract without owner. It will not be possible to call `onlyOwner` functions. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby disabling any functionality that is only available to the owner.
   */
  renounceOwnership: {
    (txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(txDetails?: Truffle.TransactionDetails): Promise<void>;
    sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
    estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
  };

  token(txDetails?: Truffle.TransactionDetails): Promise<string>;

  /**
   * Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.
   */
  transferOwnership: {
    (newOwner: string, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(
      newOwner: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      newOwner: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      newOwner: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  createLoan: {
    (
      _nftId: number | BN | string,
      _loanAmount: number | BN | string,
      _duration: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _nftId: number | BN | string,
      _loanAmount: number | BN | string,
      _duration: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _nftId: number | BN | string,
      _loanAmount: number | BN | string,
      _duration: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _nftId: number | BN | string,
      _loanAmount: number | BN | string,
      _duration: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  repayLoan: {
    (
      _loanId: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _loanId: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _loanId: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _loanId: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  getLoanCount(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  methods: {
    loans(
      arg0: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<{ 0: string; 1: BN; 2: BN; 3: BN; 4: BN }>;

    nftToken(txDetails?: Truffle.TransactionDetails): Promise<string>;

    /**
     * Returns the address of the current owner.
     */
    owner(txDetails?: Truffle.TransactionDetails): Promise<string>;

    /**
     * Leaves the contract without owner. It will not be possible to call `onlyOwner` functions. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby disabling any functionality that is only available to the owner.
     */
    renounceOwnership: {
      (txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(txDetails?: Truffle.TransactionDetails): Promise<void>;
      sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
      estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
    };

    token(txDetails?: Truffle.TransactionDetails): Promise<string>;

    /**
     * Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.
     */
    transferOwnership: {
      (newOwner: string, txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(
        newOwner: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        newOwner: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        newOwner: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    createLoan: {
      (
        _nftId: number | BN | string,
        _loanAmount: number | BN | string,
        _duration: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _nftId: number | BN | string,
        _loanAmount: number | BN | string,
        _duration: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _nftId: number | BN | string,
        _loanAmount: number | BN | string,
        _duration: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _nftId: number | BN | string,
        _loanAmount: number | BN | string,
        _duration: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    repayLoan: {
      (
        _loanId: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _loanId: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _loanId: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _loanId: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    getLoanCount(txDetails?: Truffle.TransactionDetails): Promise<BN>;
  };

  getPastEvents(event: string): Promise<EventData[]>;
  getPastEvents(
    event: string,
    options: PastEventOptions,
    callback: (error: Error, event: EventData) => void
  ): Promise<EventData[]>;
  getPastEvents(event: string, options: PastEventOptions): Promise<EventData[]>;
  getPastEvents(
    event: string,
    callback: (error: Error, event: EventData) => void
  ): Promise<EventData[]>;
}