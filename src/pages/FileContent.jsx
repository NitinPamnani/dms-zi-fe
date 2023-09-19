import React from 'react'
import { useState, useEffect } from 'react'
import DirectoryImage from '../img/folder.png'
import FileImage from '../img/file.png'
import client from '../client/generated/gRPCClient/client.js'
import {GetFileContentsRequest } from '../client/generated/dms_pb.js';
import cookies from '../context/CookieManager'
import { useJwt } from 'react-jwt'
import { useLocation, useNavigate } from 'react-router-dom'

const FileContent = () => {
  const navigate = useNavigate()
  const [fileContent, setFileContent] = useState('')
  const [fileName, setFileName] = useState('')
  const userToken = cookies.get('access_token');

  const {isExpired, decodedToken} = useJwt(userToken);

  const location = useLocation()
  const fileId = location.pathname.split("/")[3];

  useEffect(() => {
    console.log("Use state runs");
    const FetchData = () => {
      let getFileContentRequest = new GetFileContentsRequest();
      getFileContentRequest.setId(fileId);
      getFileContentRequest.setToken(userToken)
      console.log(fileId)
      
      client.getFileContents(getFileContentRequest, {}, (err, response) => {
        console.log(err, response)
        if(response && response.getSuccess()) {
            setFileName(response.getName());
            setFileContent(response.getContent());
            console.log("Filename"+fileName)
            console.log("Filecontent"+fileContent);
        }
      })
      console.log("AA gaya idhar"+fileId)
    };
    FetchData()
  }, [JSON.stringify(decodedToken), fileContent, fileName, fileId]);

  return (
    <div className='singleFile'>
      <div className="content">
        <h3>{fileName}</h3>
        <p>{fileContent}</p>
      </div>
      <div className="menu"></div>
    </div>
  )
}

export default FileContent