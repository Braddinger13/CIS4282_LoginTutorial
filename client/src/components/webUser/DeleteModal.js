import React from 'react'

const DeleteModal = ({ open, user, onOkClicked, onClose }) => {
    if(!open) return null

  return (
    <div className='modalWindow'>
        <h5>Are you sure you want to delete {user.user_email}?</h5>

        <button onClick={onOkClicked}>OK</button>
        <button onClick={onClose}>Cancel</button>
    </div>
  )
}

export default DeleteModal