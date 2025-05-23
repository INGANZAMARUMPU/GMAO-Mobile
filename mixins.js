export default {
  methods: {
    getShortDescription(description) {
      const words = description.split(/[\s(]/);
      return words.slice(0, 2).join(" ");
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
  },
};
