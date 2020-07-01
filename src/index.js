//importing packages: express, ytdl
const express = require('express');
const app = express();
const ytdl = require('ytdl-core');

app.listen('4000', function() {
  console.log("Listening on port 4000");
});

app.get('/download', function(req, res) {
  let link = req.query.url;
  let format = req.query.format;
  let quality = req.query.quality;

  video = ytdl(link, {
    format: format,
    quality: quality,
  });
  video.pipe(res);
})
