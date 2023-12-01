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

const Page = ({ params, searchParams }: PageData) => {
  const [format, setformat] = useState<string | undefined>("audio");

  //Get data from encoded data from url
  const bytes = base64.decode(searchParams.q);
  const text = JSON.parse(utf8.decode(bytes));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setformat(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${snippet.title}.${format === "audio" ? "mp3" : "mp4"}`;
      link.click();
      window.URL.revokeObjectURL(url);
    }
  };

  return (
    <main className={styles.main}>
      <SnippetData data={snippet} />
      <form onSubmit={handleSubmit}>
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
                Descargar!!!
              </button>
            </div>
          </div>
        </fieldset>
      </form>
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

  console.log(data);

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
