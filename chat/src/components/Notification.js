import React, {useState, useEffect} from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { db, onMessageListener, requestForToken } from '../firebase-config';
import { collection } from 'firebase/firestore';

const Notification = ({ room }) => {
  const userRef = collection(db, "users");
  const [notification, setNotification] = useState({title: '', body: ''});
  const notify = () =>  toast(<ToastDisplay/>);
  function ToastDisplay() {
    return (
      <div>
        <p><b>{notification?.title}</b></p>
        <p>{notification?.body}</p>
      </div>
    );
  };

  requestForToken();
  useEffect(() => {
    if (notification?.title ){
     notify()
    }
  }, [notification])

  onMessageListener()
    .then((payload) => {
      setNotification({title: payload?.notification?.title, body: payload?.notification?.body});     
    })
    .catch((err) => console.log('failed: ', err));

  return (
    <>
        <Toaster/>
    </>
  )
}

export default Notification;