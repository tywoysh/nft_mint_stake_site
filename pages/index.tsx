import type { NextPage } from "next";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      {/* Top Section */}
      <h1 className={styles.h1}>Bad Beets</h1>
      <div className={styles.nftBoxGrid}>
        <div
          className={styles.optionSelectBox}
          role="button"
          onClick={() => router.push(`/mint`)}
        >
          {/* Mint a new NFT */}
            <img src={`/icons/drop.webp`} alt="drop" />
            <h2 className={styles.selectBoxTitle}>Mint a Bad Beet!</h2>
            <p className={styles.selectBoxDescription}>
              Click here to go to the Mint Page!
            </p>
        </div>

        <div
          className={styles.optionSelectBox}
          role="button"
          onClick={() => router.push(`/stake`)}
        >
          {/* Staking an NFT */}
          <img src={`/icons/token.webp`} alt="drop" />
          <h2 className={styles.selectBoxTitle}>Stake to earn Beetcoin!</h2>
          <p className={styles.selectBoxDescription}>
            Stake your Bad Beets NFTs and start earning today!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
