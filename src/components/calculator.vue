<template>
  <div>
    <h3>{{ msg }}</h3>
    
    <div class="container">
      <div class="container__operator">{{ operator }}</div>
      <div class="container__display">{{ Value || 0 }}</div>
      <div @click="cleanAll" class="box bg-red">AC</div>
      <div @click="clean" class="box bg-gray">C</div>
      <div @click="percent" class="box bg-gray">%</div>
      <div @click="divide" class="box bg-gray">/</div>
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
      <div @click="undo" class="box bg-blue sizezero">Undo</div>
      <div @click="redo" class="box bg-orange sizezero-2">Redo</div>
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
      PrincipalValue: "0",
      Value: '1',
      currentValue: '0',
      operator: "",
      checkOperator: false,
      // id json
      generateId: 0,
      // redo undo
      counter: 0
    }
  },
  mounted(){
    axios.get('http://localhost:4000/')
    .then((res) => {
      this.generateId = res.data.info[res.data.info.length - 1].id;
      console.log(res.data.info);
      this.Value = res.data.info[0].dt;
    })
    .catch((e) => {
      console.log(e);
    });
  },
  methods: {
    genId(){
      // for(let i = 0; i < dataTask.data.length; i++){
      //   if(dataTask.data.find((n) => n.id === i)){
      //       generatoriD += 1;
      //   } else {
      //       break;
      //   }
      // }
    },

    cleanAll(){
      this.Value = "0";
      this.PrincipalValue = "0"
      this.operator = "";
    },

    clean(){
      let v = this.Value;
      this.Value = v.slice(0, -1);
      // this.currentValue = this.Value;
      // this.operator = "";
    },

    digits(n){
      if(this.checkOperator){
        this.Value = "";
        this.checkOperator = false;
      }

      if(this.Value === "0"){
        this.Value = n;
      } else {
        this.Value = this.Value + n;
      }
    },

    percent(){
      this.currentValue = this.Value;
      this.operator = "%";
      this.checkOperator = true;
    },

    dot(){
      if(this.Value.indexOf(".") === -1){
        this.Value += ".";
      }
    },

    divide(){
      this.currentValue = this.Value;
      this.operator = "/";
      this.checkOperator = true;
    },

    multiply(){
      this.currentValue = this.Value;
      this.operator = "x";
      this.checkOperator = true;
    },

    minus(){
      this.currentValue = this.Value;
      this.operator = "-";
      this.checkOperator = true;
    },
    
    addition(){
      this.currentValue = this.Value;
      this.operator = "+";
      this.checkOperator = true;

      // console.log("value: " + this.Value);
      // console.log("Principal: " + this.PrincipalValue + " " + "current: " + this.currentValue);
    },

    equal(){
      switch(this.operator){
        case "+":
          this.PrincipalValue = String(parseFloat(this.currentValue) + parseFloat(this.Value));
          this.Value = String(parseFloat(this.currentValue) + parseFloat(this.Value));
          
          this.generateId += 1;
          axios.post('http://localhost:4000/', { "id": this.generateId, "dt": this.Value })
          .then((res) => {
            res.data;
          })
          .catch((e) => {
            console.log(e);
          });

          this.operator = "";
          this.checkOperator = false;
        break;
        
        case "-":
          this.PrincipalValue = String(parseFloat(this.currentValue) - parseFloat(this.Value));
          this.Value = String(parseFloat(this.currentValue) - parseFloat(this.Value));
          
          this.generateId += 1;
          axios.post('http://localhost:4000/', { "id": this.generateId, "dt": this.Value })
          .then((res) => {
            res.data;
          })
          .catch((e) => {
            console.log(e);
          });

          this.operator = "";
          this.checkOperator = false;
        break;

        case "x":
          this.PrincipalValue = String(parseFloat(this.currentValue) * parseFloat(this.Value));
          this.Value = String(parseFloat(this.currentValue) * parseFloat(this.Value));
          
          this.generateId += 1;
          axios.post('http://localhost:4000/', { "id": this.generateId, "dt": this.Value })
          .then((res) => {
            res.data;
          })
          .catch((e) => {
            console.log(e);
          });

          this.operator = "";
          this.checkOperator = false;
        break;

        case "/":
          this.PrincipalValue = String(parseFloat(this.currentValue) / parseFloat(this.Value));
          this.Value = String(parseFloat(this.currentValue) / parseFloat(this.Value));
          
          this.generateId += 1;
          axios.post('http://localhost:4000/', { "id": this.generateId, "dt": this.Value })
          .then((res) => {
            res.data;
          })
          .catch((e) => {
            console.log(e);
          });

          this.operator = "";
          this.checkOperator = false;
        break;

        case "%":
          this.PrincipalValue = String(parseFloat(this.currentValue) * parseFloat(this.Value)) / 100;
          this.Value = String(parseFloat(this.currentValue) * parseFloat(this.Value)) / 100;
          
          this.generateId += 1;
          axios.post('http://localhost:4000/', { "id": this.generateId, "dt": this.Value })
          .then((res) => {
            res.data;
          })
          .catch((e) => {
            console.log(e);
          });

          this.operator = "";
          this.checkOperator = false;
        break;
      }
    },

    redo(){
      axios.get('http://localhost:4000/')
      .then((res) => {
        if(this.counter > 0){
          this.counter -= 1
          this.Value = res.data.info[this.counter].dt;
        } else {
          console.log("nothing more");
        }
      })
      .catch((e) => {
        console.log(e);
      });
    },

    undo(){
      axios.get('http://localhost:4000/')
      .then((res) => {
        if(this.counter < res.data.info.length - 1){
          this.counter += 1;
          this.Value = res.data.info[this.counter].dt;
        } else {
          console.log("nothing more");
        }
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
  grid-column: 2/5;
  height: 70px;
  border-radius: 0 5px 0 0;
}

.container__operator {
  display: grid;
  background-color: #555;
  justify-content: flex-start;
  align-items: center;
  font-size: 20px;
  padding: 0 20px;
  color: #fff;
  grid-column: 1/2;
  height: 70px;
  border-radius: 5px 0 0 0;
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

.bg-red {
  background-color: rgb(121, 14, 28);
  color: #fff;
}

.bg-red:hover {
  background-color: rgb(189, 15, 15);
}

.bg-blue {
  background-color: rgb(17, 51, 122);
  color: #fff;
}

.bg-blue:hover {
  background-color: rgb(23, 67, 161);
}

.bg-h:hover {
  background-color: #ddd;
}
</style>
