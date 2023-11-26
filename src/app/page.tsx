import styles from "@/app/page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div>
        <form>
          <div className={styles.inputBox}>
            <label htmlFor="search-bar">Type a keyword to start looking:</label>
            <input
              id="search-bar"
              className={styles.searchBar}
              type="text"
              placeholder="Manly, Rubius, etc"
            />
          </div>
          <div className={styles.submit}>
            <button type="submit">Search</button>
          </div>
        </form>
      </div>
    </main>
  );
}
