// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Auction {
    // Structure to represent a bid
    struct Bid {
        address bidder; // Address of the bidder
        uint256 amount; // Bid amount
    }

    address public auctioneer; // Address of the auctioneer
    uint256 public auctionEndTime; // Timestamp when the auction ends
    bool public ended; // Flag to indicate if the auction has ended
    address public highestBidder; // Address of the highest bidder
    uint256 public highestBid; // Highest bid amount

    mapping(address => uint256) public fundsByBidder; // Funds available to be withdrawn by each bidder
    mapping(address => Bid) public bidsByBidder; // Bid details for each bidder

    // Event to be emitted when a new bid is placed
    event BidPlaced(address indexed bidder, uint256 amount);
    // Event to be emitted when the auction ends
    event AuctionEnded(address indexed winner, uint256 amount);

    // Modifier to check if the auction has ended
    modifier onlyBeforeEnd() {
        require(!ended, "Auction already ended.");
        require(block.timestamp < auctionEndTime, "Auction already expired.");
        _;
    }

    // Modifier to check if the auction has not ended
    modifier onlyAfterEnd() {
        require(ended, "Auction not yet ended.");
        _;
    }

    constructor(uint256 _biddingTime) {
        auctioneer = msg.sender;
        auctionEndTime = block.timestamp + _biddingTime;
    }

    // Function to place a bid
    function placeBid() public payable onlyBeforeEnd {
        require(msg.value > 0, "Bid amount must be greater than zero.");
        require(msg.value > highestBid, "There is already a higher bid.");

        // Return funds to the previous highest bidder
        if (highestBidder != address(0)) {
            fundsByBidder[highestBidder] += highestBid;
        }

        highestBidder = msg.sender;
        highestBid = msg.value;
        bidsByBidder[msg.sender] = Bid(msg.sender, msg.value);

        emit BidPlaced(msg.sender, msg.value);
    }

    // Function to end the auction and declare the winner
    function endAuction() public onlyAfterEnd {
        require(!ended, "Auction already ended.");

        ended = true;
        emit AuctionEnded(highestBidder, highestBid);

        // Transfer the highest bid amount to the auctioneer
        payable(auctioneer).transfer(highestBid);
    }

    // Function to withdraw funds for a bidder
    function withdraw() public {
        uint256 amount = fundsByBidder[msg.sender];
        require(amount > 0, "No funds available for withdrawal.");

        fundsByBidder[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
    }
}