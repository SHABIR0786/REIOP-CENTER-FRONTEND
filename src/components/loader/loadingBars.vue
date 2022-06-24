<template>
    <div class="loading-wrapper2">
        <div class="loading-bar1"></div>
        <div class="loading-bar2"></div>
        <div class="loading-bar3"></div>
    </div>
</template>
<script>
export default {
  name: "loadingBars",
}
</script>
<style>
 :root {
    --loading-bar-primary:#335dfd
}
 .loading-wrapper2 {
    padding: 1rem;
    margin: 0 auto;
    position: relative;
}
 .loading-bar,
.loading-bar:before,
.loading-bar:after {
    width: 1rem;
    height: 3rem;
    background-color: var(--loading-bar-primary);
    animation: animateBar 1s ease-in-out infinite;
}
.loading-bar {
    animation-delay: -.16s;
    position: relative;
    display: flex;
    align-items: center;
}
.loading-bar:before {
    position: absolute;
    right: 2rem;
    content: '';
}
.loading-bar:after {
    position: absolute;
    animation-delay: -.32s;
    content: '';
    left: 2rem;
} 
 .loading-bar1 {
    width: 100%;
    background-color: #eee;
    height: 10px;
    border-radius: 1rem;
    position: relative;
}
.loading-bar1:after {
    position: absolute;
    content: '';
    left:0;
    width: 10px;
    height: 10px;
    background-color: var(--loading-bar-primary);
    border-radius: 1rem;
    animation: bar1 linear 3s infinite;
}
.loading-bar2 {
    width: 100%;
    background-color: #eee;
    height: 10px;
    border-radius: 1rem;
    position: relative;
    margin-top: 1rem;
    overflow: hidden;
}
.loading-bar2:after {
    position: absolute;
    content: '';
    left:-30px;
    width: 30px;
    height: 10px;
    background-color: var(--loading-bar-primary);
    border-radius: 1rem;
    animation: bar2 linear 1s infinite;
}
.loading-bar3 {
    width: 100%;
    background-color: #eee;
    height: 10px;
    border-radius: 1rem;
    position: relative;
    margin-top: 1rem;
    overflow: hidden;
}
.loading-bar3:after {
    position: absolute;
    content: '';
    left:0px;
    width: 30px;
    height: 10px;
    background-color: var(--loading-bar-primary);
    border-radius: 1rem;
    animation: bar3 linear 3s infinite;
} 
@keyframes bar1 {
    0% {
        width: 0;
    }
    30% {
        width: 60%
    }
    50% {
        width: 80%;
    }
    100% {
        width: 100%;
    }
}
@keyframes bar2 {
    0% {
        left: -30px;
    }
    100% {
        left: 100%;
    }
}
@keyframes bar3 {
    0%,100% {
        left: 0px;
        width: 30px;
    }
    25% {
        left: 25%;
        width: 50%;
    }
    50% {
        left: 88%;
        width: 30px;
    }
    75% {
        left: 25%;
        width: 50%;
    }
}
</style>