let a = 'Masum';
let b = 'Rima';

[a, b] = [b, a];
console.log(a, b);

function joke() {
  console.log(
    "Why don't scientists trust atoms? Because they make up everything!"
  );
}

const jokeInterval = setInterval(joke, 2000);

// After 10 seconds, stop telling jokes
setTimeout(() => {
  clearInterval(jokeInterval);
}, 10000);
