import { Web3Button } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import confetti from 'canvas-confetti';
import { formatUnits, parseUnits } from "ethers/lib/utils";
import {
  useAddress,
  useMetamask,
  useContract,
  useClaimedNFTSupply,
  useContractMetadata,
  useUnclaimedNFTSupply,
  useActiveClaimCondition,
} from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import { Contract } from "ethers";

const nftDropContractAddress = "0x7baf00EAaEC067BF551A46E52B194579781666DB";

const Mint: NextPage = () => {
  const router = useRouter();

  // Wallet Connection Hooks
  const address = useAddress();
  const connectWithMetamask = useMetamask();

  // Contract Hooks
  const { contract: nftDrop } = useContract(
    nftDropContractAddress,
    "nft-drop"
  );

  // The amount the user claims
  const [quantity, setQuantity] = useState(1); // default to 1

  // Load contract metadata
  const { data: contractMetadata } = useContractMetadata(nftDrop);

  // Load claimed supply and unclaimed supply
  const { data: unclaimedSupply } = useUnclaimedNFTSupply(nftDrop);
  const { data: claimedSupply } = useClaimedNFTSupply(nftDrop);

  // Load the active claim condition
  const { data: activeClaimCondition } = useActiveClaimCondition(nftDrop);

  // Check if there's NFTs left on the active claim phase
  const isNotReady =
    activeClaimCondition &&
    parseInt(activeClaimCondition?.availableSupply) === 0;

  // Check if there's any NFTs left
  const isSoldOut = unclaimedSupply?.toNumber() === 0;

  // Check price
  const price = parseUnits(
    activeClaimCondition?.currencyMetadata.displayValue || "0",
    activeClaimCondition?.currencyMetadata.decimals
  );

  // Multiply depending on quantity
  const priceToMint = price.mul(quantity);

  // Loading state while we fetch the metadata
  if (!nftDrop || !contractMetadata) {
    return <div className={styles.container}>Loading...</div>;
  }
  

const throwConfetti = () => {
  confetti({
    particleCount: 400,
    spread: 70,
    origin: {x: 0.5, y: 0.76},
  })
}

  return (
    <div className={styles.container}>

      <div className={styles.header}>
        <button
        className={styles.btn}
        onClick={() => router.push(`/`)}
        >
        Home
        </button>

        <button
        className={styles.btn}
        onClick={() => router.push(`/stake`)}
        >
        Stake!
        </button>
      </div>

      <h1 className={styles.h1}>{contractMetadata?.name}</h1>

      <p>{contractMetadata?.description}</p>

      <hr className={`${styles.smallDivider} ${styles.detailPageHr}`} />

      <img className={styles.img} src={`/preview2.gif`} alt="drop" />

      <div>{claimedSupply?.toNumber()}/{claimedSupply?.toNumber() + unclaimedSupply?.toNumber()}</div>

      <p>Quantity</p>
      <div className={styles.quantityContainer}>
        <button
          className={`${styles.quantityControlButton}`}
          onClick={() => setQuantity(quantity - 1)}
          disabled={quantity <= 1}
        >
          -
        </button>

        <h4>{quantity}</h4>

        <button
          className={`${styles.quantityControlButton}`}
          onClick={() => setQuantity(quantity + 1)}
          disabled={
            quantity >=
            parseInt(
              activeClaimCondition?.quantityLimitPerTransaction || "10"
            )
          }
        >
          +
        </button>
      </div>  
 

      <Web3Button
        contractAddress={nftDropContractAddress}
        action={async (contract) =>
          await contract.erc721.claim(quantity)
        }
        // If the function is successful, we can do something here.
        onSuccess={(result) => {
          alert(
            `Successfully minted ${result.length} NFT${
              result.length > 1 ? "s" : ""
            }!`
          );
          throwConfetti();
        }}
        // If the function fails, we can do something here.
        onError={(error) => alert(error?.message)}
        accentColor="#f213a4"
        colorMode="dark"
      >
        {`Mint${quantity > 1 ? ` ${quantity}` : ""}${
          activeClaimCondition?.price.eq(0)
            ? " (Free)"
            : activeClaimCondition?.currencyMetadata.displayValue
            ? ` (${formatUnits(
                priceToMint,
                activeClaimCondition.currencyMetadata.decimals
              )} ${activeClaimCondition?.currencyMetadata.symbol})`
            : ""
        }`}
      </Web3Button>
    </div>
  );
};

export default Mint;
