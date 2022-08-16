<script lang="ts">
  import Ripple from '@smui/ripple';
  import Icon from 'src/util/Icon.svelte';
  import getNewWord from 'src/functions/getNewWord';
  import { afterUpdate, onMount } from 'svelte';
  import getStartWord from 'src/functions/getStartWord';
  import { usedWords } from 'src/store';

  let value = '';
  let messages: { id: string; type: string; content: string; definition?: string }[] = [];
  let messagesElement: HTMLDivElement;
  let sendWord: string;

  let receiveID = getRandomID();
  receiveMsg('· · ·', receiveID);

  onMount(async () => {
    const { startWord, definition } = await getStartWord();
    sendWord = startWord;
    changeMessages(receiveID, startWord, definition);
    usedWords.update(usedWords => usedWords.concat(startWord));
  });

  afterUpdate(() => {
    messagesElement.scrollTo(0, messagesElement.scrollHeight); // TODO: 바운스 애니메이션 넣기; updateScroll 함수 만들고 메시지 추가될 때 마다 이걸 실행하는 걸로
  });

  function changeMessages(id: string, content: string, definition?: string) {
    messages = messages.map(message => {
      if (message.id === id) {
        message.content = content;
        message.definition = definition;
      }
      return message;
    });
  }

  function getRandomID() {
    return (Math.random() + 1).toString(36).substring(7);
  }

  function sendMsg(msg: string, id: string) {
    messages = [...messages, { id, type: 'SEND', content: msg }];
  }

  function receiveMsg(msg: string, id: string, definition?: string) {
    messages = [...messages, { id, type: 'RECEIVE', content: msg, definition }];
  }

  async function onSubmit() {
    if (value === '') return;
    let word = value;
    value = '';

    let sendID = getRandomID();
    let receiveID = getRandomID();
    sendMsg(word, sendID);
    receiveMsg('· · ·', receiveID);

    const res = await getNewWord(sendWord, word);
    if (res.success) sendWord = res.message;
    changeMessages(receiveID, res.message, res.definition);
  }
</script>

{$usedWords}
<form on:submit|preventDefault={onSubmit} class="chat">
  <div class="chat-title">
    <h1>민뭉</h1>
    <h2>당신의 끝말잇기 아바타</h2>
    <figure class="avatar">
      <Icon name="robot" class="avatar-icon" width="60px" height="60px" />
    </figure>
  </div>
  <div class="messages" bind:this={messagesElement}>
    <div class="messages-content">
      {#each messages as { type, content, definition }}
        {#if type === 'SEND'}
          <div class="message message-personal">
            {content}
          </div>
          {:else if type === 'RECEIVE'}
          <div class="message" title={definition ? definition : ''}>
            <figure class="avatar">
              <Icon name="robot" class="avatar-icon" width="25px" height="25px" />
            </figure>
            {content}
          </div>
        {/if}
      {/each}
    </div>
  </div>
  <div class="message-box">
    <input
      type="text"
      placeholder="보내기..."
      bind:value
    />
    <span use:Ripple={{ surface: true }}>
      <button>
        {#if value === ''}
          <Icon name="send-outlined" width="23" height="23" />
          {:else}
            <Icon name="send-filled" width="23" height="23" />
        {/if}
      </button>
    </span>
  </div>
</form>

<style lang="scss">
  .chat {
    @include absolute-center;
    width: 100%;
    height: 80vh;
    max-width: 400px;
    max-height: 600px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    border-radius: 20px;
    border: 2px solid $primary-color-default;
  }

  .chat-title {
    flex: 0 1 45px;
    position: relative;
    width: 100%;
    border-bottom: 1px solid #ccc;
    color: $text-secondary-color;
    padding: 50px 0 5px;
    text-align: center;
    margin-bottom: 20px;

    h1,
    h2 {
      font-size: 20px;
      margin: 0;
      padding: 0;
    }

    h2 {
      font-weight: normal;
      font-size: 15px;
      letter-spacing: 1px;
    }

    .avatar {
      @include flex-center;
      position: absolute;
      left: 0;
      top: -40px;
      right: 0;
      margin: auto;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      border: 2px solid $primary-color-default;
      background: #fff;
    }
  }

  .messages {
    flex: 1 1 auto;
    overflow-y: scroll;
    overflow-x: hidden;

    .messages-content {
      padding-left: 15px;
      width: 100%;
      height: 100%;

      .message {
        position: relative;
        z-index: 3;
        max-width: 310px;
        word-break: break-word;
        clear: both;
        float: left;
        padding: 6px 10px 7px;
        border-radius: 0 10px 10px 10px;
        background: $background-color-primary;
        margin: 8px 0;
        font-size: 15px;
        line-height: 1.4;
        margin-left: 40px;
        color: $text-primary-color;

        .avatar {
          @include flex-center;
          position: absolute;
          top: 0;
          left: -40px;
          width: 35px;
          height: 35px;
          border-radius: 50%;
          border: 1px solid $primary-color-default;
        }
      }

      .message-personal {
        float: right;
        text-align: right;
        border-radius: 10px 10px 0 10px;
        background: $primary-color-default;
        color: $text-color-white;
        margin: 2px 0;
      }
    }
  }

  .message-box {
    flex: 0 1 45px;
    width: 90%;
    margin: 15px auto;
    padding: 8px 0 8px 15px;
    position: relative;
    height: 14px;
    border: 1px solid #ccc;
    border-radius: 40px;
    height: 100%;
    display: flex;
    align-items: center;

    input {
      background: none;
      border: none;
      outline: none;
      font-size: 15px;
      height: 24px;
      width: 280px;
      color: $text-primary-color;
    }

    span {
      position: absolute;
      top: 50%;
      right: -5px;
      transform: translateY(-50%);
      border-radius: 50%;
      button {
        @include flex-center;
        border: none;
        outline: none;
        width: 60px;
        height: 60px;
        background: transparent;
        cursor: pointer;
      }
    }
  }
</style>