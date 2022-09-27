<template>
  <div id="app">
    <div class="container">
      <h1 class="app-name">Cionic App ✨</h1>
      <br />
      <form class="form-inputs" @submit.prevent="addToCart">
        <div class="form-inputs-group">
          <h3>1. Select your color.</h3>
          <div class="input-group card-group">
            <div class="input--color">
              <input
                v-model="color"
                type="radio"
                id="graphite"
                name="color"
                value="graphite"
                required
              />
              <label for="graphite">Graphite</label>
            </div>
            <div class="input--color">
              <input
                v-model="color"
                type="radio"
                id="dusk"
                name="color"
                value="dusk"
                required
              />
              <label for="dusk">Dusk</label>
            </div>
          </div>
        </div>
        <div class="form-inputs-group form-inputs-group--middle">
          <h3>3. Select which leg.</h3>
          <div class="input-group card-group">
            <div class="input--leg">
              <input
                v-model="leg"
                type="radio"
                id="left"
                name="leg"
                value="left"
                required
              />
              <label for="left">Left</label>
            </div>
            <div class="input--leg">
              <input
                v-model="leg"
                type="radio"
                id="right"
                name="leg"
                value="right"
                required
              />
              <label for="right">Right</label>
            </div>
          </div>
        </div>
        <div class="form-inputs-group">
          <h3>3. Input your size.</h3>
          <div class="input-group">
            <div class="input--size">
              <label for="upper-leg">Upper Leg(Inches)</label>
              <input
                v-model="upperLegSize"
                type="number"
                id="upper-leg"
                name="upper-leg-size"
                placeholder="inches"
                required
                min="0"
                max="50"
                step="0.01"
              />
            </div>
            <div class="input--size">
              <label for="lower-leg">Lower Leg(Inches)</label>
              <input
                v-model="lowerLegSize"
                type="number"
                id="lower-leg"
                name="lower-leg-size"
                placeholder="inches"
                required
                min="0"
                max="50"
                step="0.01"
              />
            </div>
          </div>
        </div>
        <br />
        <div class="actions">
          <button type="submit">Add to Cart</button>
        </div>
      </form>
    </div>
    <vue-confirm-dialog />
  </div>
</template>

<script>
import Vue from "vue";
import VueConfirmDialog from "vue-confirm-dialog";

Vue.use(VueConfirmDialog);
Vue.component("vue-confirm-dialog", VueConfirmDialog.default);

export default {
  name: "App",
  data() {
    return {
      color: "graphite",
      leg: "left",
      upperLegSize: "",
      lowerLegSize: "",
    };
  },
  methods: {
    addToCart() {
      fetch("https://cionic-api.onrender.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          color: this.color,
          leg: this.leg,
          upperLegSize: this.upperLegSize,
          lowerLegSize: this.lowerLegSize,
        }),
      })
        .then((response) => {
          if (response.status === 200) {
            this.$confirm({
              title: "Success 🎉",
              message: "Your order has been added to cart.",
              button: {
                yes: "Okay",
              },
            });
          } else {
            throw new Error();
          }
        })
        .catch(() => {
          this.$confirm({
            title: "Error 😢",
            message: "Your order could not be added to cart. Retry again.",
            button: {
              yes: "Okay",
            },
          });
        });
    },
  },
};
</script>

<style lang="scss">
$color-primary: rgb(0, 75, 99);
$color-graphite: #73787a;
$color-dusk: #3e567c;
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  padding: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
#app {
  text-align: center;
  color: $color-primary;
  min-height: 100vh;
  display: flex;
  .container {
    margin: auto;
    width: 95%;
    max-width: 800px;
  }
}
.container {
  padding: 1rem 0;
}
.app-name {
  margin: 0;
}
@media (min-width: 761px) {
  .form-inputs {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 0.5rem;
    .actions {
      grid-column: 1 / 4;
      text-align: center;
    }
  }
}

.form-inputs-group {
  background: #ecf5fd;
  border: 1px solid rgb(63, 196, 248);
  @media (max-width: 760px) {
    max-width: 300px;
    margin: auto;
    margin-bottom: 1rem;
    min-height: 240px;
  }
  h3 {
    margin: 0;
    padding: 0.5rem;
    background: #caf1ff;
  }
  .input-group {
    padding: 1rem 0.5rem;
  }
}
@media (min-width: 761px) {
  .form-inputs-group--middle {
    border-left: none;
    border-right: none;
  }
}

.card-group {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 0.5rem;
}
.input--color,
.input--leg {
  padding: 1rem 0.5rem;
  input[type="radio"] {
    display: none;
  }
}
.input--color {
  input[type="radio"] {
    display: none;
    &:not(:checked) + label {
      display: block;
      width: 100px;
      padding: 1rem 0.5rem;
      &::before {
        content: "";
        display: grid;
        place-content: center;
        width: 2rem;
        height: 2rem;
        margin: auto;
        margin-bottom: 0.5rem;
        border-radius: 50%;
        background: $color-primary;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        &:hover {
          background: rgba($color-primary, 0.1);
        }
      }
    }
    &:checked + label {
      border: 1px solid $color-primary;
      border-bottom-width: 1rem;
      padding: 1rem 0.5rem;
      cursor: pointer;
      &::before {
        content: "";
        display: grid;
        place-content: center;
        width: 3rem;
        height: 3rem;
        margin: auto;
        margin-bottom: 0.5rem;
        border-radius: 50%;
        background: $color-primary;
        transition: all 0.3s ease-in-out;
      }
    }
    &[value="graphite"] + label {
      color: $color-graphite;
      &::before {
        background: $color-graphite;
      }
    }
    &[value="dusk"] + label {
      color: $color-dusk;
      &::before {
        background: $color-dusk;
      }
    }
  }
}
.input--leg {
  input[type="radio"] {
    display: none;
    &:not(:checked) + label {
      display: block;
      width: 100px;
      padding: 1rem 0.5rem;
      color: #ecf5fd;
      &::before {
        content: "";
        font-size: 2.5rem;
        margin-bottom: 0.5rem;
        border-radius: 50%;
        display: grid;
        place-content: center;
        color: $color-primary;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        &:hover {
          background: rgba($color-primary, 0.1);
        }
      }
    }
    &:checked + label {
      border: 1px solid $color-primary;
      border-bottom-width: 1rem;
      padding: 1rem 0.5rem;
      cursor: pointer;
      &:hover {
        background: rgba($color-primary, 0.1);
      }
      &::before {
        content: "";
        color: $color-primary;
        display: grid;
        place-content: center;
        width: 3rem;
        height: 3rem;
        margin: auto;
        font-size: 2rem;
        margin-bottom: 0.5rem;
        border-radius: 50%;
        box-shadow: inset 0 0 0 1px $color-primary;
        transition: all 0.3s ease-in-out;
      }
    }
    &[value="left"] {
      &:not(:checked) + label {
        &::before {
          content: "L";
        }
      }
      &:checked + label {
        &::before {
          content: "L";
        }
      }
    }
    &[value="right"] {
      &:not(:checked) + label {
        &::before {
          content: "R";
        }
      }
      &:checked + label {
        &::before {
          content: "R";
        }
      }
    }
  }
}
label {
  display: block;
  font-weight: bold;
}
input[type="number"] {
  margin: 0.25rem 0 1rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.3rem;
  box-shadow: none;
  outline: none;
  border: 1.5px solid rgba($color-primary, 0.5);
  color: rgba($color-primary, 1);
  background: white;
  text-align: center;
  font-size: 1rem;
  font-weight: bold;
  width: 70%;
  &:focus {
    border: 1.5px solid rgba($color-primary, 0.8);
  }
  &::-webkit-input-placeholder {
    color: rgba($color-primary, 0.5);
  }
}
.actions {
  button {
    padding: 1rem 2rem;
    border: none;
    outline: none;
    background: #caf1ff;
    color: $color-primary;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &:hover {
      background: rgba(#caf1ff, 0.6);
    }
  }
}
</style>
