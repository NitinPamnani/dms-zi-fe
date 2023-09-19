import React, { useState, useContext } from 'react'
import { Button, Header, Image, Modal, Form } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import File from "../img/file.png"
import client from '../client/generated/gRPCClient/client.js'
import { CreateFileRequest } from '../client/generated/dms_pb.js';
import { useJwt } from 'react-jwt'
import cookies from '../context/CookieManager'
import { useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';

function AddFileModal() {
  const [open, setOpen] = React.useState(false);
  const {fileCreated, setFileCreated} = useContext(AuthContext);
  const userToken = cookies.get('access_token');
  const {isExpired, decodedToken} = useJwt(userToken);

  const location = useLocation()
  const locationTokens = location.pathname.split("/");
  const dirId = locationTokens[locationTokens.length -1];

  const handleFileCreate = (e) => {
    const {filename, content} = Object.fromEntries(new FormData(e.target));

    const createFileRequest = new CreateFileRequest();
    createFileRequest.setName(filename);
    createFileRequest.setContent(content);
    createFileRequest.setToken(userToken);
    const parentDirId = ((dirId == "root") ? decodedToken.rootDir : dirId)
    createFileRequest.setParentdirid(parentDirId);


    client.createFile(createFileRequest, {}, (err, response) => {
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
      trigger={<Button>Add file</Button>}
    >
      <Modal.Header>Add a File</Modal.Header>
      <Modal.Content image>
        <Image size='medium' src={File} wrapped />
        <Modal.Description>
          <Header>Enter the File Details</Header>
          <Form onSubmit={handleFileCreate}>
            <Form.Group widths='equal'>
              <Form.Input fluid label='File Name' placeholder='file name' name="filename"/>
             </Form.Group>
             <Form.TextArea label='Content' placeholder='Initial file content. Can be updated later' name ="content"/>
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

export default AddFileModal