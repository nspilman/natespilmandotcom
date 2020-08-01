<template>
  <Layout>
    <h1 />
    <div id="vote-count-controller-container">
      <div>
        <h2 id="vote-count-header">
          <span>vote count:</span>
          {{numberOfVotesSubmitted + 1}}
        </h2>
        <h4>({{maxVotes - numberOfVotesSubmitted -1}} votes outstanding)</h4>
      </div>
      <div id="controls">
        <p id="increment-vote">Increment Vote</p>
        <button
          :disabled="numberOfVotesSubmitted == maxVotes - 1"
          class="vote-count-button increase-vote"
          @click="numberOfVotesSubmitted = numberOfVotesSubmitted + 1"
        >+</button>
        <button
          :disabled="numberOfVotesSubmitted == 0"
          class="vote-count-button increase-vote"
          @click="numberOfVotesSubmitted= numberOfVotesSubmitted - 1"
        >-</button>
        <p v-if="numberOfVotesSubmitted != 14" id="show-winner" @click="numberOfVotesSubmitted=14">jump to winner</p>
        <p v-else id="show-winner" @click="numberOfVotesSubmitted=0">start over</p>
      </div>
    </div>
    <div id="song-averages-grid-container">
        <h3 id="winner" v-if="numberOfVotesSubmitted == 14"> This round's song to cover is {{horseRace[0][0]}}</h3>
      <div
        id="song-averages-grid"
        v-for="horse in horseRace"
        :key="horse[0]+numberOfVotesSubmitted"
      >{{horse[0]}} - {{horse[1]}}</div>
    </div>
  </Layout>
</template>

<script>
const arrAvg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
// arrAvg([20, 10, 5, 10]) -> 11.25

import rnd3votes from "../../assets/json/rnd3votes.json";
export default {
  data() {
    return {
      votes: rnd3votes,
      numberOfVotesSubmitted: 0,
      maxVotes: 15
    };
  },
  computed: {
    horseRace() {
      const board = {};
      Object.keys(this.votes[0]).forEach(key => {
        board[key] = [];
      });
      for (let i = 0; i <= this.numberOfVotesSubmitted; i++) {
        Object.keys(board).forEach(key => {
          board[key].push(JSON.parse(this.votes[i][key]));
        });
      }
      const songsAndAverages = {};
      Object.keys(board).forEach(key => {
        let totalVoteCount = 0;
        board[key].forEach(vote => (totalVoteCount = totalVoteCount + vote));
        return (songsAndAverages[key] = (
          totalVoteCount / board[key].length
        ).toFixed(2));
      });
      const songsAndAveragesArray = Object.keys(songsAndAverages).map(
        key => new Array(key, songsAndAverages[key])
      );
      songsAndAveragesArray.sort((a, b) => b[1] - a[1]);
      return songsAndAveragesArray;
    }
  }
};
</script>

<style>
#song-averages-grid {
  font-size: 20px;
}

#vote-count-controller-container {
  display: flex;
  justify-content: space-between;
}

#show-winner{
    cursor: pointer;
    padding-top: 2em;
}

#increment-vote{
    margin:0;
}
</style>