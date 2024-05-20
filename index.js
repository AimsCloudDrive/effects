let viewModel = new Vue({
  el: ".container",
  data() {
    return {
      clazz: [],
      NUMS: 30,
      NOT: [5, 10, 11, 16],
    };
  },
  methods: {
    notInNot(num) {
      return this.NOT.indexOf(num, 0) === -1;
    },
    cli(num) {
      if (this.notInNot(num)) {
        location.href = "./src/demo/_" + num + ".html";
      }
    },
  },
  mounted() {
    for (let i = 1; i <= this.NUMS; i++) {
      if (this.notInNot(i)) {
        this.clazz.push("anniu" + " " + "can");
      } else {
        this.clazz.push("anniu" + " " + "cant");
      }
    }
  },
});
