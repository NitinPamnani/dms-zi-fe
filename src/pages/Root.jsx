import React from 'react'
import { useState, useEffect, useContext } from 'react'
import DirectoryImage from '../img/folder.png'
import FileImage from '../img/file.png'
import client from '../client/generated/gRPCClient/client.js'
import {GetDirectoryContentsRequest, MoveFileOrDirectoryRequest } from '../client/generated/dms_pb.js';
import cookies from '../context/CookieManager'
import { useJwt } from 'react-jwt'
import { useNavigate } from 'react-router-dom'
import AddFileModal from '../components/AddFileModal'
import AddFolderModal from '../components/AddFolderModal'
import 'semantic-ui-css/semantic.min.css'
import { AuthContext } from '../context/AuthContext';


const Root = () => {
  const navigate = useNavigate()
  const [directoryItems, setDirectoryItems] = useState([])
  const [fileItems, setFileItems] = useState([])
  const {fileCreated, setFileCreated} = useContext(AuthContext);
  const userToken = cookies.get('access_token');

  const [fileDragged, setFileDragged] = useState('')
  

  
  const {isExpired, decodedToken} = useJwt(userToken);


  useEffect(() => {
    console.log("Use state runs");
    const FetchData = () => {
      let getRootDirContents = new GetDirectoryContentsRequest();
      getRootDirContents.setId(decodedToken ? decodedToken.rootDir : '');
      getRootDirContents.setToken(userToken)
      console.log(decodedToken)
      
      client.getDirectoryContents(getRootDirContents, {}, (err, response) => {
        if(response && response.getSuccess()) {
          const {directoriesList, filesList} = response.toObject();
          setDirectoryItems(directoriesList);
          setFileItems(filesList);
          
          
        }
      })
    };
    FetchData()
  }, [JSON.stringify(decodedToken),fileDragged, fileCreated]);

  const handleDoubleClickOnDir = (item) => {
    item.preventDefault();
    const dirContentsToFetch = item.target.name;
    console.log(dirContentsToFetch);
    navigate("/root/"+dirContentsToFetch)
  }

  const handleDoubleClickOnFiles = (item) => {
    item.preventDefault();
    const fileContentsToFetch = item.target.name;
    console.log(fileContentsToFetch);
    navigate("/root/file/"+fileContentsToFetch)
  }

  const handleFileDrag = (item) => {
    console.log("Dragging file:"+item.target.name)
    setFileDragged(item.target.name)
  }



  const handleFileDrop = (item) => {
    console.log("Dropped on"+item.target.name)

    const newDirectory = item.target.name;
    if(fileDragged) {
      
      const moveFileRequest = new MoveFileOrDirectoryRequest();
      moveFileRequest.setId(fileDragged);
      setFileDragged(null);
      moveFileRequest.setCurrentparentid('');
      moveFileRequest.setNewparentid(newDirectory);
      moveFileRequest.setToken(userToken);

      client.moveFileOrDirectory(moveFileRequest, {}, async (err,response) => {
        //if(!err) {
          setDirectoryItems(null);
          setFileItems(null);
        //}
      })
    }
  }




  return (
    <div className="home">
      <div className = "icons">
        <div>
          <AddFileModal />
        </div>
        <div>
          <AddFolderModal/>
        </div>
      </div>  
      <div className = "items">
        {
          directoryItems.map((item) => (
            <div className="item-each" key={item.id} onDoubleClick={handleDoubleClickOnDir}>
              <div className="img">
                <img src ={DirectoryImage} alt="Directory" name={item.id} onDoubleClick={handleDoubleClickOnDir} onDragOver={handleFileDrop}/>
              </div>  
              <div className="name">
                <h3>{item.name}</h3>
              </div>
            </div>
          ))
        },{
          fileItems.map((item) => (
            <div className="item-each" key={item.id} onDoubleClick={handleDoubleClickOnFiles}>
              <div className="img">
                <img src ={FileImage} alt="File" name={item.id} onDoubleClick={handleDoubleClickOnFiles} onDragStart={handleFileDrag}/>
              </div>  
              <div className="name">
                <h3>{item.name}</h3>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Root