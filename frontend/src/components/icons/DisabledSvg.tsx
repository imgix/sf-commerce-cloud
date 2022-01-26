import styles from "./Icon.module.scss";

export const DisabledSvg = ({ className }: { className?: string }) => {
  const classNames = [styles.container, className].join(" ");
  return (
    <div className={classNames}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <path
            d="M8 0C3.582 0 0 3.582 0 8C0 12.418 3.582 16 8 16C12.418 16 16 12.418 16 8C16 3.582 12.418 0 8 0ZM2 8C2 6.405 2.627 4.958 3.643 3.884L10.574 13.414C9.793 13.786 8.922 14 8 14C4.686 14 2 11.314 2 8ZM12.357 12.116L5.426 2.586C6.207 2.214 7.078 2 8 2C11.314 2 14 4.686 14 8C14 9.596 13.373 11.042 12.357 12.116Z"
            fill="white"
          />
        </g>
      </svg>
    </div>
  );
};
