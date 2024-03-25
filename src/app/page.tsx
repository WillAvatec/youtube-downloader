"use client";

import styles from "@/app/page.module.css";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import utf8 from "utf8";
import base64 from "base-64";
import InputBox from "./components/InputBox/InputBox";

export default function Home() {
  const [videos, setVideos] = useState([]);

  return (
    <main className={styles.main}>
      <div>
        <InputBox setVideos={setVideos}/>
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
