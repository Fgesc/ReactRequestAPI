import styles from './loader.module.css';


export const Loader = () => {
    return (
        <div className={styles.flex}>
            <div className={styles.loader}></div>
        </div>
    );
};
 