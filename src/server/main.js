import express from "express";
import ViteExpress from "vite-express";

const app = express();

let shortenedLinks = []

app.get("/c", (req, res) => {
  const { longLink } = req.query

  function generateShortUUID() {
    return Math.random().toString(36).substring(2, 8);
  }
  
  function isURL(text) {
    const urlPattern = /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;
    return urlPattern.test(text);
  }

  const shortLinkObj = shortenedLinks.find((element) => element.longLink === longLink)

  if (isURL(longLink) && !shortLinkObj) {
    let data = {
      longLink: longLink,
      shortLinkId: generateShortUUID()
    }

    shortenedLinks.push(data)
  
    res.json(data)
  } else if (shortLinkObj) {
    res.json(shortLinkObj)
  } else {
    res.json({status: 405})
  }
});

app.get("/l/:shortLinkId", (req, res) => {
  const { shortLinkId } = req.params

  const shortLinkObj = shortenedLinks.find((element) => element.shortLinkId === shortLinkId)
  if (shortLinkObj) {
    res.redirect(shortLinkObj.longLink)
  }
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);
