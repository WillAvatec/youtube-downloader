import type { NextApiRequest, NextApiResponse } from "next";
import ytdl from "ytdl-core";

const TEST_URL = "https://www.youtube.com/watch?v=5JDRXIav2pw";

export const config = {
  api: {
    responseLimit: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { id, format } = req.body;
    const URL = `https://www.youtube.com/watch?v=${id}`;

    // Get video metadata
    const { title } = await getVideoInfo(URL);
    const fileName = `${title}.${format === "audio" ? "mp3" : "mp4"}`;

    // Set Headers
    const fileType = format === "audio" ? "audio/mpeg" : "video/mp4";
    res.setHeader("Content-Type", fileType);
    res.status(200);

    // Send data to client
    if (format === "audio") {
      const audio = ytdl(URL, {
        quality: "lowestaudio",
      });

      return audio.pipe(res);
    }
    if (format === "video") {
      const video = ytdl(URL, {
        filter: "audioandvideo",
        quality: "lowestvideo",
      });

      video.on("data",chunk=>{
        res.write(chunk)
      })

      video.on("end", ()=>{
        res.end();
      })
      return 
    }
  }

  return res
    .status(405)
    .json({ message: `Not admitted method: ${req.method}` });
}

async function getVideoInfo(URL: string) {
  const info = await ytdl.getBasicInfo(URL);
  return {
    title: info.videoDetails.title,
  };
}
