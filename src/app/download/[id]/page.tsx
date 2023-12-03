"use client";

import { FormEvent, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import utf8 from "utf8"
import base64 from "base-64"

type PageData = {
  params: {
    id: string;
  };
  searchParams: {
    q: string;
  };
};

type Format = "audio" | "video"

const API_URL = "https://ydtl-media-server.onrender.com"

const Page = ({ params, searchParams }: PageData) => {
  const [format, setformat] = useState<Format>("audio");
  const [link, setLink] = useState<string | null>(null)
  //Get data from encoded data from url
  const bytes = base64.decode(searchParams.q);
  const snippet = JSON.parse(utf8.decode(bytes));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setformat(e.target.value as Format);
  };

  const generateLink = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLink(()=>{
      const link = `${API_URL}/video/${params.id}/${format}`
      const a = document.createElement("a")
      a.href = link
      a.target = "_blank"
      a.click()
      a.remove()
      return link
    })
  };

  /*
  PREVIOUS HANDLE SUBMIT
        const response = await fetch("/api/hello", {
      method: "POST",
      body: JSON.stringify({
        id: params.id,
        format: format,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
    });

    if(response.ok){
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'downloaded_file.mp3'; // Use the provided filename or a default one
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    }
  */

  return (
    <main className={styles.main}>
      <SnippetData data={snippet} />
      {link ? <h1>Descargando, espera un momento</h1> : (
              <form onSubmit={generateLink}>
              <fieldset className={styles.fieldset}>
                <legend>Please select your preferred format:</legend>
                <div className={styles.radios}>
                  <div>
                    <input
                      type="radio"
                      id="audio"
                      value="audio"
                      name="format"
                      defaultChecked={true}
                      onChange={handleChange}
                    />
                    <label htmlFor="audio">Audio(mp3)</label>
                  </div>
      
                  <div>
                    <input
                      type="radio"
                      id="video"
                      value="video"
                      name="format"
                      onChange={handleChange}
                    />
                    <label htmlFor="video">Video(mp4)</label>
                  </div>
                  <div>
                    <button className={styles.submit} type="submit">
                      Procesar
                    </button>
                  </div>
                </div>
              </fieldset>
            </form>
      )}
    </main>
  );
};

type Snippet = {
  title: string;
  thumbnails: {
    high: {
      url: string;
    };
    default: {
      url: string;
    };
  };
  description: string;
  channelTitle: string;
};
const SnippetData = ({ data }: { data: Snippet }) => {
  const { channelTitle, thumbnails, title } = data;

  return (
    <div className={styles.wrapper}>
      <h1>{title}</h1>
      <h2>{channelTitle}</h2>
      <div className={styles.container}>
        <Image src={thumbnails.high.url} alt={title} layout="fill" />
      </div>
    </div>
  );
};

export default Page;
