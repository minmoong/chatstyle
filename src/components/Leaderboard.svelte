<script lang="ts">
  import Icons from './Icons.svelte';
  import Ripple from '@smui/ripple';
  import getLeaderboard from 'src/functions/getLeaderboard';
  import { onMount } from 'svelte';
  import getRegion from 'src/functions/getRegion';

  let isOpen = false;
  let leaderboard: Leaderboard[];
  let loading = true;
  let myregion: string, leaderboardMyscore: number; // TODO: 스토어 만들기

  onMount(async () => {
    await updateLeaderboard();
    loading = false;
    myregion = await getRegion();
    leaderboardMyscore = leaderboard.filter(leaderboardData => leaderboardData.region === myregion)[0].score; // TODO: 일단 내 도시가 데이터베이스에 등록되어 있다고 가정하기.

    setInterval(updateLeaderboard, 3000);
  });

  async function updateLeaderboard() {
    leaderboard = await getLeaderboard();
  }
</script>

<div class="leaderboard" class:open={isOpen}>
  <span on:click={() => isOpen = !isOpen} use:Ripple={{ surface: true }}>
    <Icons name="arrow-expand" width="40px" height="40px" fill="#c1c1c1" class="expand-icon" />
  </span>
  <div class="leaderboard-mine">
    <div class="leaderboard-item">
      <div class="item-region">{myregion}</div>
      <div class="item-score">{leaderboardMyscore}점</div>
    </div>
  </div>
  <div class="leaderboard-content">
    {#if !loading}
      {#each leaderboard as { region, score }, number}
        <div class="leaderboard-item">
          <div class="item-number">{number + 1}</div>
          <div class="item-region">{region}</div>
          <div class="item-score">{score}점</div>
        </div>
      {/each}
      {:else}
        <div>로딩 중...</div>
    {/if}
  </div>
</div>

<style lang="scss">
  .leaderboard {
    $leaderboard-height: 650px;
    position: absolute;
    top: $leaderboard-height * -1 + 50px;
    z-index: 2;
    width: 100%;
    height: $leaderboard-height;
    border-bottom: 1px solid #ccc;
    background: $background-color-primary;
    border-radius: 0 0 20px 20px;
    transition: 0.4s;
    padding: 15px 0 50px 15px;
    color: $text-primary-color;

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

        .item-region, .item-score {
          line-height: 50px;
        }

        .item-region {
          margin-right: 8px;
        }

        .item-score {
          min-width: 30px;
          margin-left: auto;
        }
      }
    }

    .leaderboard-content {
      height: 100%;
      overflow-y: scroll;

      .leaderboard-item {
        padding: 0.5rem 0;
        display: flex;
        flex-direction: row;
        border-bottom: 1px solid #d1d1d1;
        align-items: center;

        .item-number {
          min-width: 25px;
          margin-right: 8px;
          text-align: center;
        }

        .item-region {
          margin-right: 8px;
        }

        .item-score {
          margin-left: auto;
        }
      }

      .leaderboard-item:last-child {
        border: none;
      }
    }

    // &::after {
    //   @include mobile {
    //     width: 170px;
    //   }
    //   @include tablet {
    //     width: 250px;
    //   }
    //   @include desktop {
    //     width: 200px;
    //   }
    //   content: '';
    //   position: absolute;
    //   left: 50%;
    //   bottom: 5px;
    //   transform: translateX(-50%);
    //   display: block;
    //   width: 130px;
    //   height: 4px;
    //   border-radius: 4px;
    //   background: $primary-color-second;
    // }

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
</style>
