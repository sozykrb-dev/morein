// سيرفر بدائي بدون أي مكتبات - بس مكتبات node الجاهزة
const http = require("http");
const fs = require("fs");
const path = require("path");

// ريلواي بيحدد البورت لوحده من PORT
const PORT = process.env.PORT || 3000;

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8"
};

http.createServer((req, res) => {
  let file = req.url === "/" ? "/index.html" : req.url.split("?")[0];
  let full = path.join(__dirname, "public", path.normalize(file));

  if (!full.startsWith(path.join(__dirname, "public"))) {
    res.writeHead(403);
    return res.end("ممنوع");
  }

  fs.readFile(full, (err, data) => {
    if (err) {
      res.writeHead(404);
      return res.end("الصفحة غير موجودة");
    }
    res.writeHead(200, { "Content-Type": types[path.extname(full)] || "text/plain" });
    res.end(data);
  });
}).listen(PORT, "0.0.0.0", () => console.log("الموقع شغال على بورت " + PORT));
