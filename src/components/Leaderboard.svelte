<script lang="ts">
  import Icons from './Icons.svelte';
  import Ripple from '@smui/ripple';
  import { getLeaderboard, getRegion, registerRegion } from 'src/functions';
  import { onMount, onDestroy } from 'svelte';
  import { mine, myCounter } from 'src/store';
  import { get } from 'svelte/store';
  import { browser } from '$app/env';
  import { commaFormat } from 'src/util';
  import { clear_bell_MP3 } from 'src/assets/audio';

  let isOpen = false;
  let leaderboard: Leaderboard[];
  let loading = true;
  let myregion: string;
  let addingCountScore = false;
  let addingMyCountScore = false;
  let increasementCounter: number = 0;
  
  const url = 'https://end-to-end-world.vercel.app';

  onMount(async () => {
    await registerRegion();

    leaderboard = await getLeaderboard();
    myregion = await getRegion();
    let scoreCount = getScoreCount(leaderboard);
    mine.set({
      region: myregion,
      scoreCount
    });

    loading = false;

    setInterval(updateLeaderboard, 4000);

    let ins = document.createElement('ins');
    let ins2 = document.createElement('ins');

    ins.className = 'kakao_ad_area';
    ins.setAttribute('style', 'display:none;');
    ins.setAttribute('data-ad-width', '320');
    ins.setAttribute('data-ad-height', '100');
    ins.setAttribute('data-ad-unit', 'DAN-Gajyt3mAU8UaQfpi');

    ins2.className = 'kakao_ad_area';
    ins2.setAttribute('style', 'display:none;');
    ins2.setAttribute('data-ad-width', '320');
    ins2.setAttribute('data-ad-height', '100');
    ins2.setAttribute('data-ad-unit', 'DAN-7Q1Ruo9fvk2riY7X');

    let scr = document.createElement('script') as HTMLScriptElement;
    scr.async = true;
    scr.type = "text/javascript";
    scr.src = "//t1.daumcdn.net/kas/static/ba.min.js";

    (document.querySelector('.ad') as HTMLDivElement).appendChild(ins);
    (document.querySelector('.ad') as HTMLDivElement).appendChild(scr);
    (document.querySelector('.content-ad') as HTMLDivElement).appendChild(ins2);
    (document.querySelector('.content-ad') as HTMLDivElement).appendChild(scr);
  });

  onDestroy(() => {
    mineUnsubscribe();
    myCounterUnsubscribe();
  });

  async function updateLeaderboard() {
    leaderboard = await getLeaderboard();
    let scoreCount = getScoreCount(leaderboard);
    if (get(mine).scoreCount !== scoreCount) {
      mine.set({
        region: myregion,
        scoreCount
      });
    }
  }

  function getScoreCount(leaderboard: Leaderboard[]) {
    return leaderboard.filter(leaderboardData => leaderboardData.region === myregion)[0].score;
  }

  async function share(type: string) {
    switch (type) {
      case 'twitter':
        // 트위터
        const sendText = '지역별 끝말잇기 점수 대결!';
        window.open(`https://twitter.com/intent/tweet?text=${sendText}&url=${url}`);
        break;
      case 'facebook':
        // 페북
        window.open(`http://www.facebook.com/sharer/sharer.php?u=${url}`);
        break;
      case 'katalk':
        // @ts-ignore
        if (window.Kakao) {
          // @ts-ignore
          const kakao = window.Kakao;
          if (!kakao.isInitialized()) {
            kakao.init(import.meta.env.VITE_KAKAO_API);
          }

          kakao.Share.createDefaultButton({
            container: '.share-katalk',
            objectType: 'feed',
            content: {
              title: 'N2N 월드',
              description: '지역별 끝말잇기 점수 대결!',
              imageUrl:
                'https://user-images.githubusercontent.com/62737839/185826141-ee514273-421c-4211-aac9-4c194b7a150a.PNG',
              link: {
                webUrl: url
              }
            }
          });
        }
        break;
      case 'default':
        await navigator.share({
          title: 'end-to-end-world',
          text: '지역별 끝말잇기 점수 대결!',
          url
        });
        break;
    
      default:
        break;
    }
  }

  const mineUnsubscribe = mine.subscribe(() => {
    addingCountScore = true;
    setTimeout(() => addingCountScore = false, 100);
  });

  const myCounterUnsubscribe = myCounter.subscribe(count => {
    addingMyCountScore = true;
    setTimeout(() => addingMyCountScore = false, 100);
    if (browser) {
      localStorage.myCount = count.score;
      increasementCounter = count.increasement;

      let promise = (new Audio(clear_bell_MP3)).play();
      if (promise !== undefined) {
        promise.then(_ => {
          // Autoplay started!
        }).catch(error => {
          // Autoplay was prevented.
          // Show a "Play" button so that user can start playback.
        });
      }
    }
  });
</script>

<div class="leaderboard" class:open={isOpen}>
  {#if !loading}
    <div class="share">
      <div class="share-twitter" on:click={() => share('twitter')}>
        <Icons name="twitter" width="20" height="20" fill="#fff" />
      </div>
      <div class="share-facebook" on:click={() => share('facebook')}>
        <Icons name="facebook" width="20" height="20" fill="#fff" />
      </div>
      <div class="share-katalk" on:click={() => share('katalk')}>
        <Icons name="katalk" width="20" height="20" fill="#3c1e1d" />
      </div>
      <div class="webshare-btn" on:click={() => share('default')}>
        <Icons name="share" width="20" height="20" fill="#fff" />
      </div>
    </div>
  {/if}
  <div class="ad"></div>
  <div class="leaderboard-mine">
    {#if !loading}
      <div class="leaderboard-item">
        <div class="item-region">{$mine.region}</div>
        <div class="item-counter" class:addingMyCountScore>
          <div class="my-counter">{commaFormat($myCounter.score)}</div>
          <div class="increasement-counter">+{increasementCounter}</div>
        </div>
        <div class="item-score" class:addingCountScore>{commaFormat($mine.scoreCount)}점</div>
      </div>
      {:else}
        <div class="loading-mine">로딩 중...</div>
    {/if}
  </div>
  <div class="leaderboard-content">
    {#if !loading}
      <div class="leaderboard-ranking">
          {#each leaderboard as { region, score }, number}
            <div class="leaderboard-item">
              <div class="item-number">{number + 1}</div>
              <div class="item-region" class:myregion={region === myregion}>{region}</div>
              <div class="item-score">{commaFormat(score)}점</div>
            </div>
          {/each}
      </div>
      {:else}
        <div class="loading">로딩 중...</div>
    {/if}
    <div class="content-ad"></div>
    {#if !loading}
      <div class="contact">
        <a href="https://litt.ly/backnforth" target="_blank">
          <img src="https://app.litt.ly/favicon.ico" alt="리틀리 아이콘" width="40px" height="40px" />
        </a>
        <a href="https://github.com/minmoong" target="_blank">
          <Icons name="github" width="40" height="40" fill="#c0c0c0" />
        </a>
      </div>
    {/if}
  </div>
  <span on:click={() => isOpen = !isOpen} use:Ripple={{ surface: true }}>
    <Icons name="arrow-expand" width="40" height="40" fill="#c1c1c1" class="expand-icon" />
  </span>
</div>

<style lang="scss">
  .leaderboard {
    display: flex;
    flex-direction: column;
    $leaderboard-height: 100%;
    position: absolute;
    top: calc($leaderboard-height * -1 + 50px);
    z-index: 2;
    width: 100%;
    height: $leaderboard-height;
    border-bottom: 1px solid #ccc;
    background: $color-background;
    border-radius: 0 0 20px 20px;
    transition: 0.3s;
    padding: 15px 0 50px;
    color: $color-text;

    .ad {
      width: fit-content;
      height: fit-content;
      flex: 1 0 auto;
      margin: 0 auto 30px;
    }

    .share {
      @include flex-center;
      margin-bottom: 30px;

      .webshare-btn, .share-twitter, .share-facebook, .share-katalk {
        @include flex-center;
        cursor: pointer;
        border-radius: 40px;
        width: 40px;
        height: 40px;
        margin-right: 10px;
      }

      .webshare-btn {
        background: $color-default;
        margin: 0;
      }

      .share-twitter {
        background: #55acee;
        :global(svg) {
          position: relative;
          left: 1px;
        }
      }

      .share-facebook {
        background: #3b5898;
        :global(svg) {
          position: relative;
          left: -2px;
        }
      }
      
      .share-katalk {
        background: #ffed00;
      }
    }

    .leaderboard-mine {
      position: absolute;
      z-index: 1;
      left: 0;
      bottom: 0;
      width: calc(100% - 50px);
      height: 50px;
      padding-left: 30px;

      .leaderboard-item {
        @include flex-center;
        justify-content: space-between;

        .addingCountScore {
          transform: scale(1.3) rotate(0deg);
        }

        .addingMyCountScore {
          transform: scale(1.3) rotate(0deg);
        }

        .item-region, .item-score {
          line-height: 50px;
          font-weight: bold;
        }

        .item-region {
          margin-right: 8px;
        }

        .item-counter {
          text-align: center;
	        transition: transform 100ms ease-in-out;

          .my-counter {
            font-size: 24px;
            font-weight: 900;
            color: $color-default;
          }

          .increasement-counter {
            font-size: 17px;
            color: $color-default;
          }
        }

        .item-score {
          min-width: 30px;
	        transition: transform 100ms ease-in-out;
        }
      }
    }

    .leaderboard-content {
      padding-left: 15px;
      overflow-y: scroll;

      .contact {
        @include flex-center;
        width: 100%;
        height: 50px;

        a {
          &:first-child {
            margin-right: 30px;
          }
        }
      }

      .leaderboard-ranking {
        margin-bottom: 30px;
        .leaderboard-item {
          padding: 0.5rem 0;
          display: flex;
          height: 40px;
          flex-direction: row;
          border-bottom: 1px solid #d1d1d1;
          align-items: center;

          &:nth-child(1) {
            .item-number {
              color: transparent;
              background: url('/src/assets/image/first.png') no-repeat center center;
              background-size: 22px;
            }
          }

          &:nth-child(2) {
            .item-number {
              color: transparent;
              background: url('/src/assets/image/second.png') no-repeat center center;
              background-size: 22px;
            }
          }

          &:nth-child(3) {
            .item-number {
              color: transparent;
              background: url('/src/assets/image/third.png') no-repeat center center;
              background-size: 22px;
            }
          }

          &:last-child {
            border: none;
          }

          .item-number {
            min-width: 25px;
            height: 100%;
            margin-right: 8px;
            text-align: center;
          }

          .item-region {
            margin-right: 8px;

            &.myregion {
              font-weight: bold;
            }
          }

          .item-score {
            margin-left: auto;
            margin-right: 15px;
          }
        }
      }

      .content-ad {
        width: fit-content;
        height: fit-content;
        margin: 0 auto 30px;
      }
    }

    &.open {
      position: absolute;
      top: 0;
      z-index: 2;
      :global(.expand-icon) {
        transform: rotate(180deg);
      }
    }

    span {
      :global(.expand-icon) {
        transition: transform 0.4s ease-in-out;
      }
      position: absolute;
      z-index: 3;
      right: 5px;
      bottom: 5px;
      display: block;
      width: 40px;
      height: 40px;
      cursor: pointer;
      border-radius: 50%;
    }
  }

  .loading, .loading-mine {
    @include absolute-center;
  }

  .loading-mine {
    transform: translate(10%, -50%);
  }
</style>
