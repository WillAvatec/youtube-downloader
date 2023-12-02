import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import ytdl from "ytdl-core";
import zlib from "zlib";

const TEST_URL = "https://www.youtube.com/watch?v=5JDRXIav2pw";

export async function POST (req:NextApiRequest){
  const { id, format } = req.body;
  const URL = `https://www.youtube.com/watch?v=${id}`;

 const info = await ytdl.getBasicInfo(TEST_URL);
 const length = info.formats[0].contentLength
 const title = info.videoDetails.title;
 const fileName = `${title}.${format === "audio" ? "mp3" : "mp4"}`;
 const contentType = format === "audio" ? "audio/mpeg" : "video/mp4"; 

 const stream = ytdl(TEST_URL,{
  quality:"highestvideo",
  filter: format === "audio" ? "audioonly" : "audioandvideo"
 })

 function streamVideo(){
  return new ReadableStream({
    start(controller) {
      stream.on("data",(chunk: Buffer) => controller.enqueue(chunk))
      stream.on("end", () => controller.close());
      stream.on("error", (error: NodeJS.ErrnoException) => controller.error(error));
    },
    cancel(){
      stream.destroy()
    }
  })
 }

 return new NextResponse(streamVideo(),{
      status:200,
      headers: new Headers({
        "content-disposition": `attachment; filename=${fileName}`,         
        "content-type": contentType,                                       
        "content-length": String(length),
        "transfer-encoding": "chunked"
      })
 })
}

 