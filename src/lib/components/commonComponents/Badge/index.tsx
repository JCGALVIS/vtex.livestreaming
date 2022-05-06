import styles from './styles.module.css';

declare interface Props {
  value: string | number;
  type: 'error' | 'warning' | 'success';
}

export const Badge = ({ value, type }: Props) => {
  return <span className={`${styles.badge} ${styles[type]}`}>{value}</span>;
};
