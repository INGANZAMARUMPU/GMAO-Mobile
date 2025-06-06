import axios from "axios";

export default {
  watch: {
    "$store.state.user": {
      hander(newVal) {
        console.log(newVal);
        this.$store.commit("clearStore");
      },
      deep: true,
    },
  },
  methods: {
    getShortDescription(description) {
      const words = description.split(/[\s(]/);
      return words.slice(0, 2).join(" ");
    },
    getShortplan(description) {
      const words = description.split(/[\s(]/);
      return words.slice(0, 3).join(" ");
    },
    formatInstructions(text) {
      if (!text) return "";
      return text.replace(/\n/g, "<br>");
    },
    datetime(x) {
      if (!x) return "-";
      let date = new Date(x);
      return new Intl.DateTimeFormat("en-GB", {
        dateStyle: "short",
        timeStyle: "short",
      }).format(date);
    },
    money(x, decimals = 0) {
      if (!x && x != 0) return "";
      let cash = parseFloat(x).toFixed(decimals);
      if (isNaN(x) || x == null) return "-";
      return cash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },
    getDecimalPart(number) {
      const str = number.toString();
      const parts = str.split(".");
      return parts.length > 1 ? parts[1] : null;
    },
    getStatics(start_date, end_date) {
      console.log(start_date, end_date);
      axios
        .get(
          `/statistics/?start_date=${start_date}&end_date=${end_date}&service=${this.$store.state.user.default_service_id}`
        )
        .then((reponse) => {
          this.$store.state.static = reponse.data;
          window.localStorage.setItem('statics', JSON.stringify(reponse.data))
        })
        .catch((error) => {
          console.log(error);
          this.$store.state.static = JSON.parse(window.localStorage.getItem('statics'))
        });
    },
  },
};
