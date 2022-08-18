<template>
  <div>
    <h1>{{ msg }}</h1>
    
    <div class="container">
      <div class="container__display">{{ User.data || 0 }}</div>
      <div class="box bg-gray">AC</div>
      <div class="box bg-gray">+/-</div>
      <div class="box bg-gray">%</div>
      <div class="box bg-orange">/</div>
      <div class="box bg-h">7</div>
      <div class="box bg-h">8</div>
      <div class="box bg-h">9</div>
      <div class="box bg-orange">x</div>
      <div class="box bg-h">4</div>
      <div class="box bg-h">5</div>
      <div class="box bg-h">6</div>
      <div class="box bg-orange">-</div>
      <div class="box bg-h">1</div>
      <div class="box bg-h">2</div>
      <div class="box bg-h">3</div>
      <div class="box bg-orange">+</div>
      <div class="box bg-h sizezero">0</div>
      <div class="box bg-h">.</div>
      <div class="box bg-orange">=</div>
    </div>

    <div class="container">
      <div class="box bg-gray sizezero">Undo</div>
      <div class="box bg-orange sizezero-2">Redo</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'CalculatorUndoRedo',
  props: { msg: String },
 data() {
  return {
    User: {},
  }
 },
  mounted(){
    axios.get('http://localhost:4000/')
    .then((res) => {
      console.log(res.data);
      this.User = res.data;
    })
    .catch((e) => {
      console.log(e);
    })
  },
}
</script>

<style scoped>
.container {
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(50px, auto);
  width: 200px;
  margin: 20px auto;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: rgba( 0, 0, 0, 0.1 ) 0px 4px 12px;
}

.container__display {
  display: grid;
  background-color: #555;
  justify-content: flex-end;
  align-items: center;
  font-size: 20px;
  padding: 0 20px;
  color: #fff;
  grid-column: 1/5;
  height: 70px;
  border-radius: 5px 5px 0 0;
}

.box {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.sizezero {
  grid-column: 1/3;
}

.sizezero-2 {
  grid-column: 3/5;
}

.bg-gray {
  background-color: #bbb;
}

.bg-gray:hover {
  background-color: #ddd;
}

.bg-orange {
  background-color: rgb(182, 113, 9);
  color: #fff;
}

.bg-orange:hover {
  background-color: rgb(216, 136, 17);
}

.bg-h:hover {
  background-color: #ddd;
}
</style>
