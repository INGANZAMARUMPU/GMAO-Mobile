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
    getStatics(start_date, end_date, lieu) {
      const lieuUpper = lieu; // garder la version originale (majuscule)
      const lieuLower = lieu.toLowerCase();
      if (!lieuLower.includes(this.$store.state.user.default_service_id)) {
        console.log("vous ne pouvez pas");
        this.activerStaticalert();
        return;
      }
      console.log(this.lieu);
      axios
        .get(`/statistics/?service=${lieuUpper}&start_date=${start_date}&end_date=${end_date}`)
        .then((reponse) => {
          this.$store.state.static = reponse.data;
          this.$store.state.lieu = this.lieu;
          window.localStorage.setItem("statics", JSON.stringify(reponse.data));
        })
        .catch((error) => {
          console.log(error);
          this.$store.state.static = JSON.parse(
            window.localStorage.getItem("statics")
          );
        });
    },
  },
};
