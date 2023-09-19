import React, { useState, useContext } from 'react'
import { Button, Header, Image, Modal, Form } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import Folder from "../img/folder.png"
import client from '../client/generated/gRPCClient/client.js'
import { CreateDirectoryRequest } from '../client/generated/dms_pb.js';
import { useJwt } from 'react-jwt'
import cookies from '../context/CookieManager'
import { useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';

function AddFolderModal() {
  const [open, setOpen] = React.useState(false);
  const {fileCreated, setFileCreated} = useContext(AuthContext);
  const userToken = cookies.get('access_token');
  const {isExpired, decodedToken} = useJwt(userToken);

  const location = useLocation()
  const locationTokens = location.pathname.split("/");
  const dirId = locationTokens[locationTokens.length -1];

  const handleFolderCreate = (e) => {
    const {foldername} = Object.fromEntries(new FormData(e.target));

    const createDirectoryRequest = new CreateDirectoryRequest();
    createDirectoryRequest.setName(foldername);
    createDirectoryRequest.setToken(userToken);
    const parentDirId = ((dirId == "root") ? decodedToken.rootDir : dirId)
    createDirectoryRequest.setParentdirid(parentDirId);


    client.createDirectory(createDirectoryRequest, {}, (err, response) => {
        if(response && response.getSuccess()) {
            setOpen(false)
            setFileCreated(!fileCreated)
        }
      })

  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>Add folder</Button>}
    >
      <Modal.Header>Add a folder</Modal.Header>
      <Modal.Content image>
        <Image size='medium' src={Folder} wrapped />
        <Modal.Description>
          <Header>Enter the Folder Details</Header>
          <Form onSubmit={handleFolderCreate}>
            <Form.Group widths='equal'>
              <Form.Input fluid label='Folder Name' placeholder='foldername name' name="foldername"/>
             </Form.Group>
             <Form.Button
               content="Save"
               labelPosition='right'
               icon='checkmark'
               positive
             />
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
          Cancel
        </Button>

      </Modal.Actions>
    </Modal>
  )
}

export default AddFolderModal