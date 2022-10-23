const express = require('express');
const app     = express();
const file_upload = require('express-fileupload');
const fs = require('fs');
const path = require('path');

const PORT = 8000;

app.use(express.static("public"));
app.use(file_upload());

app.post('/upload', function(req, res)
{
  console.log(req.body);
  
  if (!req.files || Object.keys(req.files).length === 0)
    return res.status(400).send('Error!');

  const folder_c   = __dirname + `\\c`  ;
  const folder_cpp = __dirname + `\\cpp`;

  try
  {
    if (!fs.existsSync(folder_c))
      fs.mkdirSync(folder_c);

    if (!fs.existsSync(folder_cpp))
      fs.mkdirSync(folder_cpp);
  } 
  catch (err)
  {
    console.error(err);
  }

  const file = req.files.file_name;
  
  for(let i = 0; i < file.length; i++)
  {
    switch (path.extname(file[i].name))
    {
      case ".c":
                file[i].mv(__dirname + "\\c\\" + file[i].name, function (err)
                {
                  if(err)
                    return res.status(500).send(err);
                });  
      break;

      case ".cpp":
                file[i].mv(__dirname + "\\cpp\\" + file[i].name, function (err)
                {
                  if(err)
                    return res.status(500).send(err);
                });
      break;
    
      default:
                file[i].mv(__dirname + '\\saved files\\' + file[i].name, function (err)
                {
                  if(err)
                    return res.status(500).send(err);
                });
      break;
    }
  }

  res.send('Files uploaded!');
});  

app.listen(PORT);
