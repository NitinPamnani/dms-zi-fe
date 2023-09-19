
import React from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//toast.configure()

function ShowMessage(props) {
  const {header, message, level} = props
  if(header && message) {
    console.log(props)
    /*toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
      toastId: 'sc1'
    })*/
    if(level == 'success') {
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
        toastId: 'sc1'        
      })
    } else if (level == 'info') {
      toast.info(message, {
        position: toast.POSITION.TOP_RIGHT,
        toastId: 'sc1'        
      })      
    } else if(level == 'warn') {
      toast.warn(message, {
        position: toast.POSITION.TOP_RIGHT,
        toastId: 'sc1'        
      })
    } else if(level == 'error') {
      toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
        toastId: 'sc1'        
      })
    }
  }
    
  

  return (
    <div>
      <ToastContainer/>
    </div>
  )
}

export default ShowMessage