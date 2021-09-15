import React, { useEffect, useState, useCallback, LogBox } from "react";
import { GiftedChat } from "react-native-gifted-chat";

import { View, Text, Linking } from "react-native";
import { Header } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import io from "socket.io-client";
import { TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState([]);

  const getChat = async (text) => {
    const res = await fetch(`https://planit-fyp.herokuapp.com/api/chat/`);

    const response = await res.json();
    console.log(response.allChat);
    // setMessages(response.allChat);
    // for (let i = 0; i < response.allChat.length; i++) {
    //   setMessages([
    //     {
    //       ...messages,
    //       _id: i.messageId,
    //       text: i.text,
    //       createdAt: i.createdAt,
    //       user: {
    //         _id: i.userId,
    //         avatar: i.avatar,
    //       },
    //       sent: false,
    //       received: false,
    //       pending: false,
    //     },
    //   ]);
    // }

    response.allChat.map((x) => {
      setMessages([
        {
          ...messages,
          _id: x.messageId,
          text: x.text,
          createdAt: x.createdAt,
          user: {
            _id: x.userId,
            avatar: x.avatar,
          },
          sent: false,
          received: false,
          pending: false,
        },
      ]);
    });
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    //storeData(response.name);
  };

  useEffect(() => {
    socket = io("https://planit-fyp.herokuapp.com/");
    console.log("Hello world");
    //getChat();
    console.log("hello");
    socket.on("chat message", (msg) => {
      var msgArray = [
        {
          _id: msg[0]._id,
          text: msg[0].text,
          createdAt: new Date(),
          user: {
            _id: 2,
            avatar:
              "https://th.bing.com/th/id/OIP.Hz2zc6bs5XSwenctIT5FmgHaG4?w=204&h=190&c=7&o=5&pid=1.7",
          },
          sent: false,
          received: false,
          pending: false,
        },
      ];

      setMessages((messages) => [msgArray[0], ...messages]);

      console.log(msgArray);
    });
  }, []);

  const handleChat = async (text, userId, avatar, messageId, createdAt) => {
    const res = await fetch(`https://planit-fyp.herokuapp.com/api/chat/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        userId,
        avatar,
        messageId,
        createdAt,
      }),
    });
    const response = await res.json();
    console.log(response);
    //storeData(response.name);
  };

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    handleChat(
      messages[0].text,
      messages[0].user._id,
      messages[0].user.avatar,
      messages[0]._id,
      messages[0].createdAt
    );

    socket.emit("guide message", messages);
  }, []);

  const dialCall = () => {
    let phoneNumber = "03352097647";
    if (Platform.OS === "android") {
      phoneNumber = `tel:${phoneNumber}`;
      //  setPressed(true);
    } else {
      phoneNumber = `telprompt:${phoneNumber}`;
    }
    //let url = `whatsapp://send?phone=${phoneNumber}`;
    Linking.openURL(phoneNumber);
  };

  const whatsappCall = () => {
    let phoneNumber = "923352097647";
    let url = `whatsapp://send?phone=${phoneNumber}`;
    Linking.openURL(url);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* <Header
        leftComponent={{
          icon: "menu",
          color: "#fff",
          iconStyle: { color: "#fff" },
        }}
        centerComponent={{ text: "MY TITLE", style: { color: "#fff" } }}
        rightComponent={
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={dialCall}>
              <FontAwesome
                name="phone"
                size={30}
                color="#fff"
                style={{ padding: 10 }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={whatsappCall}>
              <FontAwesome name="whatsapp" size={30} color="black" />
            </TouchableOpacity>
          </View>
        }
      /> */}
      <GiftedChat
        messages={messages}
        showUserAvatar={true}
        showAvatarForEveryMessage={true}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 2,
          avatar:
            "https://th.bing.com/th/id/OIP.VlLvg3eZH0pRik3EQCgirgHaFj?w=253&h=190&c=7&o=5&pid=1.7",
        }}
      />
    </View>
  );
};

export default ChatScreen;
