<template>
   <div class="icon-container">
          <div>
            <g-link to="https://www.linkedin.com/in/natespilman/">
                <img class="icon" :src="linkedInImg" alt="linkedIn">
            </g-link>
          </div>
          <div>
              <g-link to= "https://github.com/nspilman">
            <img class="icon" :src="githubImg" alt="GitHub">
              </g-link>
          </div>
          <div>
              <g-link to= "https://twitter.com/Natetheperson">
            <img class="icon" :src="twitterImg" alt="Twitter">
              </g-link>
          </div>
          <div>
              <g-link to= "https://www.instagram.com/natespilman/">
                <img class="icon" :src="instagramImg" alt="Instagram">
              </g-link>
          </div>
        </div>
</template>

<script>
import linkedInImg from "../assets/img/linkedin@2x.png"
import twitterImg from "../assets/img/twitter@2x.png"
import githubImg from "../assets/img/github@2x.png"
import instagramImg from "../assets/img/instagram@2x.png"

export default {  
    data(){
    return {
      linkedInImg,
      twitterImg,
      githubImg,
      instagramImg
    }
  }

}
</script>

<style scoped>
.icon:hover{
    border-bottom: 4px solid white;
    padding-bottom: .2rem;
}

</style>