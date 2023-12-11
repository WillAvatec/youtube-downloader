"use client";

import styles from "@/app/page.module.css";
import { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import utf8 from "utf8";
import base64 from "base-64";

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [videos, setVideos] = useState([]);

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
    <main className={styles.main}>
      <div>
        <form onSubmit={sendRequestToApi}>
          <div className={styles.inputBox}>
            <label htmlFor="search-bar">Escribe una palabra para empezar a buscar:</label>
            <input
              id="search-bar"
              name="keyword"
              className={styles.searchBar}
              type="text"
              value={keyword}
              onChange={updateState}
              placeholder="Musica, Arte, Deporte..."
            />
          </div>
          <div className={styles.submit}>
            <button type="submit">Buscar</button>
          </div>
        </form>
      </div>
      <div className={styles.videos}>
        {videos.length > 0 && <Videos videos={videos} />}
      </div>
    </main>
  );
}

function Videos({ videos }: { videos: Array<any> }) {
  return (
    <>
      {videos.map((vid, i) => {
        const { title, thumbnails, description, channelTitle } = vid.snippet;
        const bytes = utf8.encode(
          JSON.stringify({ title, thumbnails, channelTitle })
        );
        const encoded: string = base64.encode(bytes);
        return (
          <Link
            href={{
              pathname: `/download/${vid.id.videoId}`,
              query: {
                q: encoded,
              },
            }}
            key={i}
          >
            <div className={styles.videoItem}>
              <Image
                width={1000}
                height={720}
                src={thumbnails.high.url}
                alt={description}
              />
              <div className={styles.details}>
                <h4>{channelTitle}</h4>
                <h3>{title}</h3>
              </div>
            </div>
          </Link>
        );
      })}
    </>
  );
}
// Placeholder image for testing
// https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg
