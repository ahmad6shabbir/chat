import React, { useEffect, useRef, useState } from 'react';
import { addDoc, collection, getDocs, onSnapshot, orderBy, query, serverTimestamp, where } from 'firebase/firestore';
import { auth, db, requestForToken } from '../firebase-config';
import moment from 'moment';

export const Chat = ({ room }) => {
    const [newMessages, setNewMessages] = useState("");
    const [messages, setMessages] = useState([]);
    const messageRef = collection(db, "messages");
    const userRef = collection(db, "users");
    const messagesContainerRef = useRef(null);
    let fcmKey; // Declare fcmKey outside the scope of the promise chain

    const fcmKeyPromise = requestForToken();

    fcmKeyPromise
        .then((resolvedFcmKey) => {
            // Now you can use the resolvedFcmKey here
            fcmKey = resolvedFcmKey;
            console.log(fcmKey);
        })
        .catch((error) => {
            // Handle any errors that may have occurred during the Promise
            console.error(error);
        });
    const addUser = async () => {
        // Wait for the fcmKeyPromise to resolve
        const resolvedFcmKey = await fcmKeyPromise;

        const userSnapshot = await getDocs(query(
            userRef,
            where('user', '==', auth.currentUser.uid),
            where('room', '==', room)
        ));

        console.log(userSnapshot);

        if (userSnapshot.empty) {
            // User does not exist in the room, proceed to add the document
            await addDoc(userRef, {
                createdAt: serverTimestamp(),
                user: auth.currentUser.uid,
                key: 12,
                room,
                fcmKey: resolvedFcmKey, // Add the fcmKey here
            });

            console.log('User added successfully.');
        } else {
            console.log('User already exists in the room.');
        }
    };

    useEffect(() => {
        const queryMessages = query(
            messageRef,
            where("room", "==", room),
            orderBy("createdAt")
        );
        const subscribe = onSnapshot(queryMessages, (snapshot) => {
            let messages = [];
            snapshot.forEach((doc) => {
                messages.push({ ...doc.data(), id: doc.id });
            });
            setMessages(messages);
        });

        return () => subscribe();
    }, [room]);

    useEffect(() => {
        addUser();
        // Scroll to the end of the messages when the messages state is updated
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newMessages === "") {
            return;
        }

        await addDoc(messageRef, {
            Text: newMessages,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room,
        });

        setNewMessages("");
    };

    const isCurrentUser = (user) => user === auth?.currentUser?.displayName;

    const formatEnableDate = (date) => {
        return moment(date).fromNow();
    };

    const formatTimestamp = (timestamp) => {
        const date = timestamp?.toDate();
        return formatEnableDate(date?.toLocaleString());
    };

    return (
        <div className='chat-app'>
            <div className='header'>
                <h1>{room}</h1>
            </div>
            <div className='messages' ref={messagesContainerRef}>
                {messages.map((message) => (
                    <>
                        <div className={`${isCurrentUser(message.user) ? 'current-user-allign' : 'other-user-allign'}`}>
                            <div
                                key={message.id}
                                className={`message ${isCurrentUser(message.user) ? 'current-user' : 'other-user'}`}
                            >
                                <span className='user'>{message.user}</span><hr style={{ margin: 0 }} />
                                <div className='user_message'>{message.Text}</div>
                                <span className='timestamp'>{formatTimestamp(message.createdAt)}</span>
                            </div>
                        </div>

                    </>
                ))}
            </div>
            <form className='new-message-form' onSubmit={handleSubmit}>
                <input
                    className='new-message-input'
                    placeholder='Type your Message here...'
                    onChange={(e) => setNewMessages(e.target.value)}
                    value={newMessages}
                />
                <button type='submit' className='send-button'>
                    Send
                </button>
            </form>
        </div>
    );
};
