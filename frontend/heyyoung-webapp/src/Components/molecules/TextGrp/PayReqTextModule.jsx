import styles from './payReqTextModule.module.css';

export default function PayTitleModule({
  subTitle = '결제 요청',
  ShopName = '레드버튼 보드게임',
  money = 1000000,
}) {
  return (
    <div className={styles.payReqTextModule}>
      <div className={styles.subTitle}>{subTitle}</div>
      <div className={styles.contentsContainer}>
        <span className={styles.shopName}>{ShopName}</span> 에서
        <span className={styles.money}>{money}</span>원을 결제합니다.
      </div>
    </div>
  );
}
