async function main() {
  const Auction = await ethers.getContractFactory("Auction");
  const auction = await Auction.deploy(3600); // Deploying the Auction contract with a bidding time of 1 hour
  await auction.deployed();
  console.log("Auction contract deployed to:", auction.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
