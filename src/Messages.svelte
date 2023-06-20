<script>
  import { onMount, onDestroy } from "svelte";
  import { currentUser, pb } from "./pocketbase";

  let newMessage;
  let messages = [];
  let unsubscribe;

  const scrollToBottom = (node) => {
    const scroll = () =>
      node.scroll({
        top: node.scrollHeight,
        behavior: "smooth",
      });
    scroll();

    return { update: scroll };
  };

  onMount(async () => {
    // Get initial messages
    const resultList = await pb.collection("messages").getList(1, 50, {
      sort: "created",
      expand: "user",
    });
    messages = resultList.items;

    // Subscribe to realtime messages
    unsubscribe = await pb
      .collection("messages")
      .subscribe("*", async ({ action, record }) => {
        if (action === "create") {
          // Fetch associated user
          const user = await pb.collection("users").getOne(record.user);
          record.expand = { user };
          messages = [...messages, record];
        }
        if (action === "delete") {
          messages = messages.filter((m) => m.id !== record.id);
        }
      });
  });

  onDestroy(() => {
    unsubscribe?.();
  });

  async function sendMessage() {
    const data = {
      text: newMessage,
      user: $currentUser.id,
    };
    const createdMessage = await pb.collection("messages").create(data);
    newMessage = "";
  }
  // console.log(message.expand.user.userna);
  // let avatar = message.expand.user.avatar;
</script>

<div class="messages" use:scrollToBottom={messages}>
  {#each messages as message (message.id)}
    <div class="msg">
      <div class="sentby">
        <div class="sender-info">
          <img
            class="avatar"
            src={`https://avatars.dicebear.com/api/pixel-art/${message.expand.user.username}.svg`}
            alt="avatar"
            width="30px"
          />
          <small>
            {message.expand.user.username}
          </small>
        </div>
        <p class="msg-text">{message.text}</p>
      </div>
    </div>
  {/each}
</div>

<form on:submit|preventDefault={sendMessage}>
  <input placeholder="Message" type="text" bind:value={newMessage} />
  <button type="submit">Send</button>
</form>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap");
  @import url("https://fonts.cdnfonts.com/css/gg-sans-2");
  .sentby {
    font-family: "gg sans Medium";
    font-weight: 400;
    color: white;
    text-shadow: 2px 2px 2px rgb(0, 0, 0, 0.25);
  }
  .msg {
    font-family: "gg sans Medium";
    font-weight: 400;
    color: white;
    text-shadow: 2px 2px 2px rgb(0, 0, 0, 0.25);
    padding-top: 6px;
  }

  .messages {
    padding-bottom: 0;
    overflow-y: scroll;
    /* overflow-x: hidden; */
    height: 475px;
    width: 100%;
  }

  .messages::-webkit-scrollbar {
    display: none;
  }

  .msg-text {
    width: 94%;
    font-size: 16px;
    /* height: 200px; */
    word-wrap: break-word;
    display: inline-block;
    height: wrap; /*sets height of element*/
    background: linear-gradient(43deg, #456fe8 0%, #2f90ea 46%, #19b0ec 100%);
    border-radius: 5px;
    transition: all 0.6s; /*sets a transition (for hover effect)*/
    padding: 5px 5px;
    margin: 5px;
  }

  .sender-info {
    display: flex;
    align-items: flex-end;
  }

  small {
    font-size: 15px;
  }

  button {
    background: linear-gradient(43deg, #456fe8 0%, #2f90ea 46%, #19b0ec 100%);
    border: none;
    border-radius: 3px;
    height: 30px;
    width: 60px;
    color: white;
    transition: 0.1s;
    box-shadow: 4px 4px 21px -8px rgba(0, 0, 0, 1);
  }

  button:hover {
    cursor: pointer;
    filter: brightness(90%);
  }
  button:active {
    background-color: #3e8e41;
    animation-delay: 0.5s;
    transform: translateY(2px);
  }

  form {
    display: flex;
    gap: 5px;
    padding-top: 13px;
  }

  form input {
    flex-grow: 1;
    background-color: #4d5054;
    border-radius: 3px;
    border: none;
    color: white;
    transition: 0.2s;
    padding: 7px;
    box-shadow: 4px 4px 21px -8px rgba(0, 0, 0, 1);
  }

  form input:focus {
    border: none;
    outline: none;
    filter: brightness(90%);
  }

  p {
    padding-bottom: 0px;
  }
</style>
