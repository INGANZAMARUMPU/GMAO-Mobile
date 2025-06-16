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
      const cleaned = text.replace(/<br\s*\/?>/gi, '');
      return cleaned.replace(/\n/g, "<br>");
    },
    formatplan(text) {
      if (!text) return "";
      const cleaned = text.replace(/<br\s*\/?>/gi, '');
      return cleaned.replace(/\n/g, " ");
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
          this.$store.state.loader = false
          window.localStorage.setItem("statics", JSON.stringify(reponse.data));
        })
        .catch((error) => {
          console.log(error);
          this.$store.state.static = JSON.parse(window.localStorage.getItem("statics"));
          this.$store.state.loader = false
        });
    },
    searchequipement(keyword){
      axios.get(`/oc_assets/?search=${keyword}&oc_asset_service__istartswith= ${this.$store.state.user.default_service_id}&oc_asset_nomenclature__startswith=E`)
      .then((reponse) => {
          this.$store.state.equipements = reponse.data.results
          this.next = reponse.data.next
          this.$store.state.checksuite = this.next
          console.log(reponse.data.next)
          this.$router.push({ path: '/Inventaire' })
          console.log(this.items)
      }).catch((error) => {
          const vyose = JSON.parse(window.localStorage.getItem('equipement'))
          this.$store.state.equipements = vyose.filter(item => (item.oc_asset_code === this.$store.state.keyword))
          this.$router.push({ path: '/Inventaire' })
      })
    },
    searchinfrastructure(keyword){
      axios.get(`/oc_assets/?search=${keyword}&oc_asset_service__istartswith=${this.$store.state.user.default_service_id}&oc_asset_nomenclature__startswith=I`)
      .then((reponse) => {
          this.$store.state.infrastructures = reponse.data.results
          this.$router.push({ path: '/Infrastructure' })
          this.next = reponse.data.next
          this.$store.state.checksuite = this.next
          console.log(reponse.data)
      }).catch((error) => {
          const vyose = JSON.parse(window.localStorage.getItem('infrastructure'))
          this.$store.state.infrastructures = vyose.filter(item => (item.oc_asset_code === this.$store.state.keyword))
          this.$router.push({ path: '/Infrastructure' })
      })
    },
    Getinventaire(keyword) {
      this.$store.state.keyword = keyword
      console.log('bonjour')
      // this.$store.state.equipements = null
      axios.get(`/oc_assets/?search=${keyword}&oc_asset_service__istartswith= ${this.$store.state.user.default_service_id}&oc_asset_nomenclature__startswith=E`)
          .then((reponse) => {
              this.$store.state.equipements = reponse.data.results
              this.next = reponse.data.next
              this.$store.state.checksuite = this.next
              console.log(reponse.data.next)
              this.$router.push({ path: '/Inventaire' })
              console.log(this.items)
          }).catch((error) => {
              const vyose = JSON.parse(window.localStorage.getItem('equipement'))
              this.$store.state.equipements = vyose.filter(item => (item.oc_asset_code === this.$store.state.keyword))
              this.$router.push({ path: '/Inventaire' })
          })
      axios.get(`/oc_assets/?search=${keyword}&oc_asset_service__istartswith=${this.$store.state.user.default_service_id}&oc_asset_nomenclature__startswith=I`)
          .then((reponse) => {
              this.$store.state.infrastructures = reponse.data.results
              this.$router.push({ path: '/Inventaire' })
              this.next = reponse.data.next
              this.$store.state.checksuite = this.next
              console.log(reponse.data)
          }).catch((error) => {
              const vyose = JSON.parse(window.localStorage.getItem('infrastructure'))
              this.$store.state.infrastructures = vyose.filter(item => (item.oc_asset_code === this.$store.state.keyword))
              this.$router.push({ path: '/Inventaire' })
          })
  },
  },
};
