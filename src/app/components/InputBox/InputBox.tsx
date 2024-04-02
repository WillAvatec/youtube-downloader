import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import styles from "@/app/components/InputBox/styles.module.css";

export default function InputBox({
  setVideos,
}: {
  setVideos: Dispatch<SetStateAction<any[]>>;
}) {
  const [keyword, setKeyword] = useState("");

  const sendRequestToApi = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=5&q=${keyword}&key=${process.env.NEXT_PUBLIC_TOKEN}&fields=items(id,snippet)`,
      {
        method: "GET",
      }
    );
    const json = await response.json();
    setVideos(json.items);
  };

  const updateState = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  return (
    <div className={styles.hero}>
      <form onSubmit={sendRequestToApi}>
      <div className={styles.title}>
        <h2>Convertidor: Youtube</h2>
        <h3>El mejor conversor de video mp3 y mp4 de Youtube!</h3>
      </div>
      <div className={styles.inputBox}>
        <input
          id="search-bar"
          name="keyword"
          className={styles.searchBar}
          type="text"
          value={keyword}
          onChange={updateState}
          placeholder="Url, palabras clave ..."
        />
        <select className={styles.select}>
          <option value="video">MP4</option>
          <option value="audio">MP3</option>
        </select>
        <div className={styles.submit}>
          <button type="submit">OK</button>
        </div>
      </div>
      <div>
        <p>Introduzca el url de un vídeo de YouTube o la dirección URL de la video de YouTube - Vídeos de YouTube en el YouTube Converter</p>
      </div>
    </form>
    </div>
  );
}
