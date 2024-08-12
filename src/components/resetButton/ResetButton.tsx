import "../../index.css";
import styles from "./ResetButton.module.css";

interface ResetButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  value: string;
}

export function ResetButton({ value, ...delegated }: ResetButtonProps) {
  // if (isdisabled)
  //   return (
  //     <button disabled className={styles.resetButton} {...delegated}>
  //       {value}
  //     </button>
  //   );
  return (
    <button className={styles.resetButton} {...delegated}>
      {value}
    </button>
  );
}
