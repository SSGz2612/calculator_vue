<template>
  <div>
    <h3>{{ msg }}</h3>
    
    <div class="container">
      <div class="container__display">{{ Value || 0 }}</div>
      <div @click="clean" class="box bg-gray">C</div>
      <div class="box bg-gray">+/-</div>
      <div @click="percent" class="box bg-gray">%</div>
      <div @click="divide" class="box bg-orange">/</div>
      <div @click="digits('7')" class="box bg-h">7</div>
      <div @click="digits('8')" class="box bg-h">8</div>
      <div @click="digits('9')" class="box bg-h">9</div>
      <div @click="multiply" class="box bg-orange">x</div>
      <div @click="digits('4')" class="box bg-h">4</div>
      <div @click="digits('5')" class="box bg-h">5</div>
      <div @click="digits('6')" class="box bg-h">6</div>
      <div @click="minus" class="box bg-orange">-</div>
      <div @click="digits('1')" class="box bg-h">1</div>
      <div @click="digits('2')" class="box bg-h">2</div>
      <div @click="digits('3')" class="box bg-h">3</div>
      <div @click="addition" class="box bg-orange">+</div>
      <div @click="digits('0')" class="box bg-h sizezero">0</div>
      <div @click="dot" class="box bg-h">.</div>
      <div @click="equal(addition)" class="box bg-orange">=</div>
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
      Value: 0,
      firstValue: 0,
      currentValue: 0
    }
  },
  mounted(){
    axios.get('http://localhost:4000/')
    .then((res) => {
      this.Value = res.data[0].dt;
      console.log(res.data[0].dt);
    })
    .catch((e) => {
      console.log(e);
    });
  },
  methods: {
    clean(){ this.Value = ""; },
    
    digits(n){
      this.Value = this.Value + n;
      this.firstValue = this.Value;

      axios.post('http://localhost:4000/', { "id": 5, "dt": n })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
    },

    percent(){},
    dot(){
      if(this.Value.indexOf(".") === -1){
        this.Value += ".";
      }
    },

    divide(){},
    multiply(){},
    minus(){},
    
    addition(){
    },

    equal(v){
      
      axios.post('http://localhost:4000/', { "id": 5, "data": v })
      .then((res) => {
        res.data;
      })
      .catch((e) => {
        console.log(e);
      });
    }
  }
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
