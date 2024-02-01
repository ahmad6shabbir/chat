import React, { useEffect, useRef, useState } from 'react';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import moment from 'moment';

export const Chat = ({ room }) => {
    const [newMessages, setNewMessages] = useState("");
    const [messages, setMessages] = useState([]);
    const messageRef = collection(db, "messages");
    const messagesContainerRef = useRef(null);

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
                                <span className='user'>{message.user}</span><hr style={{margin:0}}/>
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
