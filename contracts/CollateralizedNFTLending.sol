// SPDX-License-Identifier: MIT
// pragma solidity ^0.8.0;
pragma solidity ^0.8.8;


import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CollateralizedNFTLending is Ownable {
    IERC20 public token; // The ERC20 token contract

    struct Loan {
        address borrower;
        uint256 nftId;
        address nftAddress;
        uint256 loanAmount;
        uint256 duration; // Loan duration in seconds
        uint256 startTime; // Loan start time
    }

    Loan[] public loans;

    event LoanCreated(uint256 indexed loanId, address indexed borrower, uint256 indexed nftId, uint256 loanAmount);
    event LoanRepaid(uint256 indexed loanId, address indexed borrower, uint256 loanAmount);

    constructor(address _token) Ownable() {
        token = IERC20(_token);
    }

    function createLoan(uint256 _nftId, address _nftAddress, uint256 _loanAmount, uint256 _duration) external returns(uint256) {
        IERC721 nftToken = IERC721(_nftAddress);
        
        require(nftToken.ownerOf(_nftId) == msg.sender, "You do not own this NFT");

        require(_loanAmount > 0, "Loan amount must be greater than 0");

        
        // Transfer NFT from borrower to contract
        nftToken.transferFrom(msg.sender, address(this), _nftId);

        // Transfer loan Amount tokens from Owner to borrower
        token.transferFrom(owner(), msg.sender, _loanAmount);

        // Create a new loan
        uint256 loanId = loans.length;
        uint256 startTime = block.timestamp;
        loans.push(Loan(msg.sender, _nftId, _nftAddress, _loanAmount, _duration, startTime));

        emit LoanCreated(loanId, msg.sender, _nftId, _loanAmount);

        return loanId;
    }

    function repayLoan(uint256 _loanId) external {
        require(_loanId < loans.length, "Invalid loan ID");
        Loan storage loan = loans[_loanId];
        require(msg.sender == loan.borrower, "Only the borrower can repay the loan");

        IERC721 nftToken = IERC721(loan.nftAddress);

        // Transfer the collateral NFT back to the borrower
        nftToken.transferFrom(address(this), msg.sender, loan.nftId);

        // Transfer the loan amount plus interest (if any) to the contract owner
        token.transferFrom(msg.sender, owner(), loan.loanAmount + 1000000000000000000);

        // Remove the loan entry
        delete loans[_loanId];

        emit LoanRepaid(_loanId, msg.sender, loan.loanAmount);
    }

    function getLoanCount() external view returns (uint256) {
        return loans.length;
    }
}
