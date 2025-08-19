import styles from './ShopTextModule.module.css'

export default function ShopTextModule({
    shopAddress,shopName
  }) {

                
    return (
      <div className={styles.ShopTextModule}>
        <div className={styles.shopName}>{`${shopName}`}</div>
        <div className={styles.shopAddress}>{`${shopAddress}`}</div>
      </div>
    )
  }
  